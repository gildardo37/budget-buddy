import React from "react";
import { clsxm } from "@/utils/clsxm";
import { Loading } from "../Loading";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  buttonType?: "primary" | "secondary";
  className?: string;
  isLoading?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  icon,
  onClick,
  type = "button",
  disabled,
  buttonType = "primary",
  className = "",
  isLoading,
}) => {
  return (
    <button
      className={clsxm([
        "button flex h-[42px] w-full items-center justify-center gap-1 rounded-xl px-4 py-2 uppercase transition-all disabled:cursor-not-allowed disabled:opacity-70",
        className,
        {
          "bg-blue-500 text-white": buttonType === "primary",
          "border border-blue-500 text-black": buttonType === "secondary",
        },
      ])}
      onClick={onClick && (!disabled || isLoading) ? onClick : undefined}
      type={type}
      disabled={disabled}
    >
      {isLoading ? (
        <Loading small />
      ) : (
        <>
          {icon ? icon : null}
          <span className="text-sm">{children}</span>
        </>
      )}
    </button>
  );
};
