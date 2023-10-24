import React from "react";
import { DropdownOptions } from "@/types";

interface Props {
  id?: string;
  value?: string | number;
  name?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ref?: React.LegacyRef<HTMLSelectElement>;
  options?: DropdownOptions[];
}

export const Dropdown: React.FC<Props> = ({
  value,
  label,
  onChange,
  id,
  required = false,
  ref,
  name,
  disabled = false,
  options = [],
}) => {
  return (
    <fieldset className="flex flex-col gap-2">
      {label ? (
        <label className="text-sm uppercase text-gray-600">{label}</label>
      ) : null}
      <select
        className="rounded-md border border-slate-200 bg-white p-2 outline-0 duration-200 focus:border-blue-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30"
        name={name}
        id={id}
        value={value}
        ref={ref}
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
    </fieldset>
  );
};
