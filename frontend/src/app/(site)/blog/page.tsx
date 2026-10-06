import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Pagination from "@/components/project/Pagination";

export const metadata: Metadata = {
  title: "Articles & News | Design By Chris",
};

const featured = {
  title: "Low Cost Latest Invented Interior Designing Ideas",
  excerpt:
    "Lorem ipsum dolor sit amet, adipiscing Aliquam eu sem vitae turpis dignissim maximus.posuere in.Contrary to popular belief. Lorem Ipsum is not simply random text.",
  date: "26 December, 2022",
};

const posts = [
  {
    title: "Let's Get Solution For Building Construction Work",
    tag: "Kitchan Design",
    date: "26 December, 2022",
  },
  {
    title: "Low Cost Latest Invented Interior Designing Ideas.",
    tag: "Living Design",
    date: "22 December, 2022",
  },
  {
    title: "Best For Any Office & Business Interior Solution",
    tag: "Interior Design",
    date: "25 December, 2022",
  },
  {
    title: "Let's Get Solution For Building Construction Work",
    tag: "Kitchan Design",
    date: "26 December, 2022",
  },
  {
    title: "Low Cost Latest Invented Interior Designing Ideas.",
    tag: "Living Design",
    date: "22 December, 2022",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageBanner title="Articles & News" breadcrumb="Home / Blog" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <h2 className="font-heading text-[36px] text-ivory sm:text-[50px]">
          Latest Post
        </h2>
        <Link
          href="/blog/1"
          className="mt-7 flex flex-col gap-8 rounded-[62px] border border-border p-6 sm:flex-row sm:items-center"
        >
          <div className="h-[280px] w-full rounded-[50px] bg-placeholder sm:h-[478px] sm:w-[569px]" />
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col gap-5">
              <h3 className="font-heading text-[25px] text-ivory">
                {featured.title}
              </h3>
              <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
                {featured.excerpt}
              </p>
            </div>
            <span className="font-body text-[16px] text-body">
              {featured.date}
            </span>
          </div>
        </Link>

        <h2 className="mt-24 font-heading text-[36px] text-ivory sm:text-[50px]">
          Articles &amp; News
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={`/blog/${i + 1}`}
              className={`flex flex-col gap-5 rounded-[62px] border border-border p-5 ${
                i % 3 === 1 ? "bg-cream" : "bg-surface"
              }`}
            >
              <div className="relative h-[290px] w-full rounded-[45px] bg-placeholder-light">
                <span className="absolute left-5 top-[228px] rounded-tr-lg rounded-bl-lg rounded-tl-lg bg-surface px-3 py-2 font-body text-[16px] text-body">
                  {post.tag}
                </span>
              </div>
              <div className="flex flex-col gap-5 px-3 pb-3">
                <h3 className="font-heading text-[25px] leading-snug text-ivory">
                  {post.title}
                </h3>
                <span className="font-body text-[16px] text-body">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Pagination />
      </section>
    </>
  );
}
