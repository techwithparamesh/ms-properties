import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Search, MapPin, Home as HomeIcon, Users, Building2, 
  CheckCircle2, Star, ArrowRight, Send, TrendingUp, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { contactFormSchema, type Property, type Blog, type ContactForm } from "@shared/schema";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [searchArea, setSearchArea] = useState("");
  const { toast } = useToast();

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { data: properties, isLoading: isLoadingProperties, error: propertiesError } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: blogs, isLoading: isLoadingBlogs, error: blogsError } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const featuredProperties = properties?.filter(p => p.featured === 1).slice(0, 3) || [];
  const recentBlogs = blogs?.slice(0, 3) || [];

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      contactForm.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onContactSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  const stats = [
    { icon: Building2, label: "Properties Listed", value: properties?.length || 0, color: "text-primary" },
    { icon: Users, label: "Happy Customers", value: "500+", color: "text-success" },
    { icon: MapPin, label: "Cities Served", value: "2", color: "text-amber" },
    { icon: Award, label: "Years Experience", value: "10+", color: "text-primary" },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Property Buyer",
      content: "Dream Dwellings helped me find my perfect home in Tirupati. The process was seamless and professional.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Villa Owner",
  // Removed Kadapa testimonial
      rating: 5,
    },
    {
      name: "Venkat Reddy",
      role: "First-time Buyer",
      content: "As a first-time buyer, their team guided me through every step. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-primary/20 via-accent/10 to-background flex items-center">
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000')] bg-cover bg-center opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
              Find Your Dream Property in <span className="text-primary">Tirupati</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover premium apartments, villas, penthouses, and independent houses with expert guidance.
            </p>

            {/* Search Bar */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="sm:w-[200px]" data-testid="select-city">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tirupati" data-testid="option-tirupati">Tirupati</SelectItem>
                    {/* Removed Kadapa option */}
                  </SelectContent>
                </Select>

                <div className="flex-1 flex gap-4">
                  <Input
                    placeholder="Search by area..."
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)}
                    className="flex-1"
                    data-testid="input-search-area"
                  />
                  <Link href={`/properties?city=${selectedCity}&area=${searchArea}`}>
                    <Button className="gap-2" data-testid="button-search">
                      <Search className="h-4 w-4" />
                      Search
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover-elevate" data-testid={`card-stat-${index}`}>
                <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-4`} />
                <h3 className="font-serif font-bold text-3xl mb-2" data-testid={`text-stat-value-${index}`}>{stat.value}</h3>
                <p className="text-muted-foreground" data-testid={`text-stat-label-${index}`}>{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif font-bold text-3xl mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">Handpicked properties for you</p>
            </div>
            <Link href="/properties">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-properties">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoadingProperties ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-muted animate-pulse" />
                  <CardContent className="pt-6">
                    <div className="h-6 bg-muted rounded mb-3 animate-pulse" />
                    <div className="h-8 bg-muted rounded mb-2 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : propertiesError ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Failed to load properties. Please try again later.</p>
            </Card>
          ) : featuredProperties.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No featured properties available.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
                <Link key={property.id} href={`/property/${property.id}`}>
                  <Card className="overflow-hidden hover-elevate cursor-pointer" data-testid={`card-property-${property.id}`}>
                    <div className="relative bg-muted">
                      <div className="relative w-full aspect-video">
                        {property.images[0] && (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"><rect width="100%" height="100%" fill="%23eef2f4"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial,Helvetica,sans-serif" font-size="28">Image not available</text></svg>'; }}
                          />
                        )}
                      </div>
                      <div className="absolute top-4 left-4 flex gap-3 z-30">
                        {property.featured === 1 && (
                          <Badge className="bg-amber-500 text-white rounded-full shadow-lg px-4 py-2 text-base font-bold transition-transform hover:scale-105 hover:shadow-xl cursor-pointer">
                            Featured
                          </Badge>
                        )}
                        <Badge className="bg-success text-success-foreground rounded-full shadow-lg px-4 py-2 text-base font-bold transition-transform hover:scale-105 hover:shadow-xl cursor-pointer">
                          Available
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="pt-6">
                      <Badge className="mb-3 rounded-full shadow px-4 py-2 text-base font-bold">{property.propertyType}</Badge>
                      <h3 className="font-serif font-semibold text-xl mb-2">{property.title}</h3>
                      <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
                        <MapPin className="h-4 w-4" />
                        {property.area}, {property.city}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-2xl text-primary">
                          ₹{Number(property.price).toLocaleString('en-IN')}
                        </span>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          {property.bedrooms && <span>{property.bedrooms} BHK</span>}
                          <span>{property.sqft} sqft</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif font-bold text-3xl text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber text-amber" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif font-bold text-3xl mb-2">Latest from Our Blog</h2>
              <p className="text-muted-foreground">Stay updated with real estate insights</p>
            </div>
            <Link href="/blogs">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-blogs">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoadingBlogs ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-muted animate-pulse" />
                  <CardContent className="pt-6">
                    <div className="h-6 bg-muted rounded mb-3 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse" />
                    <div className="h-16 bg-muted rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : blogsError ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Failed to load blog posts. Please try again later.</p>
            </Card>
          ) : recentBlogs.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No blog posts available.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden hover-elevate" data-testid={`card-blog-${blog.id}`}>
                <div className="h-48 bg-muted">
                  {blog.featuredImage && (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">{blog.category}</Badge>
                  <h3 className="font-serif font-semibold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{blog.author}</span>
                    <span>{blog.date}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${blog.id}`} className="w-full">
                    <Button variant="ghost" className="w-full gap-2" data-testid={`button-read-more-${blog.id}`}>
                      Read More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif font-bold text-3xl mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have a question or need assistance? Our team is here to help you find your dream property.
              </p>
              
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-4">
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} data-testid="input-contact-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Your Email" {...field} data-testid="input-contact-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Phone Number" {...field} data-testid="input-contact-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Your Message" 
                            rows={4} 
                            {...field} 
                            data-testid="textarea-contact-message" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full gap-2" 
                    disabled={contactMutation.isPending}
                    data-testid="button-send-message"
                  >
                    <Send className="h-4 w-4" />
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="h-[400px] rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62013.55647309486!2d79.38524817910156!3d13.628641200000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b0f88220c91%3A0x82f67a3e7d3f8dbf!2sTirupati%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dream Dwellings Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
