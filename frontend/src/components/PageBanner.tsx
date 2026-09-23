export default function PageBanner({
  title,
  breadcrumb,
}: {
  title: string;
  breadcrumb: string;
}) {
  return (
    <section>
      <div className="h-[280px] bg-gradient-to-br from-gold-light via-gold to-gold-deep sm:h-[356px]" />
      <div className="glow-gold mx-auto -mt-16 w-[90%] max-w-[504px] rounded-t-[37px] bg-surface px-8 py-10 text-center sm:-mt-20">
        <h1 className="font-heading text-[36px] text-ivory sm:text-[50px]">
          {title}
        </h1>
        <p className="mt-2 font-body text-[18px] text-body sm:text-[22px]">
          {breadcrumb}
        </p>
      </div>
    </section>
  );
}
