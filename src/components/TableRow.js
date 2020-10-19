import React from 'react';
import { useDrag  } from 'react-dnd';

const style = {
    cursor: 'grab',
};


const Box = ({ data, className='', type='ALL', children }) => {
    const [{}, drag] = useDrag({
        item: {data, type},
        collect: monitor => ({
            isDropping: monitor.isDragging()
        }),
    })
    return (
        <div ref={drag} className={className} style={{ ...style }}>
            {children}
        </div>
    )
}
export default Box;
