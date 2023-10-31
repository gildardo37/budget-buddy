import React from "react";
import { Transaction } from "@/types";
import { capitalizeText } from "@/utils/strings";
import { formattedAmount } from "@/utils/numbers";
import { ListItem } from "@/components/List/ListItem";

interface Props {
  transaction: Transaction;
}

export const TransactionDetails: React.FC<Props> = ({
  transaction: {
    id,
    amount,
    description,
    created_at,
    transaction_type: { type },
  },
}) => {
  return (
    <ul className="grid w-full max-w-lg gap-4 rounded-xl bg-slate-300/50 p-4">
      <ListItem title="Transaction ID" content={id} />
      <ListItem title="Amount" content={formattedAmount(amount, type)} />
      <ListItem title="Description" content={description} />
      <ListItem title="Transaction type" content={capitalizeText(type)} />
      <ListItem title="Date" content={new Date(created_at).toLocaleString()} />
    </ul>
  );
};
