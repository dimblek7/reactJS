import React from "react";
import { getShortNumber } from "utils";

const CustomToolTip = props => {
  const { active, payload, label, noCurrencyKeys = [], hideItems } = props;
  if (!active || !payload) {
    return null;
  }
  let toolTipItems = hideItems && hideItems.length ?  payload.filter(d => !hideItems.includes(d.name)): payload;
  return (
    <div className="custom-tooltip bg-white border p-3">
      <p>
        <strong>{label}</strong>
      </p>
      {toolTipItems.map((item, i) => {
        const hideCurrency = noCurrencyKeys.find(x => x === item.dataKey);
        return (
          <span key={i} className="d-block mb-1">
            <span style={{ color: item.color }}>{item.name}: </span>
            <span>{typeof item.value === "number" ? getShortNumber(item.value, !hideCurrency) : item.value}</span>
          </span>
        );
      })}
    </div>
  );
};

export default CustomToolTip;
