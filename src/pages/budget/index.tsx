import React from "react";
import { NextPage } from "next";
import { useGetBudgets } from "@/services/useApi";
import { Loading } from "@/components/Loading";
import { Header } from "@/components/Header";
import { BudgetList } from "@/components/Budget/BudgetList";
import { AddBudget } from "@/components/Budget/AddBudget";
import { RequestError } from "@/components/Errors/RequestError";

const BudgetPage: NextPage = () => {
  const { data: budgets, isLoading, error } = useGetBudgets();

  return (
    <section className="flex flex-col gap-4 pb-16 md:pb-0">
      <Header title="My budgets" showSidebar />
      {isLoading ? (
        <Loading />
      ) : budgets?.data?.length ? (
        <BudgetList budgets={budgets.data} />
      ) : (
        <p className="text-gray-500">No budgets added yet, start adding one.</p>
      )}
      {budgets?.error || error ? (
        <RequestError requestError={budgets?.error} error={error} />
      ) : (
        <AddBudget />
      )}
    </section>
  );
};

export default BudgetPage;
