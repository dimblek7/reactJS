import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";

export const SelectComponent = props => {
  const [focused, setFocused] = React.useState(false);

  const { field, updateData } = props;
  const {
    value = "",
    iserr = function() {},
    placeholder = "Select",
    label = "Select",
    helperText = "",
    options = [],
    disabled = false,
    onChange
  } = field;

  function handleChange(selectedOption) {
    updateData({ id: field.id, value: selectedOption.target.value });
    onChange && onChange(selectedOption.target.value);
  }
  const inputClass = iserr({ fielddata: field }) ? "form-control is-invalid" : "form-control";
  const labelClass = iserr({ fielddata: field }) ? "text-danger" : "";

  return (
    <div>
      <div className={`${labelClass}`}>{label}</div>
      <select
        className={inputClass}
        onChange={handleChange}
        placeholder={placeholder}
        error={iserr({ fielddata: field })}
        helperText={focused && helperText}
        isDisabled={disabled}
        disabled={disabled}
        value={value}
      >
        <option value="">Select</option>
        {options.map(x => (
          <option value={x.id}>{x.name}</option>
        ))}
      </select>
      {/* <Dropdown
        className="w-100"
        getOptionLabel={(option) => option.displayname}
        getOptionValue={(option) => option.displayvalue}
        variant="outlined"
        options={options}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={selectedOption || null}
      /> */}
    </div>
  );
};

export default SelectComponent;

export const selectinputconverter = field => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.Select
  }
];
