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
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/header/Header";
import TrendingContent from "./pages/Trending/TrendingContent";
import "./App.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />

      <Route path="popularMovies">
        <Route index element={<Trending />} />
        <Route path=":id" element={<TrendingContent />} />
      </Route>
      <Route path="tv" element={<Series />} />
      <Route path="movie" element={<Movies />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
