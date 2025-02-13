import { createContext, useState, useEffect } from "react";

const XpContext = createContext();

export const XpProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  // Function to fetch XP from backend
  const fetchXp = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/xp/${userId}`);
      const data = await response.json();
      setXp(data.xp);
      setLevel(data.level);
    } catch (error) {
      console.error("Error fetching XP:", error);
    }
  };

  // Function to add XP (called when user interacts)
  const addXp = async (userId, xpEarned) => {
    try {
      await fetch("http://localhost:5000/api/xp/add-xp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, xpEarned }),
      });
      fetchXp(userId);
    } catch (error) {
      console.error("Error adding XP:", error);
    }
  };

  return (
    <XpContext.Provider value={{ xp, level, fetchXp, addXp }}>
      {children}
    </XpContext.Provider>
  );
};

export default XpContext;
