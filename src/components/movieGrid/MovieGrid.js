import React, { useState } from "react";
import { unavailable } from "../../Config/Config";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import MovieCard from "../UI/MovieCard";
import "./MovieGrid.scss";

const MovieGrid = ({ id, image, title, year, rating }) => {
  const [favorite, setFavourite] = useState(false);

  const handleFavorite = () => {
    setFavourite(!favorite);
  };
  return (
    <MovieCard>
      <div className="movie__grid">
        <img
          src={image ? image : unavailable}
          alt=""
          className="movie_poster"
        />

        <div className="movie__grid-subTitle text ">
          <b className="movie__grid-title">{title}</b>
          <b>
            <span onClick={handleFavorite}>
              {favorite ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
            </span>
            {year}
          </b>
          <b>{rating}</b>
        </div>
      </div>
    </MovieCard>
  );
};

export default MovieGrid;
