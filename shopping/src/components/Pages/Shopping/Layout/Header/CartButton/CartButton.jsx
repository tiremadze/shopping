import React from "react";
import { Link } from "react-router-dom";
import "./cartButton.scss";

const CartButton = ({ count }) => {
  return (
    <Link to="/cart">
      <div className="cart-btn">
        <div className="cart-icon">
          {/* <i className="fas fa-shopping-bag"></i> */}

          <img
            src={
              "http://localhost:3001/product-images/icons/iconmonstr-shopping-bag-4.svg"
            }
            alt=""
          />
        </div>
        <div className="cart-items"> {count}</div>
      </div>
    </Link>
  );
};

export default CartButton;
