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

export type AlertOptionType = "error" | "success" | "warning";

export interface AlertOptions {
  message: string;
  type?: AlertOptionType;
}

export interface DisplayAlertProps {
  message: string;
  duration?: number;
  type?: AlertOptionType;
}

export type AlertColors = Record<
  AlertOptionType,
  {
    backgroundColor: string;
    textColor: string;
  }
>;
