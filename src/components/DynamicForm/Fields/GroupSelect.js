import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export const Component = props => {
  const [focused, setFocused] = React.useState(false);

  const { field, updateData } = props;
  const { value = "", iserr = function() {}, placeholder = "", label = "", helperText = "", options } = field;

  function handleChange(selectedOption) {
    updateData({ id: field.id, value: selectedOption.displayvalue });
  }

  const selectedOption = options.find(opt => opt.displayvalue == value);
  console.log("selectedOption: ", selectedOption);

  return null;
  // return (
  //   <div>
  //     <div>{label}</div>
  //     <Dropdown
  //       className="w-100"
  //       getOptionLabel={(option) => option.displayname}
  //       getOptionValue={(option) => option.displayvalue}
  //       variant="outlined"
  //       options={options}
  //       onChange={handleChange}
  //       placeholder={placeholder}
  //       error={iserr({ fielddata: field })}
  //       helperText={focused && helperText}
  //       {...props}
  //       onFocus={() => setFocused(true)}
  //       onBlur={() => setFocused(false)}
  //       value={selectedOption || null}
  //     />
  //   </div>
  // );
};

export default Component;

export const groupselectinputconverter = field => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.Select
  }
];
