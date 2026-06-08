/**
 * Hero.jsx — Hero Section
 * Asymmetric 12-col split. Left: copy. Right: mascot character.
 * DESIGN_VARIANCE:8 — offset left weight, generous right negative space.
 * MOTION_INTENSITY:6 — spring fade-up reveals + magnetic CTA physics.
 * Hero stack: exactly 4 text elements (headline, subtext, CTAs, schedule).
 * Descender clearance: italic "autentico" has pb-1 and lineHeight:1.1.
 */
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import { logoHero } from "../config/shopConfig";
import { shopConfig } from "../config/shopConfig";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const reduce = useReducedMotion();

  const scrollToCatalog = () =>
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { type: "spring", stiffness: 90, damping: 22, delay },
        };

  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-color)", paddingTop: "72px" }}
    >
      <div className="custom-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[calc(100dvh-72px)]">

          {/* LEFT — copy: 6 cols with extra left breathing room */}
          <div className="lg:col-span-6 flex flex-col justify-center py-14 lg:py-0 order-2 lg:order-1">

            {/* 1. Headline — max 2 lines */}
            <motion.h1
              {...fadeUp(0.05)}
              className="text-[clamp(3.2rem,7.5vw,6rem)] leading-[0.88] tracking-[-0.04em] mb-5"
              style={{ color: "var(--main-color)", fontFamily: "Outfit", fontWeight: 900 }}
            >
              Sabor<br />
              {/* Italic descender clearance: pb-1 + lineHeight 1.1 for letters with descenders */}
              <span
                className="block pb-1"
                style={{ fontStyle: "italic", opacity: 0.40, lineHeight: "1.1" }}
              >
                autentico
              </span>
              artesanal.
            </motion.h1>

            {/* 2. Subtext — max 20 words */}
            <motion.p
              {...fadeUp(0.14)}
              className="text-base sm:text-lg leading-relaxed font-medium max-w-[36ch] mb-8"
              style={{ color: "rgba(43, 31, 45, 0.62)" }}
            >
              Ingredientes reales, frescura diaria y el toque Kopos en cada cucharada.
            </motion.p>

            {/* 3. CTAs — primary uses MagneticButton physics */}
            <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-3 items-center">
              <MagneticButton
                id="hero-cta"
                onClick={scrollToCatalog}
                className="btn-primary"
              >
                Ver el menu
                <ArrowDown size={15} weight="bold" />
              </MagneticButton>

              <MagneticButton
                href={`https://wa.me/${shopConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp"
                className="btn-secondary"
              >
                Pedir por WhatsApp
              </MagneticButton>
            </motion.div>

            {/* 4. Schedule — small pills, visually separated */}
            <motion.div
              {...fadeUp(0.32)}
              className="flex flex-wrap gap-2 mt-8 pt-6"
              style={{ borderTop: "1px solid rgba(43, 31, 45, 0.09)" }}
            >
              {shopConfig.schedule.map((s) => (
                <div
                  key={s.days}
                  className="text-[11px] px-3.5 py-1.5 rounded-full font-bold"
                  style={{
                    backgroundColor: "rgba(43, 31, 45, 0.05)",
                    border: "1px solid rgba(43, 31, 45, 0.07)",
                    color: "rgba(43, 31, 45, 0.65)",
                  }}
                >
                  {s.days} - {s.hours}
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — mascot: 6 cols, flush right */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center order-1 lg:order-2 pt-16 lg:pt-0">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.9, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 55, damping: 18, delay: 0.08 }}
              className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[500px]"
            >
              <img
                src={logoHero}
                alt="Kopos Ice Cream"
                className="w-full h-auto object-contain"
                loading="eager"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
