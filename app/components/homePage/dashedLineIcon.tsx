"use client";

import { ListItemIcon } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";

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

// DashedLineIcon Component
export const DashedLineIcon = ({
  isActive,
  disableLine,
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

      // Adjust the height of the solid line based on scroll position
      if (rect.top < middleOfScreen) {
        const percentageSolid =
          ((middleOfScreen - rect.top) / rect.height) * 100;
        setSolidHeight(Math.min(percentageSolid, 100)); // Grow the solid line up to 100%
      } else {
        setSolidHeight(0); // Keep it 0% below the middle of the screen
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ListItemIcon
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        height: "120px",
      }}
    >
      {/* Render Email Icon */}
      <EmailIcon isActive={isActive} />

      {/* Dashed and Solid Line */}
      {!disableLine && (
        <>
          {/* Dashed Line */}
          <span
            style={{
              zIndex: 1,
              position: "absolute",
              top: "40px", // Start from bottom of the icon
              left: "50%",
              transform: "translateX(-50%)",
              borderLeft: "1px dashed rgb(0, 61, 45)",
              height: "80px", // Fixed height for the dashed line
              width: "1px",
              opacity: 0.5,
            }}
          />

          {/* Solid Line - Height changes dynamically */}
          <span
            ref={lineRef}
            style={{
              zIndex: 1,
              position: "absolute",
              top: "40px", // Start from bottom of the icon
              left: "50%",
              transform: "translateX(-50%)",
              borderLeft: "1px solid rgb(0, 61, 45)",
              height: `${solidHeight}%`, // Dynamic height from 0% to 100%
              width: "1px",
              transition: "height 0.1s ease",
              maxHeight: "80px", // Fixed height for the solid line
            }}
          />
        </>
      )}
    </ListItemIcon>
  );
};
