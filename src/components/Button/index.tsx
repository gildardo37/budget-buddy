import { clsxm } from "@/utils/clsxm";
import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  buttonType?: "primary" | "secondary";
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  icon,
  onClick,
  type = "button",
  disabled,
  buttonType = "primary",
  className,
}) => {
  return (
    <button
      className={clsxm([
        "py-2 px-4 rounded-xl flex justify-center gap-1 items-center h-[42px] uppercase disabled:opacity-70 disabled:cursor-not-allowed",
        buttonType === "primary" && "bg-blue-500 text-white",
        buttonType === "secondary" && "text-black border border-blue-500",
        className && className,
      ])}
      onClick={onClick && !disabled ? onClick : undefined}
      type={type}
      disabled={disabled}
    >
      {icon ? icon : null}
      <span className="text-sm">{children}</span>
    </button>
  );
};
