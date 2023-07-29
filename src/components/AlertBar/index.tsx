import React from "react";
import { InfoIcon } from "../svgs/InfoIcon";
import { useAlert } from "@/hooks/useAlert";
import { AlertColors } from "@/types";
import { clsxm } from "@/utils/clsxm";
import { CheckIcon } from "../svgs/CheckIcon";

export const AlertBar: React.FC = () => {
  const { isAlertDisplayed, alertOptions, closeAlert } = useAlert();

  const colors: AlertColors = {
    error: {
      backgroundColor: "bg-red-200",
      textColor: "text-red-600",
      icon: <InfoIcon color="rgb(239, 68, 68)" />,
    },
    success: {
      backgroundColor: "bg-green-200",
      textColor: "text-green-600",
      icon: <CheckIcon color="rgb(22, 163, 74)" height="24" width="24" />,
    },
    warning: {
      backgroundColor: "bg-amber-200",
      textColor: "text-amber-600",
      icon: <InfoIcon color="rgb(217, 119, 6)" />,
    },
  };

  const { backgroundColor, textColor, icon } =
    colors[alertOptions.type || "success"];

  return isAlertDisplayed ? (
    <button
      className={clsxm([
        `fixed z-30 top-4 border-t left-4 right-4 flex items-center gap-2 rounded-xl px-4 py-3 shadow-sm animate__animated animate__bounceInDown`,
        backgroundColor,
        alertOptions.triggerClose && "animate__bounceOutUp",
      ])}
      onClick={closeAlert}
    >
      <p
        className={clsxm(["flex flex-grow text-left", textColor])}
        style={{ wordBreak: "break-word" }}
      >
        {alertOptions.message}
      </p>
      <div className="shrink-0">{icon}</div>
    </button>
  ) : null;
};
