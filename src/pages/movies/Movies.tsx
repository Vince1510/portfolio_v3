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
    <Box className="movies-container ui-fade visible" sx={{ py: 8 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 6 }}>
          {translate("movies.heading")}
        </Typography>
        <Grid container spacing={4}>
          {moviesData.slice(0, visibleItems).map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 4, height: "100%", transition: "0.3s", "&:hover": { transform: "translateY(-10px)" } }}>
                <CardMedia
                  component="img"
                  height="450"
                  image={movie.image}
                  alt={movie.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                    {movie.title}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5 }}>
                    <StarIcon sx={{ color: "#faaf00", fontSize: "1.2rem" }} />
                    <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: "600" }}>
                      {(movie as any).rating}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {visibleItems < moviesData.length && (
          <Box ref={observerTarget} sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
            <CircularProgress sx={{ color: "#4893FD" }} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MoviesPage;
