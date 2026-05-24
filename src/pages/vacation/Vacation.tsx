import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import { useLanguage } from "../../context/LanguageContext";
import { vacationsData, Vacation } from "../../data/vacationData";
import VacationCard from "./components/VacationCard";
import VacationModal from "./components/VacationModal";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const VacationPage: React.FC = () => {
  const { translate } = useLanguage();
  const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(
    null,
  );

  return (
    <Box
      className="ui-fade visible"
      sx={{
        padding: "64px 0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
        position: "relative",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 6,
            fontSize: "3.5rem",
            fontFamily: '"Inter", sans-serif',
            background: "linear-gradient(90deg, #e09545, #7be08b, #3bc1b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: `${fadeInUp} 0.8s ease forwards`,
          }}
        >
          {translate("vacation.heading")}
        </Typography>

        <Grid container spacing={4}>
          {vacationsData.map((vacation, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <VacationCard vacation={vacation} onClick={setSelectedVacation} />
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
