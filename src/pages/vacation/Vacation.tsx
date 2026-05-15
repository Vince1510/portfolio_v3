import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Grid, Card, CardContent, CardMedia, Typography, Box, CardActionArea, Modal } from "@mui/material";
import "./Vacation.scss";

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Vacation {
  location: string;
  year: string;
  description: string;
  image: string;
  coords: [number, number];
}

const vacations: Vacation[] = [
  { 
    location: "Vakantie met Toon Mallorca", 
    year: "2026", 
    description: "ja mooie tekst", 
    image: "",
    coords: [39.6953, 3.0176]
  },
  { 
    location: "Thailand", 
    year: "2025", 
    description: "ja mooie tekst", 
    image: "",
    coords: [13.7563, 100.5018]
  },
  { 
    location: "Maleisië", 
    year: "2024", 
    description: "ja mooie tekst", 
    image: "",
    coords: [3.1390, 101.6869]
  },
  { 
    location: "Maleisië", 
    year: "2023", 
    description: "ja mooie tekst", 
    image: "",
    coords: [4.2105, 101.9758]
  },
];

const VacationPage: React.FC = () => {
  const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);

  return (
    <Box className="vacation-container ui-fade visible" sx={{ py: 8 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 6 }}>
          My Vacations
        </Typography>
        <Grid container spacing={4}>
          {vacations.map((vacation, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ borderRadius: 4, height: "100%", transition: "0.3s", "&:hover": { transform: "translateY(-10px)" } }}>
                <CardActionArea onClick={() => setSelectedVacation(vacation)}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={vacation.image}
                    alt={vacation.location}
                  />
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                      {vacation.location}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                      {vacation.year}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {vacation.description}
                    </Typography>
                    <Typography variant="button" sx={{ mt: 3, display: "block", color: "#7be08b" }}>
                      View Map →
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal
        open={Boolean(selectedVacation)}
        onClose={() => setSelectedVacation(null)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
      >
        <Box sx={{ 
          bgcolor: "background.paper", 
          borderRadius: 4, 
          width: "100%", 
          maxW: 1000, 
          p: 4, 
          position: "relative",
          outline: "none"
        }}>
          <button className="close-button" onClick={() => setSelectedVacation(null)}>×</button>
          {selectedVacation && (
            <>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", background: "linear-gradient(90deg, #7be08b, #3bc1b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {selectedVacation.location}
              </Typography>
              <Box sx={{ height: "60vh", width: "100%", borderRadius: 2, overflow: "hidden", mt: 2 }}>
                <MapContainer 
                  center={selectedVacation.coords} 
                  zoom={10} 
                  scrollWheelZoom={true}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={selectedVacation.coords}>
                    <Popup>{selectedVacation.location}</Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default VacationPage;
