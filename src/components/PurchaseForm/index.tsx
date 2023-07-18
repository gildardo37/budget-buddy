import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Field } from "@/components/Field";
import { Button } from "../Button";
import { cleanPriceString } from "@/utils/numbers";
import { useAddTransacction } from "@/client/user-client";

interface FormData {
  description: string;
  ammount: string;
  type: string;
}

interface Props {
  budgetId: string;
  onSuccess?: () => void;
}

export const PurchaseForm: React.FC<Props> = ({ budgetId, onSuccess }) => {
  const initialData: FormData = {
    description: "",
    ammount: "",
    type: "2",
  };
  const { mutateAsync: addTransaction, isLoading } = useAddTransacction();
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newValue = name === "ammount" ? cleanPriceString(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const isDisabled = useMemo(() => {
    const isFormFilled = !Object.values(formData).every((i) => i);
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

      if (error) throw new Error(error.message);
      if (onSuccess) onSuccess();
      setFormData(initialData);
    } catch (error) {
      console.error(error);
      // setErrorMessage(error.message);
    }
  };

  const selectOptions = [
    {
      value: "2",
      name: "Expense",
    },
    {
      value: "1",
      name: "Income",
    },
  ];

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
        options={selectOptions}
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
