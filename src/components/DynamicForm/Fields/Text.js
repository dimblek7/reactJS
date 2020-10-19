import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export default function TextComp(props) {
  const [focused, setFocused] = React.useState(false);
  const { field, updateData } = props;
  const {
    value = "",
    iserr = function() {},
    placeholder = "",
    label = "",
    helperText = "",
    className = "",
    disabled = false,
    maxLength = null,
    id = "text"
  } = field;
  function handleChange(event) {
    updateData({ id: field.id, value: event.target.value });
  }
  const inputClass = iserr({ fielddata: field }) ? "form-control is-invalid" : "form-control";
  const labelClass = iserr({ fielddata: field }) ? "text-danger" : "";

  return (
    <div>
      <div className={`${labelClass}`}>{label}</div>
      <input
        className={inputClass}
        type="text"
        id={id}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        error={iserr({ fielddata: field })}
        helperText={focused && helperText}
        disabled={disabled}
        maxlength={maxLength}
      />
    </div>
  );
}

export const textinputconverter = field => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.Text
  }
];
