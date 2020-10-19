import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./combineReducers";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistenceConfigs = {
  key: "sinhagad", // whatever you want to keep as your key
  storage,
  whitelist: ["user"]
};
const persistedReducer = persistReducer(persistenceConfigs, reducers);
const middleware = [thunk, createLogger({ collapsed: true, duration: true })];
export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistedStore = persistStore(store);
// export default { store, persistedStore: persistStore(store) };
