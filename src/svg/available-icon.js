import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { isSafari } from "utils/safari";

const AvailableIcon = (props) => {
  const prefix = useState(() => uuidv4())[0];
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter={`url(#${prefix}__filter0_i)`}>
        <circle cx={7} cy={7} r={6} fill="#0FBF8A" />
      </g>
      {/* patch for safari hiding filtered content */}
      {isSafari() && <circle cx={7} cy={7} r={6} fill="#0FBF8A" />}
      <circle cx={7} cy={7} r={6.25} stroke="#0FBF8A" strokeWidth={0.5} />
      <defs>
        <filter
          id={`${prefix}__filter0_i`}
          x={0.5}
          y={0.5}
          width={13}
          height={15}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgrounImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0" />
          <feBlend in2="shape" result="effect1_innerShadow" />
        </filter>
      </defs>
    </svg>
  );
};
export default AvailableIcon;
