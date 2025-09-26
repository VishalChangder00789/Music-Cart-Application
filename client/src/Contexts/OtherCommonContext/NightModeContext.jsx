import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const NightModeContext = createContext();

// Provider component to wrap the application
const NightModeProvider = ({ children }) => {
  const [isNightMode, setIsNightMode] = useState(false); // Night mode state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch user settings on component mount
  useEffect(() => {
    // Function to fetch night mode status
    const getNightModeStatus = async () => {
      const user = JSON.parse(localStorage.getItem("UserIds"));

      if (!user || !user.userId) {
        setError("User not found in localStorage");
        setLoading(false);
        return;
      }

      const userId = user.userId;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/get-user-settings/${userId}`
        );

        if (response.data && response.data.userSettings) {
          setIsNightMode(response.data.userSettings.nightMode);
        } else {
          setError("Night mode settings not found for user");
        }
      } catch (err) {
        console.error("Error fetching user settings:", err);
        setError("Error fetching user settings");
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch data
    getNightModeStatus();
  }, []); // Empty dependency array to run on mount only

  const toggleNightMode = () => {
    setIsNightMode((prevMode) => !prevMode);
  };

  return (
    <NightModeContext.Provider
      value={{ isNightMode, toggleNightMode, setIsNightMode, loading, error }}
    >
      {children}
    </NightModeContext.Provider>
  );
};

// Custom hook to use the NightModeContext
const useNightModeContext = () => {
  return useContext(NightModeContext);
};

export { NightModeProvider, useNightModeContext };
