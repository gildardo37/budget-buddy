import React from "react";
import { ListItemWrapper } from "./ListItemWrapper";

interface Props {
  href?: string;
  description?: string;
  ammount?: number;
  date?: Date;
  onDelete?: () => void;
}

export const ListItem: React.FC<Props> = ({
  href,
  ammount,
  date,
  description,
  onDelete,
}) => {
  return (
    <ListItemWrapper
      href={href}
      className="w-full p-4 bg-white rounded-md flex gap-2 justify-between shadow-md items-center"
    >
      <div className="grid">
        {description ? <span>{description}</span> : null}
        {ammount ? <span>${ammount}</span> : null}
        {date ? <span>{new Date(date).toDateString()}</span> : null}
      </div>
      <div className="flex gap-2">
        <button
          className="px-2 bg-red-500 text-white rounded-md h-8 w-8"
          onClick={onDelete}
        >
          X
        </button>
      </div>
    </ListItemWrapper>
  );
};
