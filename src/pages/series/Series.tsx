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
    <Box className="series-container ui-fade visible">
      <Box className="series-content">
        <Typography variant="h2" component="h1" gutterBottom className="series-title">
          {translate("series.heading")}
        </Typography>
        <Grid container spacing={4}>
          {seriesData.slice(0, visibleItems).map((series, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="series-card-mui">
                <CardMedia
                  component="img"
                  height="450"
                  image={series.image}
                  alt={series.title}
                  className="series-media"
                />
                <CardContent className="series-content-area">
                  <Typography variant="h5" component="h2" className="series-title-text">
                    {series.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" className="series-season-text">
                    {translate(series.seasons === 1 ? "series.season_one" : "series.season_other", { count: series.seasons })}
                  </Typography>
                  <Box className="series-rating-box">
                    <StarIcon className="series-rating-icon" />
                    <Typography variant="subtitle1" color="text.secondary" className="series-rating-text">
                      {(series as any).rating}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {visibleItems < seriesData.length && (
          <Box ref={observerTarget} className="series-loader-box">
            <CircularProgress className="series-loader" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SeriesPage;
