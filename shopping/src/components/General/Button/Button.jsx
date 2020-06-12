import React from "react";
import "./button.scss";

const Button = (props) => {
  const { caption, sign, ...rest } = props;
  return (
    <button {...rest} className="button">
      <span>{sign}</span>
      <p>{caption}</p>
    </button>
  );
};

export default Button;
