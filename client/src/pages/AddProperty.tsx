import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

export default function AddProperty() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    area: "",
    city: "",
    propertyType: "Apartments",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    images: [""],
    amenities: [],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const isAdmin = window.localStorage.getItem("isAdmin") === "true";
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          status: isAdmin ? "available" : "pending",
        }),
      });
      if (!res.ok) throw new Error("Failed to add property");
      return res.json();
    },
    onSuccess: () => {
      setSuccess("Property submitted successfully!");
      setError("");
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setTimeout(() => navigate("/properties"), 1500);
    },
    onError: () => {
      setError("Failed to submit property. Please try again.");
      setSuccess("");
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(form);
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border rounded px-3 py-2 w-full" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded px-3 py-2 w-full" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border rounded px-3 py-2 w-full" required />
        <input name="area" value={form.area} onChange={handleChange} placeholder="Area" className="border rounded px-3 py-2 w-full" required />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border rounded px-3 py-2 w-full" required />
        <select name="propertyType" value={form.propertyType} onChange={handleChange} className="border rounded px-3 py-2 w-full">
          <option>Apartments</option>
          <option>Villas</option>
          <option>Penthouses</option>
          <option>Independent Houses</option>
          <option>Lands</option>
        </select>
        <input name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" type="number" className="border rounded px-3 py-2 w-full" />
        <input name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" type="number" className="border rounded px-3 py-2 w-full" />
        <input name="sqft" value={form.sqft} onChange={handleChange} placeholder="Sqft" type="number" className="border rounded px-3 py-2 w-full" />
        <input name="images" value={form.images[0]} onChange={e => setForm(f => ({ ...f, images: [e.target.value] }))} placeholder="Image URL" className="border rounded px-3 py-2 w-full" />
        {/* Add amenities, multiple images, etc. as needed */}
        <button type="submit" className="bg-primary text-white rounded px-4 py-2 w-full" disabled={mutation.isPending}>Submit</button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
      </form>
    </div>
  );
}
