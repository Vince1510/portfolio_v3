import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { useLanguage } from "../../context/LanguageContext";
import { moviesData } from "../../data/moviesData";
import { STAR_COLOR } from "../../theme/theme";

// ── Styled components (replaces Movies.scss) ─────────────────────────────────
const PageContainer = styled("div")({
  padding: "64px 0",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  zIndex: 10,
  position: "relative",
});

const ContentWrapper = styled("div")({
  maxWidth: 1200,
  width: "100%",
  margin: "0 auto",
  padding: "0 16px",
});

const MovieCard = styled(Card)({
  height: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
  },
});

// ── Component ─────────────────────────────────────────────────────────────────
const MoviesPage: React.FC = () => {
  const { translate } = useLanguage();
  const [visibleItems, setVisibleItems] = useState(12);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleItems((prev) => Math.min(prev + 12, moviesData.length));
        }
      },
      { threshold: 0.1 }
    );

    const el = observerTarget.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <PageContainer className="ui-fade visible">
      <ContentWrapper>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", mb: 6 }}
        >
          {translate("movies.heading")}
        </Typography>

        <Grid container spacing={4}>
          {moviesData.slice(0, visibleItems).map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MovieCard>
                <CardMedia
                  component="img"
                  height="450"
                  image={movie.image}
                  alt={movie.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {movie.title}
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px" }}>
                    <StarIcon sx={{ color: STAR_COLOR, fontSize: "1.2rem" }} />
                    <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {(movie as any).rating}
                    </Typography>
                  </div>
                </CardContent>
              </MovieCard>
            </Grid>
          ))}
        </Grid>

        {visibleItems < moviesData.length && (
          <div ref={observerTarget} style={{ display: "flex", justifyContent: "center", marginTop: "48px", marginBottom: "16px" }}>
            <CircularProgress />
          </div>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default MoviesPage;
