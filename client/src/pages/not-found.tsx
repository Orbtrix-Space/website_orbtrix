import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white p-4">
      <Card className="w-full max-w-md bg-neutral-900/50 border-white/10">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 text-white">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-neutral-400">
            The trajectory you are following has led to a void. 
            The page you requested does not exist in this sector.
          </p>

          <div className="mt-8">
            <Link href="/" className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-black bg-white hover:bg-neutral-200 transition-colors">
              Return to Base
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
