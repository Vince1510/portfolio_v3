import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Vacation } from "../../../data/polarstepsData";
import { useLanguage } from "../../../context/LanguageContext";

interface VacationCardProps {
  vacation: Vacation;
  onClick: (vacation: Vacation) => void;
}

const cardSx: any = {
  height: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(123,224,139,0.25)",
  },
};

const VacationCard: React.FC<VacationCardProps> = ({ vacation, onClick }) => {
  const { translate } = useLanguage();

  return (
    <Card sx={cardSx}>
      <CardActionArea onClick={() => onClick(vacation)} sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          height="400"
          image={vacation.image}
          alt={translate(`vacation.items.${vacation.id}.location`)}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ textAlign: "center", padding: "24px" }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 1 }}>
            {translate(`vacation.items.${vacation.id}.location`)}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
            {vacation.year}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {translate(`vacation.items.${vacation.id}.description`)}
          </Typography>
          <Typography
            variant="button"
            sx={{ mt: 3, display: "block", color: "#7be08b", letterSpacing: "1px" }}
          >
            {translate("vacation.viewMap")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VacationCard;
