import { useMemo } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Transaction } from "@/types";
import { useDeleteTransaction, useTransactionById } from "@/client/user-client";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";

const TransactionPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const budgetId = router.query.budgetId as string;
  const { data, isLoading } = useTransactionById(id, budgetId);
  const { mutateAsync: deleteTransaction } = useDeleteTransaction(id, budgetId);

  const transaction = useMemo(
    () => (data?.data?.length ? (data?.data[0] as Transaction) : undefined),
    [data]
  );

  const deleteData = async () => {
    try {
      const response = await deleteTransaction();
      if (response.error) throw response.error;
      router.replace(`/budget/${budgetId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <Header title="Transaction details" showBack />
      {isLoading ? (
        <Loading />
      ) : transaction ? (
        <>
          <div>
            <ul>
              <li>{transaction.id}</li>
              <li>{transaction.ammount}</li>
              <li>{transaction.description}</li>
              <li>{transaction.budgets.description}</li>
              <li>{transaction.transaction_type.type}</li>
            </ul>
          </div>
          <div className="max-w-md mx-auto fixed bottom-0 left-0 right-0 p-4 flex flex-col">
            <Button onClick={deleteData} className="shadow-md">
              Delete transaction
            </Button>
          </div>
        </>
      ) : (
        "This transaction doesn't exists!"
      )}
    </section>
  );
};

export default TransactionPage;
