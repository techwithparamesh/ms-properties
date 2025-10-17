import { Link } from "wouter";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background">
      <Card className="p-12 text-center max-w-md mx-4">
        <div className="mb-6">
          <h1 className="font-serif font-bold text-6xl text-primary mb-2">404</h1>
          <h2 className="font-serif font-semibold text-2xl mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link href="/">
          <Button className="gap-2" data-testid="button-home">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}
