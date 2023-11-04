import React from "react";
import { DropdownOptions } from "@/types";
import { Dropdown } from "../Dropdown";
import { useGetTransactions } from "@/services/useApi";
import { useFilterParams } from "@/hooks/useFilterParams";

interface Props {
  budgetId: string;
}

const sortBy: DropdownOptions[] = [
  { name: "Date", value: "created_at" },
  { name: "Description", value: "description" },
  { name: "Amount", value: "amount" },
];

const orderBy: DropdownOptions[] = [
  { name: "ASC", value: "ASC" },
  { name: "DSC", value: "DSC" },
];

export const Filters: React.FC<Props> = ({ budgetId }) => {
  const { refetch } = useGetTransactions({ budgetId });
  const { handleSetParam, params } = useFilterParams({
    onChange: refetch,
    defaultParams: {
      sortBy: sortBy[0].value,
      orderBy: orderBy[0].value,
    },
  });

  return (
    <div className="flex gap-4">
      <Dropdown
        name="sortBy"
        options={sortBy}
        placeholder
        noStyles
        classes="w-28 py-2 cursor-pointer"
        onChange={handleSetParam}
        value={params.sortBy}
      />
      <Dropdown
        name="orderBy"
        options={orderBy}
        placeholder
        noStyles
        classes="w-20 py-2 cursor-pointer"
        onChange={handleSetParam}
        value={params.orderBy}
      />
    </div>
  );
};
