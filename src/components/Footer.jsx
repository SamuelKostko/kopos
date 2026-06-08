/**
 * Footer.jsx — Pie de Pagina
 * Strong CTA band above the footer columns. Tighter layout, less padding.
 */
import { motion, useReducedMotion } from "motion/react";
import { InstagramLogo, TiktokLogo, FacebookLogo, WhatsappLogo, MapPin, Clock, ArrowRight } from "@phosphor-icons/react";
import { shopConfig } from "../config/shopConfig";

export function Footer() {
  const reduce = useReducedMotion();
  const { shopName, schedule, location, deliveryNote, social, whatsappNumber } = shopConfig;

  return (
    <footer id="horarios" style={{ backgroundColor: "var(--bg-color)" }}>

      {/* CTA Band — full width contrast strip */}
      <div
        className="overflow-hidden"
        style={{ borderTop: "1px solid rgba(43, 31, 45, 0.08)" }}
      >
        <div className="custom-container py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.9] tracking-[-0.04em] mb-4"
                style={{ color: "var(--main-color)", fontFamily: "Outfit", fontWeight: 900 }}
              >
                Listo para<br />
                <em
                  className="not-italic"
                  style={{ fontStyle: "italic", opacity: 0.42 }}
                >
                  pedir?
                </em>
              </h2>
              <p className="text-sm font-medium max-w-[36ch]" style={{ color: "rgba(43, 31, 45, 0.6)" }}>
                Envianos tu pedido por WhatsApp y te lo preparamos con amor.
              </p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-3 md:justify-end"
            >
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !bg-[#25D366] !text-white inline-flex items-center gap-2"
                style={{ boxShadow: "0 6px 18px rgba(37, 211, 102, 0.25)" }}
              >
                <WhatsappLogo size={18} weight="fill" />
                Pedir por WhatsApp
              </a>
              <button
                onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary"
              >
                Ver el menu
                <ArrowRight size={14} weight="bold" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer columns */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(43, 31, 45, 0.08)" }}
      >
        <div className="custom-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

            {/* Brand */}
            <div className="flex flex-col gap-5">
              <p className="text-base font-black tracking-tight" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>{shopName}</p>
              <p className="text-sm font-medium leading-relaxed max-w-[28ch]" style={{ color: "rgba(43, 31, 45, 0.6)" }}>
                {shopConfig.description}
              </p>
              <div className="flex items-center gap-2">
                {[
                  { icon: InstagramLogo, url: social.instagram },
                  { icon: TiktokLogo, url: social.tiktok },
                  { icon: FacebookLogo, url: social.facebook },
                ].map(({ icon: Icon, url }, i) => url && (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    style={{ backgroundColor: "var(--main-color)", color: "var(--bg-color)" }}
                  >
                    <Icon size={16} weight="fill" />
                  </a>
                ))}
              </div>
            </div>

            {/* Horarios */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Clock size={14} weight="bold" style={{ color: "var(--main-color)" }} />
                <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--main-color)" }}>
                  Horarios
                </span>
              </div>
              <ul className="space-y-3">
                {schedule.map((s) => (
                  <li key={s.days}>
                    <p className="text-sm font-bold" style={{ color: "var(--main-color)" }}>{s.days}</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: "rgba(43, 31, 45, 0.6)" }}>{s.hours}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ubicacion */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <MapPin size={14} weight="bold" style={{ color: "var(--main-color)" }} />
                <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--main-color)" }}>
                  Visitanos
                </span>
              </div>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--main-color)" }}>{location}</p>
                <p className="text-xs font-medium leading-relaxed" style={{ color: "rgba(43, 31, 45, 0.6)" }}>
                  {deliveryNote}
                </p>
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t"
            style={{ borderColor: "rgba(43, 31, 45, 0.08)" }}
          >
            <p className="text-xs font-semibold" style={{ color: "rgba(43, 31, 45, 0.4)" }}>
              {new Date().getFullYear()} {shopName}. Todos los derechos reservados.
            </p>
            <p className="text-xs font-semibold" style={{ color: "rgba(43, 31, 45, 0.3)" }}>
              Helado de verdad.
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
