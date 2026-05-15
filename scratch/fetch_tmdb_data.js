require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.TMDB_API_KEY; 

const movieTitles = [
  "The Lord of the Rings: The Fellowship of the Ring",
  "The Lord of the Rings: The Two Towers",
  "The Lord of the Rings: The Return of the King",
  "The Hobbit: An Unexpected Journey",
  "The Hobbit: The Desolation of Smaug",
  "The Hobbit: The Battle of the Five Armies",
  "London Has Fallen",
  "Olympus Has Fallen",
  "Angel Has Fallen",
  "Gravity",
  "The Nun",
  "The Nun II",
  "Annabelle: Creation",
  "Annabelle",
  "The Conjuring",
  "Annabelle Comes Home",
  "The Curse of La Llorona",
  "The Conjuring 2",
  "The Conjuring 3",
  "Dune",
  "Dune: Part Two",
  "Oppenheimer",
  "Inception",
  "Joker",
  "The Naked Gun",
  "Coming to America",
  "Independence Day",
  "Smile",
  "Smile 2",
  "Until Dawn",
  "The Ring",
  "The Exorcist",
  "Ouija",
  "Shutter Island",
  "Salem's Lot",
  "A Nightmare on Elm Street",
  "It Follows",
  "The Cabin in the Woods",
  "The Shawshank Redemption",
  "Ready Player One",
  "The Karate Kid",
  "The Lodge",
  "Sinister",
  "Now You See Me",
  "Snowpiercer",
  "A Quiet Place",
  "Talk to Me",
  "Greenland",
  "Saw",
  "Jigsaw",
  "Halloween",
  "The Matrix",
  "Scream",
  "I Know What You Did Last Summer",
  "Leave the World Behind",
  "The Raid: Redemption",
  "Baby Driver",
  "The Super Mario Bros. Movie",
  "The Day the Earth Stood Still",
  "Focus",
  "Interstellar",
  "The Night House",
  "The Ridiculous 6",
  "The Hunger Games"
];

const seriesTitles = [
  "La casa de papel",
  "Breaking Bad",
  "Lost in Space",
  "Chernobyl",
  "Stranger Things",
  "From",
  "Fear the Walking Dead",
  "The Last of Us",
  "The White Lotus",
  "It: Welcome to Derry",
  "Band of Brothers"
];

async function fetchMovieData(title) {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: { api_key: API_KEY, query: title }
    });

    if (response.data.results.length > 0) {
      const movie = response.data.results[0];
      return {
        title: movie.title,
        year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      };
    }
  } catch (error) {
    console.error(`Error fetching movie ${title}:`, error.message);
  }
  return null;
}

async function fetchSeriesData(title) {
  try {
    const searchResponse = await axios.get(`https://api.themoviedb.org/3/search/tv`, {
      params: { api_key: API_KEY, query: title }
    });

    if (searchResponse.data.results.length > 0) {
      const series = searchResponse.data.results[0];
      // Fetch full details to get number of seasons and rating
      const detailResponse = await axios.get(`https://api.themoviedb.org/3/tv/${series.id}`, {
        params: { api_key: API_KEY }
      });
      
      const details = detailResponse.data;
      return {
        title: details.name,
        seasons: `${details.number_of_seasons} ${details.number_of_seasons === 1 ? 'Season' : 'Seasons'}`,
        rating: details.vote_average ? details.vote_average.toFixed(1) : 'N/A',
        image: `https://image.tmdb.org/t/p/w500${details.poster_path}`
      };
    }
  } catch (error) {
    console.error(`Error fetching series ${title}:`, error.message);
  }
  return null;
}

async function main() {
  if (!API_KEY || API_KEY === 'YOUR_TMDB_API_KEY') {
    console.error('Please provide a valid TMDB API Key in .env');
    return;
  }

  // Fetch Movies
  const movieResults = [];
  console.log("--- FETCHING MOVIES ---");
  for (const title of movieTitles) {
    console.log(`Fetching: ${title}...`);
    const data = await fetchMovieData(title);
    if (data) movieResults.push(data);
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  const moviePath = path.join(__dirname, '../src/data/moviesData.ts');
  fs.writeFileSync(moviePath, `export const moviesData = ${JSON.stringify(movieResults, null, 2)};`);
  console.log(`Saved ${movieResults.length} movies.`);

  // Fetch Series
  const seriesResults = [];
  console.log("\n--- FETCHING SERIES ---");
  for (const title of seriesTitles) {
    console.log(`Fetching: ${title}...`);
    const data = await fetchSeriesData(title);
    if (data) seriesResults.push(data);
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  const seriesPath = path.join(__dirname, '../src/data/seriesData.ts');
  fs.writeFileSync(seriesPath, `export const seriesData = ${JSON.stringify(seriesResults, null, 2)};`);
  console.log(`Saved ${seriesResults.length} series.`);
}

main();
