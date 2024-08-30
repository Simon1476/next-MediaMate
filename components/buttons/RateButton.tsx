"use client";

import { useModal } from "@/hooks/useModal";
import Star from "/icons/star.svg";
import StarRating from "../starRating/StarRating";

const RateButton = ({ movieId }: { movieId: number }) => {
  const { Modal, openModal, isOpen, closeModal } = useModal();
  return (
    <>
      <button onClick={() => openModal()}>
        <Star className="w-[30px] h-[30px]" />
      </button>
      <Modal open={isOpen} onClose={closeModal}>
        <StarRating movieId={movieId} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default RateButton;
