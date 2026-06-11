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
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "./config/firebase";

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
  const [dineInOrders, setDineInOrders] = useState([]);

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

  // Sync dine-in orders from Firestore
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDineInOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  const handleDineInOrder = async (orderDetails) => {
    try {
      const newOrder = {
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        createdAt: Date.now(),
        customer: orderDetails.name,
        table: orderDetails.table,
        items: orderDetails.items,
        totalPrice: orderDetails.totalPrice,
        status: "Pendiente" // "Pendiente" | "Preparando" | "Entregado"
      };
      await setDoc(doc(db, "orders", orderDetails.id), newOrder);
    } catch (error) {
      console.error("Error creating order: ", error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, nextStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: nextStatus });
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
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
