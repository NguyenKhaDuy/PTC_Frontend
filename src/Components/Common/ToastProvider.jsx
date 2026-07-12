import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info") => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* TOAST UI */}
      <div className="fixed top-5 right-5 space-y-3 z-[9999]">
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => removeToast(t.id)}
            className={`
              px-4 py-3 rounded-lg shadow-lg text-white cursor-pointer
              animate-fadeIn min-w-[220px]
              ${
                t.type === "success"
                  ? "bg-green-600"
                  : t.type === "error"
                    ? "bg-red-600"
                    : "bg-gray-800"
              }
            `}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
