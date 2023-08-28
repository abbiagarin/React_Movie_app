import { useState, createContext } from "react";

export const ContextPage = createContext(null);

const MovieProvider = ({ children }) => {
  const [movie, setMovie] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [backdrop, setBackdrop] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(0);
  const [count, setCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFooter, setIsFooter] = useState(false);
  const [rating, setRating] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContextPage.Provider
      value={{
        movie,
        setMovie,
        content,
        setContent,
        searchText,
        setSearchText,
        backdrop,
        setBackdrop,
        upcoming,
        setUpcoming,
        reviews,
        setReviews,
        type,
        setType,
        count,
        setCount,
        currentSlide,
        setCurrentSlide,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        isOpen,
        setIsOpen,
        page,
        setPage,
        isFooter,
        setIsFooter,
        rating,
        setRating,
        trailer,
        setTrailer,
      }}
    >
      {children}
    </ContextPage.Provider>
  );
};

export default MovieProvider;
