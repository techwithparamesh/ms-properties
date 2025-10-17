import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function PropertyApprovalStatus() {
  // Simulate user ID from localStorage/session
  const userId = window.localStorage.getItem("userId") || "demo-user";
  const { data: properties = [], isLoading } = useQuery({ queryKey: ["/api/properties"] });
  const myProperties = (properties as any[]).filter((p) => p.ownerId === userId);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Property Approval Status</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : myProperties.length === 0 ? (
        <div className="text-gray-500">You have not submitted any properties.</div>
      ) : (
        <ul className="space-y-4">
          {myProperties.map((property) => (
            <li key={property.id} className="bg-white rounded-lg shadow p-4">
              <div className="font-bold text-lg">{property.title}</div>
              <div className="text-sm text-gray-500 mb-1">{property.area}, {property.city}</div>
              <div className="text-xs text-gray-500 mb-2">Status: <span className={`px-2 py-1 rounded text-xs font-semibold ${
                property.status === "pending"
                  ? "bg-gray-400 text-white"
                  : property.status === "rejected"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}>
                {property.status === "pending"
                  ? "Pending Approval"
                  : property.status === "rejected"
                  ? "Rejected"
                  : "Approved"}
              </span></div>
              {property.status === "rejected" && (
                <div className="text-red-500 text-xs">Your property was rejected. Please review and resubmit.</div>
              )}
              {property.status === "pending" && (
                <div className="text-yellow-600 text-xs">Your property is awaiting admin approval.</div>
              )}
              {property.status === "available" && (
                <div className="text-green-600 text-xs">Your property is live!</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
