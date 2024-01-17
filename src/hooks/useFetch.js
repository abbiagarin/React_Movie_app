import axios from "axios";
import { useContext, useEffect } from "react";
import { ContextPage } from "../ContextPage/ContextPage";
import { useOutletContext } from "react-router-dom";

export const useFetch = (url) => {
  const [setIsFooter] = useOutletContext();
  const {
    movie,
    setMovie,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    page,
  } = useContext(ContextPage);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      setIsFooter(true);
      setMovie(data?.results);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    // eslint-disable-next-line
  }, [page]);

  return { isLoading, isError, movie };
};

export const useFetchContent = (url) => {
  const {
    content,
    setContent,
    trailer,
    setTrailer,
    rating,
    reviews,
    setRating,
    isError,
    setIsError,
    isLoading,
    setIsLoading,
    isOpen,
    setIsOpen,
  } = useContext(ContextPage);

  const fetchContent = async () => {
    try {
      const { data } = await axios.get(url);

      setIsLoading(false);
      setContent(data);
      setRating(data?.vote_average);
      setTrailer(data.videos.results[0]?.key);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchContent();
    // eslint-disable-next-line
  }, []);

  return {
    content,
    trailer,
    rating,
    reviews,
    isError,
    isLoading,
    isOpen,
    setIsOpen,
    setContent,
  };
};

export const useFetchSearch = () => {
  const [setIsFooter] = useOutletContext();
  const {
    page,
    setPage,
    movie,
    setMovie,
    searchText,
    setSearchText,
    type,
    setType,
    isLoading,
    setIsLoading,
  } = useContext(ContextPage);

  const fetchSearch = async () => {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      setIsFooter(false);
      setIsLoading(false);
      setMovie(data?.results);
      console.log(data.results);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsFooter(false);
    setIsLoading(true);
    fetchSearch();

    // eslint-disable-next-line
  }, [page, type, searchText]);

  return {
    page,
    setPage,
    type,
    setType,
    movie,
    isLoading,
    setIsLoading,
    searchText,
    setSearchText,
    fetchSearch,
  };
};

export const useFetchUpcoming = () => {
  const [setIsFooter] = useOutletContext();
  const {
    upcoming,
    setUpcoming,
    currentSlide,
    setCurrentSlide,
    isError,
    setIsError,
  } = useContext(ContextPage);

  const upcLength = upcoming.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const fetchUpcoming = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      setUpcoming(data?.results);
    } catch (error) {
      setIsError(true);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((currSlide) =>
      currSlide === upcLength - 1 ? 0 : currSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((currSlide) =>
      currSlide === 0 ? upcLength - 1 : currSlide - 1
    );
  };

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    setIsFooter(false);
    setCurrentSlide(0);
    fetchUpcoming();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }

    return () => clearInterval(slideInterval);
    // eslint-disable-next-line
  }, [currentSlide]);

  return { isError, prevSlide, nextSlide, upcoming, currentSlide };
};
