import React from "react";
import { formatPrice } from "@/utils/numbers";

interface Props {
  spent: number;
  total: number;
}

export const BudgetProgress: React.FC<Props> = ({ total, spent }) => {
  const value = (spent / total) * 100;
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <div className="w-full rounded-full bg-blue-200">
        <div
          className="progress-bar bg-blue-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col text-left">
          <span>{formatPrice(spent)}</span>
        </div>
        <div className="flex flex-col text-right">
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};
