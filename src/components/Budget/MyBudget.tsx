import React, { useEffect } from "react";
import { Budget, Transaction } from "@/types";
import { useGetBudgetById } from "@/client/user-client";
import { Loading } from "@/components/Loading";
import BudgetInformation from "@/components/Budget/BudgetInformation";

interface Props {
  transactions: Transaction[];
  id: string;
  budgetExists: (value: boolean) => void;
}

export const MyBudget: React.FC<Props> = ({
  transactions,
  id,
  budgetExists,
}) => {
  const { data: budget, isLoading, error } = useGetBudgetById(id);

  useEffect(() => {
    if (isLoading || (budget?.data?.length && !error)) {
      budgetExists(true);
    } else {
      budgetExists(false);
    }
  }, [budget, error, budgetExists, isLoading]);

  const myBudget = budget?.data?.[0] as Budget;

  return (
    <div className="relative flex flex-col gap-2 items-center p-4 rounded-xl bg-slate-300/50 max-w-lg w-full">
      {isLoading ? (
        <div className="grid place-items-center h-[152px]">
          <Loading />
        </div>
      ) : myBudget ? (
        <BudgetInformation
          transactions={transactions}
          myBudget={myBudget}
          budgetId={id}
        />
      ) : (
        "Something has failed."
      )}
    </div>
  );
};
