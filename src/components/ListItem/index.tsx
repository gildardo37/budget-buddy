import React from "react";

interface Props {
  id: string;
  label?: string;
  ammount?: number;
  date?: Date;
  onDelete?: () => void;
}

export const ListItem: React.FC<Props> = ({
  ammount,
  date,
  id,
  label,
  onDelete,
}) => {
  return (
    <li
      key={id}
      className="w-full p-4 bg-white rounded-md flex gap-2 justify-between shadow-md items-center"
    >
      <div className="grid">
        {label ? <span>{label}</span> : null}
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
    </li>
  );
};
