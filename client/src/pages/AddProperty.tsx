import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

export default function AddProperty() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  
  // Initialize with empty strings - NO default values
  const initialFormState = {
    title: "",
    description: "",
    price: "",
    area: "",
    city: "",
    propertyType: "Apartments",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    images: "",
    amenities: "",
  };
  
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Debug: Log form state on mount
  React.useEffect(() => {
    console.log("[useEffect] AddProperty mounted, initial form state:", form);
  }, []);

  // Debug: Log form state whenever it changes
  React.useEffect(() => {
    console.log('[useEffect] Form state changed:', form);
  }, [form]);

  type PropertyForm = Omit<typeof form, 'amenities' | 'images' | 'price' | 'area' | 'bedrooms' | 'bathrooms' | 'sqft'> & {
    price: number | null;
    area: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    sqft: number | null;
    amenities: string[];
    images: string[];
  };
  const mutation = useMutation({
    mutationFn: async (data: PropertyForm) => {
      const userStr = localStorage.getItem("dd_user");
      const user = userStr ? JSON.parse(userStr) : null;
      const isAdmin = user?.role === "admin";
      
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ownerId: user?.id || "default-user",
          status: isAdmin ? "available" : "pending",
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add property");
      }
      return res.json();
    },
    onSuccess: () => {
      setSuccess("Property submitted successfully!");
      setError("");
      setForm(initialFormState); // Reset form
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setTimeout(() => navigate("/properties"), 1500);
    },
    onError: (err: Error) => {
      console.error("Add property error:", err);
      setError(err.message || "Failed to submit property. Please try again.");
      setSuccess("");
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    let newValue = value;
    if (["bedrooms", "bathrooms", "area", "sqft"].includes(name)) {
      // Remove leading zeros, but allow empty string or single "0"
      newValue = newValue.replace(/^0+(?!$)/, "");
    }
    setForm((prev) => ({ ...prev, [name]: newValue }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form submitted, raw form data:", form);
    
    // Prepare amenities and images as arrays, convert numbers or send null if empty
    const submitData = {
      ...form,
      price: form.price !== "" ? Number(form.price) : null,
      area: form.area !== "" ? Number(form.area) : null,
      bedrooms: form.bedrooms !== "" ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms !== "" ? Number(form.bathrooms) : null,
      sqft: form.sqft !== "" ? Number(form.sqft) : null,
      amenities: form.amenities
        ? form.amenities.split(",").map(a => a.trim()).filter(Boolean)
        : [],
      images: form.images
        ? form.images.split(",").map(i => i.trim()).filter(Boolean)
        : [],
    };
    
    console.log("Prepared submit data:", submitData);
    mutation.mutate(submitData);
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="property-title" className="block text-sm font-medium mb-1">Title *</label>
          <input id="property-title" name="title" value={form.title} onChange={handleChange} placeholder="Enter property title" className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label htmlFor="property-description" className="block text-sm font-medium mb-1">Description *</label>
          <textarea id="property-description" name="description" value={form.description} onChange={handleChange} placeholder="Describe the property..." className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label htmlFor="property-price" className="block text-sm font-medium mb-1">Price *</label>
          <input id="property-price" name="price" value={form.price} onChange={handleChange} placeholder="Enter price" type="text" className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label htmlFor="property-area" className="block text-sm font-medium mb-1">Area (sq.ft) *</label>
          <input id="property-area" name="area" value={form.area} onChange={handleChange} placeholder="Enter area" type="text" className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label htmlFor="property-city" className="block text-sm font-medium mb-1">City *</label>
          <input id="property-city" name="city" value={form.city} onChange={handleChange} placeholder="Enter city" className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label htmlFor="property-type" className="block text-sm font-medium mb-1">Property Type</label>
          <select id="property-type" name="propertyType" value={form.propertyType} onChange={handleChange} className="border rounded px-3 py-2 w-full">
            <option>Apartments</option>
            <option>Villas</option>
            <option>Penthouses</option>
            <option>Independent Houses</option>
            <option>Lands</option>
          </select>
        </div>
        <div>
         <label htmlFor="property-bedrooms" className="block text-sm font-medium mb-1">Bedrooms</label>
         <input id="property-bedrooms" name="bedrooms" value={form.bedrooms === "0" ? "" : form.bedrooms} onChange={handleChange} placeholder="Number of bedrooms" type="text" className="border rounded px-3 py-2 w-full" autoComplete="off" />
        </div>
        <div>
         <label htmlFor="property-bathrooms" className="block text-sm font-medium mb-1">Bathrooms</label>
         <input id="property-bathrooms" name="bathrooms" value={form.bathrooms === "0" ? "" : form.bathrooms} onChange={handleChange} placeholder="Number of bathrooms" type="text" className="border rounded px-3 py-2 w-full" autoComplete="off" />
        </div>
        <div>
         <label htmlFor="property-sqft" className="block text-sm font-medium mb-1">Area (sq.ft)</label>
         <input id="property-sqft" name="sqft" value={form.sqft === "0" ? "" : form.sqft} onChange={handleChange} placeholder="Total square feet" type="text" className="border rounded px-3 py-2 w-full" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="property-images" className="block text-sm font-medium mb-1">Images</label>
          <input
            id="property-images"
            name="images"
            value={form.images}
            onChange={handleChange}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            className="border rounded px-3 py-2 w-full"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="bg-primary text-white rounded px-4 py-2 w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Submitting..." : "Add Property"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
      </form>
    </div>
  );
}
