import ClickAwayListener from "components/ClickAwayListener";
import get from "lodash/get";
import React from "react";

export default class TextareaEditorCell extends React.Component {
  state = { editmode: false, value: get(this.props.value), showpencil: false };

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  setEditMode = mode => {
    this.setState({ editmode: mode });
    const { value } = this.state;
    value !== this.props.value && this.props.updateValue(value);
  };

  componentWillReceiveProps(newprops) {
    if (this.state.value !== newprops.value) {
      this.setState({ value: newprops.value });
    }
  }

  render() {
    const { iscellcomponent = false, maxlength = 1000 } = this.props;
    const { editmode, value, showpencil } = this.state;
    return editmode ? (
      <ClickAwayListener onClickAway={this.setEditMode}>
        <form className="mr-2" onSubmit={() => this.setEditMode(false)}>
          <textarea
            style={{ height: '25vh', width: "100%" }}
            id="amount-editor"
            maxlength={maxlength}
            type="text"
            onChange={e => {
              this.setState({ value: get(e, "target.value", "") });
            }}
            onKeyDown={e => {
              if (e.key === "Tab") {
                e.preventDefault();
                this.setEditMode(false);
              }
            }}
            onBlur={() => this.setEditMode(false)}
            value={value}
          />
          {/* <div className="text-right text-small"><i>Remaining characters: {Number(maxlength) - value.length}/{maxlength}</i></div> */}
          <div className="text-right pb-2 text-small text-danger">
            {value && value.length === maxlength && <i>Max characters limit: {maxlength}</i> }
          </div>
        </form>
      </ClickAwayListener>
    ) : (
      <div
        className="mr-2"
        onClick={(e) => {
          e.stopPropagation();
          this.setState({ editmode: true }, () => {
            document.getElementById("amount-editor").focus();
          });
        }}
        onMouseEnter={() => {
          this.setState({ showpencil: true });
        }}
        onMouseLeave={() => {
          this.setState({ showpencil: false });
        }}
      >
        {value || "-"}
        {!iscellcomponent && showpencil && (
          <span className="ml-3">
            <i className="fa fa-pencil-alt" />
          </span>
        )}
      </div>
    );
  }
}
