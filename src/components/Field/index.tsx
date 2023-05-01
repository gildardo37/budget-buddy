import React from "react";

interface Props {
  id?: string;
  value?: string | number;
  name?: string;
  label?: string;
  type?: "text" | "number" | "password" | "email";
  required?: boolean;
  disabled?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.LegacyRef<HTMLInputElement>;
  inputMode?: "decimal" | "tel" | "numeric";
}

export const Field: React.FC<Props> = ({
  value,
  label,
  onInput,
  id,
  type = "text",
  required = false,
  ref,
  name,
  disabled,
  inputMode,
}) => {
  return (
    <fieldset className="flex flex-col gap-2">
      {label ? <label>{label}</label> : null}
      <input
        className="border border-white bg-white p-2 outline-0 rounded-md duration-200 focus:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
        name={name}
        ref={ref}
        type={type}
        id={id}
        value={value}
        onInput={onInput}
        required={required}
        disabled={disabled}
        inputMode={inputMode}
        step={type === "number" ? ".01" : undefined}
      />
    </fieldset>
  );
};
