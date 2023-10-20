import { supabase } from "./database";
import {
  AddBudgetProps,
  AddProfile,
  AddTransaction,
  Login,
  UpdateBudgetProps,
  UpdateProfile,
} from "@/types";
import { Session } from "@supabase/supabase-js";

export const wait = (ms: number) => new Promise((fn) => setTimeout(fn, ms));

export const validateSession = async () => {
  await wait(1000);
  return await supabase.auth.getSession();
};

export const signIn = async ({ email, password }: Login) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => await supabase.auth.signOut();

export const signUp = async ({ email, password }: Login) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const addProfile = async ({
  id,
  email,
  first_name,
  last_name,
}: AddProfile) => {
  return await supabase.from("profile").insert({
    id,
    email,
    first_name,
    last_name,
  });
};

export const updateProfile = async ({
  first_name,
  last_name,
}: UpdateProfile) => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("profile")
    .update({
      first_name,
      last_name,
    })
    .eq("id", data.session?.user.id)
    .eq("email", data.session?.user.email)
    .select();
};

export const getProfile = async () => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("profile")
    .select()
    .eq("id", data.session?.user.id);
};

export const setUserSession = async ({
  access_token,
  refresh_token,
}: Session) => {
  await wait(2000);
  return await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
};

export const getBudgets = async () => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("budgets")
    .select()
    .eq("profile_id", data.session?.user.id);
};

export const getBudgetById = async (id: string) => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("budgets")
    .select()
    .eq("id", id)
    .eq("profile_id", data.session?.user.id);
};

export const addBudget = async ({ description, ammount }: AddBudgetProps) => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("budgets")
    .insert({ description, ammount, profile_id: data.session?.user.id });
};

export const updateBudget = async ({
  id,
  description,
  ammount,
}: UpdateBudgetProps) => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("budgets")
    .update({ description, ammount })
    .eq("id", id)
    .eq("profile_id", data.session?.user.id);
};

export const deleteBudget = async (budgetId: string) => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("budgets")
    .delete()
    .eq("id", budgetId)
    .eq("profile_id", data.session?.user.id);
};

export const getTransactions = async (budgetId: string) => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("transactions")
    .select("*, budgets(*), transaction_type(*)")
    .eq("budget_fk", budgetId)
    .eq("budgets.profile_id", data.session?.user.id)
    .order("id", { ascending: false });
};

export const getTransactionById = async (id: string, budgetId: string) => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("transactions")
    .select("*, budgets(*), transaction_type(*)")
    .eq("id", id)
    .eq("budget_fk", budgetId)
    .eq("budgets.profile_id", data.session?.user.id)
    .order("id", { ascending: false });
};

export const addTransaction = async ({
  description,
  ammount,
  budgetId,
  type,
}: AddTransaction) => {
  return await supabase.from("transactions").insert({
    description,
    ammount,
    budget_fk: budgetId,
    transaction_type_fk: type,
  });
};

export const deleteTransaction = async (id: string, budgetId: string) => {
  return await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("budget_fk", budgetId);
};

export const getTransactionType = async () => {
  return await supabase
    .from("transaction_type")
    .select("id, type")
    .order("id", { ascending: false });
};
