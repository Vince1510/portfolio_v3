import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Vacation } from "../../../data/vacationData";
import { useLanguage } from "../../../context/LanguageContext";

interface VacationCardProps {
  vacation: Vacation;
  onClick: (vacation: Vacation) => void;
}

const VacationCard: React.FC<VacationCardProps> = ({ vacation, onClick }) => {
  const { translate } = useLanguage();

  return (
    <Card className="vacation-card-mui">
      <CardActionArea onClick={() => onClick(vacation)} className="vacation-card-action">
        <CardMedia
          component="img"
          height="400"
          image={vacation.image}
          alt={translate(`vacation.items.${vacation.id}.location`)}
          className="vacation-card-media"
        />
        <CardContent className="vacation-card-content">
          <Typography variant="h4" component="h2" className="vacation-card-title">
            {translate(`vacation.items.${vacation.id}.location`)}
          </Typography>
          <Typography variant="h6" color="primary" className="vacation-card-year">
            {vacation.year}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {translate(`vacation.items.${vacation.id}.description`)}
          </Typography>
          <Typography
            variant="button"
            className="vacation-card-button"
          >
            {translate("vacation.viewMap")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VacationCard;
