import React from "react";
import { Budget, Transaction } from "@/types";
import { useBudget } from "@/client/user-client";
import { Loading } from "@/components/Loading";
import BudgetInformation from "@/components/Budget/BudgetInformation";

interface Props {
  transactions: Transaction[];
  id: string;
}

export const MyBudget: React.FC<Props> = ({ transactions, id }) => {
  const { data: budget, isLoading } = useBudget(id);

  const myBudget = () => {
    return [...(budget?.data || [])] as Budget[];
  };

  return (
    <div className="relative flex flex-col gap-2 items-center text-center p-4 rounded-xl bg-slate-300/50 ">
      {isLoading ? (
        <div className="grid place-items-center h-[152px]">
          <Loading />
        </div>
      ) : budget?.data?.length ? (
        <BudgetInformation transactions={transactions} myBudget={myBudget()} />
      ) : (
        "Something has failed."
      )}
    </div>
  );
};
