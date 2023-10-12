import { useMemo } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Transaction } from "@/types";
import { useGetTransactionById } from "@/client/user-client";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { TransactionDetails } from "@/components/Transactions/TransactionDetails";
import { MyTransaction } from "@/components/Transactions/MyTransaction";

const TransactionPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const budgetId = router.query.budgetId as string;
  const { data, isLoading } = useGetTransactionById(id, budgetId);
  const transaction = useMemo(
    () => (data?.data?.length ? (data?.data[0] as Transaction) : undefined),
    [data]
  );

  return (
    <section>
      <Header title="Transaction details" showBack showSidebar />
      {isLoading ? (
        <Loading />
      ) : transaction ? (
        <>
          <div className="grid gap-4">
            <MyTransaction budgetId={budgetId} transaction={transaction} />
            <TransactionDetails transaction={transaction} />
          </div>
        </>
      ) : (
        <p>This transaction doesn&apos;t exists!</p>
      )}
    </section>
  );
};

export default TransactionPage;
