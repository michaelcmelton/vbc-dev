import React from "react";

const Input = (props) => {
  return props.label ? (
      <div>
          <label for={props.name}>{props.label}:</label>
          <input
      onChange={props.changeHandler}
      type={props.type}
      id={props.name}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      required={props.required ? true : null}
    />
      </div>
  ) : <input
  onChange={props.changeHandler}
  type={props.type}
  id={props.name}
  name={props.name}
  placeholder={props.placeholder}
  value={props.value}
  required={props.required ? true : null}
/>;
};

export default Input;
