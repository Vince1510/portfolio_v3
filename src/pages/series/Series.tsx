import React, { useState, useEffect, useRef } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Box, CircularProgress } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useLanguage } from "../../context/LanguageContext";
import { seriesData } from "../../data/seriesData";
import "./Series.scss";

interface Series {
  title: string;
  seasons: number;
  image: string;
}

const SeriesPage: React.FC = () => {
  const { translate } = useLanguage();
  const [visibleItems, setVisibleItems] = useState(12);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleItems((prev) => Math.min(prev + 12, seriesData.length));
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
    <Box className="series-container ui-fade visible" sx={{ py: 8 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 6 }}>
          {translate("series.heading")}
        </Typography>
        <Grid container spacing={4}>
          {seriesData.slice(0, visibleItems).map((series, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 4, height: "100%", transition: "0.3s", "&:hover": { transform: "translateY(-10px)" } }}>
                <CardMedia
                  component="img"
                  height="450"
                  image={series.image}
                  alt={series.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                    {series.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {translate(series.seasons === 1 ? "series.season_one" : "series.season_other", { count: series.seasons })}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5 }}>
                    <StarIcon sx={{ color: "#faaf00", fontSize: "1.2rem" }} />
                    <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: "600" }}>
                      {(series as any).rating}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {visibleItems < seriesData.length && (
          <Box ref={observerTarget} sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
            <CircularProgress sx={{ color: "#4893FD" }} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SeriesPage;
