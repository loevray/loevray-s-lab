import { createPortal } from "react-dom";
import Portal from "../Portal/Portal";
import {
  Children,
  ReactNode,
  RefObject,
  cloneElement,
  isValidElement,
  useRef,
} from "react";
import useControlled from "@/hooks/useControlled";
import useClickAway from "@/hooks/useClickAway";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const Modal = ({ open, onClose }: ModalProps) => {
  const clickAwayRef = useRef<HTMLDivElement>(null);
  useClickAway({
    clickAwayRef,
    onClickAway: onClose,
    clickAwayCondition: (e, element) => {
      if (element.firstChild?.contains(e.target as Node)) {
        return false;
      }
      return true;
    },
  });
  return (
    open && (
      <Portal>
        <div
          ref={clickAwayRef}
          className="w-screen h-screen bg-black bg-opacity-60 z-50 absolute top-0 left-0 flex justify-center items-center"
        >
          <div className="w-60 h-60 bg-white"></div>
        </div>
      </Portal>
    )
  );
};

export default Modal;
