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
        <label className="uppercase text-gray-600 text-sm">{label}</label>
      ) : null}
      <select
        className="border border-slate-200 bg-white p-2 outline-0 rounded-md duration-200 focus:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
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
