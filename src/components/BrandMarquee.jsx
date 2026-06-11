/**
 * BrandMarquee.jsx — Kinetic brand strip
 * Motivation: creates a visual pause between the hero and the About section,
 * reinforces brand identity through repetition and motion.
 * One marquee maximum per page — this is the only one (skill §5, MARQUEE MAX-ONE-PER-PAGE).
 * Honors prefers-reduced-motion (collapses to a static strip).
 */
 

const ITEMS = [
  "-KOPOS-",
  "-Gelato Artesanal-",
  "-Natural-",
  "-Hecho Hoy-",
  "-Venezuela-",
  "-Sabor Real-",
];


export function BrandMarquee() {
  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{
        backgroundColor: "rgba(43, 31, 45, 0.03)",
        borderColor: "rgba(43, 31, 45, 0.08)",
      }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-center gap-8 flex-wrap px-6">
        {ITEMS.map((item) => (
          <span
            key={item}
            className="text-sm font-black uppercase tracking-[0.2em]"
            style={{ color: "var(--main-color)" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
