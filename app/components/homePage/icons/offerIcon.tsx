import React from 'react';

export const OfferIcon = ({ isActive }: { isActive?: boolean }) => {
  const activeClass = 'text-theme-light-primary dark:text-theme-dark-primary';
  const inactiveClass =
    'text-theme-light-secondary dark:text-theme-dark-secondary';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 64 64"
      id="offerIcon"
      className={isActive ? activeClass : inactiveClass}
    >
      {/* Outer Circle */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        id="outerCircle"
      />

      {/* Inner Circle */}
      <circle
        cx="32"
        cy="32"
        r="24"
        fill={isActive ? 'currentColor' : 'none'}
        id="innerCircle"
      />

      {/* Simple Offer Icon - Price Tag */}
      <g transform="scale(1.5) translate(10.5, 10.5)">
        <path
          stroke={isActive ? '#fff' : 'currentColor'}
          strokeLinejoin="round"
          fill="none"
          d="M18 2H6C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22H11.8431C12.904 22 13.9214 21.5786 14.6716 20.8284L20.8284 14.6716C21.5786 13.9214 22 12.904 22 11.8431V6C22 3.79086 20.2091 2 18 2Z"
        />
        <path
          stroke={isActive ? '#fff' : 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M22 12H17C14.2386 12 12 14.2386 12 17V22"
        />
      </g>
    </svg>
  );
};
