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
        <div className="contactanimate1"></div>
        <div className="contactanimate2"></div>
      </Card>
    </div>
  );
};

export default ContactPage;
