/** Inner-page opening: headline, lede, optional action. Render inside <main>. */
export function PageIntro({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="gutter mx-auto max-w-[90rem] pb-14 pt-14 lg:pb-20 lg:pt-24">
        <h1 className="display max-w-[16ch] text-[length:var(--text-display-l)]">{title}</h1>
        {lede && <p className="measure mt-8 text-lg text-muted lg:text-xl">{lede}</p>}
        {children && <div className="mt-10 flex flex-wrap items-center gap-6">{children}</div>}
    </div>
  );
}
