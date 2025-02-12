"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";
import { NotificationType } from "../helper/interface";

// Define props for StackedNotifications
type StackedNotificationsProps = {
  notification: NotificationType | null; // It can be a notification or null
  setNotification: React.Dispatch<
    React.SetStateAction<NotificationType | null>
  >; // Function to set notification
};

const StackedNotifications = ({
  notification,
  setNotification,
}: StackedNotificationsProps) => {
  const removeNotif = () => {
    setNotification(null); // Remove notification
  };

  return (
    <div className="">
      <AnimatePresence>
        {notification && (
          <Notification
            removeNotif={removeNotif}
            key={notification.id}
            {...notification}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// TTL for the notification
const NOTIFICATION_TTL = 5000;

const Notification = ({
  text,
  type,
  removeNotif,
}: NotificationType & { removeNotif: () => void }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeNotif();
    }, NOTIFICATION_TTL);
    return () => clearTimeout(timeout);
  }, [removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: 15, scale: 0.9, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: -25, scale: 0.9, opacity: 0 }}
      transition={{ type: "spring" }}
      className={`p-4 w-80 flex items-start rounded-lg gap-2 text-[1em] font-medium shadow-lg text-white fixed z-50 bottom-4 right-4 ${
        type === "error" ? "bg-red-500" : "bg-[#1DD67D]"
      }`}
    >
      <span>{text}</span>
      <button onClick={removeNotif} className="ml-auto mt-0.5 text-black">
        <FiX />
      </button>
    </motion.div>
  );
};

export default StackedNotifications;
