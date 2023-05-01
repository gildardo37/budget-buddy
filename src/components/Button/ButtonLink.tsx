import React from "react";
import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
}

export const ButtonLink: React.FC<Props> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="py-2 px-4 rounded-xl flex justify-center gap-1 items-center h-[42px] border border-blue-700 bg- uppercase"
    >
      {children}
    </Link>
  );
};
