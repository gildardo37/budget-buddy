import React from "react";
import { useGetTransactionFilters } from "@/hooks/useApi";
import { MyBudget } from "@/components/Budget/MyBudget";
import { Loading } from "@/components/Loading";
import { RequestError } from "@/components/Errors/RequestError";
import { Filters } from "@/components/Filters";
import { TransactionsList } from "@/components/Transactions/TransactionList";
import { AddTransaction } from "@/components/Transactions/AddTransaction";
import { LoadTransaction } from "@/components/Transactions/LoadTransaction";

interface Props {
  id: string;
}

export const BudgetOverview: React.FC<Props> = ({ id }) => {
  const {
    data: transactions,
    isLoading,
    error,
    filterOptions,
    handleSetParam,
  } = useGetTransactionFilters(id);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <MyBudget budgetId={id} />
        <AddTransaction budgetId={id} />
        <LoadTransaction budgetId={id} />
      </div>
      {isLoading ? (
        <Loading />
      ) : transactions?.data?.length && !transactions.error && !error ? (
        <>
          <div className="flex items-center justify-between gap-4 pb-2 pt-4">
            <h2 className="text-lg font-medium">Transactions</h2>
            <Filters filters={filterOptions} onChange={handleSetParam} />
          </div>
          <TransactionsList data={transactions.data} budgetId={id} />
        </>
      ) : transactions?.error || error ? (
        <RequestError requestError={transactions?.error} error={error} />
      ) : (
        <p className="py-4 text-gray-500 md:text-center">
          No transactions added yet, start adding one.
        </p>
      )}
    </>
  );
};
