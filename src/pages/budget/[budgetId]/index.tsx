import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useGetBudgetById } from "@/hooks/useApi";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { RequestError } from "@/components/Errors/RequestError";
import { BudgetOverview } from "@/components/Budget/BudgetOverview";

const Overview: NextPage = () => {
  const router = useRouter();
  const id = router.query.budgetId as string;
  const {
    data: budget,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = useGetBudgetById(id);

  const validBudget = () => {
    return budget?.data?.[0] && !budget?.error && !budgetError;
  };

  return (
    <section className="flex flex-col gap-4">
      <Head>
        <title>Overview | Budget Buddy</title>
      </Head>
      <Header
        title={budget?.data?.[0].description ?? "Overview"}
        showBack
        showSidebar
      />
      {isBudgetLoading ? (
        <Loading />
      ) : validBudget() ? (
        <BudgetOverview id={id} />
      ) : (
        <RequestError
          requestError={budget?.error}
          error={budgetError}
          fallbackMessage="This is not a valid Budget ID, please go back to home."
        />
      )}
    </section>
  );
};

export default Overview;
