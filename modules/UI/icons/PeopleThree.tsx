/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface IconProps {
  size?: number;
  color?: string;
}

const PeopleThree: React.FC<IconProps> = ({ size = 24, color = "#CCC" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill={color}
    >
      <rect width="256" height="256" fill="none"/>
      <path d="M197,120c15.54,0,29.33,9.43,38,24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
      <path d="M16,144a59.91,59.91,0,0,1,48-24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
      <circle cx="128" cy="144" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
      <path d="M72,216a65,65,0,0,1,112,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
      <path d="M161,80a32,32,0,1,1,31,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
      <path d="M64,120A32,32,0,1,1,95,80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
    </svg>
  );
};

export default PeopleThree;
