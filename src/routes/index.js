import { instance } from "actions/axiosInstance";
import ConfirmationBox from "components/ConfirmationBox";
import EmailCreator from "components/Email/EmailCreator";
import Preview from "components/Preview";
import fe_config from "constants/Configs";
import login from "containers/login";
import signup from "containers/signup";
import { logout } from "handlers/setters";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import TokenManager from "utils/TokenManager";
import NavWrapper from "./navWrapper";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
  <Route
    render={props =>
      TokenManager.get() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
    {...rest}
  />
)};

let isAfterWarnEvent = false;
let API_IN_PROGRESS = false;
class Root extends Component {
  constructor(props) {
    super(props);
    this.events = ["load", "mousemove", "mousedown", "click", "scroll", "keypress"];
    this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);
    this.storageChange = this.storageChange.bind(this);
    window.addEventListener("storage", this.storageChange, false);
    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }
  }

  componentDidMount() {
    TokenManager.get() && this.setTimeout();
  }

  storageChange(event) {
    if (event.key === "REFRESHED") {
      window.location.reload(true);
    }
    if (event.key === "loggedout") {
      window.sessionStorage.setItem("oldUrl", window.location.href);
      window.sessionStorage.setItem("oldUser", event.newValue);
      window.location.pathname !== "/login" && window.open("/login", "_self");
    }
    if (event.key === "loggedin") {
      if (event.newValue === window.sessionStorage.getItem("oldUser")) {
        const URL = window.sessionStorage.getItem("oldUrl");
        if (URL) {
          window.open(URL, "_self");
        }
      } else {
        window.close();
      }
    }
  }

  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    if (!TokenManager.getExpiredAt()) {
      return;
    }
    const REFRESH_TOKEN_TIME = fe_config.MODE === "PROD" ? 15 * 60 * 1000 : 4 * 60 * 1000;
    const warnTime = TokenManager.getExpiredAt() - Math.round(new Date().getTime()) - REFRESH_TOKEN_TIME;
    // console.log('warnTime: ', warnTime);
    this.warnTimeout = setTimeout(this.warn, warnTime);
    const logoutTime = TokenManager.getExpiredAt() - Math.round(new Date().getTime());
    // console.log('logoutTime: ', logoutTime);
    this.logoutTimeout = setTimeout(this.logout, logoutTime);
  }

  resetTimeout() {
    if (isAfterWarnEvent) {
      isAfterWarnEvent = false;
      if (API_IN_PROGRESS) {
        return;
      }
      API_IN_PROGRESS = true;
      instance
        .get("token")
        .then(response => {
          API_IN_PROGRESS = false;
          if(!TokenManager.getUserName()) {
            TokenManager.setUserName(response.data.username, response.data["id"]);
          }
          localStorage.setItem(
            "loggedInUserData",
            JSON.stringify({...JSON.parse(localStorage.getItem("loggedInUserData")), roles: response.data.roles})
          );
          TokenManager.set(response.data.token, response.data["expires at"]);
          this.clearTimeout();
          this.setTimeout();
        }).catch(e => {
          logout();
        })
    } else {
      this.clearTimeout();
      this.setTimeout();
    }
  }

  warn() {
    isAfterWarnEvent = true;
  }

  logout() {
    // Send a logout request to the API
    if(document.hasFocus()) {
      logout();
    }
  }

  componentWillUnmount() {
    this.destroy();
  }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }

  render() {
    return (
      <div>
        <ConfirmationBox />
        <EmailCreator />
        <Preview />
        <Router>
          <Switch>
            <Route exact path="/login" component={login} />
            {<Route exact path="/signup" component={signup} />}
            <ProtectedRoute path="/" component={NavWrapper} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
