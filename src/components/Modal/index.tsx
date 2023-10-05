import React, { useState } from "react";
import { CloseIcon } from "@/components/svgs/Close";
import { clsxm } from "@/utils/clsxm";

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
  const [triggerClose, setTriggerClose] = useState(false);

  const closeModal = () => {
    setTriggerClose(true);
    setTimeout(() => {
      setTriggerClose(false);
      onClose();
    }, 200);
  };

  return modalOpen ? (
    <div
      className={clsxm(
        "bg-slate-200 fixed z-20 inset-0 w-full min-h-[100dvh] p-4 animate__animated animate__zoomIn animate__faster",
        { animate__zoomOut: triggerClose }
      )}
    >
      <section className=" flex flex-col h-full justify-center gap-4 mx-auto max-w-md">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={closeModal}>
            <CloseIcon height="32" width="32" />
          </button>
        </header>
        <div>{children}</div>
      </section>
    </div>
  ) : null;
};
