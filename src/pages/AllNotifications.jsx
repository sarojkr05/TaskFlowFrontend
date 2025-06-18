// src/pages/AllNotifications.jsx

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchNotifications } from "../features/notifications/notificationSlice";

export default function AllNotifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.items);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">All Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((note, idx) => (
            <li key={idx} className={`border p-2 rounded ${note.isRead ? "text-gray-500" : "font-semibold"}`}>
              {note.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
