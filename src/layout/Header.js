import React from "react";
import "../styles/css/Header.css";
const Header = () => {
  return (
    <h1 className="Head__title">
      {`your application for posts`.toUpperCase()}
    </h1>
  );
};

export default Header;
