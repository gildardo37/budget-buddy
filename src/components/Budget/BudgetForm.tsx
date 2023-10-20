import React, { FormEvent } from "react";
import { useAddBudget, useUpdateBudget } from "@/services/useApi";
import { useAlert } from "@/hooks/useAlert";
import { useForm } from "@/hooks/useForm";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { AddBudgetProps, Budget } from "@/types";

interface Props {
  onSuccess?: () => void;
  myBudget?: Budget;
}

export const BudgetForm: React.FC<Props> = ({ onSuccess, myBudget }) => {
  const { displayAlert } = useAlert();
  const { mutateAsync: addBudget } = useAddBudget();
  const { mutateAsync: updateBudget } = useUpdateBudget(
    myBudget?.id.toString() ?? "0"
  );
  const { formData, isDisabled, handleInputChange, resetForm } = useForm({
    description: {
      value: myBudget?.description ?? "",
    },
    ammount: {
      value: myBudget?.ammount.toString() ?? "",
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data: AddBudgetProps = {
        ammount: parseFloat(formData.ammount.value),
        description: formData.description.value,
      };
      const { error } = myBudget
        ? await updateBudget({ ...data, id: myBudget?.id })
        : await addBudget(data);
      if (error) throw error;
      if (onSuccess) onSuccess();
      displayAlert({
        message: "Budget added succesfully!",
        type: "success",
        duration: 3000,
      });
      resetForm();
    } catch (e) {
      console.error(e);
      const { message } = e as Error;
      displayAlert({ message, type: "error" });
    }
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
      />
      <Field
        label="Ammount"
        name="ammount"
        type="text"
        value={formData.ammount.value}
        onInput={handleInputChange}
        required={formData.ammount.required}
        inputMode="decimal"
      />
      <Button
        className="md:col-start-2 md:place-self-end md:max-w-[150px]"
        type="submit"
        disabled={isDisabled}
      >
        Submit
      </Button>
    </form>
  );
};
