/**
 * CartDrawer.jsx — Panel Lateral del Carrito
 * Muestra el resumen del pedido.
 * Ahora usa el nuevo formato de item: { cartId, name, presentation, presentationLabel, qty, price, image }
 */
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, Minus, Plus, WhatsappLogo, ShoppingCart, Trash } from "@phosphor-icons/react";
import { buildWhatsAppUrl } from "../utils/whatsapp";

export function CartDrawer({ isOpen, onClose, items, totalItems, totalPrice, onAdd, onRemove, onRemoveCompletely, onClear }) {
  const reduce = useReducedMotion();
  const whatsappUrl = buildWhatsAppUrl(items, totalPrice);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro sutil */}
          <motion.div
            key="overlay"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#2B1F2D]/50 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Drawer Lateral */}
          <motion.aside
            key="drawer"
            initial={reduce ? false : { x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col shadow-2xl overflow-hidden"
            style={{ 
              backgroundColor: "var(--bg-color)",
              borderLeft: "1px solid rgba(43, 31, 45, 0.08)"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4.5 border-b border-[#2B1F2D]/10 bg-white/40 backdrop-blur-md">
              <div>
                <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                  Tu pedido
                </h2>
                {totalItems > 0 && (
                  <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: "rgba(43, 31, 45, 0.5)" }}>
                    {totalItems} {totalItems === 1 ? "unidad" : "unidades"}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar carrito"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-[#2B1F2D]/5 hover:bg-[#2B1F2D]/10 text-[#2B1F2D]"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Contenido (Lista de Items) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center mb-4 border border-[#2B1F2D]/5 shadow-inner"
                  >
                    <ShoppingCart size={32} weight="thin" color="var(--main-color)" />
                  </motion.div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                    Tu cesta esta vacia
                  </h3>
                  <p className="text-xs font-medium mb-6 max-w-[240px]" style={{ color: "rgba(43, 31, 45, 0.6)" }}>
                    Anade tus helados y sorbetes favoritos del menu para empezar tu pedido.
                  </p>
                  <button
                    onClick={onClose}
                    className="btn-primary !py-2.5 !px-6 text-xs shadow-md"
                  >
                    Explorar Sabores
                  </button>
                </div>
              ) : (
                <>
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        layout
                        key={item.cartId}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-[#2B1F2D]/5 shadow-sm hover:shadow-md hover:bg-white/95 transition-all duration-300"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover bg-white shadow-inner flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black truncate" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                            {item.name}
                          </h4>
                          <p className="text-[10px] font-bold opacity-60 mb-1.5 truncate">
                            {item.presentationLabel} - ${item.price.toFixed(2)} c/u
                          </p>
                          
                          {/* Controles de cantidad */}
                          <div className="flex items-center gap-1 bg-[#2B1F2D]/5 rounded-full p-0.5 w-fit border border-[#2B1F2D]/5">
                            <button
                              onClick={() => onRemove(item.cartId)}
                              aria-label="Disminuir cantidad"
                              className="w-5.5 h-5.5 flex items-center justify-center rounded-full text-[#2B1F2D] hover:bg-[#2B1F2D]/15 transition-all"
                            >
                              <Minus size={9} weight="bold" />
                            </button>
                            <span className="text-[9px] font-black min-w-[2rem] text-center" style={{ color: "var(--main-color)" }}>
                              {item.qty}
                            </span>
                            <button
                              onClick={() => onAdd({ id: item.id }, item.presentation, item.price, item.presentationLabel)}
                              aria-label="Aumentar cantidad"
                              className="w-5.5 h-5.5 flex items-center justify-center rounded-full bg-[var(--main-color)] text-[var(--bg-color)] shadow-sm hover:bg-[var(--main-color-light)] transition-all"
                            >
                              <Plus size={9} weight="bold" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Subtotal y quitar sabor */}
                        <div className="flex flex-col items-end justify-between h-14 py-0.5 flex-shrink-0 select-none">
                          <button
                            onClick={() => onRemoveCompletely(item.cartId)}
                            aria-label={`Eliminar todo de ${item.name}`}
                            className="w-6 h-6 rounded-full flex items-center justify-center transition-all text-[#2B1F2D]/40 hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash size={12} weight="bold" />
                          </button>
                          <span className="text-sm font-black tracking-tight" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  <div className="pt-2 text-center">
                    <button 
                      onClick={onClear} 
                      className="text-[10px] font-bold uppercase tracking-wider text-red-500/60 hover:text-red-600 transition-colors bg-white/40 px-3.5 py-1.5 rounded-full border border-red-500/5 hover:bg-white"
                    >
                      Vaciar todo el pedido
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-4 bg-white/60 backdrop-blur-md border-t border-[#2B1F2D]/10 pb-6">
                <div className="flex items-center justify-between px-1 mb-4">
                  <span className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: "rgba(43,31,45,0.45)" }}>Total estimado</span>
                  <div className="text-right">
                    <span className="text-2xl font-black leading-none" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                    <p className="text-[9px] font-bold mt-0.5" style={{ color: "rgba(43,31,45,0.35)" }}>USD</p>
                  </div>
                </div>
                
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full !bg-[#25D366] hover:!bg-[#1EBD5A] !text-white !border-none !text-xs !py-3 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all"
                  style={{ boxShadow: "0 6px 18px rgba(37, 211, 102, 0.2)" }}
                >
                  <WhatsappLogo size={20} weight="fill" />
                  Enviar pedido a WhatsApp
                </a>
                <p className="text-center text-[9px] font-semibold text-[#2B1F2D]/40 mt-2.5">
                  Confirmas sabores, entrega y pago directamente en el chat.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
