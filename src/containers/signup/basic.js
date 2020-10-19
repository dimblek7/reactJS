import logo from "assets/images/logo.jpg";
import axios from "axios";
import get from "lodash/get";
import cx from "classnames";
import Toaster from "components/Toaster";
import Configs from "constants/Configs";
import { emailRegEx, passwordRegEx } from "constants/regex";
import { handleAPIError } from "handlers/setters";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./style.scss";
import TokenManager from "utils/TokenManager";
import { instance } from "actions/axiosInstance";

class Login extends Component {
  state = {
    showPassword: false,
    email: {
      value: "",
      isFocused: false,
      error: "",
    },
    company: {
      value: "",
      isFocused: false,
      error: "",
    },
    password: {
      value: "",
      isFocused: false,
      error: "",
    },
    confirmPassword: {
      value: "",
      isFocused: false,
      error: "",
    },
    formError: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password.value !== confirmPassword.value) {
      Toaster("Passwords not matching", "error");
      return;
    }
    const postdata = {
      email: this.state.email.value,
      password: this.state.password.value,
    };
    if (!(postdata.email && postdata.password)) {
      return;
    }
    axios
      .post(`${Configs.API_URL}user/addtosandbox`, postdata)
      .then((response) => {
        axios
          .get(`${Configs.API_URL}token`, {
            auth: {
              username: postdata.email,
              password: postdata.password,
            },
          })
          .then((response) => {
            TokenManager.set(response.data.token, response.data["expires at"]);
            TokenManager.setUserName(this.state.email.value, response.data["id"]);

            let URL = `/client/user?id=${TokenManager.getUserId()}`;
            instance.get(URL).then((resp) => {
              const datatemp = {
                ...response.data,
                ...get(resp, "data.result[0]", {}),
              };
              TokenManager.setUserData(datatemp);
              this.props.changeActiveIndex(1);
            });
          })
          .catch((error) => {
            this.setState({
              formError: "Invalid Credentials please try again.",
            });
          });
      })
      .catch((err) => {
        this.props.changeActiveIndex(1);
        handleAPIError(err);
      });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: {
        value,
        isFocused: true,
        error: value
          ? name === "email"
            ? !emailRegEx.test(value)
              ? "Email not valid"
              : ""
            : name === "password"
            ? !passwordRegEx.test(value)
              ? "8 characters, minimum 1 digit"
              : ""
            : name === "confirmPassword"
            ? value !== this.state.password.value
              ? "Not matching"
              : ""
            : ""
          : "required",
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

  togglePassword = (type = "showPassword") => {
    this.setState({
      [type]: !this.state[type],
    });
  };

  render() {
    const { showPassword, email, password, confirmPassword, showConfirmPassword, formError, company } = this.state;

    return (
      <div className="signup-container">
        <div className="logo">
          <img alt="loading" src={logo} height="60" width="60" />
          <span style={{ color: "white" }}> Project name </span>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-widget">
              <div className="inner-form-widget">
                <h3 className="t-global text-center">Create an account</h3>
                <p className="t-global text-center">It's quick and easy</p>

                <form onSubmit={this.onSubmit}>
                  <div
                    className={cx("clearfix field-wrapper mt-4", {
                      "label-active": email.isFocused,
                      "border border-danger": email.error && !email.isFocused,
                    })}
                  >
                    <label className={cx("float-left", { focused: email.isFocused })}>
                      <span className={cx("label", { focused: email.isFocused })}>Email</span>
                      <input
                        type="text"
                        name="email"
                        placeholder={!email.isFocused ? "Email" : ""}
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
                  <div
                    className={cx("clearfix field-wrapper", {
                      "label-active": password.isFocused,
                      "border border-danger": password.error && !password.isFocused,
                    })}
                  >
                    <label className={cx("float-left", { focused: password.isFocused })}>
                      <span className={cx("label", { focused: password.isFocused })}>Password</span>
                      <input
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
                    </div>
                  </div>
                  <div
                    className={cx("clearfix field-wrapper", {
                      "label-active": confirmPassword.isFocused,
                      "border border-danger": confirmPassword.error && !confirmPassword.isFocused,
                    })}
                  >
                    <label className={cx("float-left", { focused: confirmPassword.isFocused })}>
                      <span className={cx("label", { focused: confirmPassword.isFocused })}>Confirm password</span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={!confirmPassword.isFocused ? "Confirm Password" : ""}
                        onFocus={this.onChange}
                        onChange={this.onChange}
                        onBlur={this.onBlurr}
                        name="confirmPassword"
                        autoComplete="off"
                      />
                    </label>
                    <div className="float-right">
                      <span className="helptxt">{confirmPassword.error}</span>
                      <span
                        style={{ position: "absolute", right: 0 }}
                        className="show-hide-toggle"
                        role="presentation"
                        onClick={() => this.togglePassword("showConfirmPassword")}
                      >
                        {showConfirmPassword ? (
                          <i
                            className="fa fa-eye"
                            style={{ cursor: "pointer", fontSize: "15px" }}
                            title="Show Confirm Password"
                          />
                        ) : (
                          <i
                            className="fa fa-eye-slash"
                            style={{ cursor: "pointer", fontSize: "15px" }}
                            title="Show Confirm Password"
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className={cx("clearfix field-wrapper", { "label-active": company.isFocused })}>
                    <label className={cx("float-left", { focused: company.isFocused })}>
                      <span className={cx("label", { focused: company.isFocused })}>Company name</span>
                      <input
                        type="text"
                        name="company"
                        placeholder={!company.isFocused ? "Company" : ""}
                        onFocus={this.onChange}
                        onChange={this.onChange}
                        onBlur={this.onBlurr}
                        autoComplete="off"
                      />
                    </label>
                    <div className="float-right">
                      <span className="helptxt">{company.error}</span>
                    </div>
                  </div>

                  <Button
                    className="w-100 mt-3 p-3"
                    variant="primary"
                    onClick={this.onSubmit}
                    disabled={!confirmPassword.value || confirmPassword.error || password.error || email.error}
                  >
                    Sign up
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ login: state });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
