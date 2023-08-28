import React, { useContext } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { ContextPage } from "../../ContextPage/ContextPage";
import YoutubeTrailer from "../youtubeTrailer/YoutubeTrailer";
import Modal from "../modal/Modal";
import Loading from "../loadingPage/Loading";
import "./Button.scss";

const Button = ({ trailer, isLoading }) => {
  const { isOpen, setIsOpen } = useContext(ContextPage);

  return (
    <>
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
            <YoutubeTrailer src={`https://www.youtube.com/embed/${trailer}`} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default Button;
