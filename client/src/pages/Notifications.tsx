import React, { useState } from "react";

export default function Notifications() {
  // Simulate notifications (replace with API integration as needed)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your property 'Family Independent House' was approved!", type: "success" },
    { id: 2, message: "New inquiry received for 'Green Villa'.", type: "info" },
    { id: 3, message: "Your property 'Lakeview Apartment' is pending approval.", type: "warning" },
    { id: 4, message: "Admin rejected your property 'Old Cottage'.", type: "error" },
  ]);

  function dismiss(id: number) {
    setNotifications(n => n.filter(notif => notif.id !== id));
  }

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <div className="text-gray-500">No notifications.</div>
      ) : (
        <ul className="space-y-4">
          {notifications.map(notif => (
            <li key={notif.id} className={`rounded-lg shadow p-4 flex items-center justify-between ${
              notif.type === "success" ? "bg-green-50 border-green-400" :
              notif.type === "info" ? "bg-blue-50 border-blue-400" :
              notif.type === "warning" ? "bg-yellow-50 border-yellow-400" :
              "bg-red-50 border-red-400"
            } border-l-4`}>
              <span className={`text-sm ${
                notif.type === "success" ? "text-green-700" :
                notif.type === "info" ? "text-blue-700" :
                notif.type === "warning" ? "text-yellow-700" :
                "text-red-700"
              }`}>{notif.message}</span>
              <button
                className="ml-4 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => dismiss(notif.id)}
              >Dismiss</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
