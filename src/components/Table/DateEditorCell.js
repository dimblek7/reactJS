import ClickAwayListener from "components/ClickAwayListener";
import get from "lodash/get";
import React from "react";
import { getFormattedDate } from "utils/dates";
import moment from "moment";

export default class DateEditorCell extends React.Component {
  state = { editmode: false, value: get(this.props, "value", ""), showpencil: false };

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  setEditMode = mode => {
    this.setState({ editmode: mode });
    const { value } = this.state;
    if (value !== this.props.value) {
      if (!value) {
        this.setState({ value: this.props.value });
      } else {
        this.props.updateValue(moment(value, "YYYY-MM-DD", true).isValid() ? value : this.props.value);
      }
    }
  };

  componentWillReceiveProps(newprops) {
    if (this.state.value !== newprops.value) {
      this.setState({ value: newprops.value });
    }
  }

  render() {
    const { iscellcomponent = false, min = null, deleteDate } = this.props;
    const { editmode, value, showpencil } = this.state;
    return editmode ? (
      <ClickAwayListener onClickAway={this.setEditMode}>
        <form className="mr-2" onSubmit={() => this.setEditMode(false)}>
          <input
            id="date-editor"
            type="date"
            min={min}
            className="text-left"
            onChange={(e) => {
              this.setState({
                value: moment(
                  get(e, "target.value", ""),
                  "YYYY-MM-DD",
                  true
                ).isValid()
                  ? get(e, "target.value", "")
                  : this.props.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                this.setEditMode(false);
              }
            }}
            onBlur={() => this.setEditMode(false)}
            value={value ? moment(value).format("YYYY-MM-DD") : ""}
          />
        </form>
      </ClickAwayListener>
    ) : (
      <div
        className="text-left mr-2"
        onClick={() => {
          this.setState({ editmode: true }, () => {
            document.getElementById("date-editor").focus();
          });
        }}
        onMouseEnter={() => {
          this.setState({ showpencil: true });
        }}
        onMouseLeave={() => {
          this.setState({ showpencil: false });
        }}
      >
        {getFormattedDate(value) || "-"}
        {!iscellcomponent && showpencil && (
          <>
            <span className="ml-1 cursor-pointer" title="Edit Date">
              <i className="fa fa-pencil-alt" />
            </span>
            <span
              title="Delete Date"
              className={`ml-2 cursor-pointer ${!deleteDate || !value ? 'd-none' : ''}`}
              onClick={(e) => {e.stopPropagation(); this.props.updateValue(null)}}
            >
              <i className="fa fa-trash-o" />
            </span>
          </>
        )}
      </div>
    );
  }
}
