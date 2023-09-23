import React, { useEffect } from "react";
import "./Stars.css";
import StarsImage from "../../Assets/Star.png";

const Stars = ({ rating }) => {
  const stars = [];
  const modifiedRating = Math.floor(rating);

  const renderStars = () => {
    for (let i = 0; i < modifiedRating; i++) {
      stars.push(
        <div className="StarsHolder">
          <img src={StarsImage} />
        </div>
      );
    }

    return stars;
  };

  return renderStars();
};

export default Stars;
