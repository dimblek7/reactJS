import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export default function TextComp(props) {
  const [focused, setFocused] = React.useState(false);
  const { field, updateData } = props;
  const { value = "", iserr = function () {}, placeholder = "", label = "", helperText = "" } = field;
  function handleChange(event) {
    updateData({ id: field.id, value: event.target.value });
  }
  return (
    <div>
      <div>{label}</div>
      <input
        type="file"
        className="w-100 form-control"
        variant="outlined"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        error={iserr({ fielddata: field })}
        helperText={focused ? helperText : ""}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export const imageinputconverter = (field) => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.ImageInput,
  },
];
