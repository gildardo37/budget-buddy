import React, { useRef, useState } from "react";
import { NotVisibleIcon } from "@/components/svgs/NotVisibleIcon";
import { VisibleIcon } from "@/components/svgs/VisibleIcon";
import { clsxm } from "@/utils/clsxm";
import { CopyIcon } from "@/components/svgs/CopyIcon";
import { v4 as UUID } from "uuid";
import { useAlert } from "@/hooks/useAlert";

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
  readonly?: boolean;
  copy?: boolean;
}

export const Field: React.FC<Props> = ({
  value,
  label,
  onInput,
  onChange,
  id,
  type = "text",
  required = false,
  name,
  disabled = false,
  inputMode,
  readonly,
  copy,
}) => {
  const { displayAlert } = useAlert();
  const input = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCopyText = () => {
    const inputElement = input.current;

    if (inputElement) {
      inputElement.select();
      document.execCommand("copy");
      inputElement.setSelectionRange(0, 0);
      displayAlert({
        message: `The ${
          inputElement.name ?? "property"
        } has been coppied to the clipboard`,
        duration: 5000,
        type: "success",
      });
    }
  };

  return (
    <fieldset className="flex flex-col gap-2 relative">
      {label ? (
        <label className="uppercase text-gray-600 text-sm">{label}</label>
      ) : null}
      <input
        className={clsxm(
          "field border border-slate-200 bg-white p-2 outline-0 rounded-md duration-200 focus:border-blue-500",
          { "pr-12": isPassword || copy }
        )}
        name={name}
        ref={input}
        type={isPassword && showPassword ? "text" : type}
        id={id ?? UUID()}
        value={value}
        onInput={onInput}
        onChange={onChange}
        required={required}
        disabled={disabled}
        inputMode={inputMode}
        readOnly={readonly}
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
      {copy ? (
        <button
          type="button"
          className="rounded-sm absolute bottom-2 right-3 z-"
          onClick={handleCopyText}
        >
          <CopyIcon />
        </button>
      ) : null}
    </fieldset>
  );
};
