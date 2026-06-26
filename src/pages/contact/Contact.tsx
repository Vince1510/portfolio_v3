import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";

// MUI Imports
import {
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";

// Local Imports
import { useLanguage } from "../../context/LanguageContext";

// Styles
import "./Contact.scss";

const ContactPage: React.FC = () => {
  const { translate } = useLanguage();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("");
    setLoading(true);

    const formData = new FormData(formRef.current!);
    formData.append("access_key", "cd81ce3d-8254-4b16-ad5a-83acc418171a");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        setResult(translate("contact.msgSuccess"));
        setSuccess(true);
        fireConfetti();
        formRef.current?.reset();
        setTimeout(() => {
          setSuccess(false);
          setResult("");
        }, 10000);
      } else {
        setResult(translate("contact.msgErrorPrefix") + data.message);
        setSuccess(false);
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setResult(translate("contact.msgNetworkError"));
    }
  };

  return (
    <div className="contact-wrapper">
      <Card className="card-contact">
        <Grid container className="contact-grid">
          {/* Left Side: Contact Info */}
          <Grid xs={12} md={5} className="contact-info-section">
            <div>
              <Typography variant={isSmallScreen ? "h4" : "h3"} fontWeight="bold" gutterBottom color="text.primary">
                {translate("contact.letsConnect")}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="contact-connect-text">
                {translate("contact.connectText")}
              </Typography>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-icon-box email">
                    <EmailIcon />
                  </div>
                  <Typography variant="body2" className="contact-link email" component="a" href="mailto:vincevanapeldoorn@gmail.com">
                    vincevanapeldoorn@gmail.com
                  </Typography>
                </div>
                <div className="contact-info-item">
                  <div className="contact-icon-box phone">
                     <PhoneIcon />
                  </div>
                  <Typography variant="body2" className="contact-link phone" component="a" href="tel:+31638457836">
                     +31 638457836
                  </Typography>
                </div>
                <div className="contact-info-item">
                  <div className="contact-icon-box location">
                    <LocationOnIcon />
                  </div>
                  <Typography variant="body2" color="text.primary">
                    {translate("contact.location")}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="social-links">
              <IconButton
                component="a"
                href="https://github.com/Vince1510?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-button github"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/vince-van-apeldoorn-52997a248/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-button linkedin"
              >
                <LinkedInIcon />
              </IconButton>
            </div>
          </Grid>

          {/* Right Side: Form */}
          <Grid xs={12} md={7} className="contact-form-section">
            <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary" className="form-title">
              {translate("contact.sendMessageTitle")}
            </Typography>
            <form onSubmit={onSubmit} ref={formRef} className="contact-form">
              <div className="contact-form-row">
                <TextField
                  label={translate("contact.nameLabel")}
                  name="name"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label={translate("contact.emailLabel")}
                  type="email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <TextField
                label={translate("contact.messageLabel")}
                name="message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                required
                className="message-field"
              />
              <div className="submit-container">
                <Typography className={`submit-result ${success ? 'success' : 'error'}`}>
                  {result}
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  endIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : success ? (
                      <CheckCircleIcon />
                    ) : <SendIcon />
                  }
                  className={`submit-button ${loading ? 'loading' : success ? 'success' : 'default'}`}
                >
                  {loading ? translate("contact.statusSending") : success ? translate("contact.statusSent") : translate("contact.statusSend")}
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
        
        {/* Background ambient orbs */}
        <div className="contactanimate1"></div>
        <div className="contactanimate2"></div>
      </Card>
    </div>
  );
};

export default ContactPage;
