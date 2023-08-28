import React from "react";
import "./Footer.scss";
import footer from "../../assets/footer.jpg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${footer})` }}>
      <div className="footer__content container">
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">Contact us</NavLink>
            <NavLink to="/">Terms of service</NavLink>
            <NavLink to="/">Privacy policy</NavLink>
          </div>

          <div className="footer__content__menu">
            <NavLink to="/">FAQ</NavLink>
            <NavLink to="/">Premium</NavLink>
            <NavLink to="/">About us</NavLink>
          </div>

          <div className="footer__content__menu">
            <NavLink to="/">Top IMDB</NavLink>
            <NavLink to="/">Recent release</NavLink>
            <NavLink to="/">You must watch</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
