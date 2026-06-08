/**
 * Catalog.jsx — Catalogo de Productos
 * Gestiona el modal de presentacion. Pasa onOpenModal a cada ProductCard.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products, categories } from "../data/products";
import { ProductCard } from "./ProductCard";
import { PresentationModal } from "./PresentationModal";

export function Catalog({ cartItems, onAdd }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [modalProduct, setModalProduct] = useState(null);

  const filtered =
    activeCategory === "Todos"
      ? products.filter((p) => p.available)
      : products.filter((p) => p.available && p.category === activeCategory);

  return (
    <>
      <section
        id="catalogo"
        className="relative"
        style={{
          backgroundColor: "var(--bg-color)",
          paddingTop: "var(--section-py)",
          paddingBottom: "var(--section-py)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ backgroundColor: "rgba(43, 31, 45, 0.08)" }}
        />

        <div className="custom-container relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <h2
              className="text-[clamp(2.4rem,5.5vw,4rem)] leading-[0.9] tracking-[-0.04em] mb-3"
              style={{ color: "var(--main-color)", fontFamily: "Outfit", fontWeight: 900 }}
            >
              Nuestro Menu
            </h2>
            <p
              className="text-sm font-medium max-w-[44ch]"
              style={{ color: "rgba(43, 31, 45, 0.58)" }}
            >
              Selecciona tus sabores y elige la presentacion que prefieras.
            </p>
          </motion.div>

          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap"
            role="group"
            aria-label="Filtrar por categoria"
          >
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setActiveCategory(cat)}
                  className="relative flex-shrink-0 text-[11px] font-black uppercase tracking-[0.13em] px-5 py-2.5 rounded-full transition-colors duration-150"
                  style={{
                    color: active ? "var(--bg-color)" : "rgba(43, 31, 45, 0.65)",
                    border: `1px solid ${active ? "transparent" : "rgba(43, 31, 45, 0.1)"}`,
                    backgroundColor: active ? "transparent" : "rgba(43, 31, 45, 0.05)",
                  }}
                  aria-pressed={active}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "var(--main-color)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Grid de productos */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cartItems={cartItems}
                    onOpenModal={setModalProduct}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center rounded-2xl"
                style={{
                  backgroundColor: "rgba(43, 31, 45, 0.03)",
                  border: "1px dashed rgba(43, 31, 45, 0.14)",
                }}
              >
                <p className="text-base font-bold" style={{ color: "rgba(43, 31, 45, 0.38)" }}>
                  Sin productos en esta categoria.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Modal de presentacion — fuera del section para evitar z-index issues */}
      <PresentationModal
        product={modalProduct}
        isOpen={!!modalProduct}
        onClose={() => setModalProduct(null)}
        onAdd={(product, key, price, label) => {
          onAdd(product, key, price, label);
        }}
        cartItems={cartItems}
      />
    </>
  );
}
