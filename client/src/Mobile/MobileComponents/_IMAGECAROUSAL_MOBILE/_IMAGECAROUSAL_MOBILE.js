import React, { useEffect, useState } from "react";
import "./_IMAGECAROUSAL_MOBILE.css";
import LeftArrow from "../../../Assets/leftArrow.png";
import RightArrow from "../../../Assets/rightArrow.png";

import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const _IMAGECAROUSAL_MOBILE = ({ arrayImages = [] }) => {
  const [url, setURL] = useState();

  useEffect(() => {
    if (!arrayImages) {
      return;
    }
    setURL(arrayImages[0]);
  }, []);

  const getImageIncrement = () => {
    const previousImage = url;
    let index = arrayImages.findIndex((item, index) => item === previousImage);
    index = index + 1;
    if (index === arrayImages.length) {
      index = 0;
    }

    setURL(arrayImages[index]);
  };

  const getImageDecrement = () => {
    const previousImage = url;
    let index = arrayImages.findIndex((item, index) => item === previousImage);
    index = index - 1;
    if (index < 0) {
      index = arrayImages.length - 1;
    }

    setURL(arrayImages[index]);
  };

  return (
    <div className="p-4 bg-[#eaeaea] rounded-sm">
      <div className="border">
        <img src={url} className="w-full shadow-lg" />
      </div>

      <div className="mt-4 flex items-center justify-end pr-2">
        <FaRegArrowAltCircleLeft
          onClick={() => getImageDecrement()}
          src={LeftArrow}
          size={30}
          color="grey"
        />
        <FaRegArrowAltCircleRight
          onClick={() => getImageIncrement()}
          src={RightArrow}
          size={30}
          color="grey"
          className="ml-2"
        />
      </div>
    </div>
  );
};

export default _IMAGECAROUSAL_MOBILE;
