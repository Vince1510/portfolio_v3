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
import { seriesData } from "../../data/seriesData";
import { STAR_COLOR } from "../../theme/theme";

// ── Styled components (replaces Series.scss) ─────────────────────────────────
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

const SeriesCard = styled(Card)({
  height: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
  },
});

// ── Component ─────────────────────────────────────────────────────────────────
const SeriesPage: React.FC = () => {
  const { translate } = useLanguage();
  const [visibleItems, setVisibleItems] = useState(12);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleItems((prev) => Math.min(prev + 12, seriesData.length));
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
          {translate("series.heading")}
        </Typography>

        <Grid container spacing={4}>
          {seriesData.slice(0, visibleItems).map((series, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <SeriesCard>
                <CardMedia
                  component="img"
                  height="450"
                  image={series.image}
                  alt={series.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {series.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {translate(
                      series.seasons === 1 ? "series.season_one" : "series.season_other",
                      { count: series.seasons }
                    )}
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px" }}>
                    <StarIcon sx={{ color: STAR_COLOR, fontSize: "1.2rem" }} />
                    <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {(series as any).rating}
                    </Typography>
                  </div>
                </CardContent>
              </SeriesCard>
            </Grid>
          ))}
        </Grid>

        {visibleItems < seriesData.length && (
          <div ref={observerTarget} style={{ display: "flex", justifyContent: "center", marginTop: "48px", marginBottom: "16px" }}>
            <CircularProgress />
          </div>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default SeriesPage;
