import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { Budget, CustomDropdownOptions, Transaction } from "@/types";
import { useDeleteBudget } from "@/client/user-client";
import { formatPrice } from "@/utils/numbers";
import { useAlert } from "@/hooks/useAlert";
import { useModal } from "@/hooks/useModal";
import { BudgetProgress } from "@/components/Budget/BudgetProgress";
import { CustomDropdown } from "@/components/Dropdown/CustomDropdown";
import { BulletIcon } from "@/components/svgs/BulletIcon";
import { Dialog } from "@/components/Modal/Dialog";
import { Modal } from "../Modal";
import { BudgetForm } from "./BudgetForm";

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
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDialogOpen,
    openModal: openDialog,
    closeModal: closeDialog,
  } = useModal();
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

  const handleDelete = async () => {
    try {
      await deleteBudget();

      if (error) throw error;

      displayAlert({
        message: "Budget deleted successfully!",
        type: "success",
        duration: 3000,
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
    { action: openModal, name: "Edit" },
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
        dialogOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirmation={handleDelete}
      >
        <p>Are you sure you want to permantly delete {myBudget.description}?</p>
      </Dialog>
      <Modal title="Update budget" modalOpen={isOpen} onClose={closeModal}>
        <BudgetForm myBudget={myBudget} onSuccess={closeModal} />
      </Modal>
    </>
  );
};

export default BudgetInformation;
