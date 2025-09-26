import React from "react";
import useServerStatus from "../../CustomHooks/isServerUp";

const ServerCheck = ({ children }) => {
  const serverUrl = "http://localhost:8000/api/v1"; // Replace with your server URL
  const isServerUp = useServerStatus(serverUrl);

  if (!isServerUp) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-bounce rounded-full h-20 w-20 border-t-4 border-blue-500 p-4">
          <div className="h-full w-full rounded-full border border-black animate-spin "></div>
        </div>
        <p className="text-red-500 ml-4">
          Server is starting up. Please wait...
        </p>
      </div>
    );
  }

  return children;
};

export default ServerCheck;
