import React, { useState, useEffect, useRef } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Box, CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useLanguage } from "../../context/LanguageContext";
import { moviesData } from "../../data/moviesData";
import "./Movies.scss";

interface Movie {
  title: string;
  year: string;
  image: string; // Placeholder or generated image
}

const MoviesPage: React.FC = () => {
  const { translate } = useLanguage();
  const [visibleItems, setVisibleItems] = useState(12);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleItems((prev) => Math.min(prev + 12, moviesData.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, []);

  return (
    <Box className="movies-container ui-fade visible">
      <Box className="movies-content">
        <Typography variant="h2" component="h1" gutterBottom className="movies-title">
          {translate("movies.heading")}
        </Typography>
        <Grid container spacing={4}>
          {moviesData.slice(0, visibleItems).map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="movie-card-mui">
                <CardMedia
                  component="img"
                  height="450"
                  image={movie.image}
                  alt={movie.title}
                  className="movie-media"
                />
                <CardContent className="movie-content">
                  <Typography variant="h5" component="h2" className="movie-title-text">
                    {movie.title}
                  </Typography>
                  <Box className="movie-rating-box">
                    <StarIcon className="movie-rating-icon" />
                    <Typography variant="subtitle1" color="text.secondary" className="movie-rating-text">
                      {(movie as any).rating}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {visibleItems < moviesData.length && (
          <Box ref={observerTarget} className="movies-loader-box">
            <CircularProgress className="movies-loader" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MoviesPage;
