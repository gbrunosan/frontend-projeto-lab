"use client";

import { useEffect, useState } from "react";
import { Caution, CheckCorrect, CloseSmall } from "@icon-park/react";

interface ToastProps {
  type: "success" | "error";
  title: string;
  description: string;
  onClose: () => void;
}

const Toast = ({ type, title, description, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 150);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-10 right-3 max-w-xs w-full shadow-lg rounded-lg p-4 z-[9999] transition-all duration-150 ease-out ${
        isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"
      } ${type === "error" ? "bg-amber-300" : "bg-green-400"}`}
      style={{
        transformOrigin: "top right",
      }}
    >
      <div className="flex items-start gap-3">
        {type === "error" ? (
          <Caution theme="outline" size="24" fill="#333" />
        ) : (
          <CheckCorrect theme="outline" size="24" fill="#333" strokeWidth={5} />
        )}

        <div>
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-neutral-700 text-sm">{description}</p>
        </div>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 150);
        }}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        tabIndex={0}
        aria-label="Fechar toast"
      >
        <CloseSmall theme="outline" size="24" fill="#333" />
      </button>
    </div>
  );
};

export default Toast;
