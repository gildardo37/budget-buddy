import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Transaction } from "@/types";
import { useTransaction } from "@/client/user-client";
import { BudgetActions } from "@/components/BudgetActions";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { MyBudget } from "@/components/MyBudget";
import { PurchaseForm } from "@/components/PurchaseForm";
import { Loading } from "@/components/Loading";
import { TransactionsList } from "@/components/TransactionsList";

const Overview: NextPage = () => {
  const router = useRouter();
  const id = router.query.budgetId as string;
  const { data: transactions, isLoading } = useTransaction(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allTransactions = () => {
    return [...(transactions?.data || [])] as Transaction[];
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="flex flex-col gap-4">
      <Header title="Overview" showBack />
      <MyBudget transactions={allTransactions()} id={id} />
      <BudgetActions editAction={openModal} addAction={openModal} />
      <Modal
        title="Add a spending"
        modalOpen={isModalOpen}
        onClose={closeModal}
      >
        <PurchaseForm budgetId={id} onSuccess={closeModal} />
      </Modal>
      {isLoading ? (
        <Loading />
      ) : transactions?.data?.length ? (
        <TransactionsList data={allTransactions()} budgetId={id} />
      ) : (
        <p className="text-gray-500">No budgets added yet, start adding one.</p>
      )}
    </section>
  );
};

export default Overview;
