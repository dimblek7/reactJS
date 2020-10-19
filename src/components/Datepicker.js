import React, { Component } from "react";
import get from "lodash/get";
import Datepicker from "react-date-picker";
import "assets/scss/components/DatePicker.scss";

export default class CustomDatePicker extends Component {
  //   state = {
  //     date: new Date(),
  //   }

  onChange = date => get(this.props, "onChange", "") && this.props.onChange({ date });

  render() {
    const { value = null, minDate = null, maxDate = null } = this.props;
    return (
      <div style={{ zIndex: 1051 }}>
        <Datepicker
          dateFormat="MM/DD/YYYY"
          onChange={this.onChange}
          value={value ? new Date(value) : null}
          minDate={minDate ? new Date(minDate) : null}
          maxDate={maxDate ? new Date(maxDate) : null}
        />
      </div>
    );
  }
}
