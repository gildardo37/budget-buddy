import React from "react";
import { useRouter } from "next/router";
import { CustomDropdownOptions, Transaction } from "@/types";
import { formatPrice, formattedAmount } from "@/utils/numbers";
import { useDeleteTransaction } from "@/services/useApi";
import { useAlert } from "@/hooks/useAlert";
import { BulletIcon } from "@/components/svgs/BulletIcon";
import { CustomDropdown } from "@/components/Dropdown/CustomDropdown";
import { Dialog } from "@/components/Modal/Dialog";
import { useModal } from "@/hooks/useModal";
import { handleErrors } from "@/utils/errors";

interface Props {
  transaction: Transaction;
  budgetId: string;
}

export const MyTransaction: React.FC<Props> = ({
  transaction: {
    id,
    ammount,
    description,
    transaction_type: { type },
    budgets,
  },
  budgetId,
}) => {
  const router = useRouter();
  const { displayAlert } = useAlert();
  const { isOpen, openModal, closeModal } = useModal();
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

  const notAvailable = () => {
    displayAlert({
      message: "This functionality is not implemented yet.",
      type: "warning",
      duration: 6000,
    });
  };

  const options: CustomDropdownOptions[] = [
    { action: notAvailable, name: "Edit" },
    { action: openModal, name: "Delete" },
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
          dialogOpen={isOpen}
          onClose={closeModal}
          onConfirmation={handleDelete}
        >
          <p>
            Are you sure you want to permantly delete {description} transaction?
          </p>
        </Dialog>
      </div>
      <p className="text-center text-3xl font-bold">
        {formattedAmount(ammount, type)}
      </p>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          {budgets.description} {formatPrice(budgets.ammount)}
        </p>
      </div>
    </div>
  );
};
