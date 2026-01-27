interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  const isLeft = align === "left";

  return (
    <div className={`w-full mb-20 ${isLeft ? "text-left" : "text-center"}`}>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-lg text-neutral-400 leading-relaxed max-w-3xl ${
            isLeft ? "" : "mx-auto"
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative underline */}
      <div
        className={`mt-8 h-[2px] bg-white ${
          isLeft ? "w-24" : "w-24 mx-auto"
        }`}
      />
    </div>
  );
}
