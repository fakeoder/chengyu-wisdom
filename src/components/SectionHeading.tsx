interface SectionHeadingProps {
  kicker?: string;
  title: string;
}

export default function SectionHeading({ kicker, title }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      {kicker && (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-seal">{kicker}</p>
      )}
      <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 h-px w-12 bg-seal" aria-hidden="true" />
    </div>
  );
}
