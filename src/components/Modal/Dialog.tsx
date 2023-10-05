import React, { useState } from "react";
import { CloseIcon } from "@/components/svgs/Close";
import { clsxm } from "@/utils/clsxm";
import { Button } from "../Button";

interface Props {
  dialogOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirmation: (value: boolean) => void;
}

export const Dialog: React.FC<Props> = ({
  dialogOpen = false,
  children,
  onClose,
  title = "Confirmation",
  onConfirmation,
}: Props) => {
  const [triggerClose, setTriggerClose] = useState(false);

  const closeModal = () => {
    setTriggerClose(true);
    setTimeout(() => {
      setTriggerClose(false);
      onClose();
    }, 200);
  };

  const handleConfirmation = (value: boolean) => {
    onConfirmation(value);
    closeModal();
  };

  return dialogOpen ? (
    <>
      <div
        className={clsxm(
          "flex items-center justify-center bg-black/50 fixed z-20 inset-0 w-full min-h-[100dvh] p-4 animate__animated animate__fadeIn",
          { animate__fadeOut: triggerClose }
        )}
      >
        <section
          className={clsxm(
            "bg-slate-100 flex flex-col rounded-md p-4 justify-center gap-4 w-full max-w-md animate__animated animate__zoomIn animate__faster",
            { animate__zoomOut: triggerClose }
          )}
        >
          <header className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={closeModal}>
              <CloseIcon height="32" width="32" />
            </button>
          </header>
          {children}
          <div className="grid grid-cols-2 gap-2">
            <Button
              buttonType="secondary"
              onClick={() => handleConfirmation(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleConfirmation(true)}>Confirm</Button>
          </div>
        </section>
      </div>
    </>
  ) : null;
};
