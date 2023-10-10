import { useState } from "react";

export const useModal = (value = false) => {
  const [isOpen, setIsOpen] = useState(value);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
