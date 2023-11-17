import { DisplayAlertProps } from "@/types";
import { AxiosError } from "axios";

export const handleErrors = (
  e: unknown,
  displayAlert: (props: DisplayAlertProps) => void
) => {
  console.error(e);
  const message =
    e instanceof AxiosError
      ? `${e.message} - ${e.response?.data.message}`
      : (e as Error).message;

  displayAlert({
    message: message ?? "Something failed while making this request.",
    type: "error",
  });
};
