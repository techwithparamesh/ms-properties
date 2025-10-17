import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Blog } from "@shared/schema";

export default function Blogs() {
  const { data: blogs, isLoading, error } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-serif font-bold text-4xl lg:text-5xl mb-4">Our Blog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expert insights, market trends, and valuable tips for property buyers and sellers
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-56 bg-muted animate-pulse" />
                <CardContent className="pt-6">
                  <div className="h-4 bg-muted rounded mb-3 animate-pulse" />
                  <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
                  <div className="h-16 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">Failed to load blog posts. Please try again later.</p>
          </Card>
        ) : !blogs || blogs.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">No blog posts available yet</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden hover-elevate" data-testid={`card-blog-${blog.id}`}>
                <div className="h-56 bg-muted">
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
                  <h3 className="font-serif font-semibold text-xl mb-3 line-clamp-2" data-testid={`text-blog-title-${blog.id}`}>
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {blog.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {blog.date}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${blog.id}`} className="w-full">
                    <Button variant="ghost" className="w-full gap-2" data-testid={`button-read-blog-${blog.id}`}>
                      Read More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
