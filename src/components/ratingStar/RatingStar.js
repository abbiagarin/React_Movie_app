import React from "react";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsStar } from "react-icons/bs";

const RatingStar = ({ rating }) => {
  const stars = [];
  rating = rating / 2;
  if (Number.isInteger(rating) === true) {
    // integer
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<BsStarFill key={i} />);
      } else {
        stars.push(<BsStar key={i} />);
      }
    }
  } else {
    // float
    rating = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<BsStarFill key={i} />);
      } else {
        stars.push(<BsStar key={i} />);
      }
    }
    stars[rating] = <BsStarHalf key={rating} />;
  }

  return <div>{stars}</div>;
};

export default RatingStar;
