import React from "react";
import { clsxm } from "@/utils/clsxm";
import { ListItemWrapper } from "@/components/List/ListItemWrapper";

interface Props {
  href?: string;
  title?: string;
  subTitle?: string;
  content: string;
  details?: string;
  textColor?: string;
}

export const ListCard: React.FC<Props> = ({
  href,
  content,
  details,
  title,
  subTitle,
  textColor = "",
}) => {
  return (
    <ListItemWrapper
      href={href}
      className="flex w-full items-center justify-between gap-4 rounded-md bg-white p-4 text-gray-800 shadow-md hover:bg-blue-50"
    >
      <div className="grid flex-1">
        {title ? <span className="truncate">{title}</span> : null}
        {subTitle ? <span className="truncate text-xs">{subTitle}</span> : null}
        {details ? (
          <span className="text-xs text-gray-400">{details}</span>
        ) : null}
      </div>
      <div className="flex shrink-0 gap-2">
        <span className={clsxm("font-semibold", textColor)}>{content}</span>
      </div>
    </ListItemWrapper>
  );
};
