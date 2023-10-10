import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./database";
import { AddBudget, AddProfile, AddTransaction, Login } from "@/types";
import { Session } from "@supabase/supabase-js";

const profileKey = "profile";
const budgetsKey = "budgets";
const transactionsKey = "transactions";
const transactionTypesKey = "transactionTypes";

export const wait = (ms: number) => new Promise((fn) => setTimeout(fn, ms));

export const validateSession = async () => {
  await wait(1000);
  return await supabase.auth.getSession();
};

export const useLogin = () => {
  return useMutation(async ({ email, password }: Login) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  });
};

export const useLogout = () => {
  return useMutation(async () => await supabase.auth.signOut());
};

export const useSignUp = () => {
  return useMutation(async ({ email, password }: Login) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  });
};

export const useAddProfile = () => {
  return useMutation(
    async ({ id, email, first_name, last_name }: AddProfile) => {
      return await supabase.from("profile").insert({
        id,
        email,
        first_name,
        last_name,
      });
    }
  );
};

export const useGetProfile = () => {
  return useQuery([profileKey], async () => {
    const { data } = await supabase.auth.getSession();
    return await supabase
      .from("profile")
      .select()
      .eq("id", data.session?.user.id);
  });
};

export const useSetUserSession = () => {
  return useMutation(async ({ access_token, refresh_token }: Session) => {
    await wait(2000);
    return await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
  });
};

export const useMyBudgets = () => {
  return useQuery([budgetsKey], async () => {
    const { data } = await supabase.auth.getSession();
    return await supabase
      .from("budgets")
      .select()
      .eq("profile_id", data.session?.user.id);
  });
};

export const useBudget = (id: string) => {
  return useQuery([budgetsKey], async () => {
    const { data } = await supabase.auth.getSession();
    return await supabase
      .from("budgets")
      .select()
      .eq("id", id)
      .eq("profile_id", data.session?.user.id);
  });
};

export const useAddBudget = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ description, ammount }: AddBudget) => {
      const { data } = await supabase.auth.getSession();
      return await supabase
        .from("budgets")
        .insert({ description, ammount, profile_id: data.session?.user.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([budgetsKey]);
      },
    }
  );
};

export const useDeleteBudget = (budgetId: string) => {
  return useMutation(async () => {
    const { data } = await supabase.auth.getSession();
    return await supabase
      .from("budgets")
      .delete()
      .eq("id", budgetId)
      .eq("profile_id", data.session?.user.id);
  });
};

export const useTransaction = (budgetId: string) => {
  return useQuery([transactionsKey + budgetId], async () => {
    const { data } = await supabase.auth.getSession();
    return await supabase
      .from("transactions")
      .select("*, budgets(*), transaction_type(*)")
      .eq("budget_fk", budgetId)
      .eq("budgets.profile_id", data.session?.user.id)
      .order("id", { ascending: false });
  });
};

export const useTransactionById = (id: string, budgetId: string) => {
  return useQuery([`${transactionsKey}${budgetId}_${id}`], async () => {
    const { data } = await supabase.auth.getSession();
    return await supabase
      .from("transactions")
      .select("*, budgets(*), transaction_type(*)")
      .eq("id", id)
      .eq("budget_fk", budgetId)
      .eq("budgets.profile_id", data.session?.user.id)
      .order("id", { ascending: false });
  });
};

export const useAddTransaction = (budgetId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ description, ammount, budgetId, type }: AddTransaction) => {
      return await supabase.from("transactions").insert({
        description,
        ammount,
        budget_fk: budgetId,
        transaction_type_fk: type,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([transactionsKey + budgetId]);
      },
    }
  );
};

export const useDeleteTransaction = (id: string, budgetId: string) => {
  return useMutation(async () => {
    return await supabase
      .from("transactions")
      .delete()
      .eq("id", id)
      .eq("budget_fk", budgetId);
  });
};

export const useTransactionType = () => {
  return useQuery([transactionTypesKey], async () => {
    return await supabase
      .from("transaction_type")
      .select("id, type")
      .order("id", { ascending: false });
  });
};
