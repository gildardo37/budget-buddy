import React from "react";
import { useStorage } from "@/hooks/useStorage";
import { StoredData } from "@/types";
import { BudgetProgress } from "../BudgetProgress";

export const MyBudget = () => {
  const { getStorage } = useStorage<StoredData>("My-budgets");
  const budget = getStorage()?.budget;

  return (
    <div className=" flex flex-col gap-2 items-center text-center p-4 rounded-xl bg-slate-300/50">
      <span className="font-semibold">My budget</span>
      <div className="flex items-center gap-1">
        <span>$</span>
        <span className="text-2xl font-bold">
          {budget?.toFixed(2) || "0.00"}
        </span>
      </div>
      <BudgetProgress />
    </div>
  );
};
