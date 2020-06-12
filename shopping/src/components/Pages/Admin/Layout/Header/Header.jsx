import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-light fixed-top">
      <Link to="/admin" className="navbar-brand text-danger">
        Shopping Admin
      </Link>
    </nav>
  );
};

export default Header;
