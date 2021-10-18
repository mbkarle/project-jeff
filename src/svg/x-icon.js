import React from "react";

const XIcon = (props) => {
  return (
    <svg width={13} height={13} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect
        width={16}
        height={2}
        rx={1}
        transform="scale(1 -1) rotate(-45 -1.707 -.707)"
        fill="#5F6F89"
      />
      <rect
        width={16}
        height={2}
        rx={1}
        transform="scale(1 -1) rotate(45 16.071 -4.657)"
        fill="#5F6F89"
      />
    </svg>
  );
};

export default XIcon;
