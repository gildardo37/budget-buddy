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
    setAlertOptions({ message, type });
    setIsAlertDisplayed(true);
    setTimeout(() => closeAlert(), duration);
  };

  const closeAlert = () => {
    setAlertOptions((prev) => ({ ...prev, triggerClose: true }));
    setTimeout(() => {
      setIsAlertDisplayed(false);
      setAlertOptions({ message: "" });
    }, animationDelay);
  };

  return {
    displayAlert,
    isAlertDisplayed,
    alertOptions,
    closeAlert,
  };
};
