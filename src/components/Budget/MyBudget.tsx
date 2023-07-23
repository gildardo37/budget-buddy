import React, { useMemo } from "react";
import { BudgetProgress } from "./BudgetProgress";
import { Budget, Transaction } from "@/types";
import { useBudget } from "@/client/user-client";
import { formatPrice } from "@/utils/numbers";

interface Props {
  transactions?: Transaction[];
  id: string;
}

export const MyBudget: React.FC<Props> = ({ transactions, id }) => {
  const { data: myBudget } = useBudget(id);

  const sumAmmounts = useMemo(() => {
    return transactions?.reduce(
      (acc, transaction) => acc + transaction.ammount,
      0
    );
  }, [transactions]);

  const budgetAmmount = useMemo(() => {
    return myBudget?.data && myBudget?.data.length
      ? (myBudget?.data[0] as Budget).ammount
      : 0;
  }, [myBudget]);

  return (
    <div className=" flex flex-col gap-2 items-center text-center p-4 rounded-xl bg-slate-300/50">
      <span className="font-semibold">My budget</span>
      <div className="flex items-center gap-1">
        <span className="text-2xl font-bold">
          {formatPrice(budgetAmmount) || "0.00"}
        </span>
      </div>
      <BudgetProgress budget={budgetAmmount} totalSpent={sumAmmounts} />
    </div>
  );
};
