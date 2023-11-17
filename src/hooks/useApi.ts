import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BudgetID,
  DropdownOptions,
  FilterOptions,
  GetTransactionFilters,
  GetTransactionProps,
  TransactionID,
} from "@/types";
import {
  addBudget,
  addBulkTransaction,
  addProfile,
  addTransaction,
  deleteBudget,
  deleteTransaction,
  getBudgetById,
  getBudgets,
  getCategories,
  getProfile,
  getTransactionById,
  getTransactionType,
  getTransactions,
  setUserSession,
  signIn,
  signOut,
  signUp,
  updateBudget,
  updateProfile,
  updateTransaction,
  uploadTransactionFile,
} from "@/services/api";
import { useFilterParams } from "@/hooks/useFilterParams";

const categoriesKey = "categories";
const profileKey = "profile";
const budgetsKey = "budgets";
const transactionKey = `transactions`;
const transactionTypesKey = "transactionTypes";

const budgetIdKey = (id: BudgetID) => [`${budgetsKey}-${id}`];

const transactionsKey = ({ budgetId, order, sort }: GetTransactionProps) => {
  const key: (string | Omit<GetTransactionProps, "budgetId">)[] = [
    `${transactionKey}-${budgetId}`,
  ];
  if (sort && order) key.push({ sort, order });
  return key;
};

const transactionIdKey = (budgetId: BudgetID, transactionId: TransactionID) => [
  `${transactionKey}-${budgetId}_id-${transactionId}`,
];

export const useLogin = () => useMutation({ mutationFn: signIn });

export const useLogout = () => useMutation({ mutationFn: signOut });

export const useSignUp = () => useMutation({ mutationFn: signUp });

export const useAddProfile = () => useMutation({ mutationFn: addProfile });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries([profileKey]);
    },
  });
};

export const useGetProfile = () => {
  return useQuery({ queryKey: [profileKey], queryFn: getProfile });
};

export const useSetUserSession = () => {
  return useMutation({ mutationFn: setUserSession });
};

export const useGetBudgets = () => {
  return useQuery({ queryKey: [budgetsKey], queryFn: getBudgets });
};

export const useGetBudgetById = (id: BudgetID) => {
  return useQuery({
    queryKey: budgetIdKey(id),
    queryFn: () => getBudgetById(id),
  });
};

export const useAddBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBudget,
    onSuccess: () => {
      queryClient.invalidateQueries([budgetsKey]);
    },
  });
};

export const useUpdateBudget = (id: BudgetID) => {
  if (!id) throw new Error("Missing ID propertry.");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBudget,
    onSuccess: () => {
      queryClient.invalidateQueries(budgetIdKey(id));
      queryClient.invalidateQueries([budgetsKey]);
    },
  });
};

export const useDeleteBudget = (budgetId: BudgetID) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteBudget(budgetId),
    onSuccess: () => {
      queryClient.invalidateQueries([budgetsKey]);
    },
  });
};

export const useGetTransactions = ({
  budgetId,
  order = "DSC",
  sort = "created_at",
}: GetTransactionProps) => {
  const data = { budgetId, order, sort };
  return useQuery({
    queryKey: transactionsKey(data),
    queryFn: () => getTransactions(data),
  });
};

export const useGetTransactionById = (
  id: TransactionID,
  budgetId: BudgetID
) => {
  return useQuery({
    queryKey: transactionIdKey(budgetId, id),
    queryFn: () => getTransactionById(id, budgetId),
  });
};

export const useAddTransaction = (budgetId: BudgetID) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(transactionsKey({ budgetId }));
    },
  });
};

export const useAddBulkTransaction = (budgetId: BudgetID) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBulkTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(transactionsKey({ budgetId }));
    },
  });
};

export const useUpdateTransaction = (
  budgetId: BudgetID,
  transactionId: TransactionID
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(transactionsKey({ budgetId }));
      queryClient.invalidateQueries(transactionIdKey(budgetId, transactionId));
    },
  });
};

export const useDeleteTransaction = (id: TransactionID, budgetId: BudgetID) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTransaction(id, budgetId),
    onSuccess: () => {
      queryClient.invalidateQueries(transactionsKey({ budgetId }));
    },
  });
};

export const useGetTransactionType = () => {
  return useQuery({
    queryKey: [transactionTypesKey],
    queryFn: getTransactionType,
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: [categoriesKey],
    queryFn: getCategories,
  });
};

export const useUploadTransactionFile = () => {
  return useMutation({ mutationFn: uploadTransactionFile });
};

//API Requests Hooks using filters

export const useGetTransactionFilters = (budgetId: BudgetID) => {
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
