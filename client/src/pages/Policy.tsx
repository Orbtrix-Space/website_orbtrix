import { Link } from "wouter";
import { usePageMeta } from "@/lib/usePageMeta";
import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/data/site";

/**
 * Placeholder for the legal / privacy pages so the footer links aren't dead.
 * One component, two routes — the `kind` prop picks the copy. Replace with the
 * real policy text when it's ready.
 */
export default function Policy({ kind }: { kind: "legal" | "privacy" }) {
  const title = kind === "legal" ? "Legal notices" : "Privacy policy";
  usePageMeta(title);

  return (
    <section className="container-page page-head pb-24">
      <div className="max-w-2xl">
        <Reveal>
          <h1 className="text-balance text-[clamp(1.75rem,4.35vw,2.85rem)] leading-[1.08]">{title}</h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-8 leading-relaxed">
            This page is being finalised. For any {kind === "legal" ? "legal" : "privacy"} enquiry in
            the meantime, reach us at{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="underline underline-offset-4"
              style={{ color: "var(--accent)" }}
            >
              {CONTACT.email}
            </a>
            .
          </p>
        </Reveal>
        <Reveal delay={140}>
          <Link href="/" className="cta cta-secondary mt-10">
            Back home
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
