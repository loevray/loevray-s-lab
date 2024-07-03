"use client";

import { useEffect, useState } from "react";
import { ToastEventType, observerInstance } from "./createObserver";
import Portal from "../Portal/Portal";
import ToastDefaultIcon from "./Icon/ToastDefaultIcon";
import ToastErrorIcon from "./Icon/ToastErrorIcon";
import ToastSuccessIcon from "./Icon/ToastSuccessIcon";
import ToastWarningIcon from "./Icon/ToastWarningIcon";
import Toast from "./Toast";
interface ToastType {
  id: number;
  message: string;
  duration: number;
  eventType: ToastEventType;
}

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  useEffect(() => {
    const handleAddToast = ({
      eventType,
      message,
      duration,
    }: {
      eventType: ToastEventType;
      message: string;
      duration: number;
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
      color: "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200",
    },
    warning: {
      icon: ToastWarningIcon,
      color:
        "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200",
    },
    error: {
      icon: ToastErrorIcon,
      color: "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200",
    },
    success: {
      icon: ToastSuccessIcon,
      color:
        "text-green-500 bg-green-100  dark:bg-green-800 dark:text-green-200",
    },
  };

  const onCloseButtonClick = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <Portal>
      <div className="fixed top-0 right-0 z-[1000] m-4 flex flex-col gap-2">
        {toasts.map(({ eventType, id, duration, message }) => {
          const IconComponent = mappingIcon[eventType].icon;
          const iconColor = mappingIcon[eventType].color;
          return (
            <Toast
              key={id}
              id={id}
              duration={duration}
              Icon={IconComponent}
              iconColor={iconColor}
              message={message}
              onCloseButtonClick={onCloseButtonClick}
              onComplete={onCloseButtonClick}
            />
          );
        })}
      </div>
    </Portal>
  );
};

export default ToastContainer;
