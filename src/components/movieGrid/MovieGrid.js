import React, { useState } from "react";
import { unavailable } from "../../Config/Config";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

import "./MovieGrid.scss";

const MovieGrid = ({ id, image, title, year, rating }) => {
  const [favorite, setFavourite] = useState(false);

  const handleFavorite = () => {
    setFavourite(!favorite);
  };
  return (
    <div className="movie__grid wrap">
      <img src={image ? image : unavailable} alt="" className="movie_poster" />

      <div className="movie__grid-subTitle text ">
        <b>{title}</b>
        <b>
          <span onClick={handleFavorite}>
            {favorite ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
          </span>
          {year}
        </b>
        <b>{rating}</b>
      </div>
    </div>
  );
};

export default MovieGrid;
