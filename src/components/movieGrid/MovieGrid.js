import React, { useState } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { img_300, unavailable } from "../../Config/Config";
import MovieCard from "../UI/MovieCard";
import LazyLoad from "react-lazy-load";
import "./MovieGrid.scss";

const MovieGrid = ({ movie }) => {
  const {
    title,
    name,
    poster_path,
    media_type,
    vote_average,
    release_date,
    first_air_date,
  } = movie;

  const releaseDate = new Date(release_date);
  const movieYear = releaseDate.getFullYear();

  const firstAirDate = new Date(first_air_date);
  const tvYear = firstAirDate.getFullYear();

  const [favorite, setFavourite] = useState(false);

  const handleFavorite = () => {
    setFavourite((favorite) => !favorite);
  };

  return (
    <>
      <MovieCard>
        <div className="movie__grid">
          <div className="img">
            <LazyLoad threshold={0.4} width={200} height={250}>
              <img
                src={poster_path ? img_300(poster_path) : unavailable}
                alt=""
              />
            </LazyLoad>
          </div>

          <div className="movie__grid-subTitle text ">
            <b className="movie__grid-title ">
              {(title && title) || (name && name)}
            </b>
            <b>
              <span onClick={handleFavorite}>
                {favorite ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
              </span>
              {(movieYear && movieYear) || (tvYear && tvYear)}
            </b>
            <b>{media_type && media_type}</b>
            <b>{vote_average && vote_average.toFixed(1)}</b>
          </div>
        </div>
      </MovieCard>
    </>
  );
};

export default MovieGrid;
