import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import { vacationsData, Vacation } from "../../data/vacationData";
import VacationCard from "./components/VacationCard";
import VacationModal from "./components/VacationModal";
import "./Vacation.scss";

const VacationPage: React.FC = () => {
  const { translate } = useLanguage();
  const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);

  return (
    <Box className="vacation-container ui-fade visible">
      <Box className="vacation-content">
        <Typography
          variant="h2"
          component="h1"
          className="vacation-title"
        >
          {translate("vacation.heading")}
        </Typography>

        <Grid container spacing={4}>
          {vacationsData.map((vacation, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <VacationCard
                vacation={vacation}
                onClick={setSelectedVacation}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <VacationModal
        vacation={selectedVacation}
        onClose={() => setSelectedVacation(null)}
      />
    </Box>
  );
};

export default VacationPage;
