import React from "react";
import { getShortNumber } from "utils";
import get from "lodash/get";

const PieChartTooltip = props => {
  const { active, payload, label, noCurrencyKeys = [] } = props;
  if (!active || !payload) {
    return null;
  }
  return (
    <div className="custom-tooltip bg-white border p-3">
      <p>
        <strong>{label}</strong>
      </p>
      {payload.map((item, i) => {
        console.log('payload: ', payload);
        const hideCurrency = noCurrencyKeys.find(x => x === item.dataKey);
        return (
          <span key={i} className="d-block mb-1">
            <span style={{ color: get(item, "payload.color", "#fff") }}>{item.name}: </span>
            <span>{typeof item.value === "number" ? getShortNumber(item.value, !hideCurrency) : item.value}</span>
          </span>
        );
      })}
    </div>
  );
};

export default PieChartTooltip;
