import React, { FormEvent } from "react";
import { useAddTransaction, useGetTransactionType } from "@/services/useApi";
import { capitalizeText } from "@/utils/strings";
import { DropdownOptions } from "@/types";
import { useAlert } from "@/hooks/useAlert";
import { useForm } from "@/hooks/useForm";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { Dropdown } from "@/components/Dropdown";
import { handleErrors } from "@/utils/errors";

interface Props {
  budgetId: string;
  onSuccess?: () => void;
}

export const TransactionForm: React.FC<Props> = ({ budgetId, onSuccess }) => {
  const { displayAlert } = useAlert();
  const { data: transactionTypes, isLoading: isTypeLoading } =
    useGetTransactionType();
  const { mutateAsync: addTransaction, isLoading } =
    useAddTransaction(budgetId);
  const { formData, resetForm, isDisabled, handleInputChange } = useForm({
    description: { value: "" },
    ammount: { value: "" },
    type: { value: "2" },
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { ammount, description, type } = formData;
      const { error } = await addTransaction({
        ammount: parseFloat(ammount.value),
        description: description.value,
        type: parseFloat(type.value),
        budgetId: parseFloat(budgetId),
      });

      if (error) throw error;
      if (onSuccess) onSuccess();
      displayAlert({
        message: "Transaction added succesfully!",
        type: "success",
        duration: 2000,
      });
      resetForm();
    } catch (e) {
      handleErrors(e, displayAlert);
    }
  };

  const selectOptions = (): DropdownOptions[] => {
    return (
      transactionTypes?.data?.map(({ id, type }) => ({
        name: capitalizeText(type),
        value: String(id),
      })) || []
    );
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <Field
        className="md:col-span-2"
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
      <Dropdown
        label="Transaction Type"
        name="type"
        options={selectOptions()}
        required={formData.type.required}
        value={formData.type.value}
        onChange={handleInputChange}
      />
      <Button
        className="md:max-w-[150px] md:col-start-2 md:place-self-end"
        type="submit"
        disabled={isDisabled || isLoading || isTypeLoading}
      >
        Add
      </Button>
    </form>
  );
};
