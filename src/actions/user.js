import { instanceWithRetry } from "actions/axiosInstance";
import { ReducersTypes } from "constants/ReducersTypes";
import get from "lodash/get";
import { store } from "store";

export const initClients = () => {
  return;
  const _store = store.getState();
  if (!get(_store, "user.clients[0]", "")) {
    instanceWithRetry.get("client/accessible").then((resp) => {
      store.dispatch(setUserData({clients: resp.data.result}));
    });
  }
};

export const initCorporateEntities = () => {
  return;
  const _store = store.getState();
  if (!get(_store, "user.corporateEntities[0]", "")) {
    instanceWithRetry.get("user/entities").then((resp) => {
      store.dispatch(setUserData({corporateEntities: resp.data.result}));
    });
  }
};

export const refreshClients = () => {
  return;
  instanceWithRetry.get("client/accessible").then((resp) => {
    store.dispatch(setUserData({clients: resp.data.result}));
  });
};

export const refreshCorporateEntities = () => {
  instanceWithRetry.get("user/entities").then((resp) => {
    store.dispatch(setUserData({corporateEntities: resp.data.result}));
  });
};

export const setUserData = (data) => {
  return {
    type: ReducersTypes.USER,
    payload: data,
  };
};
