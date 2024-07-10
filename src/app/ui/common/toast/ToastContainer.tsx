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

  type MappingIconType = {
    [key in ToastEventType]: {
      icon: () => JSX.Element;
      color: {
        icon: string;
        progress: string;
      };
    };
  };

  const mappingIcon: MappingIconType = {
    default: {
      icon: ToastDefaultIcon,
      color: {
        icon: "bg-blue-100 text-blue-500",
        progress: "bg-blue-500",
      },
    },
    warning: {
      icon: ToastWarningIcon,
      color: {
        icon: "text-orange-500 bg-orange-100",
        progress: "bg-orange-500",
      },
    },
    error: {
      icon: ToastErrorIcon,
      color: {
        icon: "text-red-500 bg-red-100",
        progress: "bg-red-500",
      },
    },
    success: {
      icon: ToastSuccessIcon,
      color: {
        icon: "text-green-500 bg-green-100",
        progress: "bg-green-500",
      },
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
          const { color } = mappingIcon[eventType];
          return (
            <Toast
              key={id}
              id={id}
              duration={duration}
              Icon={IconComponent}
              color={color}
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
