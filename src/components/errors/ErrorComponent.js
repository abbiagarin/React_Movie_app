import React from "react";
import { NavLink } from "react-router-dom";

const ErrorComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "50vh",
      }}
    >
      <h2 style={{ color: "red", fontSize: "2rem" }}>
        Requested URL Not Found 😭. Try again later!! <br></br>
        <NavLink to="/" style={{ fontSize: "1rem" }}>
          Back to HomePage
        </NavLink>
      </h2>
    </div>
  );
};

export default ErrorComponent;
