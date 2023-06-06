import React from "react";
import "./MovieCard.scss";

const MovieCard = (props) => {
  return <div className="card">{props.children}</div>;
};

export default MovieCard;
