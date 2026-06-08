/**
 * App.jsx — Componente Raíz
 * Orquesta todos los componentes y el estado global del carrito.
 */
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BrandMarquee } from "./components/BrandMarquee";
import { About } from "./components/About";
import { Catalog } from "./components/Catalog";
import { CartDrawer } from "./components/CartDrawer";
import { FloatingCartBar } from "./components/FloatingCartBar";
import { Footer } from "./components/Footer";
import { useCart } from "./hooks/useCart";


export default function App() {
  const { items, addItem, removeItem, removeItemCompletely, clearCart, totalItems, totalPrice } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      {/* Navegación */}
      <Navbar
        totalItems={totalItems}
        onCartClick={() => setCartOpen(true)}
      />

      <main>
        {/* 1. Hero */}
        <Hero />

        {/* Kinetic brand strip — one marquee max per page */}
        <BrandMarquee />

        {/* 2. Nosotros */}
        <About />

        {/* 3. Catálogo Interactivo — Productos con filtros */}
        <Catalog
          cartItems={items}
          onAdd={addItem}
          onRemove={removeItem}
        />
      </main>

      {/* Footer con horarios y contacto */}
      <Footer />

      {/* Barra flotante del carrito — aparece al añadir productos */}
      <FloatingCartBar
        items={items}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Drawer del carrito — panel lateral con resumen del pedido */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onAdd={addItem}
        onRemove={removeItem}
        onRemoveCompletely={removeItemCompletely}
        onClear={clearCart}
      />
    </>
  );
}
