const posts = [
  {
    title: "Let's Get Solution For Building Construction Work",
    tag: "Kitchan Design",
    date: "26 December, 2022",
  },
  {
    title: "Low Cost Latest Invented Interior Designing Ideas",
    tag: "Living Design",
    date: "22 December, 2022",
  },
  {
    title: "Best For Any Office & Business Interior Solution",
    tag: "Interior Design",
    date: "25 December, 2022",
  },
];

export default function BlogPreview() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="font-heading text-[36px] text-dark sm:text-[50px]">
          Articles &amp; News
        </h2>
        <p className="max-w-[810px] font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
          It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-3">
        {posts.map((post, i) => (
          <article
            key={post.title}
            className={`flex flex-col gap-5 rounded-[62px] border border-border p-5 ${
              i === 1 ? "bg-cream" : "bg-white"
            }`}
          >
            <div className="relative h-[290px] w-full rounded-[45px] bg-placeholder-light">
              <span className="absolute left-5 top-[228px] rounded-tr-lg rounded-bl-lg rounded-tl-lg bg-white px-3 py-2 font-body text-[16px] text-body">
                {post.tag}
              </span>
            </div>
            <div className="flex flex-col gap-5 px-3 pb-3">
              <h3 className="font-heading text-[25px] leading-snug text-dark">
                {post.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-body text-[16px] text-body">
                  {post.date}
                </span>
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-cream">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="#292F36"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
