import React from "react";
import { toast } from "react-toastify";

const Toaster = (message, type, time) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: time || 2500
      });
      break;
    case "error":
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: time || 2500
      });
      break;
    case "info":
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: time || 2500
      });
      break;
    default:
      toast("Default Notification !");
      break;
  }
};

export default Toaster;
