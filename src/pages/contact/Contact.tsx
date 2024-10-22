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
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import check icon
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import "./Contact.scss";

const ContactPage: React.FC = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(false); // Success state
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("");
    setLoading(true); // Set loading to true when form is submitted

    const formData = new FormData(formRef.current!);
    formData.append("access_key", "cd81ce3d-8254-4b16-ad5a-83acc418171a");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setLoading(false); // Reset loading state after response

    if (data.success) {
      setResult("Form Submitted Successfully");
      setSuccess(true); // Set success state to true
      formRef.current?.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
      setSuccess(false); // Set success state to false on error
    }
  };

  return (
    <div className="container-contact">
      <Card variant="outlined" className="card-contact form-card">
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
