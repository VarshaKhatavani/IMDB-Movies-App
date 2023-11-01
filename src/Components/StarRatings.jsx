import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const StarRatings = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 10; i++) {
    const isFilled = i <= rating;
    stars.push(
      <FontAwesomeIcon
        icon={faStar}
        key={i}
        className={isFilled ? "filled" : "empty"}
      />
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRatings;
