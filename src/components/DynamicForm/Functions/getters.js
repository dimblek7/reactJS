import get from "lodash/get";
import { store } from "../../../store";
import { ReducersTypes } from "constants/ReducersTypes";
import Toaster from "components/Toaster";

export const fetchAllFormsFunction = () => {
  const _store = store.getState();
  return get(_store, "dynamicformReducer.forms", []);
};

export const fetchMyFormFunction = formKey => {
  const _store = store.getState();
  const res = get(_store, "dynamicformReducer.forms", []).find(form => form.formKey === formKey);
  return res;
};

// sets showAllErr flag in selected dynamic form
export const showAllErrorsFunction = formKey => {
  let myForm;
  const forms = fetchAllFormsFunction();
  const formIndex = forms.findIndex(form => form.formKey === formKey);
  if (formIndex != -1) {
    myForm = forms[formIndex];
    myForm.fields = myForm.fields.map(field => ({ ...field, showAllErr: true }));
    forms[formIndex] = myForm;
  }
  store.dispatch({ type: ReducersTypes.DYNAMIC_FORM, payload: { forms } });
  // also returns value if required
  return myForm.fields;
};

export const validateMyFormFunction = ({ formKey }) => {
  const fields = showAllErrorsFunction(formKey);
  if (fields) {
    let error = "";
    fields.forEach(field => {
      if (field.iserr({ fielddata: field }) && !error) {
        error = field.errorText || "Please fill required fields";
        Toaster(error, "error");
        showAllErrorsFunction(formKey);
      }
    });
    return { error, fields };
  }
  return { error: "Please fill required fields" };
};

export const deleteMyFormFunction = formKey => {
  const _store = store.getState();
  const forms = get(_store, "dynamicformReducer.forms", []).filter(form => form.formKey !== formKey);
  store.dispatch({ type: ReducersTypes.DYNAMIC_FORM, payload: { forms } });
};
