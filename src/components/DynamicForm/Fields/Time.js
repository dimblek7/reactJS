import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export default function TimeComp(props) {
  const [focused, setFocused] = React.useState(false);
  const { field, updateData } = props;
  const { value = "", iserr = function() {}, placeholder = "", label = "", helperText = "", className = "" } = field;

  function handleChange(event) {
    updateData({ id: field.id, value: event.target.value });
  }
  return null;
  // return (
  //   <div>
  //     <div>{label}</div>
  //     <Time
  //       type="time"
  //       className={`w-100 ${className}`}
  //       variant="outlined"
  //       onChange={handleChange}
  //       placeholder={placeholder}
  //       value={value}
  //       {...props}
  //       error={iserr({ fielddata: field })}
  //       helperText={focused && helperText}
  //       onFocus={() => setFocused(true)}
  //       onBlur={() => setFocused(false)}
  //     />
  //   </div>
  // );
}
export const timeinputconverter = field => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.Time
  }
];
