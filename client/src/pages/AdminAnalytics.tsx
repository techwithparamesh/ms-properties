import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function AdminAnalytics() {
  const { data: properties = [], isLoading } = useQuery({ queryKey: ["/api/properties"] });
  const propertyList = properties as any[];

  // Simple stats
  const total = propertyList.length;
  const available = propertyList.filter(p => p.status === "available").length;
  const sold = propertyList.filter(p => p.status === "sold").length;
  const pending = propertyList.filter(p => p.status === "pending").length;
  const featured = propertyList.filter(p => p.featured === 1).length;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Admin Analytics & Reports</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-4xl font-bold text-primary">{total}</div>
            <div className="text-gray-500 mt-2">Total Properties</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-4xl font-bold text-green-600">{available}</div>
            <div className="text-gray-500 mt-2">Available</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-4xl font-bold text-red-500">{sold}</div>
            <div className="text-gray-500 mt-2">Sold Out</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-4xl font-bold text-yellow-600">{pending}</div>
            <div className="text-gray-500 mt-2">Pending Approval</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-4xl font-bold text-amber-500">{featured}</div>
            <div className="text-gray-500 mt-2">Featured</div>
          </div>
        </div>
      )}
      <button className="bg-primary text-white px-4 py-2 rounded">Export Report</button>
      {/* Add chart.js or other chart integration for advanced analytics if needed */}
    </div>
  );
}
