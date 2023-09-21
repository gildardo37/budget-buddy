import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useAddBudget } from "@/client/user-client";
import { cleanPriceString } from "@/utils/numbers";
import { useAlert } from "@/hooks/useAlert";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";

interface Props {
  onSuccess?: () => void;
}

interface FormData {
  description: string;
  ammount: string;
}

export const BudgetForm: React.FC<Props> = ({ onSuccess }) => {
  const { displayAlert } = useAlert();
  const { mutateAsync: addBudget } = useAddBudget();
  const [formData, setFormData] = useState<FormData>({
    description: "",
    ammount: "",
  });

  const isDisabled = useMemo<boolean>(() => {
    return !Object.values(formData).every((i) => i);
  }, [formData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === "ammount" ? cleanPriceString(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { ammount, description } = formData;
      const { error } = await addBudget({
        ammount: parseFloat(ammount),
        description,
      });
      if (error) throw error;
      if (onSuccess) onSuccess();
      displayAlert({ message: "Budget added succesfully!", type: "success" });
      setFormData({ description: "", ammount: "" });
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
      <Button type="submit" disabled={isDisabled}>
        Submit
      </Button>
    </form>
  );
};
