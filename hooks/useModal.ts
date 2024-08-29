import Modal from "@/components/Modal";
import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    Modal,
    isOpen,
    openModal,
    closeModal,
  };
};
