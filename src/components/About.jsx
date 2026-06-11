/**
 * About.jsx — Sobre Nosotros
 * Full-width layout with premium Bento highlights.
 */
import { motion, useReducedMotion } from "motion/react";
import { Leaf, Star, Clock } from "@phosphor-icons/react";
import logo3 from "../assets/images/3.PNG";

const highlights = [
  {
    icon: Leaf,
    label: "100% Natural",
    desc: "Elaborado exclusivamente con frutas de verdad y materia prima seleccionada. Sin conservantes, saborizantes artificiales ni atajos industriales."
  },
  {
    icon: Star,
    label: "Recetas Propias",
    desc: "Creamos cada fórmula desde cero en nuestro taller. Logramos una textura cremosa incomparable y un equilibrio perfecto de sabor."
  },
  {
    icon: Clock,
    label: "Hecho Hoy",
    desc: "Producido diariamente en lotes pequeños. Garantizamos frescura absoluta y la consistencia ideal en cada tarrina o barquilla."
  }
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
              Desde nuestro primer día, apostamos por ingredientes reales, frutas frescas de temporada y dedicación artesanal en cada paso. Sin atajos.
            </p>
            <br />
          </motion.div>
        </div>

        {/* Cute highlights grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 90, damping: 15, delay: i * 0.08 }}
              whileHover={reduce ? {} : { scale: 1.03, y: -4 }}
              className="flex flex-col gap-5 p-8 rounded-[24px] text-center items-center transition-shadow duration-300 hover:shadow-lg"
              style={{
                backgroundColor: "#ffffff",
                border: "2px solid rgba(43, 31, 45, 0.05)",
                boxShadow: "0 8px 20px rgba(43, 31, 45, 0.03)"
              }}
            >
              {/* Bubbly icon badge */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(43, 31, 45, 0.05)", color: "var(--main-color)" }}
              >
                <Icon size={26} weight="fill" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-black leading-none" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                  {label}
                </h3>
                <p className="text-xs font-semibold leading-relaxed" style={{ color: "rgba(43, 31, 45, 0.55)" }}>
                  {desc}
                </p>
                <br />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

