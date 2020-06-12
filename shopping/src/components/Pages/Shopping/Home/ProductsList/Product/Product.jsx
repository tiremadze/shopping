import React from "react";
import { Link } from "react-router-dom";

import Button from "../../../../../General/Button/Button";

import "./product.scss";

const Product = (props) => {
  const { product, onAddToCart } = props;
  return (
    <>
      <div className="product-element">
        {product.isFreeShipping ? (
          <div className="free-shiping">Free shiping</div>
        ) : (
          ""
        )}
        <Link
          to={{ pathname: `/product/${product.id}` }}
          className="product-image"
        >
          <img src={`http://localhost:3000/images/${product.image}`} alt="" />
        </Link>
        <div className="product-title">
          <div className="product-description">
            <p className="product-name">{product.title}</p>
            <p className="product-price">
              {product.price}
              <span>GEL</span>
            </p>
          </div>
          <Button
            onClick={() => onAddToCart(product)}
            caption="Add to cart"
            sign="+"
          />
        </div>
      </div>
    </>
  );
};

export default Product;
