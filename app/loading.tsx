import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center">
        {/* The circular loader */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Optional text */}
        <p className="mt-4 text-blue-500 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
