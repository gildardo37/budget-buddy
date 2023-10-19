import React from "react";
import { clsxm } from "@/utils/clsxm";

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
  className = "",
}) => {
  return (
    <button
      className={clsxm([
        "w-full py-2 px-4 rounded-xl flex justify-center gap-1 items-center h-[42px] uppercase disabled:opacity-70 disabled:cursor-not-allowed transition-all button",
        className,
        {
          "bg-blue-500 text-white": buttonType === "primary",
          "text-black border border-blue-500": buttonType === "secondary",
        },
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
