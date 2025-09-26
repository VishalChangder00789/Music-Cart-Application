import { useState, useEffect } from "react";
import axios from "axios";

const useServerStatus = (serverUrl) => {
  const [isServerUp, setIsServerUp] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/server-health-check`
        );
        if (response.status === 200 && response.data.status === "UP") {
          setIsServerUp(true);
        } else {
          setIsServerUp(false);
        }
      } catch (error) {
        console.error("Error checking server status:", error);
        setIsServerUp(false);
      }
    };

    checkServerStatus();

    // Optionally, poll the server status periodically
    const interval = setInterval(checkServerStatus, 5000); // Check every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [serverUrl]);

  return isServerUp;
};

export default useServerStatus;
