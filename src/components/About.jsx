/**
 * About.jsx — Sobre Nosotros
 * Full-width horizontal strip layout instead of 3 equal cards.
 * Split: image left half, headline + horizontal stat strip right half.
 */
import { motion, useReducedMotion } from "motion/react";
import { Leaf, Star, Clock } from "@phosphor-icons/react";
import logo3 from "../assets/images/3.PNG";

const highlights = [
  { icon: Leaf,  label: "100% natural",   desc: "Sin aditivos artificiales." },
  { icon: Star,  label: "Recetas propias", desc: "Sabores nuestros, de cero." },
  { icon: Clock, label: "Hecho hoy",       desc: "Producción diaria, pequeña." },
];

export function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="nosotros"
      className="overflow-hidden"
      style={{ backgroundColor: "var(--bg-color)", paddingTop: "var(--section-py)", paddingBottom: "var(--section-py)" }}
    >
      <div className="custom-container">

        {/* Main split row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">

          {/* Image column */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.img
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              src={logo3}
              alt="Mascota Kopos"
              className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* Copy column */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            <h2
              className="text-[clamp(2.8rem,6vw,5rem)] leading-[0.9] tracking-[-0.04em]"
              style={{ color: "var(--main-color)", fontFamily: "Outfit", fontWeight: 900 }}
            >
              El secreto<br />
              <em
                className="not-italic pb-1 block"
                style={{ fontStyle: "italic", opacity: 0.42, lineHeight: "1.1" }}
              >
                está en el proceso.
              </em>
            </h2>
            <p
              className="text-base leading-relaxed font-medium max-w-[48ch]"
              style={{ color: "rgba(43, 31, 45, 0.65)" }}
            >
              Desde nuestro primer dia, apostamos por ingredientes reales, frutas frescas de temporada y mucho amor. Sin atajos industriales.
            </p>
          </motion.div>
        </div>

        {/* Horizontal stat strip — 3 items separated by dividers, full-width */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(43, 31, 45, 0.08)",
            backgroundColor: "rgba(255,255,255,0.45)",
          }}
        >
          {highlights.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
              className="flex items-center gap-5 p-7 md:p-8"
              style={{
                borderRight: i < 2 ? "1px solid rgba(43, 31, 45, 0.07)" : undefined,
                borderTop: undefined,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--main-color)", color: "var(--bg-color)" }}
              >
                <Icon size={20} weight="fill" />
              </div>
              <div>
                <p className="text-base font-black leading-tight mb-1" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                  {label}
                </p>
                <p className="text-xs font-medium leading-snug" style={{ color: "rgba(43, 31, 45, 0.55)" }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
