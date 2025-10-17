import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Property } from "@shared/schema";

export default function PropertyStatusAdmin({ property }: { property: Property }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(property.status);
  const mutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...property, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
    },
  });

  return (
    <div className="flex items-center gap-2">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="sold">Sold Out</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
      <Button
        size="sm"
        variant="outline"
        disabled={mutation.status === "pending" || status === property.status}
        onClick={() => mutation.mutate(status)}
      >
        Update
      </Button>
      {mutation.status === "pending" && <span className="text-xs text-muted-foreground">Updating...</span>}
      {mutation.status === "error" && <span className="text-xs text-red-500">Error updating status</span>}
      {mutation.status === "success" && <span className="text-xs text-success">Updated!</span>}
    </div>
  );
}
