import get from "lodash/get";

export function authoriseUser(auth) {
  const path = window.location.pathname;
  if (!get(auth, "token", "") && path !== "/login") {
    window.open("/login", "_self");
  } else if (get(auth, "token", "") && path === "/login") {
    window.open("/dashboard", "_self");
  }
}
