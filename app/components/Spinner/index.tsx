import React from "react";

const Spinner = () => {
  return (
    <div className="relative w-10 h-10 mx-auto my-24">
      <div className="absolute w-full h-full bg-gray-800 opacity-60 rounded-full animate-bounce"></div>
      <div className="absolute w-full h-full bg-gray-800 opacity-60 rounded-full animate-bounce delay-1000"></div>
    </div>
  );
};

export default Spinner;
