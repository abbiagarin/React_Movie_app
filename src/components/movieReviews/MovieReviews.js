import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ContextPage } from "../../ContextPage/ContextPage";
import { useParams } from "react-router-dom";
import Modal from "../modal/Modal";
import ErrorComponent from "../errors/ErrorComponent";
import "./MovieReviews.scss";

const MovieReviews = () => {
  const { type, id } = useParams();
  const { reviews, setReviews, isError, setIsError } = useContext(ContextPage);
  const [isOpen, setIsOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );

      setReviews(data.results);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isError && <ErrorComponent />}
      <button
        className="trending__content-review"
        onClick={() => setIsOpen(true)}
        disabled={!reviews.length}
      >
        {!reviews.length ? "No" : "Read"} Reviews
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="review_modal">
          {reviews &&
            reviews.map((review, index) => (
              <ul key={index} className="review_content">
                <li className="review_content-details">{review?.content}</li>
                <li className="review_content-author">{review?.author}</li>
              </ul>
            ))}
        </div>
      </Modal>
    </>
  );
};

export default MovieReviews;
