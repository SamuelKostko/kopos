/**
 * PresentationModal.jsx — Popup de seleccion de presentacion
 * Se abre al presionar "Anadir" en cualquier ProductCard.
 * Muestra las 3 presentaciones con sus precios.
 * Cierre: click en overlay, boton X, o tecla Escape.
 */
import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, IceCream, Plus } from "@phosphor-icons/react";
import { PRESENTATIONS, presentationLabel } from "../utils/presentations";

const PRESENTATION_ICONS = {
  barquilla: "🍦",
  "tinita-s": "🫙",
  "tinita-l": "🫙",
};

const PRESENTATION_SIZE_TAG = {
  barquilla: null,
  "tinita-s": "Pequena",
  "tinita-l": "Grande",
};

export function PresentationModal({ product, isOpen, onClose, onAdd, cartItems }) {
  const reduce = useReducedMotion();
  const firstBtnRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Focus first button when modal opens
  useEffect(() => {
    if (isOpen) setTimeout(() => firstBtnRef.current?.focus(), 50);
  }, [isOpen]);

  if (!product) return null;

  const getQtyInCart = (key) => {
    const cartId = `${product.id}::${key}`;
    return cartItems.find((i) => i.cartId === cartId)?.qty ?? 0;
  };

  const handleAdd = (presentation) => {
    const price = product.prices[presentation.priceKey];
    onAdd(product, presentation.key, price, presentation.label);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="modal-overlay"
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`Presentaciones de ${product.name}`}
            className="fixed inset-0 z-[71] flex items-end sm:items-center justify-center p-0 sm:p-6"
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <div
              className="relative w-full sm:max-w-md rounded-t-[24px] sm:rounded-[24px] overflow-hidden shadow-2xl"
              style={{ backgroundColor: "var(--bg-color)", border: "1px solid rgba(43,31,45,0.08)" }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-5 p-8 sm:p-10 pb-6 border-b"
                style={{ borderColor: "rgba(43,31,45,0.08)" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-[1rem] object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base font-black leading-tight"
                    style={{ color: "var(--main-color)", fontFamily: "Outfit" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium mt-0.5" style={{ color: "rgba(43,31,45,0.55)" }}>
                    Elige tu presentacion
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-black/10 active:scale-95"
                  style={{ color: "var(--main-color)" }}
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {/* Presentation options */}
              <div className="p-8 sm:p-10 flex flex-col gap-5">
                {PRESENTATIONS.map((pres, i) => {
                  const price = product.prices[pres.priceKey];
                  const qty = getQtyInCart(pres.key);
                  const isFirst = i === 0;

                  return (
                    <button
                      key={pres.key}
                      ref={isFirst ? firstBtnRef : undefined}
                      onClick={() => handleAdd(pres)}
                      aria-label={`Añadir ${pres.label} de ${product.name}`}
                      className="relative flex items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl transition-all w-full text-left group focus-visible:outline-none"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(43,31,45,0.06)",
                        boxShadow: "0 2px 10px rgba(43,31,45,0.02)",
                      }}
                    >
                      {/* Fondo hover sutil */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                      {/* Icon + labels */}
                      <div className="relative z-10 flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl" aria-hidden="true">
                            {PRESENTATION_ICONS[pres.key]}
                          </span>
                          <span
                            className="text-base sm:text-lg font-black"
                            style={{ color: "var(--main-color)", fontFamily: "Outfit" }}
                          >
                            {pres.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-xs font-semibold" style={{ color: "rgba(43,31,45,0.65)" }}>
                            {pres.sublabel}
                          </p>
                          {PRESENTATION_SIZE_TAG[pres.key] && (
                            <span
                              className="text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: "rgba(43,31,45,0.06)",
                                color: "rgba(43,31,45,0.55)",
                              }}
                            >
                              {PRESENTATION_SIZE_TAG[pres.key]}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="relative z-10 flex flex-col items-end gap-3 flex-shrink-0">
                        <span
                          className="text-xl sm:text-2xl font-black leading-none"
                          style={{ color: "var(--main-color)", fontFamily: "Outfit" }}
                        >
                          ${price.toFixed(2)}
                        </span>
                        
                        {qty > 0 ? (
                          <span className="text-[11px] font-bold flex items-center gap-2" style={{ color: "var(--main-color)" }}>
                            en el pedido
                            <span 
                              className="w-[20px] h-[20px] rounded-full text-white flex items-center justify-center text-[10px]" 
                              style={{ backgroundColor: "var(--whatsapp)" }}
                            >
                              {qty}
                            </span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold uppercase tracking-[0.1em] opacity-40 group-hover:opacity-100 transition-opacity flex items-center gap-1.5" style={{ color: "var(--main-color)" }}>
                            Añadir <Plus size={12} weight="bold" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer hint */}
              <div className="px-8 sm:px-10 pb-10 pt-2">
                <p className="text-center text-[11px] font-medium" style={{ color: "rgba(43,31,45,0.4)" }}>
                  Puedes anadir varias presentaciones del mismo sabor
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
