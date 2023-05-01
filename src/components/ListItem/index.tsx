import React from "react";
import { formatPrice } from "@/utils/numbers";
import { ListItemWrapper } from "./ListItemWrapper";

interface Props {
  href?: string;
  description?: string;
  ammount: number;
  date?: Date;
}

export const ListItem: React.FC<Props> = ({
  href,
  ammount,
  date,
  description,
}) => {
  return (
    <ListItemWrapper
      href={href}
      className="w-full p-4 bg-white rounded-md flex gap-2 justify-between shadow-md items-center text-gray-800"
    >
      <div className="grid">
        {description ? <span>{description}</span> : null}
        {date ? (
          <span className="text-xs text-gray-400">
            {new Date(date).toDateString()}
          </span>
        ) : null}
      </div>
      <div className="flex gap-2">
        <span className="font-semibold">
          ${formatPrice(ammount.toFixed(2))}
        </span>
      </div>
    </ListItemWrapper>
  );
};
