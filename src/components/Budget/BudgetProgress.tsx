import { formatPrice } from "@/utils/numbers";
import React from "react";

interface Props {
  totalSpent?: number;
  budget: number;
}

export const BudgetProgress: React.FC<Props> = ({ budget, totalSpent = 0 }) => {
  const available = budget - totalSpent;
  const percentage = (totalSpent / budget) * 100;

  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <div className="w-full rounded-full bg-blue-200">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col text-left">
          <span>{formatPrice(totalSpent)}</span>
          <span className="font-semibold">Spent</span>
        </div>
        <div className="flex flex-col text-right">
          <span>{formatPrice(available)}</span>
          <span className="font-semibold">Available</span>
        </div>
      </div>
    </div>
  );
};
