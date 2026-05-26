import React, { useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Location, PolarStep } from "../../../data/polarstepsData";
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const images = typeof step.imageUrl === "string"
    ? step.imageUrl.split(",").map((url) => url.trim()).filter(Boolean)
    : Array.isArray(step.imageUrl)
    ? step.imageUrl
    : [];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgLoaded(false);
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgLoaded(false);
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ minWidth: { xs: 180, sm: 300, md: 360 } }}>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5, color: LINK_COLOR }}>
        📍 {step.name}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
        {step.date}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: images.length > 0 ? 1 : 0 }}
      >
        {step.lat}, {step.lng}
      </Typography>
      {images.length > 0 && (
        <Box
          sx={{
            mt: 1,
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
            minHeight: imgLoaded ? "auto" : 120,
            maxHeight: { xs: "200px", sm: "340px", md: "460px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.05)",
          }}
        >
          {!imgLoaded && <CircularProgress size={24} sx={{ position: "absolute" }} />}
          <Box
            component="img"
            src={images[activeImageIndex]}
            alt={`${step.name} - ${activeImageIndex + 1}`}
            onLoad={() => setImgLoaded(true)}
            sx={{
              maxWidth: "100%",
              maxHeight: { xs: "200px", sm: "340px", md: "460px" },
              width: "auto",
              height: "auto",
              objectFit: "contain",
              display: imgLoaded ? "block" : "none",
            }}
          />

          {images.length > 1 && (
            <>
              {/* Left Button */}
              <Box
                component="button"
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background-color 0.2s, transform 0.2s",
                  zIndex: 2,
                  fontSize: "16px",
                  fontWeight: "bold",
                  lineHeight: 1,
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.8)",
                    transform: "translateY(-50%) scale(1.1)",
                  },
                  "&:active": {
                    transform: "translateY(-50%) scale(0.95)",
                  },
                }}
              >
                ‹
              </Box>

              {/* Right Button */}
              <Box
                component="button"
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background-color 0.2s, transform 0.2s",
                  zIndex: 2,
                  fontSize: "16px",
                  fontWeight: "bold",
                  lineHeight: 1,
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.8)",
                    transform: "translateY(-50%) scale(1.1)",
                  },
                  "&:active": {
                    transform: "translateY(-50%) scale(0.95)",
                  },
                }}
              >
                ›
              </Box>

              {/* Counter indicator */}
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  bgcolor: "rgba(0,0,0,0.65)",
                  color: "#fff",
                  px: 1,
                  py: 0.2,
                  borderRadius: 1.5,
                  fontSize: "0.65rem",
                  fontWeight: "medium",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              >
                {activeImageIndex + 1} / {images.length}
              </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};
