import React, { Component } from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import moment from "moment";
import { getLocaleString } from "utils/localization/locale";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
const defaultLabel = "MM/DD/YYYY";

// http://www.daterangepicker.com/ , https://www.npmjs.com/package/react-bootstrap-daterangepicker
class CustomDateRangePickerNew extends Component {
  constructor(props) {
    super(props);
    let startDate = moment();
    let endDate = moment().add(30, "days");
    this.state = {
      endDate,
      startDate,
      text: "",
    };
  }

  componentDidMount() {
    const { startDate, endDate } = this.props;
    this.updateDates(startDate, endDate);
  }

  updateDates = (startDate, endDate) => {
    this.setState({
      startDate: moment(startDate),
      endDate: moment(endDate),
      text: `${moment(startDate).format(defaultLabel)} - ${moment(endDate).format(defaultLabel)}`,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { startDate, endDate } = nextProps;
    if (!isEqual(nextProps, this.props)) {
      this.updateDates(startDate, endDate);
    }
  }

  getDates = ({ startDate, endDate, chosenLabel }) => {
    this.setState(
      {
        startDate,
        endDate,
        text: startDate ? `${moment(startDate).format(defaultLabel)} - ${moment(endDate).format(defaultLabel)}` : "",
      },
      () => this.props.getSelectedDates(this.state.startDate, this.state.endDate, chosenLabel)
    );
  };

  render() {
    const ranges = {
      Today: [moment(), moment()],
      [getLocaleString("common.dateRangePicker.next7Days")]: [moment(), moment().add(7, "days")],
      [getLocaleString("common.dateRangePicker.next30Days")]: [moment(), moment().add(30, "days")],
      [getLocaleString("common.dateRangePicker.past7Days")]: [moment().subtract(7, "days"), moment()],
      [getLocaleString("common.dateRangePicker.past30Days")]: [moment().subtract(30, "days"), moment()],
      [getLocaleString("common.dateRangePicker.past90Days")]: [moment().subtract(90, "days"), moment()],
      [getLocaleString("common.dateRangePicker.past365Days")]: [moment().subtract(365, "days"), moment()],
    };
    const { startDate, endDate, text } = this.state;

    const { parentEl, labelFormat, isClearable } = this.props;

    return (
      <div id="datepicker-wrap">
          <DateRangePicker
            parentEl={parentEl}
            startDate={startDate}
            endDate={endDate}
            ranges={ranges}
            width="100"
            showDropdowns
            // alwaysShowCalendars
            // autoUpdateInput
            // autoApply
            // singleDatePicker
            // show={showDatePicker}
            linkedCalendars={false}
            format={defaultLabel}
            onApply={(e, picker) => {
              this.setState({ text: "" }, () => this.getDates(picker));
            }}
          >
            <div
              id="wrap-date"
              className="rounded"
              style={{
                background: "#fff",
                cursor: "pointer",
                padding: "8px 10px",
                border: "1px solid #ccc",
              }}
            >
              <i id="fa-calender-real" className="fa fa-calendar real"></i>&nbsp;
              <input
                type="text"
                autoComplete="off"
                placeholder={`${defaultLabel} - ${defaultLabel}`}
                className="daterangeinput"
                name="daterange"
                value={text}
                onChange={e => this.setState({ text: get(e, "target.value", "") })}
                onBlur={e => {
                  if (isClearable && !get(e, "target.value", "")){
                    this.setState({ text: "" }, () => this.getDates({ startDate: null, endDate: null }));
                  } else {
                    const value = get(e, "target.value", "").split("-");
                    const stdate = value && value[0] ? value[0].trim() : "";
                    const enddate = value && value[1] ? value[1].trim() : "";
                    const _start = moment(stdate, defaultLabel, true).isValid();
                    const _end = moment(enddate, defaultLabel, true).isValid();
                    if (value.length === 2 && _start && _end
                    && new Date(moment(stdate, defaultLabel).format("YYYY-MM-DD")) <= new Date(moment(enddate, defaultLabel).format("YYYY-MM-DD"))) {
                      this.getDates({
                        startDate: moment(stdate, defaultLabel),
                        endDate: moment(enddate, defaultLabel)
                      });
                      return;
                    }
                    this.setState({ text: "" }, () => this.getDates({ startDate, endDate }));
                  }
                }}
              />
            </div>
          </DateRangePicker>
      </div>
    );
  }
}
class CustomDateRangePicker extends Component {
  constructor(props) {
    super(props);
    let startDate = moment();
    let endDate = moment().add(30, "days");
    this.state = {
      endDate,
      startDate,
      text: "",
      showDatePicker: false,
    };
  }

  componentDidMount() {
    const { startDate, endDate } = this.props;
    this.updateDates(startDate, endDate);
  }

  updateDates = (startDate, endDate) => {
    this.setState({
      startDate: moment(startDate),
      endDate: moment(endDate),
      text: `${moment(startDate).format(defaultLabel)} - ${moment(endDate).format(defaultLabel)}`,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { startDate, endDate } = nextProps;
    if (!isEqual(nextProps, this.props)) {
      this.updateDates(startDate, endDate);
    }
  }

  getDates = ({ startDate, endDate, chosenLabel }) => {
    this.setState(
      {
        startDate,
        endDate,
        text: `${moment(startDate).format(defaultLabel)} - ${moment(endDate).format(defaultLabel)}`,
      },
      () => this.props.getSelectedDates(this.state.startDate, this.state.endDate, chosenLabel)
    );
  };

  render() {
    const ranges = {
      Today: [moment(), moment()],
      [getLocaleString("common.dateRangePicker.next7Days")]: [moment(), moment().add(7, "days")],
      [getLocaleString("common.dateRangePicker.next30Days")]: [moment(), moment().add(30, "days")],
      [getLocaleString("common.dateRangePicker.past7Days")]: [moment().subtract(7, "days"), moment()],
      [getLocaleString("common.dateRangePicker.past30Days")]: [moment().subtract(30, "days"), moment()],
      [getLocaleString("common.dateRangePicker.past90Days")]: [moment().subtract(90, "days"), moment()],
      [getLocaleString("common.dateRangePicker.past365Days")]: [moment().subtract(365, "days"), moment()],
    };
    const { startDate, endDate, text, showDatePicker } = this.state;

    const { parentEl, labelFormat } = this.props;

    // const selectedDates = `${moment(startDate).format(labelFormat || defaultLabel)} - ${moment(endDate).format(
    //   labelFormat || defaultLabel
    // )}`;
    return (
      <div id="datepicker-wrap">
        {showDatePicker ? (
          <DateRangePicker
            parentEl={parentEl}
            startDate={startDate}
            endDate={endDate}
            ranges={ranges}
            width="100"
            showDropdowns
            // alwaysShowCalendars
            // autoUpdateInput
            // autoApply
            // singleDatePicker
            // show={showDatePicker}
            linkedCalendars={false}
            format={defaultLabel}
            onApply={(e, picker) => {
              this.setState({ text: "" }, () => this.getDates(picker));
            }}
            onBlur={() => this.setState({ showDatePicker: false })}
          >
            <div
              id="wrap-date"
              className="rounded"
              style={{
                background: "#fff",
                cursor: "pointer",
                padding: "8px 10px",
                border: "1px solid #ccc",
              }}
            >
              <i id="fa-calender-real" className="fa fa-calendar real"></i>&nbsp;
              <span>{text}</span>
              {/*
              // editable datepicker, work in progress
              {text && (
                <input
                  type="text"
                  placeholder="mm/dd/yyyy - mm/dd/yyyy"
                  className="daterangeinput"
                  name="daterange"
                  value={text}
                  onChange={e => this.setState({ text: get(e, "target.value", ""), showDatePicker: true })}
                  onBlur={e => {
                    const value = get(e, "target.value", "").split("-");
                    let _start =
                      get(value, "[0]", "").trim().length === 10 &&
                      moment(get(value, "[0]", ""), "MM/DD/YYYY").isValid();
                    let _end =
                      get(value, "[1]", "").trim().length === 10 &&
                      moment(get(value, "[1]", ""), "MM/DD/YYYY").isValid();
                    if (_start && _end) {
                      this.getDates({
                        startDate: moment(value[0], "MM/DD/YYYY"),
                        endDate: moment(value[1], "MM/DD/YYYY")
                      });
                      return;
                    }
                    this.setState({ text: "" }, () => this.getDates({ startDate, endDate }));
                  }}
                />
              )} */}
            </div>
          </DateRangePicker>
        ) : (
          <div
            id="reportrange_view"
            className="rounded"
            style={{
              background: "#fff",
              cursor: "pointer",
              padding: "8px 10px",
              border: "1px solid #ccc",
            }}
            onClick={() => {
              this.setState({ showDatePicker: true }, () => {
                setTimeout(() => {
                  document.getElementById("fa-calender-real").click();
                }, 100);
              });
            }}
          >
            <i className="fa fa-calendar"></i>&nbsp;
            <span>{text}</span>
          </div>
        )}
      </div>
    );
  }
}

export default CustomDateRangePickerNew;
// export default CustomDateRangePicker;
