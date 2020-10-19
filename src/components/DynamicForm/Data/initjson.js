export default {
  typeid: null,
  id: null,
  value: null,
  required: false,
  options: null,
  placeholder: "Enter",
  label: "",
  helperText: "",
  defaultValue: "",
  disabled: false,
  isDisabled: false,
  iserr: ({ fielddata }) => {
    const { showAllErr, required, value, customiserr } = fielddata;
    if (customiserr && customiserr({ fielddata }) === true) {
      return true;
    } else if (showAllErr && required && !value && typeof value !== "boolean" && value !== 0) {
      return true;
    }
    return false;
  },
};
