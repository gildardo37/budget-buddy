import { DropdownOptions } from "@/types";
import React from "react";

interface Props {
  id?: string;
  value?: string | number;
  name?: string;
  label?: string;
  type?: "text" | "number" | "password" | "email" | "dropdown";
  required?: boolean;
  disabled?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ref?: React.LegacyRef<HTMLInputElement>;
  inputMode?: "decimal" | "tel" | "numeric";
  options?: DropdownOptions[];
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
  options = [],
}) => {
  return (
    <fieldset className="flex flex-col gap-2">
      {label ? (
        <label className="uppercase text-gray-600 text-sm">{label}</label>
      ) : null}

      {type === "dropdown" ? (
        <select
          className="border border-slate-200 bg-white p-2 outline-0 rounded-md duration-200 focus:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        >
          {options.map(({ name, value }, index) => (
            <option key={index} value={value}>
              {name}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="border border-slate-200 bg-white p-2 outline-0 rounded-md duration-200 focus:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
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
      )}
    </fieldset>
  );
};
