import React, { FormEvent } from "react";
import { useAddBudget } from "@/client/user-client";
import { useAlert } from "@/hooks/useAlert";
import { useForm } from "@/hooks/useForm";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";

interface Props {
  onSuccess?: () => void;
}

export const BudgetForm: React.FC<Props> = ({ onSuccess }) => {
  const { displayAlert } = useAlert();
  const { mutateAsync: addBudget } = useAddBudget();
  const { formData, isDisabled, handleInputChange, resetForm } = useForm({
    description: {
      value: "",
    },
    ammount: {
      value: "",
    },
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { ammount, description } = formData;
      const { error } = await addBudget({
        ammount: parseFloat(ammount.value),
        description: description.value,
      });
      if (error) throw error;
      if (onSuccess) onSuccess();
      displayAlert({ message: "Budget added succesfully!", type: "success" });
      resetForm();
    } catch (e) {
      console.error(e);
      const { message } = e as Error;
      displayAlert({ message, type: "error" });
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
      <Button type="submit" disabled={isDisabled}>
        Submit
      </Button>
    </form>
  );
};
