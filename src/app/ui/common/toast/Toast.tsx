import { ReactNode, useRef } from "react";
import CloseIcon from "./Icon/CloseIcon";
import DecreaseProgress from "../progress/DecreaseProgress";
import useHover from "@/hooks/useHover";

interface ToastProps {
  Icon: () => JSX.Element;
  color: {
    icon: string;
    progress: string;
  };
  duration: number;
  message: string;
  onCloseButtonClick: (id: number) => void;
  onComplete: (id: number) => void;
  id: number;
}

const Toast = ({
  duration,
  Icon,
  color,
  onCloseButtonClick,
  onComplete,
  id,
  message,
}: ToastProps) => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const { isHover } = useHover({ hoverRef });
  const onCloseButtonClickById = onCloseButtonClick.bind(null, id);
  const onCompleteById = onComplete.bind(null, id);

  return (
    <div
      className="w-30 rounded-lg overflow-hidden shadow-radial"
      ref={hoverRef}
    >
      <div
        id="toast-default"
        className="flex items-center w-30 p-1.2 text-gray-500 bg-white   dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          className={`inline-flex items-center justify-center flex-shrink-0 w-3 h-3  ${color.icon}  rounded-lg `}
        >
          <Icon />
        </div>
        <div className="ms-3 text-1.4 text-black font-normal">{message}</div>
        <button
          type="button"
          className="ms-auto mx-0.5 my-0.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-0.5 hover:bg-gray-100 inline-flex items-center justify-center h-2 w-2 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-default"
          aria-label="Close"
          onClick={onCloseButtonClickById}
        >
          <CloseIcon />
        </button>
      </div>
      <DecreaseProgress
        duration={duration}
        colorSet={color.progress}
        shouldPause={isHover}
        onComplete={onCompleteById}
      />
    </div>
  );
};

export default Toast;
