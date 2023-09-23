import React, { useEffect, useState } from "react";
import "./ImageCarousal.css";

const ImageCarousal = ({ arrayOfImageUrl }) => {
  const [ImageToShow, setImageToShow] = useState("");
  const [ArrayImages, setArrayImages] = useState([]);

  const handleMouseEnter = async (url) => {
    const previousImage = ImageToShow;
    setImageToShow(url);

    // Add the previous image to the back of state
    const NewArrayImages = [...ArrayImages];

    await NewArrayImages.find((item, index) => {
      if (item === url) {
        // remove the item from index
        const LatestArray = NewArrayImages.filter((item) => {
          return item !== url;
        });

        setArrayImages([...LatestArray, previousImage]);
      }
    });
  };

  useEffect(() => {
    if (arrayOfImageUrl) {
      setArrayImages(arrayOfImageUrl);
      setImageToShow(arrayOfImageUrl[0]);
    }
  }, []);

  return (
    <div className="ImageCarousalContainer">
      <div className="BigImage">
        <img src={ImageToShow} />
      </div>

      <div className="ImageCollection">
        {ArrayImages.map((url) => {
          return (
            <div
              onMouseEnter={() => handleMouseEnter(url)}
              className="SmallerImages"
            >
              <img src={url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageCarousal;
