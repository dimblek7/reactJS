import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export default function TextAreaComp(props) {
  const [focused, setFocused] = React.useState(false);
  const { field, updateData } = props;
  const {
    value = "",
    iserr = function() {},
    error = false,
    placeholder = "",
    label = "",
    helperText = "",
    className = "",
    disabled = false
  } = field;
  function handleChange(event) {
    updateData({ id: field.id, value: event.target.value });
  }
  return null;
  // return (
  //   <div>
  //     <div>{label}</div>
  //     <TextArea
  //       multiline
  //       className={`w-100 ${className}`}
  //       variant="outlined"
  //       value={value}
  //       onChange={handleChange}
  //       placeholder={placeholder}
  //       error={error || iserr({ fielddata: field })}
  //       helperText={focused ? helperText : ""}
  //       {...props}
  //       disabled={disabled}
  //       onFocus={() => setFocused(true)}
  //       onBlur={() => setFocused(false)}
  //     />
  //   </div>
  // );
}

export const textareainputconverter = field => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.TextArea
  }
];
