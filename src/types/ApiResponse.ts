export interface Profile {
  id: string;
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type AddProfile = Omit<Profile, "created_at">;

export type UpdateProfile = Pick<Profile, "first_name" | "last_name">;

export interface Login {
  email: string;
  password: string;
}

export interface Budget {
  id: number;
  created_at: Date;
  description: string;
  ammount: number;
  profile_id: string;
}

export type AddBudgetProps = Pick<Budget, "description" | "ammount">;

export type UpdateBudgetProps = Pick<Budget, "id" | "description" | "ammount">;

export interface AddTransaction {
  budgetId: number;
  description: string;
  ammount: number;
  type: number;
}

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
  ammount: number;
  budget_fk: number;
  transaction_type_fk: number;
  budgets: Budget;
  transaction_type: TransactionType;
}
