import React from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Vacation } from "../../../data/vacationData";
import { polarstepsData } from "../../../data/polarstepsData";
import { YouTubePopupContent, DiaryPopupContent } from "./MapPopupContent";

interface VacationMapProps {
  vacation: Vacation;
}

const BLUE_DOT = { color: "#1a1a2e", fillColor: "#4893FD", fillOpacity: 0.9, weight: 1.5 };

const VacationMap: React.FC<VacationMapProps> = ({ vacation }) => {
  const diarySteps = polarstepsData[vacation.id] ?? [];

  return (
    <MapContainer
      center={vacation.coords}
      zoom={vacation.id === "mallorca" ? 11 : 7}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* YouTube drone-footage markers (Mallorca) */}
      {vacation.locations?.map((loc, i) => (
        <CircleMarker
          key={`loc-${i}`}
          center={[loc.lat, loc.lng]}
          radius={7}
          pathOptions={BLUE_DOT}
        >
          <Popup maxWidth={360}>
            <YouTubePopupContent location={loc} />
          </Popup>
        </CircleMarker>
      ))}

      {/* PolarSteps step markers */}
      {diarySteps.map((step, i) => (
        <CircleMarker
          key={`ps-${i}`}
          center={[step.lat, step.lng]}
          radius={6}
          pathOptions={BLUE_DOT}
        >
          <Popup maxWidth={260}>
            <DiaryPopupContent step={step} />
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default VacationMap;
