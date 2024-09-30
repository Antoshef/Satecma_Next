import React, { useState } from 'react';

interface HintIconProps {
  className?: string;
  hint: string;
  fieldName: string;
}

const HintIcon: React.FC<HintIconProps> = ({ hint, fieldName, className }) => {
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  return (
    <div
      className={`${className} ml-2 relative text-theme-light-secondary`}
      onMouseEnter={() => setHoveredField(fieldName)}
      onMouseLeave={() => setHoveredField(null)}
    >
      <svg
        className="w-4 h-4 cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        ></circle>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 16v-4m0-4h.01"
        />
      </svg>
      {hoveredField === fieldName && (
        <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 -translate-y-full mt-2 w-48 p-2 bg-white border border-gray-300 rounded-md shadow-lg text-sm text-theme-light-primary z-10">
          {hint}
        </div>
      )}
    </div>
  );
};

export default HintIcon;
