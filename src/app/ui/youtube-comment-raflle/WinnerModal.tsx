import { useState } from "react";
import Modal, { ModalProps } from "../common/modal/Modal";

const WinnerModal = ({ open, onClose }: ModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-60 h-60 overflow-y-auto flex flex-col gap-2"></div>
    </Modal>
  );
};

export default WinnerModal;
