import { lazy, Suspense } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/header/Header";
import Loading from "./components/loadingPage/Loading";
import MovieContent from "./components/movieContent/MovieContent";
import Search from "./pages/Search/Search";
import "./App.scss";

const Home = lazy(() => import("./pages/Home/Home"));
const Trending = lazy(() => import("./pages/Trending/Trending"));
const Movies = lazy(() => import("./pages/Movies/Movies"));
const Series = lazy(() => import("./pages/Series/Series"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />

      <Route path="trending">
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Trending />
            </Suspense>
          }
        />
        <Route path=":type/:id" element={<MovieContent />} />
      </Route>

      <Route path="movies">
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Movies />
            </Suspense>
          }
        />
        <Route path=":type/:id" element={<MovieContent />} />
      </Route>

      <Route path="series">
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Series />
            </Suspense>
          }
        />
        <Route path=":type/:id" element={<MovieContent />} />
      </Route>

      <Route path="search">
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Search />
            </Suspense>
          }
        />
        <Route path=":type/:id" element={<MovieContent />} />
      </Route>

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
