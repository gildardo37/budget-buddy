import React, { useEffect, useState } from "react";
import { CloseIcon } from "@/components/svgs/CloseIcon";
import { clsxm } from "@/utils/clsxm";
import { Button } from "@/components/Button";

interface Props {
  dialogOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirmation?: () => void;
  onCanceled?: () => void;
}

export const Dialog: React.FC<Props> = ({
  dialogOpen = false,
  children,
  onClose,
  title = "Confirmation",
  onConfirmation,
  onCanceled,
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
    if (value && onConfirmation) {
      onConfirmation();
    } else if (onCanceled) {
      onCanceled();
    }
    closeModal();
  };

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.style.overflow = dialogOpen ? "hidden" : "auto";
  }, [dialogOpen]);

  return dialogOpen ? (
    <>
      <div
        className={clsxm(
          "animate__animated animate__fadeIn fixed inset-0 z-20 flex min-h-screen w-full items-center justify-center bg-black/50 p-4",
          { animate__fadeOut: triggerClose }
        )}
      >
        <section
          className={clsxm(
            "animate__animated animate__zoomIn animate__faster flex w-full max-w-md flex-col justify-center gap-4 rounded-md bg-white p-4",
            { animate__zoomOut: triggerClose }
          )}
        >
          <header className="flex items-center justify-between">
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
