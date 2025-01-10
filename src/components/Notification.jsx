import React, { useEffect } from "react";

const Notification = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, duration);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-6 right-4 z-50 px-4 py-4 rounded-md shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
