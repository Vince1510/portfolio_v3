import React from "react";
import { Box, Typography } from "@mui/material";
import { Location } from "../../../data/vacationData";
import { PolarStep } from "../../../data/polarstepsData";

interface YouTubePopupProps {
  location: Location;
}

interface DiaryPopupProps {
  step: PolarStep;
}

export const YouTubePopupContent: React.FC<YouTubePopupProps> = ({ location }) => (
  <Box sx={{ minWidth: 300 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#4893FD" }}>
      {location.title}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
      {location.lat}, {location.lng}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      {location.description}
    </Typography>
    {location.iframe?.href && (
      <Box sx={{ position: "relative", pt: "56.25%", borderRadius: 2, overflow: "hidden" }}>
        <iframe
          src={location.iframe.href}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={location.title}
        />
      </Box>
    )}
  </Box>
);

export const DiaryPopupContent: React.FC<DiaryPopupProps> = ({ step }) => (
  <Box sx={{ minWidth: 180 }}>
    <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#4893FD" }}>
      📍 {step.name}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
      {step.date}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: step.imageUrl ? 1 : 0 }}>
      {step.lat}, {step.lng}
    </Typography>
    {step.imageUrl && (
      <Box sx={{ mt: 1, borderRadius: 2, overflow: 'hidden' }}>
        <img src={step.imageUrl} alt={step.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </Box>
    )}
  </Box>
);
