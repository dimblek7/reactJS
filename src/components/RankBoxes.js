import React from "react";
import { useDrop } from "react-dnd";

const RankBoxes = ({ data, onDrop, onChangeClassification, boxIndex }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ALL",
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = isOver && canDrop;
  return (
    <div ref={drop} className="col-md-5ths" onClick={() => onChangeClassification(data.id)}>
      <div className={`commondiv filter${boxIndex + 2}`}>
        {isActive ? (
          <React.Fragment>
            <div className="commondiv-div1 text-center">Drop</div>
            <div className="commondiv-div2 text-center">to release</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="commondiv-div1">{data.type}</div>
            <div className="commondiv-div2">{data.amount}</div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default RankBoxes;
