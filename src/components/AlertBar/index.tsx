import React from "react";
import { AlertColors } from "@/types";
import { clsxm } from "@/utils/clsxm";
import { useAlert } from "@/hooks/useAlert";
import { InfoIcon } from "@/components/svgs/InfoIcon";
import { CheckIcon } from "@/components/svgs/CheckIcon";

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
      className={clsxm(
        "animate__animated animate__bounceInDown fixed left-4 right-4 top-4 z-30 flex items-center gap-2 rounded-xl border-t px-4 py-3 shadow-sm",
        backgroundColor,
        { animate__bounceOutUp: alertOptions.triggerClose }
      )}
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
