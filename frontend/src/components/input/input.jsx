import React, { useState } from "react";
import "./input.css";

function Input({ onchange, label, name }) {
  const [showLabel, setShowLabel] = useState(false);
  const isEmpty = (e) => {
    if (e.target.value == "") {
      setShowLabel(false);
    } else {
      setShowLabel(true);
    }
  };

  return (
    <div className="flex column input ">
      <label
        htmlFor={name}
        className={showLabel ? "label-class" : "none-opacity"}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={label}
        onChange={(e) => {
          onchange(e);
          isEmpty(e);
        }}
      />
    </div>
  );
}

export default Input;
