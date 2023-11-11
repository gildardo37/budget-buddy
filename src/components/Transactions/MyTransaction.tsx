import React from "react";
import { useRouter } from "next/router";
import { CustomDropdownOptions, Transaction } from "@/types";
import { useDeleteTransaction } from "@/hooks/useApi";
import { formatPrice, formattedAmount } from "@/utils/numbers";
import { handleErrors } from "@/utils/errors";
import { useAlert } from "@/hooks/useAlert";
import { useModal } from "@/hooks/useModal";
import { BulletIcon } from "@/components/svgs/BulletIcon";
import { CustomDropdown } from "@/components/Field/CustomDropdown";
import { Dialog } from "@/components/Modal/Dialog";
import { Modal } from "@/components/Modal";
import { TransactionForm } from "@/components/Transactions/TransactionForm";

interface Props {
  transaction: Transaction;
  budgetId: string;
}

export const MyTransaction: React.FC<Props> = ({ transaction, budgetId }) => {
  const {
    id,
    amount,
    description,
    transaction_type: { type },
    budgets,
  } = transaction;
  const router = useRouter();
  const { displayAlert } = useAlert();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDialogOpen,
    openModal: openDialog,
    closeModal: closeDialog,
  } = useModal();

  const { mutateAsync: deleteTransaction } = useDeleteTransaction(
    id.toString(),
    budgetId
  );

  const handleDelete = async () => {
    try {
      const response = await deleteTransaction();
      if (response.error) throw response.error;
      router.replace(`/budget/${budgetId}`);
    } catch (error) {
      handleErrors(error, displayAlert);
    }
  };

  const options: CustomDropdownOptions[] = [
    { action: openModal, name: "Edit" },
    { action: openDialog, name: "Delete" },
  ];

  return (
    <div className="relative flex w-full max-w-lg flex-col items-center gap-2 rounded-xl bg-slate-300/50 p-4">
      <div className="flex w-full">
        <h2 className="grow text-lg font-semibold">{description}</h2>
        <CustomDropdown
          labelContent={<BulletIcon color="rgb(75 85 99)" />}
          options={options}
          position="bottom-right"
        />
        <Dialog
          dialogOpen={isDialogOpen}
          onClose={closeDialog}
          onConfirmation={handleDelete}
        >
          <p>
            Are you sure you want to permantly delete {description} transaction?
          </p>
        </Dialog>
        <Modal
          title="Update transaction"
          modalOpen={isOpen}
          onClose={closeModal}
        >
          <TransactionForm
            budgetId={budgetId}
            onSuccess={closeModal}
            updateData={transaction}
          />
        </Modal>
      </div>
      <p className="text-center text-3xl font-bold">
        {formattedAmount(amount, type)}
      </p>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          {budgets.description} {formatPrice(budgets.amount)}
        </p>
      </div>
    </div>
  );
};
