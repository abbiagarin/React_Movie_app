import React from "react";
import "./AppPagination.scss";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

const AppPagination = ({ postsPerPage, totalPosts, page, setPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
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
