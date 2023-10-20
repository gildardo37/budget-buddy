import React from "react";
import { NextPage } from "next";
import { Budget } from "@/types";
import { useGetBudgets } from "@/services/useClient";
import { Loading } from "@/components/Loading";
import { Header } from "@/components/Header";
import { BudgetList } from "@/components/Budget/BudgetList";
import { AddBudget } from "@/components/Budget/AddBudget";

const BudgetPage: NextPage = () => {
  const { data: budgets, isLoading, error } = useGetBudgets();

  return (
    <section className="flex flex-col gap-4 pb-16 md:pb-0">
      <Header title="My budgets" showSidebar />
      {isLoading ? (
        <Loading />
      ) : budgets?.data?.length ? (
        <BudgetList budgets={[...budgets.data].reverse() as Budget[]} />
      ) : (
        <p className="text-gray-500">No budgets added yet, start adding one.</p>
      )}
      {error ? (
        <p className="text-gray-500">
          {budgets?.error?.message ??
            (error as Error)?.message ??
            "Something failed, please try again in another moment."}
        </p>
      ) : (
        <AddBudget />
      )}
    </section>
  );
};

export default BudgetPage;
