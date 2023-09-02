import {
  TextField,
  ThemeProvider,
  createTheme,
  Button,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useFetchSearch } from "../../hooks/useFetch";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import Loading from "../../components/loadingPage/Loading";
import "../pagesStyle/styles.scss";
import "../../components/Pagination/AppPagination.scss";

const Search = () => {
  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z0-9_ ]/;
  const {
    page,
    setPage,
    type,
    setType,
    movie,
    searchText,
    setSearchText,
    isLoading,
    fetchSearch,
  } = useFetchSearch();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#ffd700",
      },
    },
    typography: {
      fontFamily: ["Montserrat"],
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": {
              background: "rgba(255,215,0, .5)",
            },
            "&:hover": {
              background: "#ffd700",
              color: "#000",
            },
          },
        },
      },
    },
  });

  const handleChange = (e) => {
    setSearchText(e.target.value.trimStart());
  };

  const handleBlur = (e) => {
    setSearchText(e.target.value.trimEnd());
  };

  const handleKeyDown = (e) => {
    if (!ALPHA_NUMERIC_DASH_REGEX.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleClearInput = () => {
    setSearchText("");
  };

  const handlePrevPage = () => {
    setPage((page) => page - 1);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 30px" }}>
          <TextField
            sx={{
              flex: 1,
              backgroundColor: "rgba(225, 225, 225, .8)",
            }}
            id="filled-basic"
            className="searchBar"
            label="Search"
            variant="filled"
            required
            value={searchText}
            error={!searchText.trim()}
            helperText={!searchText.trim() ? "Input Required" : null}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            InputProps={{
              style: { color: "#fff", cursor: "pointer" },
              endAdornment: (
                <InputAdornment position="end">
                  {searchText && <CloseIcon onClick={handleClearInput} />}
                </InputAdornment>
              ),
            }}
          />
          <Button
            sx={{
              marginLeft: 2,
            }}
            variant="contained"
            disabled={!searchText.trim()}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          sx={{
            paddingBottom: "10",
            margin: "15px 30px",
          }}
        >
          <Tab
            sx={{
              width: "50%",
              backgroundColor: "rgba(225, 225, 225, .8)",
              marginLeft: "auto",
            }}
            label="Search Movies"
            disabled={!searchText.trim()}
          />
          <Tab
            sx={{
              width: "50%",
              backgroundColor: "rgba(225, 225, 225, .8)",
              marginRight: "auto",
            }}
            label="Search TV Series"
            disabled={!searchText.trim()}
          />
        </Tabs>
      </ThemeProvider>

      <>
        {isLoading && <Loading />}
        {!movie.length ? (
          <h4 style={{ textAlign: "center" }}>No Data Available</h4>
        ) : (
          <div className="trending">
            {movie &&
              movie.map((movie, i) => (
                <NavLink to={`${type ? "tv" : "movie"}/${movie?.id}`} key={i}>
                  <MovieGrid movie={movie} id={movie?.id} />
                </NavLink>
              ))}
          </div>
        )}
      </>

      <ThemeProvider theme={darkTheme}>
        {!movie.length ? null : (
          <nav className="pagination">
            <ul className="pagination__item">
              <Button
                sx={{ mx: 2, my: 4 }}
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                Prev
              </Button>
              {page}
              <Button
                sx={{ mx: 2, my: 4 }}
                onClick={handleNextPage}
                disabled={movie.length < 20}
              >
                Next
              </Button>
            </ul>
          </nav>
        )}
      </ThemeProvider>
    </div>
  );
};

export default Search;
