import React from "react";

interface Props {
  modalOpen?: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({
  modalOpen = false,
  children,
  onClose,
  title,
}: Props) => {
  return modalOpen ? (
    <div className="bg-slate-200 fixed z-20 inset-0 w-full min-h-[100dvh] p-4">
      <div className=" flex flex-col h-full justify-center mx-auto max-w-md">
        <header className="flex justify-between items-center mb-2">
          {title}
          <button onClick={onClose}>X</button>
        </header>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
};
