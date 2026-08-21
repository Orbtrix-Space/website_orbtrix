import { Link, useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { getPost, formatDate, renderMarkdown } from "@/lib/news";
import NotFound from "@/pages/not-found";

export default function NewsPost() {
  const [, params] = useRoute("/news/:slug");
  const post = params ? getPost(params.slug) : undefined;

  usePageMeta(post?.title ?? "News", post?.summary);

  if (!post) return <NotFound />;

  return (
    <article className="container-page pb-32 pt-40 md:pt-48">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-[13px] text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:-translate-x-1" />
            All news
          </Link>
        </Reveal>

        <Reveal delay={60}>
          <time dateTime={post.date} className="mt-12 block text-sm text-ink-muted">
            {formatDate(post.date)}
          </time>
          <h1 className="mt-4 text-balance text-[clamp(1.75rem,3.9vw,2.85rem)] leading-[1.1]">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          {/*
            Body is authored by us in client/src/content/news and escaped in
            renderMarkdown() before any formatting is applied, so no untrusted
            HTML can reach this sink.
          */}
          <div
            className="post-body mt-12"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
          />
        </Reveal>
      </div>
    </article>
  );
}
