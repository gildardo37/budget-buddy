import React, { ChangeEvent } from "react";
import { FilterOptions } from "@/types";
import { Dropdown } from "@/components/Dropdown";

interface Props {
  filters: FilterOptions[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Filters: React.FC<Props> = ({ filters, onChange }) => {
  return (
    <div className="flex gap-4">
      {filters.map(
        ({ label, value, options, onChange: handleChange }, index) => (
          <Dropdown
            key={label.toLowerCase() + index}
            name={label.toLowerCase()}
            options={options}
            placeholder
            noStyles
            className="cursor-pointer py-2"
            style={{ width: `${(value?.length ?? 5) + 5}ch` }}
            onChange={handleChange ?? onChange}
            value={value}
          />
        )
      )}
    </div>
  );
};
