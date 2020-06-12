import React from "react";
import "./select.scss";

const Select = (props) => {
  const { options, ...rest } = props;
  return (
    <select
      className="select"
      //onChange={(event) => onSort(event.currentTarget.value)}
      {...rest}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
