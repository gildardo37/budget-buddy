import React, { useEffect, useRef, useState } from "react";
import { CustomDropdownOptions } from "@/types";
import { clsxm } from "@/utils/clsxm";

type Positions = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface Props {
  options: CustomDropdownOptions[];
  labelContent: React.ReactNode;
  position?: Positions;
}

export const CustomDropdown: React.FC<Props> = ({
  labelContent,
  options,
  position = "bottom-left",
}) => {
  const [display, setDisplay] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDisplay = () => {
    setDisplay((prev) => !prev);
  };

  const positionClass: Record<Positions, string> = {
    "bottom-left": "top-full left-0",
    "bottom-right": "top-full right-0",
    "top-left": "bottom-full left-0",
    "top-right": "bottom-full right-0",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDisplay(false);
        removeEvent();
      }
    };

    const removeEvent = () => {
      return document.removeEventListener("mousedown", handleClickOutside);
    };

    if (display) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      removeEvent();
    }

    return () => removeEvent();
  }, [display]);

  return (
    <div
      className="relative select-none cursor-pointer"
      onClick={handleDisplay}
      ref={dropdownRef}
    >
      {labelContent}
      {display ? (
        <div
          className={clsxm(
            "absolute flex flex-col min-w-[100px] z-20 bg-white rounded-md duration-200 focus:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed shadow-md",
            positionClass[position] ?? positionClass["bottom-left"]
          )}
        >
          {options.map(({ name, action }, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 border-t first:border-none text-left"
              type="button"
              onClick={action}
            >
              {name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
