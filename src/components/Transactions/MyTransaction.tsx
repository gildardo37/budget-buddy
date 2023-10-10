import React from "react";
import { useRouter } from "next/router";
import { CustomDropdownOptions, Transaction } from "@/types";
import { formatPrice, formattedAmount } from "@/utils/numbers";
import { useDeleteTransaction } from "@/client/user-client";
import { useAlert } from "@/hooks/useAlert";
import { BulletIcon } from "@/components/svgs/BulletIcon";
import { CustomDropdown } from "@/components/Dropdown/CustomDropdown";
import { Dialog } from "@/components/Modal/Dialog";
import { useModal } from "@/hooks/useModal";

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
      console.error(error);
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
    <div className="flex flex-col gap-2 relative items-center p-4 rounded-xl bg-slate-300/50">
      <div className="flex w-full">
        <h2 className="flex-grow text-lg font-semibold">{description}</h2>
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
      <p className="text-3xl font-bold text-center">
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
