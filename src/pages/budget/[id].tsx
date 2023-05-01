import { useState } from "react";
import { NextPage } from "next";
import { BudgetActions } from "@/components/BudgetActions";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { MyBudget } from "@/components/MyBudget";
import { PurchaseForm } from "@/components/PurchaseForm";

const Overview: NextPage = () => {
  const [isModalOpen, setIsOpenModal] = useState(false);

  return (
    <section className="flex flex-col gap-4">
      <Header title="Overview" />
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
    </section>
  );
};

export default Overview;
