import React from "react";

interface Props {
  title: string;
  content: string | number;
}

export const ListItem: React.FC<Props> = ({ title, content }) => {
  return (
    <li>
      <p className="font-semibold text-gray-500">{title}</p>
      <p>{content}</p>
    </li>
  );
};
