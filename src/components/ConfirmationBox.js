import React, { useEffect } from "react";
import { ReducersTypes } from "constants/ReducersTypes";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { store } from "store";

export const setconfirmationboxData = (data) => {
  store.dispatch({
    type: ReducersTypes.CONFIRMATION_BOX,
    payload: data,
  });
};

export const resetconfirmationboxData = () => {
  store.dispatch({
    type: ReducersTypes.CONFIRMATION_BOX_RESET,
  });
};

function CustomSnackbar(props) {
  const {
    confirmationbox: { msg = "", onSave },
  } = props;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    resetconfirmationboxData();
  };

  function onSubmit(event) {
    event.preventDefault();
    onSave && onSave();
  }

  useEffect(() => {
    msg &&
      document.getElementById("confirmationbox-submit") &&
      document.getElementById("confirmationbox-submit").focus();
  }, [msg]);

  return (
    <Modal show={msg !== ""} onHide={handleClose} className="mt-4" style={{ zIndex: 9999 }}>
      <Modal.Body>
        <div className="text-center">{msg}</div>
        <form className="row d-flex justify-content-center mt-3" onSubmit={onSubmit}>
          <Button variant="secondary" onClick={handleClose} className="col-sm-5">
            Cancel
          </Button>
          <Button id="confirmationbox-submit" type="submit" variant="primary" className="ml-3 mr-2 col-sm-5" onClick={onSave}>
            Confirm
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  confirmationbox: state.confirmationbox,
});

export default connect(mapStateToProps, null)(CustomSnackbar);
