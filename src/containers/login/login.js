import logo from "assets/images/logo.jpg";
import axios from "axios";
import cx from "classnames";
import If from "components/If";
import Configs from "constants/Configs";
import get from "lodash/get";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenManager from "utils/TokenManager";
import "./style.scss";

export default class Login extends Component {
  state = {
    showPassword: false,
    email: {
      value: "",
      isFocused: false,
      error: "",
    },
    password: {
      value: "",
      isFocused: false,
      error: "",
    },
    formError: "",
  };

  componentDidMount() {
    if (TokenManager.get()) {
      let prevPath =
        sessionStorage.getItem("loggedOutInSameSession") || get(this.props, "location.state.from", "") || "/dashboard";
      const userdata = JSON.parse(TokenManager.getUserData());
      if (prevPath === "/signup") {
        // user is in trail mode
        prevPath = "/dashboard";
      } else if (
        window.sessionStorage.getItem("loggedoutUser") &&
        window.sessionStorage.getItem("loggedoutUser") != get(userdata, "id", "")
      ) {
        // different user logged in
        window.sessionStorage.clear();
        prevPath = "/dashboard";
      }
      this.props.history.push(prevPath === "/login" ? "/dashboard" : prevPath);
      return;
    }
    localStorage.clear();
    document.title = "Login - Sinhagad";
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    this.setState(
      {
        email: {
          value: email.value,
          isFocused: false,
          error: !email.value ? "required" : "",
        },
        password: {
          value: password.value,
          isFocused: false,
          error: !password.value ? "required" : "",
        },
      },
      () => {
        const { email, password } = this.state;
        if (email.value && password.value) {
          axios
            .get(`${Configs.API_URL}token`, {
              auth: {
                username: this.state.email.value,
                password: this.state.password.value,
              },
            })
            .then((response) => {
              TokenManager.set(response.data.token, response.data["expires at"]);
              window.location.reload();
            })
            .catch((error) => {
              this.setState({
                formError: "Invalid Credentials please try again.",
              });
            });
        }
      }
    );
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: {
        value,
        isFocused: true,
        error: !value ? "required" : "",
      },
    });
  };

  onBlurr = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: {
        value,
        isFocused: false,
        error: this.state[name].error,
      },
    });
  };

  togglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  render() {
    const { showPassword, email, password, formError } = this.state;

    return (
      <div className="loginpage-container">
        <div className="logo">
          <img alt="loading" src={logo} height="60" width="60" />
          <span style={{ color: "white" }}> </span>
        </div>
        <div className="form-widget">
          <h2 className="title t-global">Sign In</h2>
          <If condition={formError}>
            <span className="form-error">{formError}</span>
          </If>
          <form onSubmit={this.onSubmit}>
            <div className={cx("clearfix field-wrapper", { "label-active": email.isFocused })}>
              <label className={cx("float-left", { focused: email.isFocused })}>
                <span className={cx("label", { focused: email.isFocused })}>Username</span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder={!email.isFocused ? "Username" : ""}
                  onFocus={this.onChange}
                  onChange={this.onChange}
                  onBlur={this.onBlurr}
                  autoComplete="off"
                />
              </label>
              <div className="float-right">
                <span className="helptxt">{email.error}</span>
              </div>
            </div>
            <div className={cx("clearfix field-wrapper", { "label-active": password.isFocused })}>
              <label className={cx("float-left", { focused: password.isFocused })}>
                <span className={cx("label", { focused: password.isFocused })}>Password</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={!password.isFocused ? "Password" : ""}
                  onFocus={this.onChange}
                  onChange={this.onChange}
                  onBlur={this.onBlurr}
                  name="password"
                  autoComplete="off"
                />
              </label>
              <div className="float-right">
                <span className="helptxt">{password.error}</span>
                <span
                  style={{ position: "absolute", right: 0 }}
                  className="show-hide-toggle"
                  role="presentation"
                  onClick={this.togglePassword}
                >
                  {showPassword ? (
                    <i className="fa fa-eye" style={{ cursor: "pointer", fontSize: "15px" }} title="Show Password" />
                  ) : (
                    <i
                      className="fa fa-eye-slash"
                      style={{ cursor: "pointer", fontSize: "15px" }}
                      title="Show Password"
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="link-wrapper clearfix">
              <Link to="/forgot-password" className="forgot-password float-right t-global">
                Forgot your password?
              </Link>
            </div>
            <button className="button bg-primary-gradient" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
