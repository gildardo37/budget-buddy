export * from "./ApiResponse";

export interface PurchaseItem {
  id: string;
  label: string;
  ammount: number;
  date: Date;
}

export interface StoredData {
  budget?: number;
  purchases: PurchaseItem[];
}
