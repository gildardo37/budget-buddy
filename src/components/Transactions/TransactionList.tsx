import React from "react";
import { Transaction } from "@/types";
import { formattedAmount } from "@/utils/numbers";
import { ListCard } from "@/components/List/ListCard";

interface Props {
  data: Transaction[];
  budgetId: string;
}

export const TransactionsList: React.FC<Props> = ({ data, budgetId }) => {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map(
        ({
          id,
          amount,
          description,
          created_at,
          transaction_type: { type },
        }) => (
          <ListCard
            key={id}
            href={`/budget/${budgetId}/transaction/${id}`}
            title={description}
            content={formattedAmount(amount, type)}
            details={new Date(created_at).toDateString()}
            textColor={type === "income" ? "text-green-600" : ""}
          />
        )
      )}
    </ul>
  );
};
