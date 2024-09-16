import React, { ReactNode } from 'react';

// Tooltip Props Interface
interface TooltipProps {
  text: string; // The text that will be shown inside the tooltip
  children: ReactNode; // The element to wrap with the tooltip
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {/* Wrapped Element */}
      {children}

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-600 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
        {text}
        {/* Tooltip Arrow */}
        {/* <div className="absolute inset-x-0 top-full w-3 h-3 bg-gray-600 transform rotate-45 mx-auto"></div> */}
      </div>
    </div>
  );
};

export default Tooltip;
