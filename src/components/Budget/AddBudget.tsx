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
      <div className="fixed bottom-0 left-0 right-0 p-4 flex flex-col items-center md:static ">
        <Button
          onClick={openModal}
          icon={<AddIcon color="white" />}
          className="w-full shadow-md max-w-md md:max-w-[250px] md:w-full"
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
