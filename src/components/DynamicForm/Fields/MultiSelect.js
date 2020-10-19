import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export const MultiSelectComp = props => {
  const [focused, setFocused] = React.useState(false);

  const { field, updateData } = props;
  const {
    value = [],
    iserr = function() {},
    placeholder = "",
    label = "",
    helperText = "",
    options,
    disabled = false,
    idonly = false
  } = field;

  function handleChange(selectedOptions) {
    if (idonly) {
      updateData({ id: field.id, value: selectedOptions ? selectedOptions.map(x => x.displayvalue) : [] });
    } else {
      updateData({ id: field.id, value: selectedOptions });
    }
  }
  return null;
  // return (
  //   <div>
  //     <div>{label}</div>
  //     <MultiSelect
  //       className="w-100"
  //       getOptionLabel={(option) => option.displayname}
  //       getOptionValue={(option) => option.displayvalue}
  //       variant="outlined"
  //       options={options || []}
  //       onChange={handleChange}
  //       isMulti
  //       helperText={focused && helperText}
  //       value={idonly ? options.filter((x) => value && value.findIndex((y) => y == x.displayvalue) != -1) : value}
  //       placeholder={placeholder}
  //       error={iserr({ fielddata: field })}
  //       {...props}
  //       isDisabled={disabled}
  //       onFocus={() => setFocused(true)}
  //       onBlur={() => setFocused(false)}
  //     />
  //   </div>
  // );
};

export default MultiSelectComp;

export const multiselectinputconverter = field => [
  {
    ...initjson,
    value: [],
    ...field,
    typeid: KEYS.MultiSelect
  }
];
