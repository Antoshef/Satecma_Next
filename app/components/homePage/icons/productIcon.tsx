import React from 'react';

export const ProductIcon = ({ isActive }: { isActive?: boolean }) => {
  const activeClass = 'text-theme-light-primary dark:text-theme-dark-primary';
  const inactiveClass =
    'text-theme-light-secondary dark:text-theme-dark-secondary';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 64 64"
      id="productIcon"
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
      <g transform="scale(0.5) translate(15, 15)">
        <path
          fill={isActive ? '#fff' : 'currentColor'}
          strokeWidth="1"
          d="M95.3684 86.7561V86.7561C94.9483 76.2757 93.5348 65.8588 91.1468 55.6454L88.9471 46.2376C88.6325 44.892 87.4941 43.895 86.1191 43.7573V43.7573C71.1496 42.2582 56.0381 42.2552 41.0686 43.7543V43.7543C39.6781 43.8935 38.5352 44.912 38.2372 46.2774L38.0878 46.9622C34.5984 62.9519 32.6221 79.2346 32.1849 95.5947L32.1174 98.1202C32.0516 100.581 33.9259 102.662 36.3804 102.853L48 103.756C58.6506 104.584 69.3494 104.584 80 103.756V103.756"
        ></path>
        <path
          fill={isActive ? '#fff' : 'currentColor'}
          strokeWidth="1"
          d="M49 48.5V41.0508C49 32.7385 55.7157 26 64 26C72.2843 26 79 32.7385 79 41.0508V48.5"
        ></path>
        <circle
          cx="49"
          cy="54"
          r="4"
          fill={!isActive ? '#fff' : 'currentColor'}
          strokeWidth="1"
        ></circle>
        <circle
          cx="79"
          cy="54"
          r="4"
          fill={!isActive ? '#fff' : 'currentColor'}
          strokeWidth="1"
        ></circle>
        <circle
          cx="89"
          cy="97"
          r="13"
          fill={!isActive ? '#fff' : 'currentColor'}
          strokeWidth="1"
        ></circle>
        <path
          fill={!isActive ? '#fff' : 'currentColor'}
          strokeLinecap="round"
          strokeWidth="1"
          d="M89 92L89 102M94 97H84"
        ></path>
      </g>
    </svg>
  );
};
