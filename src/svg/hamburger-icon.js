import React from "react";

const HamburgerIcon = (props) => {
  return (
    <svg width={16} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={16} height={2} rx={1} transform="matrix(-1 0 0 1 16 0)" fill="#5F6F89" />
      <rect width={16} height={2} rx={1} transform="matrix(-1 0 0 1 16 6)" fill="#5F6F89" />
      <rect width={16} height={2} rx={1} transform="matrix(-1 0 0 1 16 12)" fill="#5F6F89" />
    </svg>
  );
};

export default HamburgerIcon;
