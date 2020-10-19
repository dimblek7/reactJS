import ClickAwayListener from "components/ClickAwayListener";
import get from "lodash/get";
import React from "react";

export default class SelectEditorCell extends React.Component {
  state = { editmode: false, value: get(this.props.value), showpencil: false };

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  setEditMode = mode => {
    this.setState({ editmode: mode, showpencil: false });
    const { value } = this.state;
    (value !== this.props.value || value == 0) && this.props.updateValue(value);
  };

  componentWillReceiveProps(newprops) {
    if (this.state.value !== newprops.value) {
      this.setState({ value: newprops.value });
    }
  }

  render() {
    const { iscellcomponent = false, options } = this.props;
    const { editmode, value, showpencil } = this.state;
    const name = get(
      options.find(opt => opt.value == value),
      "name",
      ""
    );
    return editmode ? (
      <ClickAwayListener onClickAway={this.setEditMode}>
        <form className="mr-2" onSubmit={() => this.setEditMode(false)}>
          <select id="amount-editor" className="py-1 px-2 w-50" onChange={e => this.setState({ value: e.target.value })}>
            <option disabled selected value="">Select</option>
            {options.map(opt => (
              <option value={opt.value} selected={value == opt.value}>{opt.name}</option>
            ))}
          </select>
        </form>
      </ClickAwayListener>
    ) : (
      <div
        className="mr-2 show-ellipses"
        onClick={() => {
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
        {name || "-"}
        {!iscellcomponent && showpencil && (
          <span className="ml-3">
            <i className="fa fa-pencil-alt" />
          </span>
        )}
      </div>
    );
  }
}
