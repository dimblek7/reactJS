import React, { useRef, useEffect } from "react";

const useOutsideAlerter = (ref, onClickAway) => {
  
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickAway && onClickAway(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

export default function ClickAwayListener(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.onClickAway);

  return (
    <div ref={wrapperRef} {...props}>
      {props.children}
    </div>
  );
}
