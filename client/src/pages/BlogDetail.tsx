import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Blog } from "@shared/schema";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:id");

  const { data: blog, isLoading, error } = useQuery<Blog>({
    queryKey: ["/api/blogs", params?.id],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 bg-muted rounded-lg animate-pulse mb-8" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded animate-pulse" />
            <div className="h-32 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || (!isLoading && !blog)) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">
              {error ? "Failed to load blog post. Please try again later." : "Blog post not found"}
            </p>
            <Link href="/blogs">
              <Button className="mt-4" data-testid="button-back-to-blogs">
                Back to Blog
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blogs">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <article>
          {/* Featured Image */}
          <div className="h-96 rounded-lg overflow-hidden mb-8 bg-muted">
            {blog.featuredImage && (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
                data-testid="img-blog-featured"
              />
            )}
          </div>

          {/* Blog Header */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">{blog.category}</Badge>
            <h1 className="font-serif font-bold text-4xl lg:text-5xl mb-6" data-testid="text-blog-title">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {blog.date}
              </span>
            </div>
          </div>

          {/* Blog Content */}
          <Card className="p-8">
            <div className="prose prose-lg max-w-none" data-testid="text-blog-content">
              <p className="text-xl text-muted-foreground mb-6 font-medium">
                {blog.excerpt}
              </p>
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {blog.content}
              </div>
            </div>
          </Card>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link href="/blogs">
              <Button variant="outline" className="gap-2" data-testid="button-back-bottom">
                <ArrowLeft className="h-4 w-4" />
                Back to All Posts
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
