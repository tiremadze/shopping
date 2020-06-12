import React from "react";
import ProductsHeader from "./ProductsHeader/ProductsHeader";
import ProductsList from "./ProductsList/ProductsList";

const Home = (props) => {
  const { headerData, productData } = props;

  const { sizeFilter, sort } = headerData;
  const { products, onAddToCart } = productData;
  const productsCount = products.length;

  return (
    <>
      <ProductsHeader
        sizeFilter={sizeFilter}
        productsCount={productsCount}
        sort={sort}
      />
      <ProductsList products={products} onAddToCart={onAddToCart} />
    </>
  );
};

export default Home;
