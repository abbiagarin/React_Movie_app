import { useFetchUpcoming } from "../../hooks/useFetch";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { originalImage } from "../../Config/Config";
import IMDB_Logo from "../../assets/IMDB_Logo.png";
import ErrorComponent from "../errors/ErrorComponent";
import "./Slider.scss";

const Slider = () => {
  const { upcoming, currentSlide, isError, prevSlide, nextSlide } =
    useFetchUpcoming();

  return (
    <>
      {isError ? (
        <ErrorComponent />
      ) : (
        <div className="slider">
          <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
          <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

          {upcoming &&
            upcoming.map((upc, index) => {
              return (
                <div
                  className={index === currentSlide ? "slide current" : "slide"}
                  key={upc.id}
                  style={{
                    backgroundImage: `url(${originalImage(upc.backdrop_path)})`,
                  }}
                >
                  {index === currentSlide && (
                    <>
                      <div className="content">
                        <div className="content-description">
                          <h1>{upc?.title}</h1>
                          <p>{upc?.overview}</p>
                          <p>
                            <span>
                              <img
                                className="imdb_logo"
                                src={IMDB_Logo}
                                alt=""
                              />
                            </span>
                            <span className="release">
                              {upc.vote_average.toFixed(1)}
                            </span>
                            <span className="line">|</span>
                            <span className="rating">
                              {upc.release_date.slice(0, 4)}
                            </span>
                          </p>

                          {/* <Link to={`movie/${upc?.id}`} key={upc.id}>
                            MORE INFO
                          </Link> */}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Slider;
