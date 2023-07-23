import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Transaction } from "@/types";
import { useTransaction } from "@/client/user-client";
import { BudgetActions } from "@/components/Budget/BudgetActions";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { MyBudget } from "@/components/Budget/MyBudget";
import { TransactionForm } from "@/components/Transactions/TransactionForm";
import { Loading } from "@/components/Loading";
import { TransactionsList } from "@/components/Transactions/TransactionList";

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
        title="Add a transaction"
        modalOpen={isModalOpen}
        onClose={closeModal}
      >
        <TransactionForm budgetId={id} onSuccess={closeModal} />
      </Modal>
      {isLoading ? (
        <Loading />
      ) : transactions?.data?.length ? (
        <>
          <h2 className="text-lg font-medium">Transactions</h2>
          <TransactionsList data={allTransactions()} budgetId={id} />
        </>
      ) : (
        <p className="text-gray-500">No budgets added yet, start adding one.</p>
      )}
    </section>
  );
};

export default Overview;
