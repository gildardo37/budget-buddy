import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addBudget,
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
} from "@/services/api";

type ID = string | number;

const categoriesKey = "categories";
const profileKey = "profile";
const budgetsKey = "budgets";
const budgetIdKey = (id: ID) => `${budgetsKey}-${id}`;
const transactionKey = `transactions`;
const transactionsKey = (budgetId: ID) => `${transactionKey}-${budgetId}`;
const transactionIdKey = (budgetId: ID, transactionId: ID) =>
  `${transactionsKey(budgetId)}_id-${transactionId}`;
const transactionTypesKey = "transactionTypes";

export const useLogin = () => {
  return useMutation(signIn);
};

export const useLogout = () => {
  return useMutation(signOut);
};

export const useSignUp = () => {
  return useMutation(signUp);
};

export const useAddProfile = () => {
  return useMutation(addProfile);
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries([profileKey]);
    },
  });
};

export const useGetProfile = () => {
  return useQuery([profileKey], getProfile);
};

export const useSetUserSession = () => {
  return useMutation(setUserSession);
};

export const useGetBudgets = () => {
  return useQuery([budgetsKey], getBudgets);
};

export const useGetBudgetById = (id: string) => {
  return useQuery([budgetIdKey(id)], () => getBudgetById(id));
};

export const useAddBudget = () => {
  const queryClient = useQueryClient();
  return useMutation(addBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries([budgetsKey]);
    },
  });
};

export const useUpdateBudget = (id: string) => {
  if (!id) throw new Error("Missing ID propertry.");
  const queryClient = useQueryClient();
  return useMutation(updateBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries([budgetIdKey(id)]);
      queryClient.invalidateQueries([budgetsKey]);
    },
  });
};

export const useDeleteBudget = (budgetId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteBudget(budgetId), {
    onSuccess: () => {
      queryClient.invalidateQueries([budgetsKey]);
    },
  });
};

export const useGetTransactions = (budgetId: string) => {
  return useQuery([transactionsKey(budgetId)], () => getTransactions(budgetId));
};

export const useGetTransactionById = (id: string, budgetId: string) => {
  return useQuery([transactionIdKey(budgetId, id)], () =>
    getTransactionById(id, budgetId)
  );
};

export const useAddTransaction = (budgetId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries([transactionsKey(budgetId)]);
    },
  });
};

export const useUpdateTransaction = (
  budgetId: string,
  transactionId: string
) => {
  const queryClient = useQueryClient();
  return useMutation(updateTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries([transactionsKey(budgetId)]);
      queryClient.invalidateQueries([
        transactionIdKey(budgetId, transactionId),
      ]);
    },
  });
};

export const useDeleteTransaction = (id: string, budgetId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteTransaction(id, budgetId), {
    onSuccess: () => {
      queryClient.invalidateQueries([transactionsKey(budgetId)]);
    },
  });
};

export const useGetTransactionType = () => {
  return useQuery([transactionTypesKey], getTransactionType);
};

export const useGetCategories = () => {
  return useQuery([categoriesKey], getCategories);
};
