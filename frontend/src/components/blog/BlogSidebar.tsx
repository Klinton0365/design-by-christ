import Link from "next/link";
import { getBlogPosts } from "@/lib/api";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function BlogSidebar({ currentSlug }: { currentSlug?: string }) {
  const { posts } = await getBlogPosts();
  const latestNews = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <aside className="flex w-full max-w-[345px] flex-col gap-12">
      <div className="rounded-[20px] bg-cream px-8 py-8">
        <input
          type="search"
          placeholder="Search"
          className="w-full border-0 bg-transparent font-body text-[22px] text-gold placeholder:text-gold focus:outline-none"
        />
      </div>

      {latestNews.length > 0 && (
        <div className="flex flex-col gap-8">
          <h3 className="font-heading text-[25px] text-ivory">Latest News</h3>
          <div className="flex flex-col gap-6">
            {latestNews.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-4 border-b border-gold pb-6 last:border-0"
              >
                <p className="max-w-[200px] font-heading text-[20px] leading-snug text-ivory">
                  {post.title}
                </p>
                <span className="font-body text-[16px] text-body">
                  {formatDate(post.published_at ?? post.created_at)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div className="flex flex-col gap-4 rounded-[20px] bg-cream px-8 py-7">
          <h3 className="font-heading text-[25px] text-ivory">Categories</h3>
          <ul className="flex flex-col font-body text-[22px] leading-[3] text-body">
            {tags.map((tag) => (
              <li key={tag} className="border-b border-gold/40 last:border-0">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags.length > 0 && (
        <div className="flex flex-col gap-6">
          <h3 className="font-heading text-[25px] text-ivory">Tags</h3>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, i) => (
              <span
                key={tag}
                className={`rounded-[10px] px-6 py-2.5 font-body text-[18px] ${
                  i === 0 ? "bg-dark text-white" : "bg-cream text-ivory"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
