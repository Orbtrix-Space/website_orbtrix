import { Link } from "wouter";
import { usePageMeta } from "@/lib/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found");

  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden">

      <div className="container-page relative z-10 text-center">
        <p className="text-gradient text-[clamp(3.5rem,12vw,7.85rem)] font-semibold leading-none">404</p>
        <h1 className="mt-6 text-2xl md:text-3xl">This page is off course</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed">
          The page you requested does not exist in this sector.
        </p>
        <Link href="/" className="cta cta-primary mt-10">
          Return home
        </Link>
      </div>
    </section>
  );
}
