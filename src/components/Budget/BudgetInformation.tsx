import React, { useMemo } from "react";
import { Budget, Transaction } from "@/types";
import { useAlert } from "@/hooks/useAlert";
import { formatPrice } from "@/utils/numbers";
import { EditIcon } from "@/components/svgs/EditIcon";
import { BudgetProgress } from "@/components/Budget/BudgetProgress";

interface Props {
  transactions: Transaction[];
  myBudget: Budget[];
}

const BudgetInformation: React.FC<Props> = ({ myBudget, transactions }) => {
  const { displayAlert } = useAlert();
  const { totalSpent, availableBudget, totalBudget } = useMemo(() => {
    console.log("MEMO...");
    let totalSpent = 0;
    let totalIncome = 0;

    transactions?.forEach(({ ammount, transaction_type: { type } }) =>
      type === "income" ? (totalIncome += ammount) : (totalSpent += ammount)
    );
    const originalBudget = myBudget[0].ammount;
    const totalBudget = originalBudget + totalIncome;
    const availableBudget = totalBudget - totalSpent;

    return {
      totalBudget,
      totalIncome,
      totalSpent,
      originalBudget,
      availableBudget,
    };
  }, [transactions, myBudget]);

  const notAvailable = () => {
    displayAlert({
      message: "This functionality is not implemented yet.",
      type: "warning",
      duration: 6000,
    });
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <span className="font-semibold">My budget</span>
        <button onClick={notAvailable}>
          <EditIcon color="rgb(75 85 99)" />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">
          {formatPrice(availableBudget)}
        </span>
        <span className="text-sm text-gray-600">Available budget</span>
      </div>
      <BudgetProgress total={totalBudget} spent={totalSpent} />
    </>
  );
};

export default BudgetInformation;
