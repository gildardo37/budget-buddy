import React from "react";

interface Props {
  code: string;
}

export const CodeViewer: React.FC<Props> = ({ code }) => {
  return (
    <div className="w-full rounded-md bg-white p-4">
      <pre className="whitespace-pre-wrap text-xs">{code}</pre>
    </div>
  );
};
