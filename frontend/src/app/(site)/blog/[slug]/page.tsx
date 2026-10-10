import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import QuoteBlock from "@/components/QuoteBlock";
import ContactForm from "@/components/ContactForm";
import BlogSidebar from "@/components/blog/BlogSidebar";
import AnimatedText from "@/components/AnimatedText";
import { ApiError, getBlogPost } from "@/lib/api";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" });
}

async function fetchPost(slug: string) {
  try {
    return await getBlogPost(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  return { title: `${post.title} | Design By Chris` };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  const paragraphs = post.body.split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <PageBanner title={post.title} breadcrumb={`Home / Blog / ${post.title}`} />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:gap-14">
          <article className="flex flex-1 flex-col gap-12">
            <div className="flex flex-col gap-6">
              <AnimatedText as="h2" className="font-heading text-[36px] text-ivory sm:text-[50px]">
                {post.title}
              </AnimatedText>
              <div className="flex flex-wrap items-center gap-3 font-body text-[16px] text-body">
                <span>{post.author_name}</span>
                <span>·</span>
                <span>{formatDate(post.published_at ?? post.created_at)}</span>
              </div>
              {paragraphs.map((paragraph, i) => (
                <AnimatedText
                  key={i}
                  as="p"
                  delay={i * 0.05}
                  className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]"
                >
                  {paragraph}
                </AnimatedText>
              ))}
            </div>

            {post.cover_image_url && (
              <div className="relative h-[280px] w-full overflow-hidden rounded-[50px] bg-placeholder sm:h-[365px]">
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 780px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 border-t border-divider pt-8">
                <span className="font-heading text-[20px] text-ivory">Tags</span>
                {post.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`rounded-[10px] px-6 py-3 font-body text-[18px] ${
                      i === 0 ? "bg-dark text-white" : "bg-cream text-ivory"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {post.pull_quote && (
              <QuoteBlock quote={post.pull_quote} attribution={post.pull_quote_attribution ?? ""} />
            )}

            <div className="flex flex-col gap-10">
              <AnimatedText as="h3" className="font-heading text-[25px] text-ivory">
                Leave a Reply
              </AnimatedText>
              <ContactForm variant="full" />
            </div>
          </article>

          <BlogSidebar currentSlug={post.slug} />
        </div>
      </section>
    </>
  );
}
