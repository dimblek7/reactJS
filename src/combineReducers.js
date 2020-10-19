import { combineReducers } from "redux";
import login from "./containers/login/reducer";
import global from "reducers/global";
import user from "reducers/user";

// Combine all reducers.
const appReducer = combineReducers({
  login,
  user,
  ...global,
});

const rootReducer = (state, action) => {   
   // Clear all data in redux store to initial.
   if(action.type === 'DESTROY_SESSION')
      state = undefined;
   
   return appReducer(state, action);
};

export default rootReducer;