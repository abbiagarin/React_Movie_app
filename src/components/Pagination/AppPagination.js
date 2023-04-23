import React from "react";
import {
  createTheme,
  ThemeProvider,
  colors,
  Pagination,
  Box,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.yellow[500],
    },
  },
});



const AppPagination = ({ setPage, numOfPages = 3 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      sx={{ margin: "20px 0" }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          variant="outlined"
          color="primary"
          count={numOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
        />
      </ThemeProvider>
    </Box>
  );
};

export default AppPagination;
