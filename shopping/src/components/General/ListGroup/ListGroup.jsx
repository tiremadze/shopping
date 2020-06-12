import React from "react";
import "./listGroup.scss";

const ListGroup = (props) => {
  const {
    selectedItems,
    onItemSelect,
    items,
    valueProperty,
    textProperty,
  } = props;

  return (
    <ul className="group-container">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            selectedItems.find((s) => s._id === item._id) ? "active" : ""
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default ListGroup;
