/** A traditional Chinese seal (印章) — the site's signature visual cue. */
interface SealMarkProps {
  char: string;
  size?: "sm" | "md" | "lg";
  title?: string;
}

const sizes = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-lg",
  lg: "h-16 w-16 text-3xl",
};

export default function SealMark({ char, size = "md", title }: SealMarkProps) {
  return (
    <span
      title={title}
      aria-hidden={title ? undefined : "true"}
      className={`inline-flex shrink-0 select-none items-center justify-center border border-seal bg-seal font-cn text-[#faf6ee] ${sizes[size]}`}
    >
      {char}
    </span>
  );
}
