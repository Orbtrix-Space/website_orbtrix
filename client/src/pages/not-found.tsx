import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { GlitchText } from "@/components/GlitchText";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100dvh-5rem)] w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <AlertCircle className="h-10 w-10 text-neutral-600 mx-auto mb-6" />
        <GlitchText text="404" as="h1" className="text-6xl font-bold mb-4" />
        <p className="text-sm text-neutral-400 font-mono mb-8">
          The trajectory you are following has led to a void.
          <br />
          The page you requested does not exist in this sector.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-7 py-3.5 border border-white/20 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 font-display uppercase"
        >
          Return to Base
        </Link>
      </div>
    </div>
  );
}
