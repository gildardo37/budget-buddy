import { supabase } from "./database";
import {
  AddBudgetProps,
  AddProfileProps,
  AddTransactionProps,
  Budget,
  BudgetID,
  Category,
  GetTransactionProps,
  Login,
  Profile,
  Transaction,
  TransactionID,
  TransactionType,
  UpdateBudgetProps,
  UpdateProfileProps,
  UpdateTransactionProps,
  UploadTransactionProps,
  UploadTransactionResponse,
} from "@/types";
import { PostgrestSingleResponse, Session } from "@supabase/supabase-js";
import axios from "axios";

type SupabaseRequest<T> = Promise<PostgrestSingleResponse<T>>;

export const wait = (ms: number) => new Promise((fn) => setTimeout(fn, ms));

const handleRequest = <T>(fn: () => void) => {
  return fn() as unknown as SupabaseRequest<T>;
};

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
}: AddProfileProps) => {
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
}: UpdateProfileProps) => {
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
  return handleRequest<Profile[]>(() =>
    supabase
      .from("profile")
      .select()
      .eq("id", data.session?.user.id)
  );
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
  return handleRequest<Budget[]>(() =>
    supabase
      .from("budgets")
      .select()
      .eq("profile_id", data.session?.user.id)
      .order("created_at", { ascending: false })
  );
};

export const getBudgetById = async (id: BudgetID) => {
  const { data } = await supabase.auth.getSession();
  return handleRequest<Budget[]>(() =>
    supabase
      .from("budgets")
      .select()
      .eq("id", id)
      .eq("profile_id", data.session?.user.id)
  );
};

export const addBudget = async ({ description, amount }: AddBudgetProps) => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("budgets")
    .insert({ description, amount, profile_id: data.session?.user.id });
};

export const updateBudget = async ({
  id,
  description,
  amount,
}: UpdateBudgetProps) => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("budgets")
    .update({ description, amount })
    .eq("id", id)
    .eq("profile_id", data.session?.user.id);
};

export const deleteBudget = async (budgetId: BudgetID) => {
  const { data } = await supabase.auth.getSession();
  return await supabase
    .from("budgets")
    .delete()
    .eq("id", budgetId)
    .eq("profile_id", data.session?.user.id);
};

export const getTransactions = async ({
  budgetId,
  sort = "created_at",
  order = "DSC",
}: GetTransactionProps) => {
  const { data } = await supabase.auth.getSession();
  return handleRequest<Transaction[]>(() => {
    return supabase
      .from("transactions")
      .select("*, budgets(*), transaction_type(*), categories(*)")
      .eq("budget_fk", budgetId)
      .eq("budgets.profile_id", data.session?.user.id)
      .order(sort, { ascending: order === "ASC" });
  });
};

export const getTransactionById = async (
  id: TransactionID,
  budgetId: BudgetID
) => {
  const { data } = await supabase.auth.getSession();
  return handleRequest<Transaction[]>(() => {
    return supabase
      .from("transactions")
      .select("*, budgets(*), transaction_type(*), categories(*)")
      .eq("id", id)
      .eq("budget_fk", budgetId)
      .eq("budgets.profile_id", data.session?.user.id);
  });
};

export const addTransaction = async ({
  description,
  amount,
  budget_fk,
  transaction_type_fk,
  category_fk,
}: AddTransactionProps) => {
  return await supabase.from("transactions").insert({
    description,
    amount,
    budget_fk,
    transaction_type_fk,
    category_fk,
  });
};

export const addBulkTransaction = async (data: AddTransactionProps[]) => {
  return await supabase.from("transactions").insert(data);
};

export const updateTransaction = async ({
  id,
  budget_fk,
  amount,
  description,
  transaction_type_fk,
  category_fk,
}: UpdateTransactionProps) => {
  return handleRequest<Transaction[]>(() =>
    supabase
      .from("transactions")
      .update({ description, amount, transaction_type_fk, category_fk })
      .eq("id", id)
      .eq("budget_fk", budget_fk)
      .select()
  );
};

export const deleteTransaction = async (
  id: TransactionID,
  budgetId: BudgetID
) => {
  return await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("budget_fk", budgetId);
};

export const getTransactionType = async () => {
  return handleRequest<TransactionType[]>(() =>
    supabase
      .from("transaction_type")
      .select("id, type")
      .order("id", { ascending: false })
  );
};

export const getCategories = async () => {
  return handleRequest<Category[]>(() =>
    supabase.from("categories").select("*").order("name", { ascending: true })
  );
};

export const uploadTransactionFile = async (body: UploadTransactionProps) => {
  const apiUrl = "/api/uploadFile";
  return await axios.post<UploadTransactionResponse>(apiUrl, body);
};
