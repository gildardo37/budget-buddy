import { ReactNode } from "react";

export * from "./ApiResponse";

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
  onClose?: () => void;
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

export interface CustomDropdownOptions {
  action: () => void;
  name: string;
}
