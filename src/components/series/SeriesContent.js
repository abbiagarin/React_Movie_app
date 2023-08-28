import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { imgOneNineTwo } from "../../Config/Config";
import { BiCalendar } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { unavailable } from "../../Config/Config";
import RatingStar from "../ratingStar/RatingStar";
import ErrorComponent from "../errors/ErrorComponent";
import Button from "../button/Button";
import Loading from "../loadingPage/Loading";
import SeriesSeasons from "./SeriesSeasons";

const SeriesContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [rating, setRating] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://imdb-api.com/en/API/Title/${process.env.REACT_APP_API_KEY}/${id}`
      );

      setIsLoading(false);
      setContent(data);
      setRating(data?.imDbRating);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isError ? (
        <ErrorComponent />
      ) : (
        <div className="trending__content">
          {content && (
            <div className="trending__content-modal">
              <div className="arrow_back-btn">
                <IoArrowBackCircleOutline
                  size={30}
                  onClick={() => (isLoading ? <Loading /> : navigate(-1))}
                />
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
                        content.image
                          ? imgOneNineTwo(content.image)
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
                    {content.fullTitle}
                  </h2>
                  <div className="trending__content-duration">
                    <div>{content.genres && <span>{content.genres}</span>}</div>

                    <div>
                      {content.year && (
                        <span className="span">
                          <BiCalendar className="icons" />
                          {content.year}
                        </span>
                      )}
                    </div>

                    <div>
                      {content.runtimeMins && (
                        <span className="span">
                          <FiClock className="icons" />
                          {`${content.runtimeMins} min`}
                        </span>
                      )}
                    </div>
                    <div className="rating">
                      {rating && (
                        <span className="rating_star">
                          <RatingStar rating={rating} />
                          <span className="rating_content">
                            ({content.imDbRating})
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="trending__content-review">
                    Read Reviews
                  </button>
                  {content.plot && (
                    <p className="trending__content-plot">{content.plot}</p>
                  )}
                  <Button id={id} />
                  <SeriesSeasons id={id} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SeriesContent;
