import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Pagination from "@/components/project/Pagination";
import AnimatedText from "@/components/AnimatedText";
import { getBlogPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Articles & News | Design By Chris",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;
  const { posts, totalPages } = await getBlogPosts({ page: currentPage });

  const [featured, ...rest] = posts;

  return (
    <>
      <PageBanner title="Articles & News" breadcrumb="Home / Blog" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        {featured && (
          <>
            <AnimatedText as="h2" className="font-heading text-[36px] text-ivory sm:text-[50px]">
              Latest Post
            </AnimatedText>
            <Link
              href={`/blog/${featured.slug}`}
              className="mt-7 flex flex-col gap-8 rounded-[62px] border border-border p-6 sm:flex-row sm:items-center"
            >
              <div className="relative h-[280px] w-full overflow-hidden rounded-[50px] bg-placeholder sm:h-[478px] sm:w-[569px]">
                {featured.cover_image_url && (
                  <Image
                    src={featured.cover_image_url}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 640px) 569px, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-8">
                <div className="flex flex-col gap-5">
                  <AnimatedText as="h3" className="font-heading text-[25px] text-ivory">
                    {featured.title}
                  </AnimatedText>
                  <AnimatedText as="p" className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                    {featured.excerpt}
                  </AnimatedText>
                </div>
                <span className="font-body text-[16px] text-body">
                  {formatDate(featured.published_at ?? featured.created_at)}
                </span>
              </div>
            </Link>
          </>
        )}

        <AnimatedText as="h2" className="mt-24 font-heading text-[36px] text-ivory sm:text-[50px]">
          Articles &amp; News
        </AnimatedText>

        {rest.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-3">
            {rest.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`flex flex-col gap-5 rounded-[62px] border border-border p-5 ${
                  i % 3 === 1 ? "bg-cream" : "bg-surface"
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
                  <span className="font-body text-[16px] text-body">
                    {formatDate(post.published_at ?? post.created_at)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-10 font-body text-[18px] text-body">No other posts yet.</p>
        )}

        <Pagination basePath="/blog" currentPage={currentPage} pages={totalPages} />
      </section>
    </>
  );
}
