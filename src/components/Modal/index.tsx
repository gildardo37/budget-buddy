import React, { useEffect, useState } from "react";
import { CloseIcon } from "@/components/svgs/CloseIcon";
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

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.style.overflow = modalOpen ? "hidden" : "auto";
    html.style.height = modalOpen ? "100dvh" : "auto";
  }, [modalOpen]);

  return modalOpen ? (
    <div
      className={clsxm(
        "bg-slate-200 fixed z-20 inset-0 w-full animate__animated animate__fadeIn md:bg-black/50 flex items-center justify-center md:p-4",
        { animate__fadeOut: triggerClose }
      )}
    >
      <section className="bg-slate-200 flex flex-col p-4 gap-4 w-full h-full max-w-screen-md max-h-screen overflow-y-auto md:rounded-lg md:p-6 md:max-h-[90vh] md:h-auto md:max-w-screen-md animate__animated animate__zoomIn">
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
