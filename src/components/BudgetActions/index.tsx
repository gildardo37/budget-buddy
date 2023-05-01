import React from "react";
import { AddIcon } from "../svgs/AddIcon";
import { Button } from "../Button";
import { EditIcon } from "../svgs/EditIcon";

interface Props {
  editAction: () => void;
  addAction: () => void;
}

export const BudgetActions: React.FC<Props> = ({ editAction, addAction }) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <Button onClick={editAction} icon={<EditIcon color="white" />}>
        Edit budget
      </Button>
      <Button onClick={addAction} icon={<AddIcon color="white" />}>
        Add spending
      </Button>
    </div>
  );
};
