import React from "react";
import { useGetTransactions } from "@/services/useApi";
import { MyBudget } from "@/components/Budget/MyBudget";
import { Loading } from "@/components/Loading";
import { TransactionsList } from "@/components/Transactions/TransactionList";
import { RequestError } from "@/components/Errors/RequestError";
import { AddTransaction } from "@/components/Transactions/AddTransaction";

interface Props {
  id: string;
}

export const BudgetOverview: React.FC<Props> = ({ id }) => {
  const {
    data: transactions,
    isLoading: isTransactionLoading,
    error: transactionError,
  } = useGetTransactions(id);

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <MyBudget id={id} />
        <AddTransaction id={id} />
      </div>
      {isTransactionLoading ? (
        <Loading />
      ) : transactions?.data?.length &&
        !transactions.error &&
        !transactionError ? (
        <>
          <h2 className="text-lg font-medium">Transactions</h2>
          <TransactionsList data={transactions.data} budgetId={id} />
        </>
      ) : transactions?.error || transactionError ? (
        <RequestError
          requestError={transactions?.error}
          error={transactionError}
        />
      ) : (
        <p className="text-gray-500 py-4">
          No transactions added yet, start adding one.
        </p>
      )}
    </>
  );
};
