import React from "react";

interface Props {
  title?: string;
  code: string;
}

export const CodeViewer: React.FC<Props> = ({ title, code }) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4">
      {title ? <p>{title}</p> : null}
      <pre className="whitespace-pre-wrap text-xs">{code}</pre>
    </div>
  );
};
