import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { Vacation } from "../../../data/vacationData";
import { useLanguage } from "../../../context/LanguageContext";
import VacationMap from "./VacationMap";

interface VacationModalProps {
  vacation: Vacation | null;
  onClose: () => void;
}

const VacationModal: React.FC<VacationModalProps> = ({ vacation, onClose }) => {
  const { translate } = useLanguage();

  return (
    <Modal
      open={Boolean(vacation)}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 4,
          width: "100%",
          maxWidth: 1000,
          p: 4,
          position: "relative",
          outline: "none",
        }}
      >
        <button className="close-button" onClick={onClose}>×</button>

        {vacation && (
          <>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(90deg, #7be08b, #3bc1b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {translate(`vacation.items.${vacation.id}.location`)}
            </Typography>

            {/* Map legend */}
            <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#4893FD", border: "1.5px solid #1a1a2e" }} />
                <Typography variant="caption" color="text.secondary">Visited location</Typography>
              </Box>
            </Box>

            <Box sx={{ height: "60vh", width: "100%", borderRadius: 2, overflow: "hidden", mt: 1 }}>
              <VacationMap vacation={vacation} />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default VacationModal;
