import React, { ChangeEvent, useState } from "react";
import { v4 as UUID } from "uuid";
import { UploadIcon } from "@/components/svgs/UploadIcon";
import clsx from "clsx";

interface Props {
  accept: string;
  title?: string;
  onChange: (value: string | ArrayBuffer | null | undefined) => void;
  isLoading?: boolean;
}

export const InputFile: React.FC<Props> = ({
  accept,
  title = "Upload a file",
  onChange,
  isLoading = false,
}) => {
  const id = UUID();
  const [fileName, setfileName] = useState<string>();
  const fileTypes = accept.replace(/ /g, "").split(",");

  const isValidFile = (name?: string) => {
    if (!name) return false;
    const file = name.substring(name.lastIndexOf("."));
    return fileTypes.includes(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;

    const file = event.target.files?.[0];

    if (!isValidFile(file?.name)) return;

    setfileName(file?.name);

    if (file) {
      const reader = new FileReader();
      reader.onload = ({ target }) => onChange(target?.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <label
      htmlFor={id}
      className={clsx(
        "relative flex h-10 w-full cursor-pointer gap-2 rounded-md border border-slate-200 bg-white p-2 outline-0 duration-200",
        { "pointer-events-none opacity-40": isLoading }
      )}
    >
      <input
        type="file"
        id={id}
        className="absolute inset-0 cursor-pointer opacity-0"
        accept={accept}
        onChange={handleFileChange}
        disabled={isLoading}
      />
      <UploadIcon />
      <span>{fileName ?? title}</span>
    </label>
  );
};
