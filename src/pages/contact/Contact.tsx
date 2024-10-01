import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import "./Contact.scss";

interface ContactProps {
  name: string;
  email: string;
  phone: string;
}

const ContactPage: React.FC<ContactProps> = ({ name, email, phone }) => {
  return (
    <div className="container-contact">
      <Card variant="outlined" className="card-contact hover-3d">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
          <Box className="email-container">
            <EmailIcon className="icon" />
            <Typography variant="body1" className="email">
              {email}
            </Typography>
          </Box>
          <Box className="phone-container">
            <PhoneIcon className="icon" />
            <Typography variant="body1" className="phone">
              {phone}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
