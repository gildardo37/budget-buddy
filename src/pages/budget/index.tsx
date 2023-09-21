import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useMyBudgets } from "@/client/user-client";
import { Budget } from "@/types";
import { ListItem } from "@/components/ListItem";
import { Loading } from "@/components/Loading";
import { Header } from "@/components/Header";
import { useAlert } from "@/hooks/useAlert";
import { BudgetForm } from "@/components/Budget/BudgetForm";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { AddIcon } from "@/components/svgs/AddIcon";

const BudgetPage: NextPage = () => {
  const { displayAlert } = useAlert();
  const { data: budgets, isLoading, error } = useMyBudgets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (error) {
      const { message } = error as Error;
      displayAlert({ message, type: "error" });
    }
    //eslint-disable-next-line
  }, [error]);

  return (
    <section className="flex flex-col gap-4 pb-16">
      <Header title="My budgets" />
      {isLoading ? (
        <Loading />
      ) : budgets?.data?.length ? (
        <ul className="flex flex-col gap-4">
          {([...budgets.data].reverse() as Budget[]).map(
            ({ id, ammount, description, created_at }) => (
              <ListItem
                key={id}
                href={`/budget/${id}`}
                ammount={ammount}
                date={created_at}
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
      <Modal title="Add a Budget" modalOpen={isModalOpen} onClose={closeModal}>
        <BudgetForm onSuccess={closeModal}/>
      </Modal>
    </section>
  );
};

export default BudgetPage;
