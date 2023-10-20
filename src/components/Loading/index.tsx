import { clsxm } from "@/utils/clsxm";
import React from "react";

interface Props {
  small?: boolean;
}

export const Loading: React.FC<Props> = ({ small }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={clsxm(
          "animate-spin w-12 h-12 border-4 border-solid rounded-full border-t-blue-500",
          {
            "w-4 h-4 border-2": small,
          }
        )}
      />
    </div>
  );
};
