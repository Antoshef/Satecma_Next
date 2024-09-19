import React from 'react';

export const ClientIcon = ({ isActive }: { isActive?: boolean }) => {
  const activeClass = 'text-theme-light-primary dark:text-theme-dark-primary';
  const inactiveClass =
    'text-theme-light-secondary dark:text-theme-dark-secondary';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 64 64"
      id="clientIcon"
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
      <g transform="scale(0.7) translate(19, 17)">
        <path
          fill="none"
          stroke={isActive ? '#fff' : 'currentColor'}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          d="M44.199 32.494V50H7.8V32.494a6.444 6.444 0 0 1 6.442-6.442h6.687l5.064 13.322 5.076-13.322h6.687a6.444 6.444 0 0 1 6.442 6.442zM36.047 10.865c0 1.436-.907 2.602-2.051 2.688-.735 4.45-4.039 7.796-7.99 7.796-3.963 0-7.267-3.347-8.002-7.796-1.144-.086-2.051-1.252-2.051-2.688 0-1.49.982-2.7 2.192-2.7.086 0 .172.011.259.022C19.57 4.57 22.539 2 26.005 2c3.456 0 6.425 2.57 7.591 6.187.087-.01.173-.022.26-.022 1.209 0 2.191 1.21 2.191 2.7z"
        ></path>
      </g>
    </svg>
  );
};
