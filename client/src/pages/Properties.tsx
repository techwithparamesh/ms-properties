import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { MapPin, Bed, Bath, Maximize2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Property } from "@shared/schema";
import PropertyStatusAdmin from "../components/PropertyStatusAdmin";

export default function Properties() {
  const { data: properties = [], isLoading } = useQuery<Property[]>({ queryKey: ["/api/properties"] });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter and search logic
  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterStatus === "all" || p.status === filterStatus)
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">All Properties</h1>
          <p className="text-muted-foreground">
            {filteredProperties.length} properties available in Tirupati
          </p>
        </div>

        <div>
          {/* Properties Grid */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-56 bg-muted animate-pulse" />
                    <CardContent className="pt-6">
                      <div className="h-4 bg-muted rounded mb-3 animate-pulse" />
                      <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
                      <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No properties found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearch("");
                    setFilterStatus("all");
                  }}
                  data-testid="button-reset-filters"
                >
                  Reset Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <Link key={property.id} href={`/property/${property.id}`}>
                    <Card className="overflow-hidden hover-elevate cursor-pointer transition-all" data-testid={`card-property-${property.id}`}>
                      <div className="relative h-56 bg-muted">
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
                            <span className="px-2 py-1 bg-amber-500 text-white rounded-full shadow text-xs font-semibold">Featured</span>
                          )}
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            property.status === "sold"
                              ? "bg-red-500 text-white"
                              : property.status === "pending"
                              ? "bg-gray-400 text-white"
                              : "bg-green-500 text-white"
                          }`}>
                            {property.status === "sold"
                              ? "Sold Out"
                              : property.status === "pending"
                              ? "Pending"
                              : "Available"}
                          </span>
                        </div>
                      </div>
                      <CardContent className="pt-6">
                        <Badge className="mb-3">{property.propertyType}</Badge>
                        <h3 className="font-serif font-semibold text-xl mb-2 line-clamp-1">
                          {property.title}
                        </h3>
                        <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
                          <MapPin className="h-4 w-4" />
                          {property.area}, {property.city}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          {property.bedrooms && (
                            <span className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              {property.bedrooms}
                            </span>
                          )}
                          {property.bathrooms && (
                            <span className="flex items-center gap-1">
                              <Bath className="h-4 w-4" />
                              {property.bathrooms}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Maximize2 className="h-4 w-4" />
                            {property.sqft} sqft
                          </span>
                        </div>

                        <div className="pt-4 border-t border-border flex items-center justify-between">
                          <span className="font-bold text-2xl text-primary">
                            ₹{Number(property.price).toLocaleString('en-IN')}
                          </span>
                          {/* Admin status update (example: show if admin) */}
                          <div className="ml-2">
                            {/* Replace this with actual admin check logic */}
                            {window.localStorage.getItem('isAdmin') === 'true' && (
                              <div className="mt-2">
                                <span className="text-xs text-muted-foreground mr-2">Update Status:</span>
                                {/* @ts-ignore */}
                                <PropertyStatusAdmin property={property} />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
