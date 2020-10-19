import { ReducersTypes } from "../constants/ReducersTypes";
import TokenManager from "utils/TokenManager";

const initsnackbar = {
  ...{
    msg: "",
    variant: "info" // "success", "error", "warning", "info"
  }
};

const snackbar = (state = initsnackbar, action) => {
  switch (action.type) {
    case ReducersTypes.SNACKBAR_MSG:
      return { msg: action.payload };
    case ReducersTypes.SNACKBAR_DATA:
      return { ...state, ...action.payload };
    case ReducersTypes.SNACKBAR_RESET:
      return initsnackbar;
    default:
      return state;
  }
};

const initconfirmationbox = {
  ...{
    msg: "",
    variant: "info", // "success", "error", "warning", "info",
    onSave: null
  }
};

const confirmationbox = (state = initsnackbar, action) => {
  switch (action.type) {
    case ReducersTypes.CONFIRMATION_BOX:
      return { ...state, ...action.payload };
    case ReducersTypes.CONFIRMATION_BOX_RESET:
      return initconfirmationbox;
    default:
      return state;
  }
};

const initemail = {
  ...{
    show: false,
    from: "",
    to: "",
    cc: TokenManager.getUserEmail(),
    subject: "",
    body: "",
    emailTemplateData: [],
    customerVendorName: "",
    files: []
  }
};

const email = (state = initemail, action) => {
  switch (action.type) {
    case ReducersTypes.EMAIL_DATA:
      return { ...state, ...action.payload };
    case ReducersTypes.EMAIL_RESET:
      return initemail;
    default:
      return state;
  }
};

export const dynamicformReducer = (
  state = {
    forms: [],
    count: 0
  },
  action
) => {
  switch (action.type) {
    case ReducersTypes.DYNAMIC_FORM:
      return { ...state, forms: action.payload.forms };
    case ReducersTypes.ADD_DYNAMIC_FORM:
      return { ...state, forms: [...state.forms, ...action.payload.forms], count: state.count + 1 };
    default:
      return state;
  }
};

const initpreview = {
  show: false,
  type: "", // doc, policy, info
  data: "",
  name: "",
  isbase64: false,
  ext: ""
};

export const preview = (
  state = initpreview,
  action
) => {
  switch (action.type) {
    case ReducersTypes.PREVIEW_DOCUMENT:
      return { ...state, ...action.payload };
    case ReducersTypes.RESET_PREVIEW_DOCUMENT:
      return { ...initpreview };
    default:
      return state;
  }
};

export default {
  snackbar,
  confirmationbox,
  email,
  dynamicformReducer,
  preview,
};
