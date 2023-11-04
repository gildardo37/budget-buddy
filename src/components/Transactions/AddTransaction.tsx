import React from "react";
import { useModal } from "@/hooks/useModal";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { TransactionForm } from "@/components/Transactions/TransactionForm";
import { AddIcon } from "@/components/svgs/AddIcon";

interface Props {
  budgetId: string;
}

export const AddTransaction: React.FC<Props> = ({ budgetId }) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <Button
        className="md:max-w-lg"
        onClick={openModal}
        icon={<AddIcon color="white" />}
      >
        Add transaction
      </Button>
      <Modal title="Add a transaction" modalOpen={isOpen} onClose={closeModal}>
        <TransactionForm budgetId={budgetId} onSuccess={closeModal} />
      </Modal>
    </>
  );
};
