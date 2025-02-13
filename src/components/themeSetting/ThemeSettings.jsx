// ThemeSettings.js
import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import "./themesetting.css";

const ThemeSettings = () => {
  const { theme, setTheme } = useContext(AuthContext); // Assuming theme is managed in UserContext

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
  };

  return (
    <div className="theme-settings">
      <h3>Theme Settings</h3>
      <label>
        <input
          type="radio"
          value="light"
          checked={theme === 'light'}
          onChange={handleThemeChange}
        />
        Light Mode
      </label>
      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === 'dark'}
          onChange={handleThemeChange}
        />
        Dark Mode
      </label>
    </div>
  );
};

export default ThemeSettings;
