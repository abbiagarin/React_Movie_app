import { useState } from "react";
import "./Header.scss";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo.PNG";
import Footer from "../footer/Footer";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [isFooter, setIsFooter] = useState(false);

  const fixedNav = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  window.addEventListener("scroll", fixedNav);

  return (
    <>
      <div className={nav ? "sticky" : "header"}>
        <div className="header__wrap container">
          <div className="logo">
            <NavLink to="/">
              <img src={logo} alt="movie_logo" className="movie_logo" />
            </NavLink>
          </div>
          <ul className="header__nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="popularMovies">Trending</NavLink>
            <NavLink to="movie">Movies</NavLink>
            <NavLink to="tv">TV Shows</NavLink>
          </ul>
        </div>
      </div>

      <main>
        <Outlet context={[setIsFooter]} />
        {isFooter && <Footer />}
      </main>
    </>
  );
};

export default Header;
