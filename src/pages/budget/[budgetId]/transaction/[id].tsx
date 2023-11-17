import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetTransactionById } from "@/hooks/useApi";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { TransactionDetails } from "@/components/Transactions/TransactionDetails";
import { MyTransaction } from "@/components/Transactions/MyTransaction";
import { RequestError } from "@/components/Errors/RequestError";
import Head from "next/head";

const TransactionPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const budgetId = router.query.budgetId as string;
  const { data, isLoading, error } = useGetTransactionById(id, budgetId);

  return (
    <section className="flex flex-col gap-4">
      <Head>
        <title>Transaction Details | Budget Buddy</title>
      </Head>
      <Header title="Transaction details" showBack showSidebar />
      {isLoading ? (
        <Loading />
      ) : data?.data?.[0] && !data?.error && !error ? (
        <>
          <div className="flex flex-col items-center gap-4">
            <MyTransaction budgetId={budgetId} transaction={data.data[0]} />
            <TransactionDetails transaction={data.data[0]} />
          </div>
        </>
      ) : (
        <RequestError
          requestError={data?.error}
          error={error}
          fallbackMessage="This transaction doesn't exist!"
        />
      )}
    </section>
  );
};

export default TransactionPage;
