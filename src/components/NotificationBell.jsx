import { Bell } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { markAllAsRead, selectNotifications } from "../features/notifications/notificationSlice"; // adjust path if needed
import { Link } from "react-router-dom";

export default function NotificationBell() {

  const notifications = useSelector(selectNotifications) || [];

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((note) => !note.isRead).length;

  const handleToggle = () => {
    setOpen(!open);
    if (!open && unreadCount > 0) {
      dispatch(markAllAsRead());
    }
  };

  return (
    <div className="relative">
      <button onClick={handleToggle} className="relative">
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded p-2 max-h-64 overflow-y-auto z-50">
          <h3 className="text-sm font-bold mb-1">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No notifications</p>
          ) : (
            notifications
              .slice(0, 10) // ✅ LIMIT to latest 10 notifications
              .map((note, idx) => (
                <div
                  key={idx}
                  className={`text-sm border-b py-1 ${
                    note.isRead ? "text-gray-500" : "font-semibold"
                  }`}
                >
                  <div>{note.message}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(note.createdAt).toLocaleString()}{" "}
                    {/* ✅ TIMESTAMP */}
                  </div>
                </div>
              ))
          )}
          <div className="text-right mt-2">
            <Link
              to="/notifications" // Change to your actual route
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
