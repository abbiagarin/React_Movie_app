import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies";
import Series from "./pages/Series";

import Header from "./components/header/Header";
import "./App.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} exact />
      <Route path="popularMovies" element={<Trending />} />
      <Route path="tv" element={<Series />} />
      <Route path="movie" element={<Movies />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
