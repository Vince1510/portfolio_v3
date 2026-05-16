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
      className="vacation-modal-container"
    >
      <Box className="vacation-modal-content">
        <button className="close-button" onClick={onClose}>×</button>

        {vacation && (
          <>
            <Typography
              variant="h4"
              gutterBottom
              className="vacation-modal-title"
            >
              {translate(`vacation.items.${vacation.id}.location`)}
            </Typography>

            {/* Map legend */}
            <Box className="vacation-legend-container">
              <Box className="vacation-legend-item">
                <Box className="vacation-legend-dot vacation-legend-dot-blue" />
                <Typography variant="caption" color="text.secondary">Media added</Typography>
              </Box>
              <Box className="vacation-legend-item">
                <Box className="vacation-legend-dot vacation-legend-dot-red" />
                <Typography variant="caption" color="text.secondary">No media</Typography>
              </Box>
            </Box>

            <Box className="vacation-map-wrapper">
              <VacationMap vacation={vacation} />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default VacationModal;
