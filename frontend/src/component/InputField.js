import React from "react";
import "../asset/css/input.css";

const InputField = (props) => {
  const { name, type, placeholder, onChange, value } = props;
  return (
    <div className="mt-2">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input_field"
      />
    </div>
  );
};

export default InputField;
