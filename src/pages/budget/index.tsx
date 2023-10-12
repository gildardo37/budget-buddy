import React, { useEffect } from "react";
import { NextPage } from "next";
import { Budget } from "@/types";
import { useGetBudgets } from "@/client/user-client";
import { formatPrice } from "@/utils/numbers";
import { useModal } from "@/hooks/useModal";
import { useAlert } from "@/hooks/useAlert";
import { ListCard } from "@/components/List/ListCard";
import { Loading } from "@/components/Loading";
import { Header } from "@/components/Header";
import { BudgetForm } from "@/components/Budget/BudgetForm";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { AddIcon } from "@/components/svgs/AddIcon";

const BudgetPage: NextPage = () => {
  const { displayAlert } = useAlert();
  const { data: budgets, isLoading, error } = useGetBudgets();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (error) {
      const { message } = error as Error;
      displayAlert({ message, type: "error" });
    }
    //eslint-disable-next-line
  }, [error]);

  return (
    <section className="flex flex-col gap-4 pb-16">
      <Header title="My budgets" showSidebar />
      {isLoading ? (
        <Loading />
      ) : budgets?.data?.length ? (
        <ul className="flex flex-col gap-4">
          {([...budgets.data].reverse() as Budget[]).map(
            ({ id, ammount, description, created_at }) => (
              <ListCard
                key={id}
                href={`/budget/${id}`}
                ammount={formatPrice(ammount)}
                date={new Date(created_at).toDateString()}
                description={description}
              />
            )
          )}
        </ul>
      ) : (
        <p className="text-gray-500">No budgets added yet, start adding one.</p>
      )}
      <div className="max-w-md mx-auto fixed bottom-0 left-0 right-0 p-4 flex flex-col">
        <Button
          onClick={openModal}
          icon={<AddIcon color="white" />}
          className="shadow-md"
        >
          Add a budget
        </Button>
      </div>
      <Modal title="Add a Budget" modalOpen={isOpen} onClose={closeModal}>
        <BudgetForm onSuccess={closeModal} />
      </Modal>
    </section>
  );
};

export default BudgetPage;
