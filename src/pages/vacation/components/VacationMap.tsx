import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Vacation, polarstepsData } from "../../../data/polarstepsData";
import { YouTubePopupContent, DiaryPopupContent } from "./MapPopupContent";

interface VacationMapProps {
  vacation: Vacation;
}

const BLUE_DOT = {
  color: "#1a1a2e",
  fillColor: "#4893FD",
  fillOpacity: 0.9,
  weight: 1.5,
};
const RED_DOT = {
  color: "#1a1a2e",
  fillColor: "#ff4d4d",
  fillOpacity: 0.9,
  weight: 1.5,
};

// const MapClickListener = () => {
//   const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

//   useMapEvents({
//     click(e) {
//       setPosition(e.latlng);
//     },
//   });

//   return position === null ? null : (
//     <Popup
//       position={position}
//       eventHandlers={{
//         remove: () => {
//           setPosition(null);
//         },
//       }}
//     >
//       <div style={{ padding: "8px", textAlign: "center", minWidth: "150px" }}>
//         <h4 style={{ margin: "0 0 8px 0" }}>Map Coordinates</h4>
//         <div style={{ fontSize: "14px", fontFamily: "monospace" }}>
//           <strong>Lat:</strong> {position.lat.toFixed(6)}<br />
//           <strong>Lng:</strong> {position.lng.toFixed(6)}
//         </div>
//       </div>
//     </Popup>
//   );
// };

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

      {/* <MapClickListener /> */}

      {/* YouTube drone-footage markers (Mallorca) */}
      {vacation.locations?.map((loc, i) => (
        <CircleMarker
          key={`loc-${i}`}
          center={[loc.lat, loc.lng]}
          radius={7}
          pathOptions={BLUE_DOT}
          eventHandlers={{
            click: (e) => {
              const map = e.target._map;
              if (map) {
                map.panTo(e.latlng);
              }
            },
          }}
        >
          <Popup maxWidth={480}>
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
          pathOptions={step.mediaAdded ? BLUE_DOT : RED_DOT}
          eventHandlers={{
            click: (e) => {
              const map = e.target._map;
              if (map) {
                map.panTo(e.latlng);
              }
            },
          }}
        >
          <Popup maxWidth={420}>
            <DiaryPopupContent step={step} />
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default VacationMap;
