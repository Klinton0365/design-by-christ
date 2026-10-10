import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import { getBlogPosts } from "@/lib/api";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function BlogPreview() {
  const { posts } = await getBlogPosts({ home: true });

  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <AnimatedText as="h2" className="font-heading text-[36px] text-ivory sm:text-[50px]">
          Articles &amp; News
        </AnimatedText>
        <AnimatedText
          as="p"
          className="max-w-[810px] font-body text-[18px] leading-relaxed text-body sm:text-[22px]"
        >
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </AnimatedText>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-3">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className={`flex flex-col gap-5 rounded-[62px] border border-border p-5 ${
              i === 1 ? "bg-cream" : "bg-surface"
            }`}
          >
            <div className="relative h-[290px] w-full overflow-hidden rounded-[45px] bg-placeholder-light">
              {post.cover_image_url && (
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              )}
              {post.tags[0] && (
                <span className="absolute left-5 top-[228px] rounded-tr-lg rounded-bl-lg rounded-tl-lg bg-surface px-3 py-2 font-body text-[16px] text-body">
                  {post.tags[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-5 px-3 pb-3">
              <AnimatedText
                as="h3"
                delay={i * 0.1}
                className="font-heading text-[25px] leading-snug text-ivory"
              >
                {post.title}
              </AnimatedText>
              <div className="flex items-center justify-between">
                <span className="font-body text-[16px] text-body">
                  {formatDate(post.published_at ?? post.created_at)}
                </span>
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-cream">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="#CA9A3E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
