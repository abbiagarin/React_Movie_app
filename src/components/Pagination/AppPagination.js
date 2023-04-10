import React from "react";
import { createTheme, ThemeProvider, colors, Pagination } from "@mui/material";
import "./AppPagination.scss";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.yellow[500],
    },
  },
});

const AppPagination = ({ setPage, numOfPages = 2 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div className="page_container">
      <div className="root">
        <ThemeProvider theme={darkTheme}>
          <Pagination
            variant="outlined"
            color="primary"
            count={numOfPages}
            onChange={(e) => handlePageChange(e.target.textContent)}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AppPagination;
