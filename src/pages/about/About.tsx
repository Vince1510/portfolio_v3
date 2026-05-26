import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Typography, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLanguage } from "../../context/LanguageContext";

const AboutContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  color: "white",
  zIndex: 10,
  position: "relative",
  overflow: "hidden",
});

const ContentFullscreen = styled(Box)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px",
  position: "relative",
  zIndex: 2,
  width: "100%",
});

const HeaderSimple = styled(Box)({
  position: "absolute",
  top: 80,
  textAlign: "center",
  width: "100%",
});

const SliderControls = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: 1200,
  margin: "auto",
  padding: "0 20px",
});

const SliderArrow = styled(IconButton)({
  color: "white !important",
  background: "rgba(0,0,0,0.5) !important",
  border: "1px solid rgba(255,255,255,0.2) !important",
  backdropFilter: "blur(8px)",
  padding: "15px !important",
  boxShadow: "0 8px 32px rgba(0,0,0,0.5) !important",
  transition: "all 0.3s ease !important",
  "&:hover": {
    background: "rgba(255,255,255,0.1) !important",
    transform: "scale(1.15)",
    borderColor: "rgba(255,255,255,0.5) !important",
  },
  "@media (max-width: 768px)": {
    display: "none !important",
  },
}) as typeof IconButton;

const SliderTitleWrapper = styled(Box)({
  position: "relative",
  flexGrow: 1,
  height: 200,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 20px",
});

const SliderTitleLink = styled(Link, {
  shouldForwardProp: (p) => p !== "active",
})<{ active?: boolean }>(({ active }) => ({
  position: "absolute",
  textDecoration: "none",
  color: "white",
  textAlign: "center",
  opacity: active ? 1 : 0,
  transform: active ? "translateY(0)" : "translateY(20px)",
  pointerEvents: active ? "auto" : "none",
  transition: "opacity 0.6s ease, transform 0.6s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&:hover .big-title": {
    transform: "scale(1.05)",
  },
}));

const BigTitle = styled(Typography)({
  fontSize: "5.5rem !important",
  fontWeight: "900 !important",
  textTransform: "uppercase",
  lineHeight: "1.2 !important",
  margin: "0 !important",
  textShadow: "0 10px 40px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.8)",
  fontFamily: "'Inter', sans-serif",
  letterSpacing: "-2px",
  transition: "transform 0.4s ease",
  "@media (max-width: 768px)": {
    fontSize: "3rem !important",
  },
}) as typeof Typography;

const ExploreText = styled(Typography)({
  marginTop: "15px !important",
  fontSize: "1.1rem !important",
  letterSpacing: "3px",
  opacity: 0.9,
  textShadow: "0 4px 15px rgba(0,0,0,1)",
  background: "rgba(0,0,0,0.3)",
  padding: "5px 15px",
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.1)",
}) as typeof Typography;

const CornerPhoto = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: 200,
  height: 300,
  borderRadius: 12,
  border: "2px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: 1,
  pointerEvents: "none",
  transition: "transform 0.5s ease, opacity 0.5s ease",
  opacity: 0.75,
  [theme.breakpoints.down("md")]: {
    width: 140,
    height: 210,
  },
  [theme.breakpoints.down("sm")]: {
    width: 120,
    height: 180,
  },
}));

interface AboutPageProps {
  showUI: boolean;
}

const cornerImages = [
  // Movies
  [
    "https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
    "https://image.tmdb.org/t/p/w500/AeRpUynJKDpJveklBJipOYrVxCS.jpg",
    "https://image.tmdb.org/t/p/w500/Abnm1Ws3JH0ReCfEhLMPwPcMcGO.jpg",
    "https://image.tmdb.org/t/p/w500/iEbLkYzyiUdOKNK4WNBFyGH7r2Y.jpg",
  ],
  // Series
  [
    "https://image.tmdb.org/t/p/w500/pRtJagIxpfODzzb0T0NAvZSzErC.jpg",
    "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    "https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
  ],
  // Vacations
  [
    "https://www.image2url.com/r2/default/images/1779038193443-11be153a-d5a5-47c6-bbf2-3d97f35c4c27.jpg",
    "https://www.image2url.com/r2/default/images/1779634091897-11d46224-7ef8-422b-8e15-76827c8244c3.jpg",
    "https://www.image2url.com/r2/default/images/1779806176018-c3078148-f72f-4379-bd0f-3228fccdcc72.jpg",
    "https://www.image2url.com/r2/default/images/1778869621846-1ff9a0d4-f692-4fa7-823f-080d103a0fad.jpg",
  ],
];

const AboutPage: React.FC<AboutPageProps> = ({ showUI }) => {
  const { translate } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const hubItems = [
    { title: "Movies I like", path: "/about/movies" },
    { title: "Series I like", path: "/about/series" },
    { title: "My vacations", path: "/about/vacation" },
  ];

  const handleNext = () => setActiveIndex((p) => (p + 1) % hubItems.length);
  const handlePrev = () =>
    setActiveIndex((p) => (p - 1 + hubItems.length) % hubItems.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const currentImages = cornerImages[activeIndex];

  return (
    <AboutContainer
      className={`ui-fade ${showUI ? "visible" : ""}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Corner Photos */}
      <CornerPhoto
        sx={{
          top: { xs: 110, sm: 10, md: 10 },
          left: { xs: 10, sm: 10, md: 10 },
          transform: "rotate(-12deg)",
          backgroundImage: `url('${currentImages[0]}')`,
        }}
      />
      <CornerPhoto
        sx={{
          top: { xs: 110, sm: 10, md: 10 },
          right: { xs: 10, sm: 10, md: 10 },
          transform: "rotate(15deg)",
          backgroundImage: `url('${currentImages[1]}')`,
        }}
      />
      <CornerPhoto
        sx={{
          bottom: { xs: 100, sm: 10, md: 10 },
          left: { xs: 10, sm: 10, md: 10 },
          transform: "rotate(12deg)",
          backgroundImage: `url('${currentImages[2]}')`,
        }}
      />
      <CornerPhoto
        sx={{
          bottom: { xs: 100, sm: 10, md: 10 },
          right: { xs: 10, sm: 10, md: 10 },
          transform: "rotate(-15deg)",
          backgroundImage: `url('${currentImages[3]}')`,
        }}
      />

      {/* Content */}
      <ContentFullscreen>
        <HeaderSimple>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: "1.4rem",
              opacity: 0.9,
              textTransform: "uppercase",
              letterSpacing: "4px",
              textShadow: "0 2px 4px rgba(0,0,0,0.8)",
              color: "white",
            }}
          >
            {translate("about.subtitle")}
          </Typography>
        </HeaderSimple>

        <SliderControls>
          <SliderArrow onClick={handlePrev}>
            <ArrowBackIosNewIcon fontSize="large" />
          </SliderArrow>

          <SliderTitleWrapper>
            {hubItems.map((item, index) => (
              <SliderTitleLink
                key={index}
                to={item.path}
                active={index === activeIndex}
              >
                <BigTitle variant="h1" className="big-title">
                  {item.title}
                </BigTitle>
                <ExploreText variant="overline">Tap to explore</ExploreText>
              </SliderTitleLink>
            ))}
          </SliderTitleWrapper>

          <SliderArrow onClick={handleNext}>
            <ArrowForwardIosIcon fontSize="large" />
          </SliderArrow>
        </SliderControls>
      </ContentFullscreen>
    </AboutContainer>
  );
};

export default AboutPage;
