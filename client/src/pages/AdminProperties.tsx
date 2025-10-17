import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const isAdmin = window.localStorage.getItem("isAdmin") === "true";

export default function AdminProperties() {
  const queryClient = useQueryClient();
  const { data: properties = [], isLoading } = useQuery({ queryKey: ["/api/properties"] });
  const propertyList = properties as any[];

  // Approve property mutation
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "available" }),
      });
      if (!res.ok) throw new Error("Failed to approve property");
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
    },
  });

  // Reject property mutation
  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      if (!res.ok) throw new Error("Failed to reject property");
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
    },
  });

  // Bulk approve example (approve all pending)
  function bulkApprove() {
    propertyList.filter((p: any) => p.status === "pending").forEach((p: any) => approveMutation.mutate(p.id));
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Admin Property Management</h1>
      <button className="bg-green-600 text-white px-4 py-2 rounded mb-6" onClick={bulkApprove} disabled={approveMutation.isPending}>
        Bulk Approve Pending
      </button>
      {isLoading ? (
        <div>Loading...</div>
      ) : propertyList.length === 0 ? (
        <div className="text-gray-500">No properties found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {propertyList.map((property: any) => (
            <div key={property.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <img src={property.images?.[0]} alt={property.title} className="rounded-lg mb-3 h-40 w-full object-cover" />
              <h2 className="font-bold text-lg mb-1">{property.title}</h2>
              <div className="text-sm text-gray-500 mb-1">{property.area}, {property.city}</div>
              <div className="font-bold text-blue-700 text-xl mb-1">₹{Number(property.price).toLocaleString("en-IN")}</div>
              <div className="text-xs text-gray-500 mb-2">Status: {property.status}</div>
              <div className="flex gap-2 mt-auto">
                {property.status === "pending" && (
                  <>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                      onClick={() => approveMutation.mutate(property.id)}
                      disabled={approveMutation.isPending}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                      onClick={() => rejectMutation.mutate(property.id)}
                      disabled={rejectMutation.isPending}
                    >
                      Reject
                    </button>
                  </>
                )}
                <a
                  href={`/edit-property/${property.id}`}
                  className="bg-primary text-white px-3 py-1 rounded text-xs"
                >
                  Edit
                </a>
              </div>
              {(approveMutation.isError || rejectMutation.isError) && <div className="text-red-500 text-xs mt-2">Error updating property</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
