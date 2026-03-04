import React, { useRef } from "react";
import { Phone, Email, GitHub, LinkedIn } from "@mui/icons-material";
import "./Header.scss";
import vinceImage from "./vince.jpg";

const HeaderPage: React.FC = () => {
  return (
    <div className="container">
      <div className="intro-text">
        <h2>I'm Vince van Apeldoorn</h2>
        <h3>Front end Student at Hogeschool Rotterdam</h3>
      </div>

      <div className="hero-circle">
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
