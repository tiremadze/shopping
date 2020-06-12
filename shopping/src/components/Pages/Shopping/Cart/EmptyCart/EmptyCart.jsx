import React from "react";
import "./empty-cart.scss";

const EmptyCart = () => {
  return (
    <div className="empty-block">
      <div className="empty-img">
        <img src={"./product-images/icons/shopping-bag-empy.svg"} alt="" />
      </div>
      <p>Cart is empty</p>
    </div>
  );
};

export default EmptyCart;
