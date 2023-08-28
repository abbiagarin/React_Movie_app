import React, { useContext } from "react";
import { ContextPage } from "../../ContextPage/ContextPage";

import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import "./AppPagination.scss";

const AppPagination = () => {
  const { movie, page, setPage } = useContext(ContextPage);

  const pageNumbers = [];

  for (let i = 1; i <= movie.length / 2; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const getPrevious = () => {
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const getNext = () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className="pagination">
        <ul className="pagination__item">
          <FiChevronLeft
            className={page === 1 ? "disabled" : ""}
            onClick={() => getPrevious()}
          />
          {pageNumbers.map((number, i) => (
            <li key={i} className="pagination__number">
              <button
                onClick={() => paginate(number)}
                className={number === page ? "active" : ""}
              >
                {number}
              </button>
            </li>
          ))}
          <FiChevronRight
            className={
              page === 1 || page === pageNumbers.length ? "disabled" : ""
            }
            onClick={() => getNext()}
          />
        </ul>
      </nav>
    </>
  );
};

export default AppPagination;
