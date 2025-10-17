import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function PropertyFeedback() {
  const queryClient = useQueryClient();
  const { data: properties = [], isLoading } = useQuery({ queryKey: ["/api/properties"] });
  const propertyList = properties as any[];
  const [selectedProperty, setSelectedProperty] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState("");

  // Simulate feedback API
  const feedbackMutation = useMutation({
    mutationFn: async (data: { propertyId: string; rating: number; comment: string }) => {
      // Replace with actual API call
      await new Promise((r) => setTimeout(r, 500));
      return true;
    },
    onSuccess: () => {
      setSuccess("Feedback submitted!");
      setRating(0);
      setComment("");
      setTimeout(() => setSuccess(""), 2000);
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProperty || !rating) return;
    feedbackMutation.mutate({ propertyId: selectedProperty, rating, comment });
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Property Feedback & Ratings</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <select
          value={selectedProperty}
          onChange={e => setSelectedProperty(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        >
          <option value="">Select Property</option>
          {propertyList.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        <div className="flex gap-2 items-center">
          <span className="text-sm">Rating:</span>
          {[1,2,3,4,5].map((star) => (
            <button
              type="button"
              key={star}
              className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => setRating(star)}
            >★</button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Leave a comment..."
          className="border rounded px-3 py-2 w-full"
        />
        <button type="submit" className="bg-primary text-white rounded px-4 py-2 w-full" disabled={feedbackMutation.isPending}>
          Submit Feedback
        </button>
        {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
      </form>
    </div>
  );
}
