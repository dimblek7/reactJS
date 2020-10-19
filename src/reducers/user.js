import { ReducersTypes } from "../constants/ReducersTypes";

export const user = (
  state = {
    clients: []
  },
  action
) => {
  switch (action.type) {
    case ReducersTypes.USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default user;
