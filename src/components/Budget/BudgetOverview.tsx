import React from "react";
import { useGetTransactions } from "@/services/useApi";
import { MyBudget } from "@/components/Budget/MyBudget";
import { Loading } from "@/components/Loading";
import { TransactionsList } from "@/components/Transactions/TransactionList";
import { RequestError } from "@/components/Errors/RequestError";
import { AddTransaction } from "@/components/Transactions/AddTransaction";
import { Filters } from "../Filters";

interface Props {
  id: string;
}

export const BudgetOverview: React.FC<Props> = ({ id }) => {
  const {
    data: transactions,
    isLoading: isTransactionLoading,
    error: transactionError,
  } = useGetTransactions({ budgetId: id });

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <MyBudget budgetId={id} />
        <AddTransaction budgetId={id} />
      </div>
      {isTransactionLoading ? (
        <Loading />
      ) : transactions?.data?.length &&
        !transactions.error &&
        !transactionError ? (
        <>
          <div className="flex items-center justify-between gap-4 pb-2 pt-4">
            <h2 className="text-lg font-medium">Transactions</h2>
            <Filters budgetId={id} />
          </div>
          <TransactionsList data={transactions.data} budgetId={id} />
        </>
      ) : transactions?.error || transactionError ? (
        <RequestError
          requestError={transactions?.error}
          error={transactionError}
        />
      ) : (
        <p className="py-4 text-gray-500 md:text-center">
          No transactions added yet, start adding one.
        </p>
      )}
    </>
  );
};
