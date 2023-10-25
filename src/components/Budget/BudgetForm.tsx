import React, { FormEvent, useMemo } from "react";
import { useAddBudget, useUpdateBudget } from "@/services/useApi";
import { useAlert } from "@/hooks/useAlert";
import { useForm } from "@/hooks/useForm";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { AddBudgetProps, Budget } from "@/types";
import { handleErrors } from "@/utils/errors";

interface Props {
  onSuccess?: () => void;
  myBudget?: Budget;
}

export const BudgetForm: React.FC<Props> = ({ onSuccess, myBudget }) => {
  const { displayAlert } = useAlert();
  const { mutateAsync: addBudget, isLoading: isAddLoading } = useAddBudget();

  const { mutateAsync: updateBudget, isLoading: isUpdateLoading } =
    useUpdateBudget(myBudget?.id.toString() ?? "0");

  const { formData, isDisabled, handleInputChange, resetForm } = useForm({
    description: { value: myBudget?.description ?? "" },
    ammount: { value: myBudget?.ammount.toString() ?? "" },
  });

  const isLoading = isAddLoading || isUpdateLoading;

  const isFormModified = useMemo(() => {
    if (!myBudget) return true;
    const { ammount, description } = formData;
    return (
      ammount.value !== myBudget.ammount.toString() ||
      description.value !== myBudget.description
    );
  }, [formData, myBudget]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!isFormModified) {
        return displayAlert({
          type: "warning",
          message: "The profile information is the same! Modify it to update.",
        });
      }

      const { error } = await handleRequest();
      if (error) throw error;
      if (onSuccess) onSuccess();
      displayAlert({
        message: "Budget added succesfully!",
        type: "success",
        duration: 3000,
      });
      resetForm();
    } catch (e) {
      handleErrors(e, displayAlert);
    }
  };

  const handleRequest = () => {
    const data: AddBudgetProps = {
      ammount: parseFloat(formData.ammount.value),
      description: formData.description.value,
    };
    return myBudget
      ? updateBudget({ ...data, id: myBudget?.id })
      : addBudget(data);
  };

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <Field
        label="Description"
        name="description"
        type="text"
        value={formData.description.value}
        onInput={handleInputChange}
        required={formData.description.required}
        disabled={isLoading}
      />
      <Field
        label="Ammount"
        name="ammount"
        type="text"
        value={formData.ammount.value}
        onInput={handleInputChange}
        required={formData.ammount.required}
        inputMode="decimal"
        disabled={isLoading}
      />
      <Button
        className="md:col-start-2 md:max-w-[150px] md:place-self-end"
        type="submit"
        disabled={isLoading || isDisabled || !isFormModified}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
};
