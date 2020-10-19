import { ReducersTypes } from "../constants/ReducersTypes";

export const auth = (
  state = {
    token: "-"
  },
  action
) => {
  switch (action.type) {
    case ReducersTypes.AUTH:
      return { data: action.payload.data };
    default:
      return state;
  }
};

export default { auth };
