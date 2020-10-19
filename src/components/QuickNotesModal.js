import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import get from "lodash/get";

class QuickNotesModal extends React.Component {
    render() {
        const {
            notes,
        } = this.props;
        const popover = (
            <Popover id="popover-contained">
                <Popover.Title as="h3">Notes</Popover.Title>
                <Popover.Content>
                    <ol className="p-0 m-0 ml-2">
                        {
                            notes.length ?
                            notes.map(n => <li className="mb-1">{get(n, "note", "")}</li>) : <p>No data.</p>
                        }
                    </ol>
                </Popover.Content>
            </Popover>
        );
        return (
            <span onClick={e => e.stopPropagation()} style={{ fontSize: '20px' }}>
                <OverlayTrigger
                    overlay={popover}
                    trigger={['click', 'hover']}
                    placement="left"
                >
                    <i className="far fa-file-alt color-blue" />
                </OverlayTrigger>
            </span>
        );
    }
}

export default QuickNotesModal;
