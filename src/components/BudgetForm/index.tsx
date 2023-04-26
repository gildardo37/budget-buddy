import { useStorage } from "@/hooks/useStorage";
import React, { useEffect, useRef, useState } from "react";
import { v4 as UUID } from "uuid";

interface PurchaseItem {
  id: string;
  label: string;
  ammount: number;
  date: Date;
}

interface StoredData {
  budget?: number;
  purchases: PurchaseItem[];
}

export const BudgetForm: React.FC = () => {
  const { getStorage, setStorage } = useStorage<StoredData>("My-budgets");
  const [budget, setBudget] = useState(0);
  const [hasBudget, setHasBudget] = useState(false);
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
  const [label, setLabel] = useState("");
  const [ammount, setAmmount] = useState(0);

  useEffect(() => {
    const storedData = getStorage();
    if (storedData?.budget) {
      setHasBudget(true);
      setBudget(storedData.budget);
      setPurchases(storedData.purchases);
    }
  }, []);

  const addBudget = () => {
    if (budget) {
      setHasBudget(true);
      setStorage({ budget, purchases });
    }
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseFloat(event.target.value));
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

  const deleteBudget = (uuid: string) => {
    setPurchases((prev) => {
      const newPurchase = prev.filter(({ id }) => id !== uuid);
      setStorage({
        budget,
        purchases: newPurchase,
      });

      return newPurchase;
    });
  };

  const totalPurchases = purchases.reduce((acc, item) => acc + item.ammount, 0);

  return (
    <div>
      {!hasBudget ? (
        <fieldset className="flex flex-col gap-4">
          <input
            type="number"
            id="value-input"
            value={budget}
            onInput={handleBudgetChange}
            required
            placeholder="Budget ammount"
          />
          <button className="px-4 py-2 bg-blue-400" onClick={addBudget}>
            Submit
          </button>
        </fieldset>
      ) : (
        <>
          <h2>Budget Form</h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="label-input">Label:</label>
              <input
                type="text"
                id="label-input"
                value={label}
                onInput={handleLabelChange}
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="value-input">Value:</label>
              <input
                type="number"
                id="value-input"
                value={ammount}
                onInput={handleValueChange}
                required
              />
            </fieldset>
            <button type="submit">Add</button>
          </form>
          <div>
            <h3 className="text-center p-4 font-bold">
              My budget:
              <span className="font-normal pl-2">${budget}</span>
            </h3>
            <h3 className="text-center p-4 font-bold">
              Total spent:
              <span className="font-normal pl-2">${totalPurchases}</span>
            </h3>
            <ul className="flex flex-col gap-4">
              {[...purchases].reverse().map(({ id, ammount, label, date }) => (
                <li
                  key={id}
                  className="w-full p-4 bg-white rounded-md flex gap-2 justify-between shadow-md"
                >
                  <div className="grid">
                    <span>{label}</span>
                    <span>${ammount}</span>
                    <span>{new Date(date).toDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2">E</button>
                    <button
                      className="px-2 text-red-500"
                      onClick={() => deleteBudget(id)}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
