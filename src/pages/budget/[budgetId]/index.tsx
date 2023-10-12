import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Transaction } from "@/types";
import { useGetTransactions } from "@/client/user-client";
import { useModal } from "@/hooks/useModal";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { MyBudget } from "@/components/Budget/MyBudget";
import { TransactionForm } from "@/components/Transactions/TransactionForm";
import { Loading } from "@/components/Loading";
import { TransactionsList } from "@/components/Transactions/TransactionList";
import { Button } from "@/components/Button";
import { AddIcon } from "@/components/svgs/AddIcon";

const Overview: NextPage = () => {
  const router = useRouter();
  const id = router.query.budgetId as string;
  const { data: transactions, isLoading } = useGetTransactions(id);
  const { isOpen, openModal, closeModal } = useModal();
  const [validBudget, setValidBudget] = useState(true);

  const allTransactions = () => {
    return [...(transactions?.data || [])] as Transaction[];
  };

  return (
    <section className="flex flex-col gap-4">
      <Header title="Overview" showBack showSidebar />
      {validBudget ? (
        <>
          <MyBudget
            transactions={allTransactions()}
            id={id}
            budgetExists={(value) => setValidBudget(value)}
          />
          <Button onClick={openModal} icon={<AddIcon color="white" />}>
            Add transaction
          </Button>
          <Modal
            title="Add a transaction"
            modalOpen={isOpen}
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
            <p className="text-gray-500">
              No budgets added yet, start adding one.
            </p>
          )}
        </>
      ) : (
        <p>This is not a valid Budget ID, please go back to home.</p>
      )}
    </section>
  );
};

export default Overview;
