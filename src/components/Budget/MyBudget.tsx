import React from "react";
import { useGetBudgetById } from "@/services/useApi";
import { Loading } from "@/components/Loading";
import { BudgetInformation } from "@/components/Budget/BudgetInformation";

interface Props {
  id: string;
}

export const MyBudget: React.FC<Props> = ({ id }) => {
  const { data: budget, isLoading } = useGetBudgetById(id);
  const myBudget = budget?.data?.[0];

  return (
    <div className="relative flex flex-col gap-2 items-center p-4 rounded-xl bg-slate-300/50 max-w-lg w-full">
      {isLoading ? (
        <div className="grid place-items-center h-[152px]">
          <Loading />
        </div>
      ) : myBudget ? (
        <BudgetInformation budgetId={id} />
      ) : (
        "Something has failed."
      )}
    </div>
  );
};
