import axios from "axios";
import React, { useEffect, useState } from "react";

const Switch = ({ Icon, name, mode = false, onChange }) => {
  const [statusMode, setStatusMode] = useState(mode);

  useEffect(() => {
    setStatusMode(mode);
  }, [mode]);

  const updateSettings = async (newMode) => {
    const { userId, userSettingId } = JSON.parse(
      localStorage.getItem("UserIds")
    );

    try {
      await axios.patch(
        `http://localhost:8000/api/v1/update-user-settings/${userId}/${userSettingId}`,
        {
          nightMode: newMode,
        }
      );
    } catch (error) {
      console.error("Error updating user settings:", error.message);
    }
  };

  const handleToggle = () => {
    const newMode = !statusMode;
    setStatusMode(newMode);
    updateSettings(newMode);

    if (onChange) {
      onChange(newMode);
    }
  };

  return (
    <div>
      <div
        className={`${
          name === "Edit Profile"
            ? `bg-[#972fff] text-white justify-center`
            : "bg-[#ffffff] text-black justify-between"
        } w-full flex items-center p-2 rounded-md font-semibold`}
      >
        {Icon && (
          <div className="w-[30px]">
            <Icon size={20} />
          </div>
        )}
        <div className="flex">{name}</div>
        <div
          onClick={handleToggle}
          className={`w-[40px] mr-2 p-1 rounded-[24px] border-black ${
            statusMode ? `bg-[#972fff] flex justify-end` : "bg-[#9898987c]"
          }`}
        >
          <div
            className={`h-3 w-3 rounded-[50%] ${
              statusMode ? "bg-[#ffffff] border-black" : "bg-[#000000]"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Switch;
