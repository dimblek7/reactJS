import React from "react";
import initjson from "../Data/initjson";
import KEYS from "../KEYS";
import SingleDatePicker from "components/PopperSingleDatePicker";
import moment from "moment";
// import { getUserDateFormat } from "../../../Utils/dates";

export default function DateComp(props) {
  let dateRef = null;
  // eslint-disable-next-line no-unused-vars
  const [focused, setFocused] = React.useState(false);
  const { field, updateData } = props;
  const {
    value = "",
    iserr = function() {},
    placeholder = "",
    label = "",
    helperText = "",
    min = null,
    max = null,
    className = ""
  } = field;

  function handleChange(newvalue) {
    updateData({ id: field.id, value: newvalue });
  }

  const inputClass = iserr({ fielddata: field }) ? "form-control is-invalid" : "form-control";
  const labelClass = iserr({ fielddata: field }) ? "text-danger" : "";

  return (
    <div className={`${className} single-date-picker`}>
      <div className={`${labelClass}`}>{label}</div>
      <SingleDatePicker
        labelFormat="MMM DD, YYYY"
        startDate={value ? moment(value) : undefined}
        getSelectedDates={(date) => date && handleChange(date.format("YYYY-MM-DD"))}
      />
    </div>
  );
}

export const dateinputconverter = field => [
  {
    ...initjson,
    ...field,
    typeid: KEYS.Date
  }
];
