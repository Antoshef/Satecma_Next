// app/loading.tsx
import React from "react";
import Spinner from "./components/Spinner";

const Loading = () => {
  return (
    <div className="inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <Spinner />
    </div>
  );
};

export default Loading;
