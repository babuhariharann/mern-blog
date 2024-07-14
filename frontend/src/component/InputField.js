import React, { memo } from "react";
import "../asset/css/input.css";

const InputField = memo((props) => {
  const { name, type, placeholder, onChange, value } = props;
  return (
    <div className="mt-2">
      <h5>{(Math.random() * 100).toFixed()}</h5>
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
});

export default InputField;
