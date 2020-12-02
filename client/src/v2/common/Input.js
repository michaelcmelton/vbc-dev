import React from "react";

const Input = (props) => {
  return (
      <div>
          <label for={props.name}>{props.label}:</label>
          <input
      type={props.type}
      id={props.name}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      required={props.required ? true : null}
    />
      </div>
  );
};

export default Input;
