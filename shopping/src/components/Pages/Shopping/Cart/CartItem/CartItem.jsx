import React from "react";
import "./cart-item.scss";

const CartItem = (props) => {
  const { item, onDelete, onIncrement, onDecrement } = props;
  const { image, title, price, count } = item;

  return (
    <>
      <div className="cart-item">
        <div className="image-container">
          <img src={`http://localhost:3000/images/${image}`} alt="" />
        </div>
        <div className="item-description">
          <div className="item-description-left">
            <h3>{title}</h3>
            <div className="price">
              <span>price:</span>
              <p>{price} gel</p>
            </div>
            <div className="total">
              <span>total:</span>
              <p>{price * count} gel</p>
            </div>
          </div>
          <div className="item-description-right">
            <div onClick={() => onDelete(item)} className="remove-button">
              remove
            </div>
            <div className="counter">
              <div onClick={() => onDecrement(item)} className="decrement">
                -
              </div>
              <div className="count">{count}</div>
              <div onClick={() => onIncrement(item)} className="increment">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
