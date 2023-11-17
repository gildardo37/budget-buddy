import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { Budget, CustomDropdownOptions } from "@/types";
import {
  useDeleteBudget,
  useGetBudgetById,
  useGetTransactions,
} from "@/hooks/useApi";
import { formatPrice } from "@/utils/numbers";
import { handleErrors } from "@/utils/errors";
import { useAlert } from "@/hooks/useAlert";
import { useModal } from "@/hooks/useModal";
import { BudgetProgress } from "@/components/Budget/BudgetProgress";
import { CustomDropdown } from "@/components/Field/CustomDropdown";
import { BulletIcon } from "@/components/svgs/BulletIcon";
import { Dialog } from "@/components/Modal/Dialog";
import { Modal } from "@/components/Modal";
import { BudgetForm } from "@/components/Budget/BudgetForm";
import { clsxm } from "@/utils/clsxm";

interface Props {
  budgetId: string;
}

export const BudgetInformation: React.FC<Props> = ({ budgetId }) => {
  const { data: budget } = useGetBudgetById(budgetId);
  const { data: myTransactions } = useGetTransactions({ budgetId });
  const { mutateAsync: deleteBudget } = useDeleteBudget(budgetId);
  const router = useRouter();
  const { displayAlert } = useAlert();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDialogOpen,
    openModal: openDialog,
    closeModal: closeDialog,
  } = useModal();

  const myBudget = useMemo(() => budget?.data?.[0] as Budget, [budget]);
  const transactions = useMemo(
    () => myTransactions?.data ?? [],
    [myTransactions]
  );

  const { totalSpent, availableBudget, totalBudget } = useMemo(() => {
    let totalSpent = 0;
    let totalIncome = 0;

    transactions?.forEach(({ amount, transaction_type: { type } }) =>
      type === "Income" ? (totalIncome += amount) : (totalSpent += amount)
    );
    const { amount: originalBudget } = myBudget;
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
      const response = await deleteBudget();
      if (response.error) throw response.error;
      router.replace("/budget");
    } catch (error) {
      handleErrors(error, displayAlert);
    }
  };

  const options: CustomDropdownOptions[] = [
    { action: openModal, name: "Edit" },
    { action: openDialog, name: "Delete" },
  ];

  const hasBudgetAvailable = availableBudget > 0;

  return (
    <>
      <div className="flex w-full items-center justify-between">
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
        <span
          className={clsxm(
            "text-sm",
            hasBudgetAvailable ? "text-gray-600" : "text-red-600"
          )}
        >
          {hasBudgetAvailable ? "Available budget" : "Budget limit reached"}
        </span>
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
        <BudgetForm updateData={myBudget} onSuccess={closeModal} />
      </Modal>
    </>
  );
};
