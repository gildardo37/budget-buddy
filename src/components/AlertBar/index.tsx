import React from "react";
import { InfoIcon } from "../svgs/InfoIcon";
import { useAlert } from "@/hooks/useAlert";
import { AlertColors } from "@/types";

export const AlertBar: React.FC = () => {
  const { isAlertDisplayed, alertOptions } = useAlert();

  const colors: AlertColors = {
    error: {
      backgroundColor: "bg-red-300",
      textColor: "text-red-500",
    },
    success: {
      backgroundColor: "bg-green-300",
      textColor: "text-green-500",
    },
    warning: {
      backgroundColor: "bg-yellow=300",
      textColor: "text-yellow-500",
    },
  };

  const { backgroundColor, textColor } = colors[alertOptions.type || "success"];

  return isAlertDisplayed ? (
    <div
      className={`fixed top-4 left-4 right-4 flex justify-between items-center gap-2 rounded-xl px-4 py-3 ${backgroundColor} ${textColor}`}
    >
      <span>{alertOptions.message}</span>
      <InfoIcon color="rgb(239 68 68)" />
    </div>
  ) : null;
};
