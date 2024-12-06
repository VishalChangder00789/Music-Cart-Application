import React, { useEffect, useState } from "react";

const Switch = ({ Icon, name, mode = false }) => {
  const [statusMode, setStatusMode] = useState(false);

  useEffect(() => {
    setStatusMode(mode);
  }, [mode]);

  return (
    <div>
      <div
        className={`${
          name === "Edit Profile"
            ? `bg-[#972fff] text-white justify-center`
            : "bg-[#ffffff] border text-black justify-between"
        } mt-8  w-full flex items-center p-2 rounded-md font-semibold`}
      >
        {Icon && (
          <div className="w-[30px]">
            <Icon size={20} />
          </div>
        )}
        <div className="w-[70px] flex">{name}</div>
        <div
          onClick={() => setStatusMode(!statusMode)}
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
