"use client";

import Image from "next/image";
import React, { useState } from "react";

export const HeroBanner = () => {
  // State for dynamic text content on the right side
  const [selectedContent, setSelectedContent] = useState(
    "Default text for the right side.",
  );

  // Array to hold the clickable options and their respective content
  const contentOptions = [
    {
      label: "Option 1",
      content: "This is the content for option 1. Explains feature 1.",
    },
    {
      label: "Option 2",
      content: "This is the content for option 2. Explains feature 2.",
    },
    {
      label: "Option 3",
      content: "This is the content for option 3. Explains feature 3.",
    },
    {
      label: "Option 4",
      content: "This is the content for option 4. Explains feature 4.",
    },
    {
      label: "Option 5",
      content: "This is the content for option 5. Explains feature 5.",
    },
  ];

  return (
    <div className="my-12 mx-auto max-w-6xl rounded-2xl shadow-lg bg-gradient-to-br from-gray-100 to-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="p-8">
          {/* Title */}
          <h3 className="text-3xl font-bold text-gray-900 tracking-wide mb-2">
            Управление на Проекти
          </h3>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-4">
            Управлявайте вашите проекти ефективно и лесно
          </p>

          {/* Price */}
          <h4 className="text-2xl font-bold text-gray-900 mb-2">$29 / месец</h4>

          {/* CTA Button */}
          <button className="mb-4 px-6 py-3 rounded-lg bg-blue-500 bg-gradient-to-br from-blue-500 to-blue-900 text-white shadow-md transition-transform transform hover:scale-105 hover:bg-gradient-to-br hover:from-blue-900 hover:to-blue-500">
            Запазете демо
          </button>

          {/* List of clickable options */}
          <ul className="list-none p-0">
            {contentOptions.map((option, index) => (
              <li key={index}>
                <button
                  className="w-full text-left py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSelectedContent(option.content)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="bg-gray-900 text-white rounded-2xl flex flex-col justify-center items-center p-8">
          {/* Example image - replace with actual image */}
          <Image
            src="/assets/girl-transparent.png"
            alt="Project Management Image"
            className="mb-3 w-24 h-auto"
            width={96}
            height={96}
          />

          {/* Dynamic Text */}
          <p className="text-center">{selectedContent}</p>
        </div>
      </div>
    </div>
  );
};
