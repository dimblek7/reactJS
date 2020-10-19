import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export default function IntegerComp(props) {
  const [focused, setFocused] = React.useState(false);
  const { field, updateData } = props;
  const {
    value = "",
    iserr = () => {},
    placeholder = "",
    label = "",
    helperText = "enter valid number",
    className = "",
    disabled = false,
    min = 0,
    max = null
  } = field;

  function handleChange(event) {
    updateData({ id: field.id, value: event.target.value ? parseInt(event.target.value) : null });
    // let valuetemp = event.target.value;
    // console.log("valuetemp: ", valuetemp);
    // valuetemp = valuetemp ? parseInt(valuetemp.replace(".", "")) : "";
    // if ((min != null ? valuetemp >= min : true) && (max ? valuetemp <= max : true)) {
    //   updateData({
    //     id: field.id,
    //     value: valuetemp ? Math.trunc(valuetemp) : valuetemp
    //   });
    // } else {
    //   updateData({ id: field.id, value: "" });
    // }
  }

  const tempprops = { ...props };
  max && (tempprops.max = max);
  min && (tempprops.min = min);
  const inputClass = iserr({ fielddata: field }) ? "form-control is-invalid" : "form-control";
  const labelClass = iserr({ fielddata: field }) ? "text-danger" : "";

  return (
    <div>
      <div className={`${labelClass}`}>{label}</div>
      <input
        className={inputClass}
        type="number"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        error={iserr({ fielddata: field })}
        min={min}
        max={max}
        helperText={focused && helperText}
      />
    </div>
  );
}

export const integerinputconverter = field => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.Integer
  }
];
