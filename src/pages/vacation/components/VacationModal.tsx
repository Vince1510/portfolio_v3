import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { Vacation } from "../../../data/vacationData";
import { useLanguage } from "../../../context/LanguageContext";
import VacationMap from "./VacationMap";

interface VacationModalProps {
  vacation: Vacation | null;
  onClose: () => void;
}

const VacationModal: React.FC<VacationModalProps> = ({ vacation, onClose }) => {
  const { translate } = useLanguage();
  const theme = useTheme();

  return (
    <Modal
      open={Boolean(vacation)}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 4,
          width: "96vw",
          maxWidth: { xs: "96vw", sm: "94vw", md: "1400px", lg: "1600px" },
          height: { xs: "86vh", sm: "90vh", md: "92vh" },
          p: { xs: 1, sm: 2 },
          position: "relative",
          outline: "none",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Close button */}
        <Box
          component="button"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: { xs: 12, sm: 20 },
            right: { xs: 12, sm: 20 },
            background: "none",
            border: "none",
            color: theme.palette.text.primary,
            fontSize: "2.5rem",
            cursor: "pointer",
            lineHeight: 1,
            transition: "transform 0.2s ease",
            zIndex: 10,
            "&:hover": { transform: "scale(1.2)" },
          }}
        >
          ×
        </Box>

        {vacation && (
          <>
            {/* Title */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 2,
                pr: 5, // space for close button
                background: "linear-gradient(90deg, #7be08b, #3bc1b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {translate(`vacation.items.${vacation.id}.location`)}
            </Typography>

            {/* Legend */}
            <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#4893FD",
                    border: "1.5px solid #1a1a2e",
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Media added
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#ff4d4d",
                    border: "1.5px solid #1a1a2e",
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  No media
                </Typography>
              </Box>
            </Box>

            {/* Map */}
            <Box
              sx={{
                height: { xs: "55vh", sm: "68vh", md: "76vh", lg: "80vh" },
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
                mt: 1,
                flexGrow: 1,
              }}
            >
              <VacationMap vacation={vacation} />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default VacationModal;
