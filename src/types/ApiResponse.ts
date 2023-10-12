export interface Profile {
  id: string;
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AddProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UpdateProfile {
  id: string;
  user: Profile;
}

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

export interface AddBudget {
  description: string;
  ammount: number;
}
export interface UpdateBudget extends AddBudget {
  id: number;
}

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
