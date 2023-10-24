import React from "react";
import { useModal } from "@/hooks/useModal";
import { Button } from "@/components/Button";
import { AddIcon } from "@/components/svgs/AddIcon";
import { Modal } from "@/components/Modal";
import { BudgetForm } from "@/components/Budget/BudgetForm";

export const AddBudget: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 flex flex-col items-center p-4 md:static ">
        <Button
          onClick={openModal}
          icon={<AddIcon color="white" />}
          className="w-full max-w-md shadow-md md:w-full md:max-w-[250px]"
        >
          Add a budget
        </Button>
      </div>
      <Modal title="Add a Budget" modalOpen={isOpen} onClose={closeModal}>
        <BudgetForm onSuccess={closeModal} />
      </Modal>
    </>
  );
};
