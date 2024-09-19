export const EmailIcon = ({ isActive }: { isActive?: boolean }) => {
  const activeClass = 'text-theme-light-primary dark:text-theme-dark-primary';
  const inactiveClass =
    'text-theme-light-secondary dark:text-theme-dark-secondary';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 64 64"
      id="emailIcon"
      className={isActive ? activeClass : inactiveClass}
    >
      {/* Outer Circle */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="currentColor" // Uses the theme color
        strokeWidth="2"
        fill="none"
        id="outerCircle"
      />

      {/* Inner Circle */}
      <circle
        cx="32"
        cy="32"
        r="24"
        fill={isActive ? 'currentColor' : 'none'} // Inner circle uses current color if active
        id="innerCircle"
      />

      {/* Adjusted Email Icon (Envelope) Path */}
      <g transform="scale(0.8) translate(7.5, 7.5)"> {/* Scale down by 0.9 and reposition */}
        <path
          d="M12 18H52C53.1046 18 54 18.8954 54 20V44C54 45.1046 53.1046 46 52 46H12C10.8954 46 10 45.1046 10 44V20C10 18.8954 10.8954 18 12 18Z"
          stroke={isActive ? '#fff' : 'currentColor'} // Adjusted stroke to use white or theme color
          fill="none" // No fill, only stroked
        />
        <path
          d="M32 32L12 20H52L32 32Z"
          stroke={isActive ? '#fff' : 'currentColor'} // Adjusted stroke to use white or theme color
          strokeWidth="1"
          fill="none" // No fill, only stroked
        />
      </g>
    </svg>
  );
};