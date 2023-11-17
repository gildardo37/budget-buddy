import React from "react";
import { useModal } from "@/hooks/useModal";
import { BudgetID } from "@/types";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { UploadTransactionForm } from "@/components/Transactions/UploadTransactionForm";

interface Props {
  budgetId: BudgetID;
}

export const LoadTransaction: React.FC<Props> = ({ budgetId }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Button
        className="md:max-w-lg"
        buttonType="secondary"
        onClick={openModal}
      >
        Load from file
      </Button>
      <Modal
        title="Add transactions from file"
        onClose={closeModal}
        modalOpen={isOpen}
      >
        <UploadTransactionForm budgetId={budgetId} onSuccess={closeModal} />
      </Modal>
    </>
  );
};
