import { alertAtom, alertOptionsAtom } from "@/atoms/alert";
import { DisplayAlertProps } from "@/types";
import { useAtom } from "jotai";

export const useAlert = () => {
  const [isAlertDisplayed, setIsAlertDisplayed] = useAtom(alertAtom);
  const [alertOptions, setAlertOptions] = useAtom(alertOptionsAtom);

  const displayAlert = ({
    message,
    duration = 5000,
    type = "success",
  }: DisplayAlertProps) => {
    setAlertOptions({ message, type });
    setIsAlertDisplayed(true);
    setTimeout(() => {
      setIsAlertDisplayed(false);
      setAlertOptions({ message: "" });
    }, duration);
  };

  return {
    displayAlert,
    isAlertDisplayed,
    alertOptions,
  };
};
