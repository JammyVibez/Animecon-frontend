import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css"
import "swiper/css/bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "flag-icons/css/flag-icons.min.css";
import { AuthContextProvider } from "./context/AuthContext"; // Import AuthContextProvider
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
