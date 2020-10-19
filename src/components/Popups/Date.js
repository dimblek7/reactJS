import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment";
import SingleDatePicker from "components/PopperSingleDatePicker";

function DateModal(props) {
  const { handleClose, handleSubmit, show, header = "Add" } = props;
  const [value, setvalue] = useState("");

  return (
    <Modal show={show} onHide={handleClose} className="mt-4">
      <Modal.Header closeButton>{header}</Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center" style={{ height: 50 }}>
          <div className="">
            <SingleDatePicker
              labelFormat="MMM DD, YYYY"
              startDate={value ? moment(value) : undefined}
              min={moment().format("YYYY-MM-DD")}
              getSelectedDates={(date) => {
                date && setvalue(date.format("YYYY-MM-DD"))
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" className="pull-right" onClick={() => handleSubmit(value)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(DateModal);
