import React from 'react';

const XAxisTick = ({
  payload: { value },
  verticalAnchor,
  visibleTicksCount,
  ...rest
}) => (
  <text
    {...rest}
    style={{ fontSize: "0.7rem" }}
    className="bar-chart-tick"
    dy={12}
  >
    {value}
  </text>
);

export default XAxisTick;
