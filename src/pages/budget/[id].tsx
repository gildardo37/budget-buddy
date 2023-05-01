import { useState } from "react";
import { NextPage } from "next";
import { BudgetActions } from "@/components/BudgetActions";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { MyBudget } from "@/components/MyBudget";
import { PurchaseForm } from "@/components/PurchaseForm";
import { useTransaction } from "@/client/user-client";
import { useRouter } from "next/router";
import { ListItem } from "@/components/ListItem";
import { Transaction } from "@/types";
import { Loading } from "@/components/Loading";

const Overview: NextPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsOpenModal] = useState(false);
  const id = router.query.id as string;
  const { data: transactions, isLoading } = useTransaction(id);

  return (
    <section className="flex flex-col gap-4">
      <Header title="Overview" showBack />
      <MyBudget transactions={transactions?.data as Transaction[]} id={id} />
      <BudgetActions
        editAction={() => setIsOpenModal(true)}
        addAction={() => setIsOpenModal(true)}
      />
      <Modal
        title="Add a spending"
        modalOpen={isModalOpen}
        onClose={() => setIsOpenModal(false)}
      >
        <PurchaseForm />
      </Modal>
      {isLoading ? (
        <Loading />
      ) : transactions?.data?.length ? (
        <ul className="flex flex-col gap-4">
          {([...transactions.data].reverse() as Transaction[]).map(
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
    </section>
  );
};

export default Overview;
