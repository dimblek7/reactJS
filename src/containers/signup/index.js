import { initClients } from "actions/user.js";
import get from "lodash/get";
import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import TokenManager from "utils/TokenManager";
import Advanced from "./advanced.js";
import Basic from "./basic.js";
import LinkAccounts from "./linkaccounts.js";
import "./style.scss";
const activeIndexClasses = {
  0: { classes: "", styles: {} },
  1: { classes: "", styles: {} },
  2: { classes: "", styles: {} }
};

class Login extends Component {
  state = {
    showPassword: false,
    email: {
      value: "",
      isFocused: false,
      error: ""
    },
    password: {
      value: "",
      isFocused: false,
      error: ""
    },
    formError: "",
    activeIndex: 0
  };

  componentDidMount() {
    const data = JSON.parse(TokenManager.getUserData());
    if(get(data, "client_id", "") == 10) {
      initClients();
      this.setState({ activeIndex: 2 })
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: {
        value,
        isFocused: true,
        error: !value ? "required" : ""
      }
    });
  };

  onBlurr = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: {
        value,
        isFocused: false,
        error: this.state[name].error
      }
    });
  };

  togglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  changeActiveIndex = index => {
    this.setState({ activeIndex: index });
  };

  render() {
    const { showPassword, email, password, formError, activeIndex } = this.state;
    const { clients } = this.props;

    return (
      <div style={activeIndexClasses[activeIndex].styles} className={`signuppage`}>
      
          <div>
            <Carousel className="w-100" slide={false} activeIndex={activeIndex} indicators={false}>
              <Carousel.Item>
                <Basic changeActiveIndex={this.changeActiveIndex} />
              </Carousel.Item>

              <Carousel.Item className="">
                <Advanced changeActiveIndex={this.changeActiveIndex} />
              </Carousel.Item>

              <Carousel.Item>
                <LinkAccounts changeActiveIndex={this.changeActiveIndex} clients={clients} />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({ login: state, clients: state.user.clients });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
