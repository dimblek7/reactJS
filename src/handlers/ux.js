import get from "lodash/get";
import { instanceWithRetry } from "actions/axiosInstance";
import { ReducersTypes } from "constants/ReducersTypes";
import { store } from "store";
import TokenManager from "utils/TokenManager";

export const ux_refresh   = (data) => {
  instanceWithRetry.get("user/instance").then((resp) => {
    const data = { data_from_api: get(resp, "data.result", []) };
    get(resp, "data.result", [])
      .filter((x) => x.ux_type)
      .forEach((obj) => {
        data[obj.ux_type] = obj.value;
      });
    store.dispatch({
      type: ReducersTypes.SET_UX,
      payload: data,
    });
  });
};

export const ux_setbool = (key) => {
  let _value = getuxvalue(key);
  _value = ux_istrue(_value);
  _value = _value ? "0" : "1";

  store.dispatch({
    type: ReducersTypes.SET_UX,
    payload: { [key]: _value },
  });
  const uxid = getuxid(key);
  if (uxid) {
    instanceWithRetry
      .post("user/instance?id=" + uxid, {
        value: _value,
      })
      .then(ux_refresh  );
  } else {
    instanceWithRetry
      .post("user/instance", {
        ux_type: key,
        value: _value,
        user_id: TokenManager.getUserId(),
      })
      .then(ux_refresh  );
  }
};

export const setux = (key, value) => {
  store.dispatch({
    type: ReducersTypes.SET_UX,
    payload: { [key]: value },
  });
  const uxid = getuxid(key);
  if (uxid) {
    instanceWithRetry.post("user/instance?id=" + uxid, { value }).then(ux_refresh  );
  } else {
    instanceWithRetry
      .post("user/instance", {
        ux_type: key,
        value: value,
        user_id: TokenManager.getUserId(),
      })
      .then(ux_refresh  );
  }
};

export const resetux = () => {
  store.dispatch({
    type: ReducersTypes.RESET_UX,
  });
};

export const uxempty = () => {
  const _store = store.getState();
  return !get(_store, `ux.data_from_api`, "");
};

export const ux_istrue = (value) => value == 1 ? true : false;

export const getuxvalue = (key) => {
  const _store = store.getState();
  const data_from_api = get(_store, `ux.data_from_api`, []);
  const result = get(
    data_from_api.find((x) => x.ux_type === key),
    "value",
    get(_store, `ux[${key}]`, '')
  );
  return result;
};

export const getuxid = (key) => {
  const _store = store.getState();
  const data_from_api = get(_store, `ux.data_from_api`, []);
  return get(
    data_from_api.find((x) => x.ux_type === key),
    "id",
    ""
  );
};
