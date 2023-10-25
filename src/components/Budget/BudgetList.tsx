import React from "react";
import { Budget } from "@/types";
import { ListCard } from "@/components/List/ListCard";
import { formatPrice } from "@/utils/numbers";

interface Props {
  budgets: Budget[];
}

export const BudgetList: React.FC<Props> = ({ budgets }) => {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {budgets.map(({ id, ammount, description, created_at }) => (
        <ListCard
          key={id}
          href={`/budget/${id}`}
          content={formatPrice(ammount)}
          details={new Date(created_at).toDateString()}
          title={description}
        />
      ))}
    </ul>
  );
};
