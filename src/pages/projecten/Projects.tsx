import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Projects.css";

import tiktactoe from "./video-tik-tac-toe.mp4"; // Ensure the file exists or add a type declaration for mp4 files
//images
import mernImg from "./mern-auth-cover.png";
import portfolioImg from "./portfolio-site.png";
import playtoearnImg from "./play-to-earn.png";
import putitoneImg from "./putiton-e.png";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number): { id: string; "aria-controls": string } {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Project() {
  const [value, setValue] = React.useState(0);
  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlePrev = () => {
    setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : prevValue));
  };

  const handleNext = () => {
    setValue((prevValue) => (prevValue < 4 ? prevValue + 1 : prevValue));
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: "5vw",
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "auto",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        {isSmallScreen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton onClick={handlePrev} disabled={value === 0}>
              <ArrowBackIosIcon />
            </IconButton>
            <Tabs
              orientation={isSmallScreen ? "horizontal" : "vertical"}
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              scrollButtons={false} // Hides scroll buttons
              sx={{
                borderRight: isSmallScreen ? 0 : 1,
                borderBottom: isSmallScreen ? 1 : 0,
                borderColor: "divider",
              }}
            >
              <Tab label="MERN" {...a11yProps(0)} />
              <Tab label="Portfolio Website" {...a11yProps(1)} />
              <Tab label="Putiton-e" {...a11yProps(2)} />
              <Tab label="Playtoearn" {...a11yProps(3)} />
              <Tab label="Tic Tac Toe" {...a11yProps(4)} />
            </Tabs>
            <IconButton onClick={handleNext} disabled={value === 4}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )}
        {!isSmallScreen && (
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            scrollButtons={false} // Hides scroll buttons for larger screens as well
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="MERN" {...a11yProps(0)} />
            <Tab label="Portfolio Website" {...a11yProps(1)} />
            <Tab label="Putiton-e" {...a11yProps(2)} />
            <Tab label="Playtoearn" {...a11yProps(3)} />
            <Tab label="Tic Tac Toe" {...a11yProps(4)} />
          </Tabs>
        )}
        <TabPanel value={value} index={0}>
          <div className="card-project">
            <div className="container-project">
              <img src={mernImg} alt="MernImg" width="400vw" />
              <div className="card-project__content">
                <p className="card-project__title">MERN Auth</p>
                <p className="card-project__description">
                  Mern authenticatie met json web token:
                  https://github.com/Vince1510/MERN-Auth
                </p>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="card-project">
            <div className="container-project">
              <img src={portfolioImg} alt="Portfolio Website" width="400vw" />
              <div className="card-project__content">
                <p className="card-project__title">Portfolio Website</p>
                <p className="card-project__description">
                  Deze portfolio website is gemaakt met Typescript en Material
                  UI ook heb ik animaties erin toegevoed met GSAP
                  <br />
                  https://github.com/Vince1510/Portfolio-Mui-React_v3
                </p>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="card-project">
            <div className="container-project">
              <img src={putitoneImg} alt="Putiton-e" width="400vw" />
              <div className="card-project__content">
                <p className="card-project__title">Putiton-e</p>
                <p className="card-project__description">
                  Tijdens mijn stageperiode bij Crebos heb ik gewerkt aan de website
                  Putiton-e
                  <br />
                  https://putiton-e.com/
                </p>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className="card-project">
            <div className="container-project">
              <img src={playtoearnImg} alt="Play to Earn games" width="400vw" />
              <div className="card-project__content">
                <p className="card-project__title">Play to Earn games</p>
                <p className="card-project__description">
                  Tijdens mijn stageperiode bij Crebos heb ik gewerkt aan de website
                  Play to Earn games
                  <br />
                  https://playtoearngames.com/
                </p>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div className="card-project">
            <div className="container-project">
              <video src={tiktactoe} width="100%" autoPlay loop muted />
              <div className="card-project__content">
                <p className="card-project__title">Tic Tac Toe</p>
                <p className="card-project__description">
                  Tic tac toe volledig met React
                  <br />
                  <a
                    href="https://github.com/Vince1510/Tic-Tac-Toe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/Vince1510/Tic-Tac-Toe
                  </a>
                </p>
              </div>
            </div>
          </div>
        </TabPanel>
      </Box>
    </>
  );
}
