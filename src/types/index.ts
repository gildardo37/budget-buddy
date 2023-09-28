import { ReactNode } from "react";

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
  triggerClose?: boolean;
  triggerOpen?: boolean;
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
    icon: ReactNode;
  }
>;

export interface DropdownOptions {
  value: string;
  name: string;
}
