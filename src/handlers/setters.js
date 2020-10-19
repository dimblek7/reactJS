import get from "lodash/get";
import TokenManager from "utils/TokenManager";
import Toaster from "components/Toaster";
import { store } from "store";

export const clearRedux = () => {
  store.dispatch({ type: 'DESTROY_SESSION' });
}

export const logout = () => {
  /* Set current tab data */
  if (window.location.pathname !== "/login") {
    const url=`${window.location.pathname}${window.location.hash}`;
    window.sessionStorage.setItem("loggedOutInSameSession", url);
    window.sessionStorage.setItem("loggedoutUser", TokenManager.getUserId());
  }
  /* Set other open tabs data */
  window.localStorage.setItem("loggedout", TokenManager.getUserId());
  localStorage.clear();
  clearRedux();
  /* wait for localStorage to be cleared */
  setTimeout(() => {
    window.location.pathname !== "/login" && window.open(`${window.location.origin}/login`, "_self");
  }, 200);
};

export const handleAPIError = (e, display_error=false) => {
  // "Request failed with status code 401"
  console.log("API e: ", JSON.stringify(e));
  let error_message = get(get(get(e, "response"), "data"), "message")
  if (display_error && error_message && typeof error_message == "string")
    Toaster(error_message, "error");
  if (get(e, "message", "-").includes("401")) logout();
};
