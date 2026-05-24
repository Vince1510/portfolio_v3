import React, { useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Location } from "../../../data/vacationData";
import { PolarStep } from "../../../data/polarstepsData";
import { LINK_COLOR } from "../../../theme/theme";

interface YouTubePopupProps {
  location: Location;
}

interface DiaryPopupProps {
  step: PolarStep;
}

export const YouTubePopupContent: React.FC<YouTubePopupProps> = ({ location }) => (
  <Box sx={{ minWidth: 300 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: LINK_COLOR }}>
      {location.title}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
      {location.lat}, {location.lng}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      {location.description}
    </Typography>
    {location.iframe?.href && (
      <Box sx={{ position: "relative", paddingTop: "56.25%", borderRadius: 2, overflow: "hidden" }}>
        <Box
          component="iframe"
          src={location.iframe.href}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={location.title}
          sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
        />
      </Box>
    )}
  </Box>
);

export const DiaryPopupContent: React.FC<DiaryPopupProps> = ({ step }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Box sx={{ minWidth: 180 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5, color: LINK_COLOR }}>
        📍 {step.name}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
        {step.date}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: step.imageUrl ? 1 : 0 }}
      >
        {step.lat}, {step.lng}
      </Typography>
      {step.imageUrl && (
        <Box
          sx={{
            mt: 1,
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
            minHeight: imgLoaded ? "auto" : 120,
            maxHeight: { xs: "200px", sm: "300px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.05)",
          }}
        >
          {!imgLoaded && <CircularProgress size={24} sx={{ position: "absolute" }} />}
          <Box
            component="img"
            src={step.imageUrl}
            alt={step.name}
            onLoad={() => setImgLoaded(true)}
            sx={{
              maxWidth: "100%",
              maxHeight: { xs: "200px", sm: "300px" },
              width: "auto",
              height: "auto",
              objectFit: "contain",
              display: imgLoaded ? "block" : "none",
            }}
          />
        </Box>
      )}
    </Box>
  );
};
