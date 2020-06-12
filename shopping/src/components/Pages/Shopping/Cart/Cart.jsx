import React from "react";

import CartItem from "./CartItem/CartItem";
import EmptyCart from "./EmptyCart/EmptyCart";

import "./cart.scss";

function getCartItemsView(cartData) {
  if (cartData) {
    return (
      <>
        <div className="cart-items-block">
          {cartData.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={cartData.onIncrement}
              onDecrement={cartData.onDecrement}
              onDelete={cartData.onDelete}
            />
          ))}
        </div>

        <div className="total-amount-block">
          <p className="total-amount">total:</p>
          <span>{cartData.totalAmount} gel</span>
        </div>
      </>
    );
  }

  return <EmptyCart />;
}

const Cart = (props) => {
  const { items, onDelete, onIncrement, onDecrement } = props;

  let cartData = null;

  if (items.length > 0) {
    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.count * item.price;
    }
    cartData = {
      items,
      onDelete,
      onIncrement,
      onDecrement,
      totalAmount,
    };
  }

  return (
    <div className="cart-section">
      <h1>cart</h1>
      {getCartItemsView(cartData)}
    </div>
  );
};

export default Cart;
