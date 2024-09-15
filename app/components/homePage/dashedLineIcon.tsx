'use client';

import React, { useEffect, useState, useRef } from 'react';

export const EmailIcon = ({ isActive }: { isActive?: boolean }) => {
  const activeClass = 'text-theme-light-primary dark:text-theme-dark-primary';
  const inactiveClass =
    'text-theme-light-secondary dark:text-theme-dark-secondary';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 100 100"
      id="emailIcon"
      className={isActive ? activeClass : inactiveClass}
    >
      {/* Outer Circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="currentColor" // Uses the theme color
        strokeWidth="2"
        fill="none"
        id="outerCircle"
      />

      {/* Inner Circle */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill={isActive ? 'currentColor' : 'none'} // Inner circle uses current color if active
        id="innerCircle"
      />

      {/* Email Icon (Envelope) */}
      <path
        d="M30 35 L50 50 L70 35 V65 H30 Z M30 35 H70 L50 50 Z"
        stroke={isActive ? 'white' : 'currentColor'} // Uses current theme color
        strokeWidth="2"
        fill="none"
        id="envelope"
      />
    </svg>
  );
};

export const DashedLineIcon = ({
  isActive,
  disableLine
}: {
  isActive: boolean;
  disableLine: boolean;
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [solidHeight, setSolidHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = lineRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const middleOfScreen = window.innerHeight / 2;

      if (rect.top < middleOfScreen) {
        const percentageSolid =
          ((middleOfScreen - rect.top) / rect.height) * 100;
        setSolidHeight(Math.min(percentageSolid, 100)); // Grow the solid line up to 100%
      } else {
        setSolidHeight(0); // Keep it 0% below the middle of the screen
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center relative h-32">
      {/* Render Email Icon */}
      <EmailIcon isActive={isActive} />

      {/* Dashed and Solid Line */}
      {!disableLine && (
        <>
          {/* Dashed Line */}
          <span className="absolute top-10 left-1/2 transform -translate-x-1/2 border-l border-dashed border-theme-light-primary dark:border-theme-dark-primary opacity-50 h-20" />

          {/* Solid Line - Height changes dynamically */}
          <span
            ref={lineRef}
            className="absolute top-10 left-1/2 transform -translate-x-1/2 border-l border-solid border-theme-light-primary dark:border-theme-dark-primary transition-all duration-100 ease-linear"
            style={{ height: `${solidHeight}%`, maxHeight: '80px' }} // Dynamic height for the solid line
          />
        </>
      )}
    </div>
  );
};
