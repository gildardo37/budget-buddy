import React from "react";
import { InfoIcon } from "../svgs/InfoIcon";

interface Props {
  children: React.ReactNode;
}

export const ErrorLabel: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-between border border-red-500 rounded-xl px-4 py-3 text-red-500">
      <span>{children}</span>
      <InfoIcon color="rgb(239 68 68)" />
    </div>
  );
};
