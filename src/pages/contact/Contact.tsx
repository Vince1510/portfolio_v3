import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import "./Contact.scss";

const ContactPage: React.FC = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("");
    setLoading(true);

    const formData = new FormData(formRef.current!);
    formData.append("access_key", "cd81ce3d-8254-4b16-ad5a-83acc418171a");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setLoading(false);

    if (data.success) {
      setResult("Form Submitted Successfully");
      setSuccess(true);
      formRef.current?.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <Card
        variant="outlined"
        className="card-contact"
        sx={{
          marginBottom: "5vw",
          marginTop: "30vw",
          height: "590px",
          background: "transparent",
          position: "relative",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.438)",
          overflow: "hidden",
          borderRadius: "10px",
          "&::after, &::before": {
            zIndex: -1,
            width: "500px",
            height: "500px",
            content: '""',
            position: "absolute",
            borderRadius: "50%",
            transition: "0.5s linear",
            filter: "blur(120px)", // Applying extreme blur
          },
          "&::after": {
            top: "-150px",
            left: "-70px",
            backgroundColor: "#7be08b",
            animation: "animFirst 5s linear infinite",
          },
          "&::before": {
            top: "70%",
            left: "70%",
            backgroundColor: "#e09545",
            animation: "animSecond 5s linear infinite",
            animationDelay: "3s",
          },
          "&:hover": {
            boxShadow: "0px 0px 10px 0px #e09545, 0px 0px 20px 5px #7be08b",
          },
          "&:hover::after": {
            left: "80%",
            transform: "scale(1.2)",
          },
          "&:hover::before": {
            left: "-150px",
            transform: "scale(1.2)",
          },
          "@keyframes animFirst": {
            "0%, 100%": {
              transform: "translateY(0)",
            },
            "50%": {
              transform: "translateY(20px)",
            },
          },
          "@keyframes animSecond": {
            "0%, 100%": {
              transform: "translateY(0)",
            },
            "50%": {
              transform: "translateY(-20px)",
            },
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Contact Me
          </Typography>
          <form onSubmit={onSubmit} ref={formRef} className="contact-form">
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
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
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
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color={success ? "success" : "primary"}
              disabled={loading}
              endIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : success ? (
                  <CheckCircleIcon />
                ) : null
              }
              sx={{
                backgroundColor: "#8c63e0",
                "&:hover": {
                  backgroundColor: "#784bd1",
                },
              }}
            >
              {loading ? "Sending..." : success ? "Sent!" : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
