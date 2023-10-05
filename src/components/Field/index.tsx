import React, { useState } from "react";
import { NotVisibleIcon } from "../svgs/NotVisibleIcon";
import { VisibleIcon } from "../svgs/VisibleIcon";
import { clsxm } from "@/utils/clsxm";

interface Props {
  id?: string;
  value?: string | number;
  name?: string;
  label?: string;
  type?: "text" | "number" | "password" | "email";
  required?: boolean;
  disabled?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.LegacyRef<HTMLInputElement>;
  inputMode?: "decimal" | "tel" | "numeric";
}

export const Field: React.FC<Props> = ({
  value,
  label,
  onInput,
  onChange,
  id,
  type = "text",
  required = false,
  ref,
  name,
  disabled = false,
  inputMode,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <fieldset className="flex flex-col gap-2 relative">
      {label ? (
        <label className="uppercase text-gray-600 text-sm">{label}</label>
      ) : null}
      <input
        className={clsxm(
          "border border-slate-200 bg-white p-2 outline-0 rounded-md duration-200 focus:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed",
          {
            "pr-12": isPassword,
          }
        )}
        name={name}
        ref={ref}
        type={isPassword && showPassword ? "text" : type}
        id={id}
        value={value}
        onInput={onInput}
        onChange={onChange}
        required={required}
        disabled={disabled}
        inputMode={inputMode}
        step={type === "number" ? ".01" : undefined}
      />
      {isPassword ? (
        <button
          type="button"
          className="rounded-sm absolute bottom-2 right-3"
          onClick={handleShowPassword}
        >
          {showPassword ? (
            <VisibleIcon color="rgb(107 114 128)" />
          ) : (
            <NotVisibleIcon color="rgb(107 114 128)" />
          )}
        </button>
      ) : null}
    </fieldset>
  );
};
