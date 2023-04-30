import React from "react";

export const BudgetProgress: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <div className="w-full rounded-full bg-blue-200">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: "70%" }}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col text-left">
          <span>$ 4500.00</span>
          <span className="font-semibold">Spent</span>
        </div>
        <div className="flex flex-col text-right">
          <span>$ 500.00</span>
          <span className="font-semibold">Available</span>
        </div>
      </div>
    </div>
  );
};
