import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export default function DateTimeComp(props) {
  const [focused, setFocused] = React.useState(false);
  const { field, updateData } = props;
  const {
    value = "",
    iserr = function() {},
    placeholder = "",
    label = "",
    helperText = "",
    min = null,
    max = null
  } = field;

  function handleChange(event) {
    updateData({ id: field.id, value: event.value });
  }

  return null;
  // return (
  //   <div>
  //     <div>{label}</div>
  //     <DateTime
  //       className="w-100"
  //       change={handleChange}
  //       placeholder={placeholder}
  //       value={value}
  //       {...props}
  //       error={iserr({ fielddata: field })}
  //       helperText={focused && helperText}
  //       onFocus={() => setFocused(true)}
  //       onBlur={() => setFocused(false)}
  //       min={min}
  //       // max={max}
  //     />
  //     {/* {iserr({ fielddata: field }) && <p className="input-label-err">invalid</p>} */}
  //   </div>
  // );
}

export const datetimeinputconverter = field => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.DateTime
  }
];
