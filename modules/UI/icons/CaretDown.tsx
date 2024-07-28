import React from 'react';

interface CaretDownProps {
  size?: number;
  color?: string;
}

const CaretDown: React.FC<CaretDownProps> = ({ size =40, color = '#fff' }) => {
  const svgSize = `${size}px`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={svgSize}
      height={svgSize}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
    >
      <polyline points="208 96 128 176 48 96" />
    </svg>
  );
};

export default CaretDown;
