import React from "react";

import ListGroup from "../../../../General/ListGroup/ListGroup";
import Select from "../../../../General/Select/Select";
import CountInfo from "./CountInfo/CountInfo";

import "./products-header.scss";

const ProductsHeader = (props) => {
  let { sizeFilter, productsCount, sort } = props;

  // const history = useHistory();

  // const handleSizeSelect = (size) => {
  //   //const query = size._id ?  : "";
  //   history.push(`?size=${size._id}`);
  //   sizeChange(size);
  // };

  const handleOrderChange = (event) => {
    onSort(event.target.value);
  };

  const { sizes, selectedSizes, onSizeSelect } = sizeFilter;
  const { orderOptions, onSort } = sort;

  return (
    <div className="section-title">
      <div className="size-part">
        <p>Size:</p>
        <ListGroup
          selectedItems={selectedSizes}
          onItemSelect={onSizeSelect}
          items={sizes}
        />
      </div>
      <CountInfo productsCount={productsCount} />
      <div className="sort-part">
        <Select onChange={handleOrderChange} options={orderOptions} />
      </div>
    </div>
  );
};

export default ProductsHeader;
