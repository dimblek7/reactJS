import React, { Component } from "react";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import get from "lodash/get";
const defaultLabel = "MM/DD/YYYY";

class SingleDatePickerNew1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      text: "",
    };
  }

  componentDidMount() {
    this.setState({
      startDate: this.props.startDate ? moment(this.props.startDate) : undefined,
      text: this.props.startDate ? `${moment(this.props.startDate).format(defaultLabel)}` : "",
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.startDate !== nextProps.startDate) {
      this.setState({
        startDate: nextProps.startDate ? moment(nextProps.startDate) : undefined,
        text: nextProps.startDate ? `${moment(nextProps.startDate).format(defaultLabel)}` : "",
      });
    }
  }

  getDates = ({ startDate }) => {
    const val = startDate && moment(startDate.format(defaultLabel), defaultLabel);
    this.setState(
      {
        startDate: val,
        text: startDate ? `${moment(startDate).format(defaultLabel)}` : "",
      }, () => {
        this.props.getSelectedDates(this.state.startDate);
      }
    );
  };

  render() {
    const { startDate, text } = this.state;
    const { parentEl, isClearable } = this.props;
    return (
      <div className="w-100" id="datepicker-wrap">
        <DateRangePicker
          className="w-100"
          parentEl={parentEl}
          singleDatePicker={true}
          startDate={startDate || undefined}
          endDate={startDate || undefined}
          autoApply
          showDropdowns
          linkedCalendars={false}
          format={defaultLabel}
          onApply={(e, picker) => {
            this.setState({ text: "" }, () => this.getDates(picker));
          }}
        >
          <div
            className="w-100"
            id="wrap-date"
            style={{
              background: "#fff",
              cursor: "pointer",
              padding: "5px 10px",
              border: "1px solid #ccc",
              minWidth: 120,
            }}
          >
            <i className="fa fa-calendar pull-left pt-1"></i>
            <input
              type="text"
              autoComplete="off"
              placeholder={`${defaultLabel}`}
              className="daterangeinput"
              name="daterange"
              value={text}
              onChange={e => this.setState({ text: get(e, "target.value", "") })}
              onBlur={e => {
                if (isClearable && !get(e, "target.value", "")){
                  this.setState({ text: "" }, () => this.getDates({ startDate: null }));
                } else {
                  const value = get(e, "target.value", "");
                  const stdate = value ? value.trim() : "";
                  const _start = moment(stdate, defaultLabel, true).isValid();
                  if (_start) {
                    this.getDates({
                      startDate: moment(stdate, defaultLabel),
                    });
                    return;
                  }
                  this.setState({ text: "" }, () => this.getDates({ startDate }));
                }
              }}
            />
          </div>
        </DateRangePicker>
      </div>
    );
  }
}

class SingleDatePicker extends Component {
  constructor(props) {
    super(props);
    // let startDate = moment();
    this.state = {
      startDate: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      startDate: this.props.startDate ? moment(this.props.startDate) : undefined,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.startDate != nextProps.startDate) {
      this.setState({
        startDate: nextProps.startDate ? moment(nextProps.startDate) : undefined,
      });
    }
  }

  getDates = ({ startDate }) => {
    const val = startDate && moment(startDate.format("MM/DD/YYYY"), "MM/DD/YYYY");
    this.setState(
      {
        startDate: val,
      },
      () => this.props.getSelectedDates(this.state.startDate)
    );
  };

  render() {
    const { startDate } = this.state;

    const { parentEl, labelFormat } = this.props;
    const format = labelFormat || defaultLabel;
    const selectedDates = startDate ? `${moment(startDate).format(format)}` : "";
    return (
      <div className="w-100" id="datepicker-wrap">
        <DateRangePicker
          className="w-100"
          parentEl={parentEl}
          singleDatePicker={true}
          startDate={startDate || undefined}
          endDate={startDate || undefined}
          autoApply
          onApply={(e, picker) => this.getDates(picker)}
        >
          <div
            className="w-100"
            id="wrap-date"
            style={{
              background: "#fff",
              cursor: "pointer",
              padding: "5px 10px",
              border: "1px solid #ccc",
              minWidth: 120,
            }}
          >
            <i className="fa fa-calendar pull-left pt-1"></i>
            {selectedDates ? <span>{selectedDates}</span> : <span className="text-secondary">{format}</span>}
            <i className="fa fa-caret-down pull-right pt-1"></i>
          </div>
        </DateRangePicker>
      </div>
    );
  }
}

export default SingleDatePickerNew1;
//export default SingleDatePicker;

