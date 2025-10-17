import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertPropertySchema, type Property, type InsertProperty } from "@shared/schema";

export default function Dashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { toast } = useToast();

  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const form = useForm<InsertProperty>({
    resolver: zodResolver(insertPropertySchema),
    defaultValues: {
      title: "",
      description: "",
      city: "",
      area: "",
      propertyType: "",
      price: "0",
      bedrooms: 0,
      bathrooms: 0,
      sqft: 0,
      images: [],
      amenities: [],
      latitude: "0",
      longitude: "0",
      status: "available",
      featured: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProperty) => {
      // All new properties are created as 'pending' for approval and assigned to the current user
      return await apiRequest("POST", "/api/properties", { ...data, status: "pending", ownerId: user?.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Property submitted for admin approval!" });
      setDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Failed to add property", variant: "destructive" });
    },
  });
  // Admin approval mutation
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("PATCH", `/api/properties/${id}`, { status: "available" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Property approved!" });
    },
    onError: () => {
      toast({ title: "Failed to approve property", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertProperty }) => {
      return await apiRequest("PATCH", `/api/properties/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Property updated successfully!" });
      setDialogOpen(false);
      setEditingProperty(null);
      form.reset();
    },
    onError: () => {
      toast({ title: "Failed to update property", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/properties/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Property deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to delete property", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertProperty) => {
    if (editingProperty) {
      updateMutation.mutate({ id: editingProperty.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (property: Property) => {
    setEditingProperty(property);
    form.reset({
      title: property.title,
      description: property.description,
      city: property.city,
      area: property.area,
      propertyType: property.propertyType,
      price: property.price,
      bedrooms: property.bedrooms || 0,
      bathrooms: property.bathrooms || 0,
      sqft: property.sqft,
      images: property.images,
      amenities: property.amenities,
      latitude: property.latitude || "0",
      longitude: property.longitude || "0",
      status: property.status,
      featured: property.featured,
    });
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
    setEditingProperty(null);
    form.reset();
    setDialogOpen(true);
  };

  // ref for the hidden file input used to upload images
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="font-serif font-bold text-4xl mb-2 text-center">Property Dashboard</h1>
          <p className="text-muted-foreground text-center mb-4">Manage your property listings</p>
          <Button className="gap-2 mb-2" onClick={openAddDialog} data-testid="button-add-property">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
          {/* Auth Dialog for unauthenticated users */}
          {showAuthDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Sign in or Sign up to add a property</h2>
                <div className="flex gap-4 w-full">
                  <Button className="w-1/2" variant="outline" onClick={() => { setShowAuthDialog(false); navigate("/login"); }}>Login</Button>
                  <Button className="w-1/2" onClick={() => { setShowAuthDialog(false); navigate("/signup"); }}>Sign Up</Button>
                </div>
                <Button className="mt-6 w-full" variant="ghost" onClick={() => setShowAuthDialog(false)}>Cancel</Button>
              </div>
            </div>
          )}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              {/* Hidden trigger, use openAddDialog instead */}
              <span style={{ display: "none" }} />
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProperty ? "Edit Property" : "Add New Property"}
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Property Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Luxury 3BHK Villa" {...field} data-testid="input-title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-city">
                                <SelectValue placeholder="Select City" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Tirupati">Tirupati</SelectItem>
                              {/* Removed Kadapa option */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area/Locality</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Renigunta Road" {...field} data-testid="input-area" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-property-type">
                                <SelectValue placeholder="Select Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Apartments">Apartments</SelectItem>
                              <SelectItem value="Villas">Villas</SelectItem>
                              <SelectItem value="Penthouses">Penthouses</SelectItem>
                              <SelectItem value="Independent Houses">Independent Houses</SelectItem>
                              <SelectItem value="Lands">Lands</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="5000000" {...field} data-testid="input-price" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={field.value ?? 0}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              data-testid="input-bedrooms"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={field.value ?? 0}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              data-testid="input-bathrooms"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sqft"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area (sq.ft)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={field.value ?? 0}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              data-testid="input-sqft"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the property..."
                              rows={4}
                              {...field}
                              data-testid="textarea-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="images"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Images</FormLabel>

                          {/* File upload + previews */}
                          <div className="mb-2 flex items-center gap-3">
                            <input
                              ref={uploadInputRef}
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={async (e) => {
                                const files = Array.from(e.target.files || []);
                                if (files.length === 0) return;
                                const readers = files.map(
                                  (file) =>
                                    new Promise<string>((resolve, reject) => {
                                      const fr = new FileReader();
                                      fr.onload = () => resolve(String(fr.result));
                                      fr.onerror = () => reject(new Error("Failed to read file"));
                                      fr.readAsDataURL(file);
                                    }),
                                );
                                try {
                                  const dataUrls = await Promise.all(readers);
                                  field.onChange([...(field.value || []), ...dataUrls]);
                                  // clear the input so same file can be picked again
                                  (e.target as HTMLInputElement).value = "";
                                } catch (err) {
                                  // ignore for now
                                }
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-outline px-3 py-1 rounded-md border"
                              onClick={() => uploadInputRef.current?.click()}
                              data-testid="button-upload-images"
                            >
                              Upload Images
                            </button>

                            <span className="text-sm text-muted-foreground">or paste image URLs below (comma-separated)</span>
                          </div>

                          {/* Thumbnails / previews */}
                          <div className="flex flex-wrap gap-3 mb-3">
                            {(field.value || []).map((img, idx) => (
                              <div key={idx} className="relative w-28 h-20 rounded overflow-hidden border">
                                <img
                                  src={img}
                                  className="object-cover w-full h-full"
                                  alt={`preview-${idx}`}
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="100%" height="100%" fill="%23eef2f4"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial,Helvetica,sans-serif" font-size="14">Image not available</text></svg>';
                                  }}
                                />
                                <button
                                  type="button"
                                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs"
                                  onClick={() => {
                                    const next = (field.value || []).filter((_, i) => i !== idx);
                                    field.onChange(next);
                                  }}
                                  aria-label={`Remove image ${idx}`}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* URL textarea (keeps backward compatibility) */}
                          <FormControl>
                            <Textarea
                              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                              rows={2}
                              value={(field.value || []).filter(Boolean).join(", ")}
                              onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                              data-testid="textarea-images"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amenities"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Amenities (comma-separated)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Swimming Pool, Gym, Parking, 24/7 Security"
                              rows={2}
                              value={field.value.join(", ")}
                              onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                              data-testid="textarea-amenities"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value === 1}
                              onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                              data-testid="checkbox-featured"
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-normal">Mark as Featured</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setDialogOpen(false);
                        setEditingProperty(null);
                        form.reset();
                      }}
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createMutation.isPending || updateMutation.isPending}
                      data-testid="button-submit"
                    >
                      {editingProperty ? "Update" : "Add"} Property
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <CardContent className="pt-6">
                  <div className="h-4 bg-muted rounded mb-2 animate-pulse" />
                  <div className="h-6 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg mb-4">Failed to load properties. Please try again later.</p>
            <Button onClick={() => window.location.reload()} data-testid="button-reload">
              Reload Page
            </Button>
          </Card>
        ) : (
          <>
            {/* Admin dashboard: show all properties, including pending for approval */}
            {user?.role === "admin" && properties && properties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden" data-testid={`card-dashboard-property-${property.id}`}>
                    <div className="relative h-48 bg-muted">
                      {property.images[0] && (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"><rect width="100%" height="100%" fill="%23eef2f4"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial,Helvetica,sans-serif" font-size="28">Image not available</text></svg>'; }}
                        />
                      )}
                      <div className="absolute top-4 left-4 flex gap-3 z-30">
                        {property.featured === 1 && (
                          <Badge className="px-3 py-1 bg-amber-500 text-white rounded-full shadow text-xs font-semibold">Featured</Badge>
                        )}
                        <Badge className={`px-3 py-1 rounded-full shadow text-xs font-semibold ${property.status === 'sold' ? 'bg-red-500 text-white' : property.status === 'pending' ? 'bg-gray-400 text-white' : 'bg-green-400 text-white'}`}>
                          {property.status === 'sold' ? 'Sold Out' : property.status === 'pending' ? 'Pending' : 'Available'}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="pt-6">
                      <Badge className="mb-3">{property.propertyType}</Badge>
                      <h3 className="font-serif font-semibold text-lg mb-2 line-clamp-1">
                        {property.title}
                      </h3>
                      <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
                        <MapPin className="h-4 w-4" />
                        {property.area}, {property.city}
                      </p>
                      <p className="font-bold text-xl text-primary">
                        ₹{Number(property.price).toLocaleString('en-IN')}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <Button
                        variant="outline"
                        className="w-full md:w-auto flex items-center justify-center gap-2"
                        onClick={() => openEditDialog(property)}
                        data-testid={`button-edit-${property.id}`}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full md:w-auto flex items-center justify-center gap-2"
                        onClick={() => deleteMutation.mutate(property.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${property.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                      {property.status === "pending" && (
                        <Button
                          variant="default"
                          className="w-full md:w-auto flex items-center justify-center gap-2"
                          onClick={() => approveMutation.mutate(property.id)}
                          disabled={approveMutation.isPending}
                          data-testid={`button-approve-${property.id}`}
                        >
                          Approve
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Regular user dashboard: show only user's properties that are approved */}
            {user?.role === "user" && (
              <>
                {properties && properties.filter(p => p.status === "available" && p.ownerId === user.id).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.filter(p => p.status === "available" && p.ownerId === user.id).map((property) => (
                      <Card key={property.id} className="overflow-hidden" data-testid={`card-dashboard-property-${property.id}`}>
                        <div className="relative h-48 bg-muted">
                          {property.images[0] && (
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1200\" height=\"600\"><rect width=\"100%\" height=\"100%\" fill=\"%23eef2f4\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"%23999\" font-family=\"Arial,Helvetica,sans-serif\" font-size=\"28\">Image not available</text></svg>'; }}
                            />
                          )}
                          <div className="absolute top-4 left-4 flex gap-3 z-30">
                            {property.featured === 1 && (
                              <Badge className="px-3 py-1 bg-amber-500 text-white rounded-full shadow text-xs font-semibold">Featured</Badge>
                            )}
                            <Badge className={`px-3 py-1 rounded-full shadow text-xs font-semibold bg-green-400 text-white`}>
                              Available
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="pt-6">
                          <Badge className="mb-3">{property.propertyType}</Badge>
                          <h3 className="font-serif font-semibold text-lg mb-2 line-clamp-1">
                            {property.title}
                          </h3>
                          <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
                            <MapPin className="h-4 w-4" />
                            {property.area}, {property.city}
                          </p>
                          <p className="font-bold text-xl text-primary">
                            ₹{Number(property.price).toLocaleString('en-IN')}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : null}
              </>
            )}

            {/* If no user, show nothing except Add Property */}
            {!user && null}
          </>
        )}
      </div>
    </div>
  );
}
