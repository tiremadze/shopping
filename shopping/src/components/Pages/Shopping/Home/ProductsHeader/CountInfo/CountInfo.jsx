import React from "react";
import "./count-info.scss";

const CountInfo = (props) => {
  const { productsCount } = props;
  return (
    <div className="count-part">
      <div className="found-products">{productsCount}</div>
      <p>Product found</p>
    </div>
  );
};

export default CountInfo;
