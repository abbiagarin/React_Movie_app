import React from "react";
import { RiCloseLine } from "react-icons/ri";
import "./Modal.scss";
import ReactDom from "react-dom";

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <button onClick={onClose} className="modal_close-btn">
          <RiCloseLine size={30} />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
