interface MarqueeProps {
  items: string[];
  speed?: number;
}

export function Marquee({ items, speed = 30 }: MarqueeProps) {
  const duplicated = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-6">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <div
        className="flex gap-12 items-center animate-marquee whitespace-nowrap"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicated.map((item, idx) => (
          <span
            key={idx}
            className="text-sm font-mono uppercase tracking-widest text-neutral-600 flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 bg-neutral-700 rounded-full" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
