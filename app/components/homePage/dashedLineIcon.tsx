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

      // If part of the dashed line is in the top 50%, make part of it solid
      if (rect.top < middleOfScreen) {
        const percentageSolid =
          ((middleOfScreen - rect.top) / rect.height) * 100;
        setSolidHeight(Math.min(percentageSolid, 100)); // Transition smoothly
      } else {
        setSolidHeight(0); // Keep it dashed below the middle of the screen
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
      }}
    >
      {/* Render Email Icon */}
      <EmailIcon isActive={isActive} />
      {/* Dashed line from bottom of icon */}
      {!disableLine && (
        <div
          ref={lineRef}
          style={{
            width: "1px",
            height: "70px", // Fixed height
            backgroundImage: `linear-gradient(
            to bottom,
            rgb(0, 61, 45) ${solidHeight}%, /* Solid part */
            rgba(0, 61, 45, 0.5) ${solidHeight}%, /* Dashed part */
            transparent ${solidHeight}%, /* Transparent part */
            transparent 100%
          )`,
            backgroundSize: "1px 8px",
            backgroundRepeat: "repeat-y",
            margin: "10px 0",
            opacity: 0.8,
            transition: "all 0.3s ease-in-out",
          }}
        />
      )}
    </ListItemIcon>
  );
};
