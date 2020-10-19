import i18n from "./config";

export const getLocaleString = (key, secondaryString) => {
  if (i18n.exists(key)) {
    return i18n.t(key);
  } else if (secondaryString) {
    return secondaryString;
  } else {
    return key || "";
  } 
}