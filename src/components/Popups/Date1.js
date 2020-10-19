import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment";
import { getLocaleString } from "utils/localization/locale";
import { get } from "lodash";

function DateModal(props) {
  const { handleClose, handleSubmit, show, header = "Add" } = props;
  const [value, setvalue] = useState("");

  return (
    <Modal show={show} onHide={handleClose} className="mt-4">
      <Modal.Header closeButton>{header}</Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center" style={{ height: 50 }}>
          <div className="">
            <input
                id="date-editor"
                type="date"
                // min={min}
                className="text-left"
                onChange={e => {
                    setvalue(moment(get(e, "target.value", ""), "YYYY-MM-DD", true).isValid() ? get(e, "target.value", "") : "");
                }}
                // onKeyDown={e => {
                // if (e.key === "Tab") {
                //     e.preventDefault();
                //     this.setEditMode(false);
                // }
                // }}
                // onBlur={() => this.setEditMode(false)}
                value={value ? moment(value).format("YYYY-MM-DD") : ""}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className="pull-right" disabled={!value} onClick={() => handleSubmit(value)}>
          {getLocaleString("common.save")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(DateModal);
