import React, { Component } from "react";
import moment from "moment";
import { DatePickerInput } from "rc-datepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import 'rc-datepicker/lib/style.css';
import "assets/css/datepicker.css";
const defaultLabel = "MM/DD/YYYY";


class SingleDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      startDate: this.props.startDate ? this.props.startDate : undefined,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.startDate !== nextProps.startDate) {
      this.setState({
        startDate: nextProps.startDate ? nextProps.startDate : undefined
      });
    }
  }

  getDates = (startDate) => {
    this.setState({
      startDate,
    });
  };

  getDatesOnHide = () => {
    const { startDate } = this.state;
    this.props.getSelectedDates(startDate && startDate !== "Invalid date" ? moment(startDate) : this.props.startDate);
    this.setState({
      startDate: (startDate && startDate === "Invalid date") || (!startDate) ? this.props.startDate : moment(this.state.startDate), 
    });
  };

  render() {
    const { startDate } = this.state;

    const { labelFormat } = this.props;
    return (
      <div className="w-100" id="datepicker-wrap">
        <DatePickerInput
          onChange={(e) => {
            this.getDates(e);
          }}
          placeholder={defaultLabel}
          // minDate={minDate}
          // maxDate={maxDate}
          displayFormat={defaultLabel}
          format={defaultLabel}
          showOnInputClick={true}
          closeOnClickOutside={true}
          onHide={() => {
            this.getDatesOnHide();
          }}
          value={startDate}
          locale="es"
        />
      </div>
    );
  }
}

export default SingleDatePicker;