import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const ListItemWrapper: React.FC<Props> = ({
  children,
  className,
  href,
}) => {
  return href ? (
    <Link className={className} href={href}>
      {children}
    </Link>
  ) : (
    <li className={className}>{children}</li>
  );
};
