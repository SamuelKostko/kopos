/**
 * App.jsx — Componente Raíz
 * Orquesta todos los componentes y el estado global del carrito.
 */
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BrandMarquee } from "./components/BrandMarquee";
import { About } from "./components/About";
import { Catalog } from "./components/Catalog";
import { CartDrawer } from "./components/CartDrawer";
import { FloatingCartBar } from "./components/FloatingCartBar";
import { KitchenDashboard } from "./components/KitchenDashboard";
import { Footer } from "./components/Footer";
import { useCart } from "./hooks/useCart";
import { ChefHat } from "@phosphor-icons/react";

export default function App() {
  const { items, addItem, removeItem, removeItemCompletely, clearCart, totalItems, totalPrice } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  
  // Detect /admin path (supports: /admin, #/admin, ?admin)
  const [isAdminPath, setIsAdminPath] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;
    return path === "/admin" || path.startsWith("/admin") || hash === "#/admin" || search === "?admin";
  });
  
  // Kitchen Dashboard State
  const [dineInOrders, setDineInOrders] = useState(() => {
    const saved = localStorage.getItem("dineInOrders");
    return saved ? JSON.parse(saved) : [];
  });

  // Listen to popstate changes (history back/forward)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;
      setIsAdminPath(path === "/admin" || path.startsWith("/admin") || hash === "#/admin" || search === "?admin");
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Sync dine-in orders to localStorage
  useEffect(() => {
    localStorage.setItem("dineInOrders", JSON.stringify(dineInOrders));
  }, [dineInOrders]);

  // Sincronizar cambios entre pestañas automáticamente (para la vista /admin)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "dineInOrders") {
        try {
          const updatedOrders = e.newValue ? JSON.parse(e.newValue) : [];
          setDineInOrders(updatedOrders);
        } catch (error) {
          console.error("Error parsing orders from storage:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleDineInOrder = (orderDetails) => {
    const newOrder = {
      id: orderDetails.id,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      customer: orderDetails.name,
      table: orderDetails.table,
      items: orderDetails.items,
      totalPrice: orderDetails.totalPrice,
      status: "Pendiente" // "Pendiente" | "Preparando" | "Entregado"
    };
    setDineInOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId, nextStatus) => {
    setDineInOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const handleDeleteOrder = (orderId) => {
    setDineInOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // If visiting /admin route, render ONLY the full-screen Kitchen Dashboard
  if (isAdminPath) {
    return (
      <KitchenDashboard
        isFullScreen={true}
        orders={dineInOrders}
        onUpdateStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
      />
    );
  }

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
        onDineInOrder={handleDineInOrder}
      />
    </>
  );
}
