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
  const [isModalOpen, setIsOpenModal] = useState(false);

  return (
    <div>
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
    </div>
  );
};
