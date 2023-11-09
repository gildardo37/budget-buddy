import React from "react";
import { useGetBudgetById } from "@/hooks/useApi";
import { Loading } from "@/components/Loading";
import { BudgetInformation } from "@/components/Budget/BudgetInformation";

interface Props {
  budgetId: string;
}

export const MyBudget: React.FC<Props> = ({ budgetId }) => {
  const { data: budget, isLoading } = useGetBudgetById(budgetId);
  const myBudget = budget?.data?.[0];

  return (
    <div className="relative flex w-full max-w-lg flex-col items-center gap-2 rounded-xl bg-slate-300/50 p-4">
      {isLoading ? (
        <div className="grid h-[152px] place-items-center">
          <Loading />
        </div>
      ) : myBudget ? (
        <BudgetInformation budgetId={budgetId} />
      ) : (
        "Something has failed."
      )}
    </div>
  );
};
