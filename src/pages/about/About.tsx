import React from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLanguage } from "../../context/LanguageContext";
import "./About.scss";

interface AboutPageProps {
  showUI: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ showUI }) => {
  const { translate } = useLanguage();

  return (
    <div className={`about-container ui-fade ${showUI ? "visible" : ""}`}>
      <main className="about-content">
        

        <section id="about-interests" className="about-section">
          <h2>{translate("about.interestsTitle")}</h2>
          <p>
            {translate("about.interestsText")}
          </p>
          
          <Box className="interests-grid" sx={{ mt: 4 }}>
            <Box className="interest-card">
              <h3>{translate("nav.movies")}</h3>
              <Button 
                component={Link} 
                to="/about/movies" 
                variant="outlined" 
                endIcon={<ArrowForwardIcon />}
              >
                {translate("about.moreInfo")}
              </Button>
            </Box>

            <Box className="interest-card">
              <h3>{translate("nav.series")}</h3>
              <Button 
                component={Link} 
                to="/about/series" 
                variant="outlined" 
                endIcon={<ArrowForwardIcon />}
              >
                {translate("about.moreInfo")}
              </Button>
            </Box>

            <Box className="interest-card">
              <h3>{translate("nav.vacation")}</h3>
              <Button 
                component={Link} 
                to="/about/vacation" 
                variant="outlined" 
                endIcon={<ArrowForwardIcon />}
              >
                {translate("about.moreInfo")}
              </Button>
            </Box>
          </Box>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
