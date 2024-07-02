"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { ToastEventType, observerInstance } from "./createObserver";
import Portal from "../Portal/Portal";
import CloseIcon from "./Icon/CloseIcon";
import ToastDefaultIcon from "./Icon/ToastDefaultIcon";
import ToastErrorIcon from "./Icon/ToastErrorIcon";
import ToastSuccessIcon from "./Icon/ToastSuccessIcon";
import ToastWarningIcon from "./Icon/ToastWarningIcon";
import DecreaseProgress from "../progress/DecreaseProgress";
interface Toast {
  id: number;
  message: string;
  duration?: number;
  eventType: ToastEventType;
}

const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    const handleAddToast = ({
      eventType,
      message,
      duration,
    }: {
      eventType: ToastEventType;
      message: string;
      duration?: number;
    }) => {
      const id = new Date().getTime();

      setToasts((prev) => [...prev, { id, message, duration, eventType }]);
    };

    const unsubscribe = observerInstance.observe(handleAddToast);

    return () => {
      unsubscribe();
    };
  }, []);

  const mappingIcon: {
    [key in ToastEventType]: {
      icon: () => JSX.Element;
      color: string;
    };
  } = {
    default: {
      icon: ToastDefaultIcon,
      color: "bg-blue-100",
    },
    warning: {
      icon: ToastWarningIcon,
      color: "bg-orange-100",
    },
    error: {
      icon: ToastErrorIcon,
      color: "bg-red-100",
    },
    success: {
      icon: ToastSuccessIcon,
      color: "bg-green-100",
    },
  };

  return (
    <Portal>
      <div className="fixed top-0 right-0 z-[1000] m-4 flex flex-col gap-2">
        {toasts.map((toast) => {
          const IconComponent = mappingIcon[toast.eventType].icon;
          const bg = mappingIcon[toast.eventType].color;
          return (
            <div
              className="w-30 rounded-lg overflow-hidden shadow-radial"
              key={toast.id}
            >
              <div
                id="toast-default"
                className="flex items-center w-30 p-1.2 text-gray-500 bg-white   dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div
                  className={`inline-flex items-center justify-center flex-shrink-0 w-3 h-3 text-blue-500 ${bg}  rounded-lg dark:bg-blue-800 dark:text-blue-200`}
                >
                  <IconComponent />
                </div>
                <div className="ms-3 text-1.4 text-black font-normal">
                  {toast.message}
                </div>
                <button
                  type="button"
                  className="ms-auto mx-0.5 my-0.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-0.5 hover:bg-gray-100 inline-flex items-center justify-center h-2 w-2 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-default"
                  aria-label="Close"
                  onClick={() => {
                    setToasts((prev) =>
                      prev.filter((_toast) => _toast.id !== toast.id)
                    );
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
              <DecreaseProgress
                duration={toast.duration}
                onComplete={() =>
                  setToasts((prev) => prev.filter(({ id }) => toast.id !== id))
                }
              />
            </div>
          );
        })}
      </div>
    </Portal>
  );
};

export default ToastContainer;
