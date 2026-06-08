/**
 * BrandMarquee.jsx — Kinetic brand strip
 * Motivation: creates a visual pause between the hero and the About section,
 * reinforces brand identity through repetition and motion.
 * One marquee maximum per page — this is the only one (skill §5, MARQUEE MAX-ONE-PER-PAGE).
 * Honors prefers-reduced-motion (collapses to a static strip).
 */
import { useReducedMotion } from "motion/react";

const ITEMS = [
  "KOPOS",
  "Gelato Artesanal",
  "Natural",
  "Hecho Hoy",
  "Venezuela",
  "Sabor Real",
];

function Strip() {
  return (
    <div className="flex items-center gap-0 flex-shrink-0">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className="text-sm font-black uppercase tracking-[0.2em] px-6 whitespace-nowrap select-none"
            style={{ color: "var(--main-color)" }}
          >
            {item}
          </span>
          {/* Dot separator — one per item boundary, not stacked per §9.F */}
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: "rgba(43, 31, 45, 0.25)" }}
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );
}

export function BrandMarquee() {
  const reduce = useReducedMotion();

  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{
        backgroundColor: "rgba(43, 31, 45, 0.03)",
        borderColor: "rgba(43, 31, 45, 0.08)",
      }}
      aria-hidden="true"
    >
      {reduce ? (
        // Static fallback — no animation under prefers-reduced-motion
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
      ) : (
        <div className="flex">
          {/* Duplicate strips for seamless loop */}
          <div className="marquee-track flex">
            <Strip />
            <Strip />
            <Strip />
            <Strip />
          </div>
        </div>
      )}
    </div>
  );
}
