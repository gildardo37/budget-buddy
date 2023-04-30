import React from "react";
import { Loading } from "./";
import Image from "next/image";

export const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-blue-500 h-screen touch-none">
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
