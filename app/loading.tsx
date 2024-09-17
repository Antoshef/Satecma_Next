import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center">
        {/* The circular loader */}
        <div
          style={{ borderColor: '#025F76', borderTopColor: 'transparent' }}
          className="w-16 h-16 border-4 rounded-full animate-spin"
        ></div>
        {/* Optional text */}
        <p style={{ color: '#025F76' }} className="mt-4 text-lg">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
