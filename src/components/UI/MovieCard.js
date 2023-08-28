import React from "react";
import "./MovieCard.scss";

const MovieCard = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default MovieCard;
