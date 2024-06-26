import { createPortal } from "react-dom";
import Portal from "../Portal/Portal";
import { useRef } from "react";
import useControlled from "@/hooks/useControlled";
import useClickAway from "@/hooks/useClickAway";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}
const Modal = ({ open, onClose }: ModalProps) => {
  const clickAwayRef = useRef<HTMLDivElement>(null);
  useClickAway({ clickAwayRef, onClickAway: onClose });
  return (
    open && (
      <Portal>
        <div className="w-screen h-screen bg-black bg-opacity-60 z-50 absolute top-0 left-0 flex justify-center items-center">
          <div ref={clickAwayRef} className="w-60 h-60 bg-white">
            내부ㅎㅇ
          </div>
        </div>
      </Portal>
    )
  );
};

export default Modal;
