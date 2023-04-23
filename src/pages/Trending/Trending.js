import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loadingPage/Loading";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import AppPagination from "../../components/Pagination/AppPagination";
import "./Trending.scss";
import ErrorComponent from "../../components/errors/ErrorComponent";

const pageSize = 27;

const Trending = () => {
  const [movieTrends, setMovieTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const fetchTrends = async () => {
      try {
        const { data } = await axios.get(
          `https://imdb-api.com/en/API/MostPopularMovies/${process.env.REACT_APP_MOVIEAPI_KEY}`
        );

        setMovieTrends(data?.items);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };

    fetchTrends();
  }, [page]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="trending">
            {movieTrends &&
              movieTrends
                .slice((page - 1) * pageSize, page * pageSize)
                .map((trend) => (
                  <MovieGrid
                    key={trend?.id}
                    id={trend?.id}
                    image={trend?.image}
                    title={trend?.title}
                    year={trend?.year}
                    rating={trend?.imDbRating}
                  />
                ))}
          </div>
          <AppPagination setPage={setPage} />
        </>
      )}
    </>
  );
};

export default Trending;
