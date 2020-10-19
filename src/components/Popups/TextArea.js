import get from "lodash/get";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";

function TextAreaModal(props) {
  const { handleClose, handleSubmit, show, header = "Add", charLimit = 1000 } = props;
  const [value, setvalue] = useState("");

  useEffect(() => {
    show && setvalue("");
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" className="mt-4">
      <Modal.Header closeButton>{header}</Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <form className="mr-2" onSubmit={() => handleSubmit(value)}>
            <textarea
              id="amount-editor"
              className="p-2 w-100"
              style={{ minHeight: 160 }}
              onChange={e => {
                setvalue(get(e, "target.value", ""));
              }}
              value={value}
              maxLength={charLimit}
            />
            {/* <div className="text-right text-small"><i>Remaining characters: {Number(charLimit) - value.length}/{charLimit}</i></div> */}
            <div className="text-right pb-2 text-small text-danger">
              {value && value.length === charLimit && <i>Max characters limit: {charLimit}</i> }
            </div>
          </form>
        </div>
        <div className="row d-flex justify-content-center mt-3">
          <Button variant="primary" className="ml-3 mr-2 col-sm-5" onClick={() => handleSubmit(value)}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(TextAreaModal);
