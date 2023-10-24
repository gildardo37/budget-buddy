import { clsxm } from "@/utils/clsxm";
import React from "react";

interface Props {
  small?: boolean;
}

export const Loading: React.FC<Props> = ({ small }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsxm(
          "h-12 w-12 animate-spin rounded-full border-4 border-solid border-t-blue-500",
          {
            "h-4 w-4 border-2": small,
          }
        )}
      />
    </div>
  );
};
