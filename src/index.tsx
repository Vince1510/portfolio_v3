import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";

import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <LanguageProvider>
      <BrowserRouter basename="/portfolio_v3">
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>
);
