import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") || "light"; // Default to light
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme); // Apply theme to body
    document.documentElement.setAttribute("data-theme", theme); // Ensure <html> is updated too
    localStorage.setItem("theme", theme); // Save to local storage
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
