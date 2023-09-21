import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { cleanPriceString } from "@/utils/numbers";
import { useAddTransaction, useTransactionType } from "@/client/user-client";
import { useAlert } from "@/hooks/useAlert";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { capitalizeText } from "@/utils/strings";
import { DropdownOptions } from "@/types";

interface FormData {
  description: string;
  ammount: string;
  type: string;
}

interface Props {
  budgetId: string;
  onSuccess?: () => void;
}

export const TransactionForm: React.FC<Props> = ({ budgetId, onSuccess }) => {
  const initialData: FormData = {
    description: "",
    ammount: "",
    type: "2",
  };
  const { displayAlert } = useAlert();
  const { data: TransactionTypes, isLoading: isTypeLoading } =
    useTransactionType();
  const { mutateAsync: addTransaction, isLoading } =
    useAddTransaction(budgetId);
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newValue = name === "ammount" ? cleanPriceString(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const isDisabled = useMemo(() => {
    const isFormFilled = Object.values(formData).every((i) => i);
    return !isFormFilled || isLoading;
  }, [formData, isLoading]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { ammount, description, type } = formData;
      const { error } = await addTransaction({
        ammount: parseFloat(ammount),
        description,
        type: parseFloat(type),
        budgetId: parseFloat(budgetId),
      });

      if (error) throw error;
      if (onSuccess) onSuccess();
      displayAlert({
        message: "Transaction added succesfully!",
        type: "success",
      });
      setFormData(initialData);
    } catch (e) {
      console.error(e);
      const { message } = e as Error;
      displayAlert({ message, type: "error" });
    }
  };

  const selectOptions = (): DropdownOptions[] => {
    return (
      TransactionTypes?.data?.map(({ id, type }) => ({
        name: capitalizeText(type),
        value: String(id),
      })) || []
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field
        label="Description"
        name="description"
        type="text"
        value={formData.description}
        onInput={handleInputChange}
        required
      />
      <Field
        label="Ammount"
        name="ammount"
        type="text"
        value={formData.ammount}
        onInput={handleInputChange}
        required
        inputMode="decimal"
      />
      <Field
        label="Transaction Type"
        name="type"
        type="dropdown"
        options={selectOptions()}
        required
        value={formData.type}
        onChange={handleInputChange}
      />
      <Button type="submit" disabled={isDisabled}>
        Add
      </Button>
    </form>
  );
};
