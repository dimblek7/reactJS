import get from "lodash/get";
import fe_config from "constants/Configs";

export default class TokenManager {
  static get() {
    return localStorage.getItem("auth");
  }

  static set(idToken, expired_at) {
    if (idToken) {
      // let expired_at_in_seconds = Math.round(new Date(expired_at).getTime() / 1000);
      const SESSION_LENGTH = fe_config.MODE === "PROD" ? (30 * 60 * 1000 - 10 * 1000) : (5 * 60 * 1000 - 10 * 1000);
      let expired_at_in_seconds = Math.round(new Date().getTime()) + SESSION_LENGTH;
      localStorage.setItem("expired_at", expired_at_in_seconds);
      localStorage.setItem("auth", idToken);
    }
  }

  static remove() {
    localStorage.removeItem("auth");
  }

  static setUserName(userName, userid) {
    if (userName) {
      localStorage.setItem("username", userName);
      localStorage.setItem("userid", userid);
    }
  }

  static setUserData(userData) {
    if (userData) {
      localStorage.setItem("loggedInUserData", JSON.stringify(userData));
    }
  }
  static getUserData() {
    return localStorage.getItem("loggedInUserData") || "{}";
  }

  static getUserEmail() {
    const userData = JSON.parse(localStorage.getItem("loggedInUserData") || "{}");
    return get(userData, "email", "");
  }

  static getClientName() {
    const userData = JSON.parse(localStorage.getItem("loggedInUserData") || "{}");
    return get(userData, "client_name", "");
  }

  static getClientId() {
    const userData = JSON.parse(localStorage.getItem("loggedInUserData") || "{}");
    return get(userData, "client_id", "");
  }

  static getCorporateEntityId() {
    return JSON.parse(localStorage.getItem("corporateEntityContext") || null);
  }

  static getIsGroupAdmin() {
    const loggedInUserData = JSON.parse(TokenManager.getUserData());
    return get(loggedInUserData, "roles", []).includes("groupadmin") || get(loggedInUserData, "roles", []).includes("payadmin") || get(loggedInUserData, "role", "") === 1 || get(loggedInUserData, "role", "") === 2;
  }

  static getIsAdmin() {
    const loggedInUserData = JSON.parse(TokenManager.getUserData());
    return !get(loggedInUserData, "roles", []).includes("user") || !get(loggedInUserData, "role", "") === 3;
  }

  static getIsPayAdmin() {
    const loggedInUserData = JSON.parse(TokenManager.getUserData());
    return get(loggedInUserData, "roles", []).includes("payadmin");
  }

  static getIsEntityAdmin() {
    const loggedInUserData = JSON.parse(TokenManager.getUserData());
    return get(loggedInUserData, "roles", []).includes("entityadmin");
  }

  static getUserName() {
    return localStorage.getItem("username");
  }
  static getExpiredAt() {
    return localStorage.getItem("expired_at");
  }
  static getUserId() {
    return localStorage.getItem("userid");
  }
}
