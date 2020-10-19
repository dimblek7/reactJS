import React from "react";
import { instance } from "actions/axiosInstance";
import { setPreview } from ".";
import get from "lodash/get";
import Toaster from "components/Toaster";
import fe_config from "constants/Configs";

export const InvoiceIcon = ({ invoice_number = "" }) => {
  const [isfetchingpdf, setisfetchingpdf] = React.useState(false);
  return (
    (
      <i
        className={`t-28 mt-1 pull-left cursour-pointer ${isfetchingpdf ? "fa fa-spinner fa-spin" : "far fa-file-alt"}`}
        title="View invoice"
        onClick={() => {
          setisfetchingpdf(true);
          instance
            .post(`invoice-attachments`, { invoices: [invoice_number] })
            .then(resp => {
              setisfetchingpdf(false);
              const base64data = JSON.parse(get(resp, "data.result[0].content", ""));
              if(base64data) {
                setPreview({
                  show: true,
                  type: "doc",
                  ext: "pdf",
                  isbase64: true,
                  data: base64data,
                  name: get(resp, "data.name", "")
                });
              } else {
                Toaster("Invoice not available", "error");
              }
            })
            .catch(() => {
              Toaster("Invoice not available", "error");
              setisfetchingpdf(false);
            });
        }}
      />
    )
  );
};

export default InvoiceIcon;
