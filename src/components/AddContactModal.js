import React from "react";
import { Button, Modal } from "react-bootstrap";

export default class AddContactModal extends React.Component {
    handleClose = () => this.setState({ show: !this.state.show });

    setContactData = (e) => {
        const {
            name,
            value
        } = e.target;
        this.setState({
            [name]: value,
        });
    }

    render() {
        const {
            show,
        } = this.props;
        return(
            <Modal show={show} size="md" onHide={() => this.props.onHide(false)} className="mt-4">
                <Modal.Header closeButton>
                    <Modal.Title className="h6">Add Contact Person</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <span><label>Name: </label></span>
                        <input type="text" className="form-control" name="name" onBlur={this.setContactData} placeholder="Enter ..." />
                    </div>
                    <div className="form-group">
                        <span><label>Email: </label></span>
                        <input type="email" className="form-control" name="email" onBlur={this.setContactData} placeholder="Enter ..." />
                    </div>
                    <div className="form-group">
                        <span><label>Mobile: </label></span>
                        <input type="text" className="form-control" name="mobile" onBlur={this.setContactData} placeholder="Enter ..."/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.onHide(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => this.props.onHide(false)}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}
