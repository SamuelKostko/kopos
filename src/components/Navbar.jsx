/**
 * Navbar.jsx — Navegacion
 * Frosted-glass on scroll using useMotionTemplate (reactive, no re-renders).
 * MOTION_INTENSITY:6 — useScroll + useTransform + useMotionTemplate only.
 * No window.addEventListener('scroll') — banned per skill §5.D / §7.
 */
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { List, X, ShoppingCart } from "@phosphor-icons/react";
import { shopConfig, logoNavbar } from "../config/shopConfig";

export function Navbar({ totalItems, onCartClick }) {

  // All reactive values driven by scroll — no useState, no re-renders
  const { scrollY } = useScroll();
  const bgOpacity   = useTransform(scrollY, [0, 56], [0, 0.94]);
  const blurAmount  = useTransform(scrollY, [0, 56], [0, 14]);
  const borderAlpha = useTransform(scrollY, [0, 56], [0, 0.08]);
  const navPy       = useTransform(scrollY, [0, 56], [18, 10]);

  // useMotionTemplate produces a reactive MotionValue<string> — correct pattern
  const bgColor       = useMotionTemplate`rgba(243, 229, 216, ${bgOpacity})`;
  const backdropStyle = useMotionTemplate`blur(${blurAmount}px)`;
  const borderColor   = useMotionTemplate`rgba(43, 31, 45, ${borderAlpha})`;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Menu",      id: "catalogo" },
    { label: "Nosotros",  id: "nosotros" },
    { label: "Contacto",  id: "horarios" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[60]"
        style={{ paddingTop: navPy, paddingBottom: navPy }}
      >
        {/* Frosted glass layer — all values are reactive MotionValues */}
        <motion.div
          className="absolute inset-0 pointer-events-none border-b"
          style={{
            backgroundColor: bgColor,
            backdropFilter: backdropStyle,
            WebkitBackdropFilter: backdropStyle,
            borderColor: borderColor,
          }}
        />

        <div className="custom-container relative flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="focus-visible:outline-none group flex-shrink-0"
            aria-label="Inicio"
          >
            <img
              src={logoNavbar}
              alt={shopConfig.logoAlt}
              className="h-10 md:h-11 w-auto transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </button>

          {/* Desktop nav — true center via absolute positioning */}
          <nav
            aria-label="Navegacion principal"
            className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2"
          >
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative text-[11px] font-bold tracking-[0.14em] uppercase overflow-hidden group"
                style={{ color: "var(--main-color)" }}
              >
                {label}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[1.5px]"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ backgroundColor: "var(--main-color)" }}
                />
              </button>
            ))}
          </nav>

          {/* Right: cart + hamburger */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onCartClick}
              id="cart-btn-nav"
              aria-label={`Pedido — ${totalItems} sabores`}
              className="relative p-3 md:p-3.5 rounded-full focus-visible:outline-none shadow-sm"
              style={{ backgroundColor: "var(--main-color)", color: "var(--bg-color)" }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ShoppingCart size={22} weight="fill" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="absolute -top-1.5 -right-1.5 text-white text-[10px] md:text-[11px] font-black min-w-[20px] md:min-w-[22px] h-[20px] md:h-[22px] rounded-full flex items-center justify-center border-[2px] border-[#F3E5D8]"
                    style={{ backgroundColor: "var(--whatsapp)" }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu removed per request */}
          </div>
        </div>
      </motion.header>

      {/* Mobile menu removed per request */}
    </>
  );
}
