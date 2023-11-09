import React, { CSSProperties } from "react";
import { DropdownOptions } from "@/types";
import { clsxm } from "@/utils/clsxm";

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
  placeholder?: boolean;
  noStyles?: boolean;
  classes?: string;
  style?: CSSProperties;
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
  placeholder = false,
  noStyles = false,
  classes = "",
  style,
}) => {
  return (
    <fieldset className="flex flex-col gap-2">
      {label ? (
        <label className="text-sm uppercase text-gray-600">{label}</label>
      ) : null}
      <select
        className={clsxm(
          "w-fit duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30",
          noStyles
            ? "bg-transparent outline-none"
            : "rounded-md border border-slate-200 bg-white p-2 outline-0 focus:border-blue-500",
          classes
        )}
        name={name}
        id={id}
        value={value}
        ref={ref}
        onChange={onChange}
        required={required}
        disabled={disabled}
        style={style}
      >
        {placeholder ? (
          <option disabled hidden value="">
            Select an option
          </option>
        ) : null}
        {options.map(({ name, value }, index) => (
          <option key={index} value={value}>
            {name}
          </option>
        ))}
      </select>
    </fieldset>
  );
};
