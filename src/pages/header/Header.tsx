import React from "react";

// MUI Imports
import { Phone, Email, GitHub, LinkedIn } from "@mui/icons-material";

// Local Imports
import { useLanguage } from "../../context/LanguageContext";

// Assets & Styles
import vinceImage from "../../assets/images/vince.jpg";
import "./Header.scss";

const HeaderPage: React.FC = () => {
  const { translate } = useLanguage();
  return (
    <div className="container">
      <div className="hero-circle">
        <svg className="curved-text-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="title-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7be08b" />
              <stop offset="50%" stopColor="#3bc1b6" />
              <stop offset="100%" stopColor="#e09545" />
            </linearGradient>
            <linearGradient id="title-grad-light" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1b5e20" />
              <stop offset="50%" stopColor="#00695c" />
              <stop offset="100%" stopColor="#bf360c" />
            </linearGradient>
          </defs>
          
          <path id="top-curve" d="M 50,400 A 350,350 0 0,1 750,400" fill="transparent" />
          <text>
            <textPath href="#top-curve" startOffset="50%" textAnchor="middle" className="fancy-title">
              {translate("header.title")}
            </textPath>
          </text>
          
          <path id="bottom-curve" d="M 20,400 A 380,380 0 0,0 780,400" fill="transparent" />
          <text>
            <textPath href="#bottom-curve" startOffset="50%" textAnchor="middle" className="fancy-subtitle">
              {translate("header.subtitle")}
            </textPath>
          </text>
        </svg>
        <img className="inner-img" src={vinceImage} alt="Vince van Apeldoorn" />
        <div className="hero-rotate" id="circle" data-theme="light">
          <div className="planet">
            <a href="tel:+31 6 38457836" className="social-link">
              <div className="social-icon">
                <Phone />
              </div>
            </a>
          </div>
          <div className="planet">
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=vincevanapeldoorn@gmail.com"
              className="social-link"
            >
              <div className="social-icon">
                <Email />
              </div>
            </a>
          </div>
          <div className="planet">
            <a
              href="https://github.com/Vince1510?tab=repositories"
              className="social-link"
            >
              <div className="social-icon">
                <GitHub />
              </div>
            </a>
          </div>
          <div className="planet">
            <a
              href="https://www.linkedin.com/in/vince-van-apeldoorn-52997a248/"
              className="social-link"
            >
              <div className="social-icon">
                <LinkedIn />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;
