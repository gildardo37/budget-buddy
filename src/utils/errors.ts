import { DisplayAlertProps } from "@/types";

export const handleErrors = (
  e: unknown,
  displayAlert: (props: DisplayAlertProps) => void
) => {
  console.error(e);
  const { message } = e as Error;
  displayAlert({
    message: message ?? "Something failed while making this request.",
    type: "error",
  });
};
