import { ReducersTypes } from "../../constants/ReducersTypes";

export const login = (
  state = {
    data: "kiran",
  },
  action,
) => {
  switch (action.type) {
    case ReducersTypes.LOGIN:
      return { data: action.payload.data };
    default:
      return state;
  }
};

export default { login };
