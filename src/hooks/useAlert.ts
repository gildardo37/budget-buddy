import { alertAtom, alertOptionsAtom } from "@/atoms/alert";
import { DisplayAlertProps } from "@/types";
import { useAtom } from "jotai";

export const useAlert = () => {
  const [isAlertDisplayed, setIsAlertDisplayed] = useAtom(alertAtom);
  const [alertOptions, setAlertOptions] = useAtom(alertOptionsAtom);
  const animationDelay = 1000;

  const displayAlert = ({
    message,
    duration = 10000,
    type = "success",
  }: DisplayAlertProps) => {
    if (alertOptions.triggerOpen) return;

    setAlertOptions({ message, type, triggerOpen: true });
    setIsAlertDisplayed(true);
    setTimeout(() => closeAlert(), duration);
  };

  const closeAlert = () => {
    if (alertOptions.triggerClose) return;

    setAlertOptions((prev) => ({ ...prev, triggerClose: true }));
    setTimeout(() => {
      setIsAlertDisplayed(false);
      setAlertOptions({ message: "", triggerClose: false, triggerOpen: false });
    }, animationDelay);
  };

  return {
    displayAlert,
    isAlertDisplayed,
    alertOptions,
    closeAlert,
  };
};
