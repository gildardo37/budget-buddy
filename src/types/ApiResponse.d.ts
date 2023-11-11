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
  id: string;
  created_at: Date;
  description: string;
  amount: number;
  profile_id: string;
}
export type BudgetID = Budget["id"];

export type UpdateBudgetProps = Omit<Budget, "created_at" | "profile_id">;

export type AddBudgetProps = Omit<UpdateBudgetProps, "id">;

export type TransactionTypeOptions = "expense" | "income";

export interface TransactionType {
  id: number;
  created_at: Date;
  type: TransactionTypeOptions;
}

export interface Transaction {
  id: string;
  created_at: string;
  description: string;
  amount: number;
  budget_fk: string;
  transaction_type_fk: number;
  budgets: Budget;
  transaction_type: TransactionType;
  category_fk: number;
  categories: Category;
}

export type TransactionID = Transaction["id"];

export type SortTransactionsFilter = keyof Pick<
  Transaction,
  "amount" | "description" | "created_at"
>;

export type OrderFilter = "ASC" | "DSC";

export interface GetTransactionProps {
  budgetId: string;
  sort?: SortTransactionsFilter;
  order?: OrderFilter;
}

export type UpdateTransactionProps = Omit<
  Transaction,
  "created_at" | "transaction_type" | "budgets" | "categories"
>;

export type AddTransactionProps = Omit<UpdateTransactionProps, "id">;

export type ConvertToTransaction = Omit<AddTransactionProps, "budget_fk">;

export interface ConvertToTransactionReadOnly {
  description: Transaction["description"];
  amount: Transaction["amount"];
  transactionType: TransactionType["type"];
  category: Category["name"];
}

export interface Category {
  id: number;
  created_at: Date;
  name: string;
}

export interface GetTransactionFilters {
  sort: SortTransactionsFilter;
  order: OrderFilter;
}
