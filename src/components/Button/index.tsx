import { clsxm } from "@/utils/clsxm";
import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  buttonType?: "primary" | "secondary";
}

export const Button: React.FC<Props> = ({
  children,
  icon,
  onClick,
  type = "button",
  disabled,
  buttonType = "primary",
}) => {
  return (
    <button
      className={clsxm([
        "py-2 px-4 rounded-xl flex justify-center gap-1 items-center h-[42px] uppercase disabled:opacity-70 disabled:cursor-not-allowed",
        buttonType === "primary" && "bg-blue-500 text-white",
        buttonType === "secondary" && "bg-white text-black",
      ])}
      onClick={onClick && !disabled ? onClick : undefined}
      type={type}
      disabled={disabled}
    >
      {icon ? icon : null}
      <span className="text-white text-sm">{children}</span>
    </button>
  );
};
