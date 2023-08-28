import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextPage } from "../../ContextPage/ContextPage";
import Loading from "../../components/loadingPage/Loading";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import AppPagination from "../../components/Pagination/AppPagination";
import ErrorComponent from "../../components/errors/ErrorComponent";
import { useFetch } from "../../hooks/useFetch";
import "../pagesStyle/styles.scss";

const Trending = () => {
  const { page } = useContext(ContextPage);
  const { isLoading, isError, movie } = useFetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
  );

  return (
    <>
      {isLoading && <Loading />}
      {isError ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="trending">
            {movie &&
              movie.map((movie, i) => (
                <Link to={`${movie?.media_type}/${movie?.id}`} key={i}>
                  <MovieGrid movie={movie} id={movie?.id} />
                </Link>
              ))}
          </div>
          <AppPagination />
        </>
      )}
    </>
  );
};

export default Trending;
