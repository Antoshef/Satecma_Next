export const EmailIcon = ({ isActive }: { isActive?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 100 100"
    id="emailIcon"
  >
    {/* Outer Circle */}
    <circle
      cx="50"
      cy="50"
      r="48"
      stroke={isActive ? "darkgreen" : "black"}
      strokeWidth="2"
      fill="none"
      id="outerCircle"
    />

    {/* Inner Circle (changes when active) */}
    <circle
      cx="50"
      cy="50"
      r="38"
      fill={isActive ? "darkgreen" : "none"}
      id="innerCircle"
    />

    {/* Email Icon (Envelope) */}
    <path
      d="M30 35 L50 50 L70 35 V65 H30 Z M30 35 H70 L50 50 Z"
      stroke={isActive ? "white" : "black"}
      strokeWidth="2"
      fill="none"
      id="envelope"
    />
  </svg>
);

import React, { useEffect, useState } from "react";

export const DashedLine = ({
  nextIconTop,
  previousIconBottom,
}: {
  nextIconTop: number;
  previousIconBottom: number;
}) => {
  const [solidHeight, setSolidHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const middleOfScreen = viewportHeight / 2;

      // Calculate the part of the dashed line that should be solid based on scroll
      if (previousIconBottom < middleOfScreen && nextIconTop < middleOfScreen) {
        setSolidHeight(100); // If the entire line is above the middle, make it fully solid
      } else if (previousIconBottom < middleOfScreen) {
        // Calculate how much of the dashed line is above the middle of the screen
        const percentageSolid =
          ((middleOfScreen - previousIconBottom) /
            (nextIconTop - previousIconBottom)) *
          100;
        setSolidHeight(Math.min(percentageSolid, 100)); // Transition gradually
      } else {
        setSolidHeight(0); // Line below the middle remains dashed
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextIconTop, previousIconBottom]);

  return (
    <div
      style={{
        zIndex: 1,
        position: "absolute",
        top: "100%", // Start from the bottom of the current icon
        left: "50%",
        transform: "translateX(-50%)",
        width: "1px",
        height: `${nextIconTop - previousIconBottom}px`, // Dynamic height based on distance between icons
        background: `linear-gradient(
          to bottom,
          rgb(0, 61, 45) ${solidHeight}%, 
          rgba(0, 61, 45, 0.5) ${solidHeight}%,
          rgba(0, 61, 45, 0.5) 100%
        )`,
        opacity: 0.8,
        transition: "background 0.3s ease",
      }}
    />
  );
};
