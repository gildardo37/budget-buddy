import React from "react";
import Image from "next/image";

export const LoadingState: React.FC = () => {
  return (
    <div className="flex h-screen touch-none flex-col items-center justify-center bg-blue-500">
      <Image
        className="animate-bounce-quick"
        src="/img/logo-white.svg"
        alt="Budget Buddy logo"
        width="300"
        height="100"
      />
    </div>
  );
};

export default LoadingState;
