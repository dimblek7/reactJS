import ClickAwayListener from "components/ClickAwayListener";
import get from "lodash/get";
import React from "react";

export default class TextEditorCell extends React.Component {
  state = { editmode: false, value: get(this.props.value), showpencil: false };

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  setEditMode = mode => {
    this.setState({ editmode: mode, showpencil: false });
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
        </form>
      </ClickAwayListener>
    ) : (
      <div
        className="mr-2 show-ellipses"
        title={value || "-"}
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
