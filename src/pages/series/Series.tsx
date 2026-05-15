import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { seriesData } from "../../data/seriesData";
import "./Series.scss";

interface Series {
  title: string;
  seasons: string;
  image: string;
}

const SeriesPage: React.FC = () => {
  return (
    <Box className="series-container ui-fade visible" sx={{ py: 8 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 6 }}>
          Series I Like
        </Typography>
        <Grid container spacing={4}>
          {seriesData.map((series, index) => (
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
      </Box>
    </Box>
  );
};

export default SeriesPage;
