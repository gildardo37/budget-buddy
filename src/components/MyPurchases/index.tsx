import { useStorage } from "@/hooks/useStorage";
import { PurchaseItem, StoredData } from "@/types";
import React, { useEffect, useState } from "react";
import { MyBudget } from "../MyBudget";
import { BudgetActions } from "../BudgetActions";
import { Modal } from "../Modal";
import { PurchaseForm } from "../PurchaseForm";
import { Field } from "../Field";
import { Button } from "../Button";
import { ListItem } from "../ListItem";

export const MyPurchases: React.FC = () => {
  const { getStorage, setStorage } = useStorage<StoredData>("My-budgets");
  const [budget, setBudget] = useState(0);
  const [hasBudget, setHasBudget] = useState(false);
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
  const [isModalOpen, setIsOpenModal] = useState(false);

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

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseFloat(event.target.value));
  };

  return (
    <div>
      {!hasBudget ? (
        <>
          <h2 className="text-2xl font-semibold py-4">My budgets</h2>
          <fieldset className="flex flex-col gap-4">
            <Field
              type="number"
              id="value-input"
              value={budget}
              onInput={handleBudgetChange}
              required
            />
            <Button onClick={addBudget}>Submit</Button>
          </fieldset>
          <ListItem />
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl py-4 font-semibold">Overview</h2>
          <MyBudget />
          <BudgetActions
            editAction={() => setIsOpenModal(true)}
            addAction={() => setIsOpenModal(true)}
          />
          <Modal
            title="Add a spending"
            modalOpen={isModalOpen}
            onClose={() => setIsOpenModal(false)}
          >
            <PurchaseForm />
          </Modal>
          {/* <div>
            <ul className="flex flex-col gap-4">
              {[...purchases].reverse().map((item) => (
                <ListItem
                  key={item.id}
                  items={item}
                  onDelete={() => deleteBudget(item.id)}
                />
              ))}
            </ul>
          </div> */}
        </div>
      )}
    </div>
  );
};
