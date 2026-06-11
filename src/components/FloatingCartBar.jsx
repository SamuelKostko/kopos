/**
 * FloatingCartBar.jsx — Barra Flotante del Pedido
 * Animación spring elegante. Colores exactos del logo.
 */
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ShoppingCart, WhatsappLogo } from "@phosphor-icons/react";
import { buildWhatsAppUrl } from "../utils/whatsapp";

export function FloatingCartBar({ items, totalItems, totalPrice, onOpenCart }) {
  const reduce = useReducedMotion();
  const whatsappUrl = buildWhatsAppUrl(items, totalPrice);

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="floating-bar"
        initial={reduce ? false : { y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed bottom-6 left-4 right-4 z-40 max-w-lg mx-auto"
      >
        <div 
          className="flex items-center gap-4 p-3 pr-3 pl-5 rounded-3xl shadow-2xl"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          {/* Resumen del pedido para abrir el Drawer */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-4 flex-1 min-w-0 text-left focus:outline-none group"
          >
            <div className="relative">
              <ShoppingCart size={28} weight="fill" style={{ color: "var(--bg-color)" }} className="transition-transform group-hover:scale-110" />
              <span 
                className="absolute -top-2.5 -right-2.5 min-w-[24px] h-[24px] flex items-center justify-center rounded-full text-xs font-black border-[2.5px]"
                style={{ 
                  backgroundColor: "var(--whatsapp)", 
                  color: "#fff",
                  borderColor: "var(--main-color)" 
                }}
              >
                {totalItems}
              </span>
            </div>
            
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(243, 229, 216, 0.7)" }}>
                Total a pagar
              </p>
              <p className="text-2xl font-black leading-none mt-0.5" style={{ color: "var(--bg-color)", fontFamily: "Outfit" }}>
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </button>

          {/* Botón para abrir el carrito */}
          <button
            onClick={onOpenCart}
            className="btn-primary !py-3.5 !px-6 !text-[var(--main-color)] !bg-[var(--bg-color)] hover:!bg-white !border-none !shadow-md hover:!shadow-lg !text-sm cursor-pointer"
            style={{ color: "var(--main-color)" }}
          >
            <ShoppingCart size={18} weight="bold" />
            <span className="hidden sm:inline">Finalizar compra</span>
            <span className="sm:hidden font-black">Pedir</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
