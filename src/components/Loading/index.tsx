import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin w-12 h-12 border-4 border-solid rounded-full border-t-blue-500" />
    </div>
  );
};
