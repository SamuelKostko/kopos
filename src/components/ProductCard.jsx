/**
 * ProductCard.jsx — Tarjeta de Producto
 * El boton "Anadir" abre el PresentationModal en lugar de agregar directamente.
 * Muestra un indicador si el producto ya esta en el carrito (en cualquier presentacion).
 */
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";

export function ProductCard({ product, onOpenModal, cartItems, index }) {
  const reduce = useReducedMotion();

  // Total de unidades de este producto en el carrito (todas las presentaciones)
  const totalQtyInCart = cartItems
    .filter((i) => i.id === product.id)
    .reduce((sum, i) => sum + i.qty, 0);

  const inCart = totalQtyInCart > 0;

  // Precio mas bajo entre todas las presentaciones
  const lowestPrice = Math.min(
    product.prices.barquilla,
    product.prices.tinitaS,
    product.prices.tinitaL
  );

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? {} : { y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 100, damping: 22, delay: index * 0.04 }}
      className="group flex flex-col overflow-hidden rounded-[24px]"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 12px rgba(43, 31, 45, 0.06)",
        border: "1px solid rgba(43, 31, 45, 0.05)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {/* Badge del producto */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "var(--main-color)", color: "var(--bg-color)" }}
          >
            {product.badge}
          </span>
        )}

        {/* Badge de carrito — cantidad total en el carrito */}
        <AnimatePresence>
          {inCart && (
            <motion.div
              key="cart-qty"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="absolute top-3 right-3 min-w-[26px] h-[26px] rounded-full flex items-center justify-center text-white text-[10px] font-black shadow px-1.5"
              style={{ backgroundColor: "var(--whatsapp)" }}
            >
              {totalQtyInCart}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="card-info-container">
        <div className="flex-1">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
            style={{ color: "rgba(43, 31, 45, 0.4)" }}
          >
            {product.category}
          </p>
          <h3
            className="text-lg font-black leading-tight mb-2"
            style={{ color: "var(--main-color)", fontFamily: "Outfit" }}
          >
            {product.name}
          </h3>
          <p
            className="text-xs leading-relaxed font-medium line-clamp-2"
            style={{ color: "rgba(43, 31, 45, 0.6)", minHeight: "2.8rem" }}
          >
            {product.description}
          </p>
        </div>

        {/* Precio "Desde" + boton abrir modal */}
        <div
          className="flex items-center justify-between pt-4 mt-1"
          style={{ borderTop: "1px solid rgba(43, 31, 45, 0.08)" }}
        >
          <div>
            <span
              className="text-[9px] font-bold uppercase tracking-[0.12em] block mb-0.5"
              style={{ color: "rgba(43,31,45,0.38)" }}
            >
              Desde
            </span>
            <span
              className="text-xl font-black leading-none"
              style={{ color: "var(--main-color)", fontFamily: "Outfit" }}
            >
              ${lowestPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onOpenModal(product)}
            aria-label={`Ver presentaciones de ${product.name}`}
            className="btn-card"
          >
            <Plus size={11} weight="bold" />
            {inCart ? "Ver mas" : "Anadir"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
