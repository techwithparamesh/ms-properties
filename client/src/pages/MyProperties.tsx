import React from "react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Simulate user ID from localStorage/session
const userId = window.localStorage.getItem("userId") || "demo-user";

export default function MyProperties() {
  const queryClient = useQueryClient();
  // Fetch all properties, filter by userId
  const { data: properties = [], isLoading } = useQuery({ queryKey: ["/api/properties"] });
  const myProperties = (properties as any[]).filter((p: any) => p.ownerId === userId);

  // Delete property mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete property");
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">My Properties</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : myProperties.length === 0 ? (
        <div className="text-gray-500">You have not added any properties yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {myProperties.map((property: any) => (
            <div key={property.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <img src={property.images?.[0]} alt={property.title} className="rounded-lg mb-3 h-40 w-full object-cover" />
              <h2 className="font-bold text-lg mb-1">{property.title}</h2>
              <div className="text-sm text-gray-500 mb-1">{property.area}, {property.city}</div>
              <div className="font-bold text-blue-700 text-xl mb-1">₹{Number(property.price).toLocaleString("en-IN")}</div>
              <div className="text-xs text-gray-500 mb-2">Status: {property.status}</div>
              <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                <Button
                  variant="destructive"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs"
                  onClick={() => deleteMutation.mutate(property.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-${property.id}`}
                >
                  Delete
                </Button>
                <Button
                  asChild
                  variant="default"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs"
                  data-testid={`button-edit-${property.id}`}
                >
                  <a href={`/edit-property/${property.id}`}>Edit</a>
                </Button>
              </div>
              {deleteMutation.isError && <div className="text-red-500 text-xs mt-2">Error deleting property</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
