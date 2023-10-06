import React, { useMemo, useState } from "react";
import { Budget, CustomDropdownOptions, Transaction } from "@/types";
import { useAlert } from "@/hooks/useAlert";
import { formatPrice } from "@/utils/numbers";
import { BudgetProgress } from "@/components/Budget/BudgetProgress";
import { CustomDropdown } from "@/components/Dropdown/CustomDropdown";
import { BulletIcon } from "@/components/svgs/BulletIcon";
import { useDeleteBudget } from "@/client/user-client";
import { useRouter } from "next/router";
import { Dialog } from "../Modal/Dialog";

interface Props {
  transactions: Transaction[];
  myBudget: Budget;
  budgetId: string;
}

const BudgetInformation: React.FC<Props> = ({
  myBudget,
  transactions,
  budgetId,
}) => {
  const { displayAlert } = useAlert();
  const { mutateAsync: deleteBudget, error } = useDeleteBudget(budgetId);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { totalSpent, availableBudget, totalBudget } = useMemo(() => {
    let totalSpent = 0;
    let totalIncome = 0;

    transactions?.forEach(({ ammount, transaction_type: { type } }) =>
      type === "income" ? (totalIncome += ammount) : (totalSpent += ammount)
    );
    const { ammount: originalBudget } = myBudget;
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

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const notAvailable = () => {
    displayAlert({
      message: "This functionality is not implemented yet.",
      type: "warning",
      duration: 6000,
    });
  };

  const confirmAction = (value: boolean) => {
    if (value) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBudget();

      if (error) throw error;

      displayAlert({
        message: "Budget deleted successfully!",
        type: "success",
        duration: 6000,
        onClose: () => router.replace("/budget"),
      });
    } catch (error) {
      displayAlert({
        message: "Something failed while making this request.",
        type: "error",
        duration: 6000,
      });
    }
  };

  const options: CustomDropdownOptions[] = [
    { action: notAvailable, name: "Edit" },
    { action: openDialog, name: "Delete" },
  ];

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <span className="font-semibold">My budget</span>
        <CustomDropdown
          labelContent={<BulletIcon color="rgb(75 85 99)" />}
          options={options}
          position="bottom-right"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">
          {formatPrice(availableBudget)}
        </span>
        <span className="text-sm text-gray-600">Available budget</span>
      </div>
      <BudgetProgress total={totalBudget} spent={totalSpent} />
      <Dialog
        dialogOpen={isOpen}
        onClose={closeDialog}
        onConfirmation={confirmAction}
      >
        <p>Are you sure you want to permantly delete {myBudget.description}?</p>
      </Dialog>
    </>
  );
};

export default BudgetInformation;
