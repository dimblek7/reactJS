import React from "react";

const RangeSlider = ({ value = 0, min=0, max=10, step=1, onChange }) => {
  return (
    <input
      type="range"
      className="custom-range"
      id="customRange"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
};

export default RangeSlider;
