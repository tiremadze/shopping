import React from "react";
import { Link } from "react-router-dom";

import BurgerNavigation from "./BurgerNavigation/BurgerNavigation";
import CartButton from "./CartButton/CartButton";

import "./header.scss";

const Header = (props) => {
  const { cartCount } = props;

  return (
    <header className="header">
      <div className="header-part">
        <BurgerNavigation />
        <Link to="/" className="brand">
          <div className="logo">
            <img
              src={"http://localhost:3001/product-images/logo.png"}
              alt="logo"
            />
          </div>
        </Link>
        <CartButton count={cartCount} />
      </div>
    </header>
  );
};

export default Header;
