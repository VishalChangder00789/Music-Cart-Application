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
    <div className="sticky top-24 h-[630px] w-full p-2 bg-[#cccccc] shadow-lg shadow-[#00000049]">
      <div className="h-3/4 w-full">
        <img src={ImageToShow} className="h-full w-full" />
      </div>

      <div className="h-1/4 flex items-center justify-between">
        {ArrayImages.map((url) => {
          return (
            <div
              onMouseEnter={() => handleMouseEnter(url)}
              className="rounded-sm h-[95%] w-[32%] mt-2"
            >
              <img src={url} className="h-[99%] w-[99%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageCarousal;
