import { Transaction } from "@/types";
import React from "react";
import { ListCard } from "../List/ListCard";
import { formatPrice } from "@/utils/numbers";

interface Props {
  data: Transaction[];
  budgetId: string;
}

export const TransactionsList: React.FC<Props> = ({ data, budgetId }) => {
  return (
    <ul className="flex flex-col gap-4">
      {data.map(
        ({
          id,
          ammount,
          description,
          created_at,
          transaction_type: { type },
        }) => (
          <ListCard
            key={id}
            href={`/budget/${budgetId}/transaction/${id}`}
            ammount={formatPrice(`${type === "expense" ? "-" : ""}${ammount}`)}
            textColor={type === "income" ? "text-green-600" : ""}
            date={new Date(created_at).toDateString()}
            description={description}
          />
        )
      )}
    </ul>
  );
};
