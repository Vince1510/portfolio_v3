import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";

import { LanguageProvider } from "./context/LanguageContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
