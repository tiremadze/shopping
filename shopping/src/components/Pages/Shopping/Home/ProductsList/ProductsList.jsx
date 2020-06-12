import React from "react";
import Product from "./Product/Product";
import "./product-list.scss";

const ProductsList = (props) => {
  const { products, onAddToCart } = props;

  if (products.length === 0) return <p>There are no products.</p>;
  return (
    <div className="product-section">
      <div className="product-block">
        {products.map((product) => (
          <Product
            key={product.id}
            onAddToCart={onAddToCart}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
