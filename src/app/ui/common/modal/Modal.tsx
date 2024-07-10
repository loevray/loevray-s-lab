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

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ children, open, onClose }: ModalProps) => {
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
          className="w-screen min-h-[100dvh] bg-black bg-opacity-60 z-50 absolute top-0 left-0 flex justify-center items-center"
        >
          {children}
        </div>
      </Portal>
    )
  );
};

export default Modal;
