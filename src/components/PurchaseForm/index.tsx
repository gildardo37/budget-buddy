import React, { useState } from "react";
import { PurchaseItem, StoredData } from "@/types";
import { v4 as UUID } from "uuid";
import { Field } from "@/components/Field";
import { useStorage } from "@/hooks/useStorage";
import { Button } from "../Button";

export const PurchaseForm: React.FC = () => {
  const { getStorage, setStorage } = useStorage<StoredData>("My-budgets");
  const [label, setLabel] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmmount(parseFloat(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (label && ammount !== 0) {
      const newPurchase: PurchaseItem = {
        label,
        ammount,
        date: new Date(),
        id: UUID(),
      };
      setPurchases((prev) => [...prev, newPurchase]);
      setLabel("");
      setAmmount(0);

      const storedData = getStorage();
      const newStoredData: StoredData = {
        ...storedData,
        purchases: [...(storedData?.purchases ?? []), newPurchase],
      };
      setStorage(newStoredData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field
        label="Description"
        type="text"
        id="label-input"
        value={label}
        onInput={handleLabelChange}
        required
      />
      <Field
        label="Ammount"
        type="text"
        id="label-input"
        value={ammount}
        onInput={handleValueChange}
        required
      />
      <Button type="submit">Add</Button>
    </form>
  );
};