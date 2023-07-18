import { Transaction } from "@/types";
import React from "react";
import { ListItem } from "../ListItem";

interface Props {
  data: Transaction[];
  budgetId: string;
}

export const TransactionsList: React.FC<Props> = ({ data, budgetId }) => {
  return (
    <ul className="flex flex-col gap-4">
      {data.map(({ id, ammount, description, created_at }) => (
        <ListItem
          key={id}
          href={`/budget/${budgetId}/transaction/${id}`}
          ammount={ammount}
          date={created_at}
          description={description}
        />
      ))}
    </ul>
  );
};
