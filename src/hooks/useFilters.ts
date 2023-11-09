import { DropdownOptions, FilterOptions, GetTransactionFilters } from "@/types";
import { useFilterParams } from "./useFilterParams";
import { useGetTransactions } from "@/services/useApi";

export const useGetTransactionFilters = (budgetId: string) => {
  const sortBy: DropdownOptions<GetTransactionFilters["sort"]>[] = [
    { name: "Date", value: "created_at" },
    { name: "Description", value: "description" },
    { name: "Amount", value: "amount" },
  ];

  const orderBy: DropdownOptions<GetTransactionFilters["order"]>[] = [
    { name: "DSC", value: "DSC" },
    { name: "ASC", value: "ASC" },
  ];

  const { handleSetParam, params } = useFilterParams<GetTransactionFilters>({
    onChange: () => refetch(),
    defaultParams: { sort: sortBy[0].value, order: orderBy[0].value },
  });

  const { data, isLoading, error, refetch } = useGetTransactions({
    budgetId,
    order: params.order,
    sort: params.sort,
  });

  const filterOptions: FilterOptions[] = [
    { label: "Sort", options: sortBy, value: params.sort },
    { label: "Order", options: orderBy, value: params.order },
  ];

  return {
    data,
    isLoading,
    error,
    refetch,
    filterOptions,
    handleSetParam,
    sortBy,
    orderBy,
  };
};
