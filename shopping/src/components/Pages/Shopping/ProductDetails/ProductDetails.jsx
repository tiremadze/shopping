import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../../General/Button/Button";

import { getProductById } from "../../../../services/product-service";

import "./product-details.scss";

const ProductDetails = (props) => {
  const { id } = useParams();

  const { onAddToCart } = props;

  const [product, setProduct] = useState({
    availableSizes: [],
  });

  useEffect(() => {
    getProductById(id).then((p) => {
      setProduct(p.data);
    });
  }, [id]);

  return (
    <div className="product-detalis-section">
      <div className="details-img">
        <img
          src={
            product.image ? `http://localhost:3000/images/${product.image}` : ""
          }
          alt=""
        />
      </div>
      <div className="product-details">
        <div>
          <h3>{product.title}</h3>
          <div className="product-details-description">
            {product.description}
          </div>
          <div className="price">
            {product.price} <span>Gel</span>
          </div>
          <div className="size-path">
            <p>Size:</p>

            {product.availableSizes.map((s) => (
              <div key={s} className="sizes ">
                {s}
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={() => onAddToCart(product)}
          caption="Add to cart"
          sign="+"
        />
      </div>
    </div>
  );
};

export default ProductDetails;
