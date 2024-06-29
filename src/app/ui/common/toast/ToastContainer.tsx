"use client";

import { useEffect, useState } from "react";
import { ToastEventType, observerInstance } from "./createObserver";
import Portal from "../Portal/Portal";
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
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    };

    const unsubscribe = observerInstance.observe(handleAddToast);

    console.log(unsubscribe);
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Portal>
      <div className="fixed top-0 right-0 z-[1000] m-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 mb-2 text-white rounded ${
              toast.eventType === "error"
                ? "bg-red-500"
                : toast.eventType === "success"
                ? "bg-green-500"
                : toast.eventType === "warning"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
          >
            {(toast.message, toast.id)}
          </div>
        ))}
      </div>
    </Portal>
  );
};

export default ToastContainer;
