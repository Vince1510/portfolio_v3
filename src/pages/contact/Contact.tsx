import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import confetti from "canvas-confetti";
import "./Contact.scss";

const ContactPage: React.FC = () => {
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
      // since particles fall down, start a bit higher than random
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
        setResult("Bedankt! Je bericht is succesvol verzonden. ✨");
        setSuccess(true);
        fireConfetti();
        formRef.current?.reset();
        setTimeout(() => {
          setSuccess(false);
          setResult("");
        }, 10000);
      } else {
        console.log("Error", data);
        setResult("Oeps! Er ging iets mis: " + data.message);
        setSuccess(false);
      }
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
      setSuccess(false);
      setResult("Oeps! Er kon geen verbinding worden gemaakt.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        px: { xs: 2, sm: 4, md: 8 },
        py: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        className="card-contact"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          boxShadow: theme.palette.mode === "dark" ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.1)",
          borderRadius: 4,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Grid container sx={{ width: "100%", m: 0 }}>
          {/* Left Side: Contact Info */}
          <Grid
            xs={12}
            md={5}
            sx={{
              p: { xs: 2.5, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              bgcolor: theme.palette.mode === "dark" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.05)",
              borderRight: { md: "1px solid rgba(255, 255, 255, 0.1)" },
              borderBottom: { xs: "1px solid rgba(255, 255, 255, 0.1)", md: "none" },
            }}
          >
            <Box>
              <Typography variant={isSmallScreen ? "h4" : "h3"} fontWeight="bold" gutterBottom color="text.primary">
                Let's Connect!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, md: 4 }, lineHeight: 1.6 }}>
                Heb je een vraag, wil je samenwerken, of gewoon even hallo zeggen? Stuur me gerust een bericht!
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 }, mb: { xs: 2, md: 4 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: "50%", bgcolor: "rgba(123, 224, 139, 0.2)", display: "flex" }}>
                    <EmailIcon sx={{ color: "#7be08b", fontSize: "1.2rem" }} />
                  </Box>
                  <Typography variant="body2" color="text.primary" component="a" href="mailto:vincevanapeldoorn@gmail.com" sx={{ textDecoration: 'none', '&:hover': { color: '#8c63e0' } }}>
                    vincevanapeldoorn@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: "50%", bgcolor: "rgba(140, 99, 224, 0.2)", display: "flex" }}>
                     <PhoneIcon sx={{ color: "#8c63e0", fontSize: "1.2rem" }} />
                  </Box>
                  <Typography variant="body2" color="text.primary" component="a" href="tel:+31638457836" sx={{ textDecoration: 'none', '&:hover': { color: '#e09545' } }}>
                     +31 638457836
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: "50%", bgcolor: "rgba(224, 149, 69, 0.2)", display: "flex" }}>
                    <LocationOnIcon sx={{ color: "#e09545", fontSize: "1.2rem" }} />
                  </Box>
                  <Typography variant="body2" color="text.primary">
                    Rotterdam, The Netherlands
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                component="a"
                href="https://github.com/Vince1510?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ bgcolor: "rgba(255,255,255,0.05)", "&:hover": { bgcolor: "rgba(255,255,255,0.1)", color: "#8c63e0", transform: "translateY(-3px)", transition: "all 0.3s" } }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/vince-van-apeldoorn-52997a248/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ bgcolor: "rgba(255,255,255,0.05)", "&:hover": { bgcolor: "rgba(255,255,255,0.1)", color: "#7be08b", transform: "translateY(-3px)", transition: "all 0.3s" } }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Right Side: Form */}
          <Grid
            xs={12}
            md={7}
            sx={{
              p: { xs: 2.5, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary" sx={{ mb: 3 }}>
              Stuur een bericht
            </Typography>
            <form onSubmit={onSubmit} ref={formRef} className="contact-form" style={{ width: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", gap: 2 }}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mt: 0 }}
                />
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mt: { xs: 2, md: 0 } }}
                />
              </Box>
              <TextField
                label="Message"
                name="message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                margin="normal"
                required
                sx={{ mt: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3, minHeight: "24px" }}>
                <Typography variant="body2" sx={{ color: success ? "#7be08b" : "error.main", fontWeight: success ? "bold" : "normal" }}>
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
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "30px",
                    fontWeight: "bold",
                    backgroundColor: success ? "#7be08b" : "#8c63e0",
                    color: success ? "#000" : "#fff",
                    "&:hover": {
                      backgroundColor: success ? "#6bd07b" : "#784bd1",
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(140, 99, 224, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? "Verzenden..." : success ? "Verzonden!" : "Verstuur"}
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
        
        {/* Background ambient orbs */}
        <div className="contactanimate1"></div>
        <div className="contactanimate2"></div>
      </Card>
    </Box>
  );
};

export default ContactPage;
