const latestNews = [
  { title: "We Focus On Comfort And Gorgeous", date: "06/02/2020" },
  { title: "We Focus On Comfort And Gorgeous", date: "06/02/2020" },
  { title: "We Focus On Comfort And Gorgeous", date: "06/02/2020" },
];

const categories = ["Decoration", "Door", "Windows", "Home", "Land", "Roof", "Installation"];

const tags = ["Kitchen", "Bedroom", "Building", "Architecture", "Kitchen Planning", "Bedroom"];

export default function BlogSidebar() {
  return (
    <aside className="flex w-full max-w-[345px] flex-col gap-12">
      <div className="rounded-[20px] bg-cream px-8 py-8">
        <input
          type="search"
          placeholder="Search"
          className="w-full border-0 bg-transparent font-body text-[22px] text-gold placeholder:text-gold focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="font-heading text-[25px] text-dark">Latest News</h3>
        <div className="flex flex-col gap-6">
          {latestNews.map((n, i) => (
            <div key={i} className="flex flex-col gap-4 border-b border-gold pb-6 last:border-0">
              <p className="max-w-[200px] font-heading text-[20px] leading-snug text-dark">
                {n.title}
              </p>
              <span className="font-body text-[16px] text-body">{n.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[20px] bg-cream px-8 py-7">
        <h3 className="font-heading text-[25px] text-dark">Categories</h3>
        <ul className="flex flex-col font-body text-[22px] leading-[3] text-body">
          {categories.map((c) => (
            <li key={c} className="border-b border-gold/40 last:border-0">
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-heading text-[25px] text-dark">Tags</h3>
        <div className="flex flex-wrap gap-3">
          {tags.map((t, i) => (
            <span
              key={i}
              className={`rounded-[10px] px-6 py-2.5 font-body text-[18px] ${
                i === 0 ? "bg-dark text-white" : "bg-cream text-dark"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
