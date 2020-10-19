import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { getLocaleString } from "utils/localization/locale";

export const CustomSpinner = ({ isfullscreen }) => {
  return (
    <div className={`card-body w-100 text-center pt-5 mt-5 ${isfullscreen && "vh-100"}`}>
      <Spinner animation="border" role="status">
        <span className="sr-only">{getLocaleString("common.spinner.loading")}</span>
      </Spinner>
    </div>
  );
};

export default CustomSpinner;
