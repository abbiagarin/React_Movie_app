import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loadingPage/Loading";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import AppPagination from "../../components/Pagination/AppPagination";
import "./Trending.scss";
import ErrorComponent from "../../components/errors/ErrorComponent";
import { NavLink, useOutletContext } from "react-router-dom";

const Trending = () => {
  const [movieTrends, setMovieTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(27);
  const [setIsFooter] = useOutletContext();

  const fetchTrends = async () => {
    try {
      const { data } = await axios.get(
        `https://imdb-api.com/en/API/MostPopularMovies/${process.env.REACT_APP_API_KEY}`
      );
      setIsFooter(true);
      // console.log(data);
      setMovieTrends(data?.items);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTrends();
    // eslint-disable-next-line
  }, [page]);

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = movieTrends.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      {!isLoading && <Loading />}
      {isError ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="trending">
            {currentPosts &&
              currentPosts.map((trend, i) => (
                <NavLink to={`${trend?.id}`} key={i}>
                  <MovieGrid
                    id={trend?.id}
                    image={trend?.image}
                    title={trend?.title}
                    year={trend?.year}
                    rating={trend?.imDbRating}
                  />
                </NavLink>
              ))}
          </div>
          <AppPagination
            postsPerPage={postsPerPage}
            totalPosts={movieTrends.length}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
};

export default Trending;
