import { ReducersTypes } from "constants/ReducersTypes";

export const setDynamicForm = (data) => ({
    type: ReducersTypes.DYNAMIC_FORM,
    payload: data,
  });
  
  export const addDynamicForm = (data) => ({
    type: ReducersTypes.ADD_DYNAMIC_FORM,
    payload: data,
  });
