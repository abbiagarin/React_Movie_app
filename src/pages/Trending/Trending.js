import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loadingPage/Loading";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import AppPagination from "../../components/Pagination/AppPagination";
import "./Trending.scss";

const Trending = () => {
  const [movieTrends, setMovieTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTrends = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://imdb-api.com/en/API/MostPopularMovies/${process.env.REACT_APP_MOVIEAPI_KEY}`
        );

        console.log(data);
        setMovieTrends(data?.items);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrends();
  }, [page]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="trending">
          {movieTrends &&
            movieTrends
              .slice(0, 50)
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
      )}
     {movieTrends && <AppPagination setPage={setPage} />} 
    </>
  );
};

export default Trending;
