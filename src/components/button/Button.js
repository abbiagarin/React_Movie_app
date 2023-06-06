import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlayCircle } from "react-icons/ai";
import ErrorComponent from "../errors/ErrorComponent";
import YoutubeTrailer from "../youtubeTrailer/YoutubeTrailer";
import Modal from "../modal/modal";
import Loading from "../loadingPage/Loading";
import "./Button.scss";

const Button = ({ id }) => {
  const [trailer, setTrailer] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchTrailer = async () => {
    try {
      const { data } = await axios.get(
        `https://imdb-api.com/en/API/YouTubeTrailer/${process.env.REACT_APP_API_KEY}/${id}`
      );

      setTrailer(data.videoId);
      setIsLoading(false);
      // console.log(data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTrailer();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isError ? (
        <ErrorComponent />
      ) : (
        <>
          {trailer && (
            <div>
              <button className="trailer_btn" onClick={() => setIsOpen(true)}>
                <span className="trailer_btn-span">
                  <AiOutlinePlayCircle size={30} />
                </span>
                watch trailer
              </button>

              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                {isLoading ? (
                  <Loading />
                ) : (
                  <YoutubeTrailer
                    src={`https://www.youtube.com/embed/${trailer}`}
                  />
                )}
              </Modal>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Button;
