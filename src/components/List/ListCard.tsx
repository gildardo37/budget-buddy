import React from "react";
import { clsxm } from "@/utils/clsxm";
import { ListItemWrapper } from "@/components/List/ListItemWrapper";

interface Props {
  href?: string;
  description?: string;
  ammount: string;
  date?: string;
  textColor?: string;
}

export const ListCard: React.FC<Props> = ({
  href,
  ammount,
  date,
  description,
  textColor = "",
}) => {
  return (
    <ListItemWrapper
      href={href}
      className="w-full p-4 bg-white rounded-md flex gap-2 justify-between shadow-md items-center text-gray-800 hover:bg-blue-50"
    >
      <div className="grid flex-1">
        {description ? <span>{description}</span> : null}
        {date ? <span className="text-xs text-gray-400">{date}</span> : null}
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <span className={clsxm("font-semibold", textColor)}>{ammount}</span>
      </div>
    </ListItemWrapper>
  );
};
