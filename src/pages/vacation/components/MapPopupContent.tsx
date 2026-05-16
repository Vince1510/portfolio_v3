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
  <Box className="map-popup-container">
    <Typography variant="h6" className="map-popup-title">
      {location.title}
    </Typography>
    <Typography variant="caption" color="text.secondary" className="map-popup-coords">
      {location.lat}, {location.lng}
    </Typography>
    <Typography variant="body2" color="text.secondary" className="map-popup-desc">
      {location.description}
    </Typography>
    {location.iframe?.href && (
      <Box className="map-popup-video">
        <iframe
          src={location.iframe.href}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={location.title}
        />
      </Box>
    )}
  </Box>
);

export const DiaryPopupContent: React.FC<DiaryPopupProps> = ({ step }) => (
  <Box className="map-popup-diary-container">
    <Typography variant="subtitle2" className="map-popup-title">
      📍 {step.name}
    </Typography>
    <Typography variant="caption" color="text.secondary" style={{ display: 'block' }}>
      {step.date}
    </Typography>
    <Typography variant="caption" color="text.secondary" style={{ display: 'block', marginBottom: step.imageUrl ? '8px' : '0' }}>
      {step.lat}, {step.lng}
    </Typography>
    {step.imageUrl && (
      <Box className="map-popup-diary-image">
        <img src={step.imageUrl} alt={step.name} />
      </Box>
    )}
  </Box>
);
