export interface Profile {
  id: string;
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type AddProfileProps = Omit<Profile, "created_at">;

export type UpdateProfileProps = Pick<Profile, "first_name" | "last_name">;

export interface Login {
  email: string;
  password: string;
}

export interface Budget {
  id: number;
  created_at: Date;
  description: string;
  amount: number;
  profile_id: string;
}

export type AddBudgetProps = Pick<Budget, "description" | "amount">;

export type UpdateBudgetProps = Omit<Budget, "created_at" | "profile_id">;

export type TransactionTypeOptions = "expense" | "income";

export interface TransactionType {
  id: number;
  created_at: Date;
  type: TransactionTypeOptions;
}

export interface Transaction {
  id: number;
  created_at: string;
  description: string;
  amount: number;
  budget_fk: number;
  transaction_type_fk: number;
  budgets: Budget;
  transaction_type: TransactionType;
}

export type AddTransactionProps = Omit<
  Transaction,
  "id" | "created_at" | "transaction_type" | "budgets"
>;

export type UpdateTransactionProps = Omit<
  Transaction,
  "created_at" | "transaction_type" | "budgets"
>;
