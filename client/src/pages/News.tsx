import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { NEWS_POSTS, formatDate } from "@/lib/news";

export default function News() {
  usePageMeta("News", "Updates from Orbtrix Space.");

  return (
    <>
      <section className="relative overflow-hidden">

        <div className="container-page relative z-10 pb-16 pt-40 md:pt-48">
          <Reveal>
            <h1 className="text-[clamp(1.95rem,4.8vw,3.5rem)] leading-[1.08]">News</h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">
              What we are building, and what we are learning.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-32">
        {NEWS_POSTS.length === 0 ? (
          <Reveal>
            <p className="text-lg">Nothing published yet. Check back soon.</p>
          </Reveal>
        ) : (
          <ul className="mx-auto max-w-3xl">
            {NEWS_POSTS.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 60}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="group block border-t py-10 transition-colors duration-300"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <time dateTime={post.date} className="text-sm text-ink-muted">
                      {formatDate(post.date)}
                    </time>

                    <h2 className="mt-3 text-balance text-2xl transition-colors duration-300 md:text-3xl">
                      {post.title}
                    </h2>

                    {post.summary && (
                      <p className="mt-4 max-w-2xl text-pretty leading-relaxed">{post.summary}</p>
                    )}

                    <span
                      className="mt-6 inline-flex items-center gap-2 text-[13px]"
                      style={{ color: "var(--accent)" }}
                    >
                      Read more
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
