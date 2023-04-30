import React from "react";

interface Props {
  id?: string;
  value?: string | number;
  name?: string;
  label?: string;
  type?: "text" | "number" | "password" | "email";
  required?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.LegacyRef<HTMLInputElement>;
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
}) => {
  return (
    <fieldset className="flex flex-col gap-2">
      {label ? <label>{label}</label> : null}
      <input
        name={name || undefined}
        ref={ref || undefined}
        type={type}
        id={id || undefined}
        value={value || undefined}
        onInput={onInput ? onInput : undefined}
        required={required}
      />
    </fieldset>
  );
};
