import React, { useEffect, useState } from "react";
import "./_IMAGECAROUSAL_MOBILE.css";
import LeftArrow from "../../../Assets/leftArrow.png";
import RightArrow from "../../../Assets/rightArrow.png";

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
    <div className="_IMAGECAROUSAL_MOBILE_Container">
      <div className="_IMAGECAROUSAL_MOBILE_Container_ImageContainer">
        <img src={url} />
      </div>

      <div className="ImageControl">
        <img onClick={() => getImageDecrement()} src={LeftArrow} />
        <img onClick={() => getImageIncrement()} src={RightArrow} />
      </div>
    </div>
  );
};

export default _IMAGECAROUSAL_MOBILE;
