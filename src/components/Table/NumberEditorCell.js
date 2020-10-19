import ClickAwayListener from "components/ClickAwayListener";
import get from "lodash/get";
import React from "react";
import { getShortNumber } from "utils";

export default class NumberEditorCell extends React.Component {
  state = { editmode: false, value: get(this.props.value), showpencil: false };

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  setEditMode = mode => {
    this.setState({ editmode: mode });
    const { value } = this.state;
    (value !== this.props.value) && this.props.updateValue(value);
  };

  componentWillReceiveProps(newprops) {
    if (this.state.value !== newprops.value) {
      this.setState({ value: newprops.value });
    }
  }

  render() {
    const { iscellcomponent = false } = this.props;
    const { editmode, value, showpencil } = this.state;
    return editmode ? (
      <ClickAwayListener onClickAway={this.setEditMode}>
        <form className="mr-2" onSubmit={() => this.setEditMode(false)}>
          <input
            id="amount-editor"
            type="number"
            className="text-right"
            onChange={e => {
              this.setState({ value: get(e, "target.value", "") });
            }}
            onKeyDown={e => {
              if (e.key === "Tab" || e.key === "Enter") {
                e.preventDefault();
                this.setEditMode(false);
              }
            }}
            onBlur={() => this.setEditMode(false)}
            value={value}
          />
        </form>
      </ClickAwayListener>
    ) : (
      <div
        className="text-right mr-2 show-ellipses"
        onClick={(e) => {
          e.stopPropagation();
          this.setState({ editmode: true }, () => {
            document.getElementById("amount-editor").focus();
          });
        }}
        onMouseEnter={() => {
          this.setState({ showpencil: true })
        }}
        onMouseLeave={() => {
          this.setState({ showpencil: false })
        }}
      >
        {getShortNumber(value) || "-"}
        {!iscellcomponent && showpencil && (
          <span className="ml-3">
            <i className="fa fa-pencil-alt" />
          </span>
        )}
      </div>
    );
  }
}
