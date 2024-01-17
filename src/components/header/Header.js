import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import logo from "../../assets/logo.PNG";
import Footer from "../footer/Footer";
import "./Header.scss";

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
            <NavLink reloadDocument to="/">
              Home
            </NavLink>
            <NavLink reloadDocument to="trending">
              Trending
            </NavLink>
            <NavLink reloadDocument to="movies">
              Movies
            </NavLink>
            <NavLink reloadDocument to="series">
              TV Shows
            </NavLink>
            <NavLink reloadDocument to="search" className="search">
              <BsSearch />
            </NavLink>
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
