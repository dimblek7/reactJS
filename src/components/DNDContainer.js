import React from 'react';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import PropTypes from 'prop-types';

const DNDContainer = props => (
    <DndProvider backend={HTML5Backend}>
        {props.children}
    </DndProvider>
);

DNDContainer.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.object]),
    scrollContainerClass: PropTypes.string,
};

export default DNDContainer;
