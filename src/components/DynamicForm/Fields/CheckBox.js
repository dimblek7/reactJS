import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export default function TextComp(props) {
  // const [focused, setFocused] = React.useState(false);
  const { field, updateData } = props;
  const {
    value = false,
    iserr = function() {},
    placeholder = "",
    label = "",
    helperText = "",
    disabled = false
  } = field;

  function handleChange(event) {
    !disabled && updateData({ id: field.id, value: !value });
  }

  return (
    <div>
      <input
        type="checkbox"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        checked={value}
        disabled={disabled}
        error={iserr({ fielddata: field })}
      />
      <p className="cursour-pointer" onClick={handleChange}>
        {label}
      </p>
    </div>
  );
}

export const checkboxinputconverter = field => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.CheckBox
  }
];
