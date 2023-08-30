import { useFetchContent } from "../../hooks/useFetch";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { img_500, originalImage, unavailable } from "../../Config/Config";
import { BiCalendar } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import RatingStar from "../ratingStar/RatingStar";
import ErrorComponent from "../errors/ErrorComponent";
import MovieReviews from "../movieReviews/MovieReviews";
import Button from "../button/Button";
import Loading from "../loadingPage/Loading";
import "./MovieContent.scss";

const MovieContent = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [setIsFooter] = useOutletContext();

  setIsFooter(false);

  const { content, trailer, rating, isError, isLoading, setContent } =
    useFetchContent(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos&language=en-US`
    );

  const releaseDate = new Date(content.release_date);
  const movieYear = releaseDate.getFullYear();

  const firstAirDate = new Date(content.first_air_date);
  const tvYear = firstAirDate.getFullYear();

  const handleBack = () => {
    isLoading ? <Loading /> : navigate(-1);
    setContent("");
  };

  return (
    <>
      {isError ? (
        <ErrorComponent />
      ) : (
        <div
          className="trending__content"
          style={{
            backgroundImage: `url(${
              content.backdrop_path && originalImage(content.backdrop_path)
            })`,
          }}
        >
          {content && (
            <div className="trending__content-modal">
              <div className="arrow_back-btn">
                <IoArrowBackCircleOutline size={30} onClick={handleBack} />
              </div>

              <div className="trending__content-poster">
                <div className="image">
                  {isLoading ? (
                    <div className="loading">
                      <Loading />
                    </div>
                  ) : (
                    <img
                      src={
                        content.poster_path
                          ? img_500(content.poster_path)
                          : unavailable
                      }
                      alt=""
                    />
                  )}
                </div>
              </div>

              <div className="trending__content-about">
                <div className="description">
                  <h2 className="trending__content-title">
                    {content?.title || content?.name}
                  </h2>
                  <div className="trending__content-duration">
                    <div>
                      {content.genres &&
                        content.genres.map((genre, i) => (
                          <span key={i}>{(i ? " , " : "") + genre.name}</span>
                        ))}
                    </div>

                    <div>
                      {
                        <span className="span">
                          <BiCalendar className="icons" />
                          {(movieYear && movieYear) || (tvYear && tvYear)}
                        </span>
                      }
                    </div>

                    <div>
                      {content.runtime && (
                        <span className="span">
                          <FiClock className="icons" />
                          {`${content.runtime} min`}
                        </span>
                      )}
                    </div>
                    <div className="rating">
                      {rating && (
                        <span className="rating_star">
                          <RatingStar rating={rating} />
                          <span className="rating_content">
                            ({content.vote_average.toFixed(1)})
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <MovieReviews />
                  </div>

                  {content.overview && (
                    <p className="trending__content-plot">
                      {content?.overview}
                    </p>
                  )}
                  {trailer && (
                    <Button trailer={trailer} isLoading={isLoading} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MovieContent;
