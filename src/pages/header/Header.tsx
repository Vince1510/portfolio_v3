import React, { useEffect, useRef } from "react";
import { Phone, Email, GitHub, LinkedIn } from "@mui/icons-material";
import { gsap } from "gsap";
import "./Header.scss";
import vinceImage from "./vince.jpg";

const HeaderPage: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const studentRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power1.out" }
    ).fromTo(
      studentRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power1.out" },
      "+=0.5"
    );
  }, []);

  return (
    <div className="container">
      <h2 ref={nameRef}>I'm Vince van Apeldoorn</h2>
      <h3 ref={studentRef}>Front end Student at TechniekCollege Rotterdam</h3>

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
