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
      className="flex h-[42px] items-center justify-center gap-1 rounded-xl border border-blue-500 px-4 py-2 text-sm uppercase"
    >
      {children}
    </Link>
  );
};
