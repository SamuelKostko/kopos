/**
 * KitchenDashboard.jsx — Panel de Recepción de Pedidos
 * Permite a los empleados de la heladería recibir y gestionar
 * los pedidos para comer aquí en tiempo real.
 */
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ChefHat, BellRinging, Trash, Archive } from "@phosphor-icons/react";

export function KitchenDashboard({ isOpen, onClose, orders, onUpdateStatus, onDeleteOrder, isFullScreen }) {
  const previousOrdersCount = useRef(orders.length);

  // Play a chime sound when a new order is received
  useEffect(() => {
    if (orders.length > previousOrdersCount.current) {
      playChime();
    }
    previousOrdersCount.current = orders.length;
  }, [orders]);

  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // First note (G5)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(783.99, audioCtx.currentTime); // G5
      gain1.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.3);
      
      // Second note (C6)
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1046.50, audioCtx.currentTime); // C6
        gain2.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.5);
      }, 150);
    } catch (e) {
      console.warn("AudioContext block by browser policy", e);
    }
  };

  if (isFullScreen) {
    return (
      <div
        className="w-full min-h-screen flex flex-col bg-[var(--bg-color)]"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2B1F2D]/10 bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--main-color)] text-[var(--bg-color)] flex items-center justify-center">
              <ChefHat size={22} weight="fill" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                Recepción de Pedidos (Mesero / Cocina)
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-wider text-green-600 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Modo Pantalla Completa — /admin
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.href = "/"}
            className="btn-secondary !text-xs !py-2.5 !px-5"
          >
            Ir al Menú de Clientes
          </button>
        </div>

        {/* Orders list grid (Bento-style rows/cols for full page display) */}
        <div className="flex-1 overflow-y-auto p-6">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60dvh] text-center p-4">
              <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center mb-4 border border-[#2B1F2D]/5 shadow-inner">
                <BellRinging size={32} weight="thin" color="rgba(43, 31, 45, 0.4)" />
              </div>
              <h3 className="text-lg font-bold mb-1" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                No hay pedidos activos
              </h3>
              <p className="text-xs font-medium max-w-[260px]" style={{ color: "rgba(43, 31, 45, 0.55)" }}>
                Los pedidos solicitados para "Comer Aquí" sonarán y aparecerán en este panel automáticamente.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {orders.map((order) => (
                  <motion.div
                    layout
                    key={order.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-7 rounded-[24px] border-2 shadow-md flex flex-col justify-between gap-6 transition-all duration-300"
                    style={{
                      borderColor: 
                        order.status === "Pendiente" ? "rgba(43, 31, 45, 0.08)" :
                        order.status === "Preparando" ? "rgba(251, 191, 36, 0.3)" :
                        "rgba(37, 211, 102, 0.2)",
                      boxShadow: "0 16px 36px rgba(43, 31, 45, 0.05)"
                    }}
                  >
                    <div>
                      {/* Top banner info */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[var(--main-color)] opacity-40">
                            {order.id} — {order.timestamp}
                          </span>
                          <h4 className="text-base font-black" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                            {order.customer}
                          </h4>
                        </div>
                        
                        {/* Status chip */}
                        <span
                          className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-center"
                          style={{
                            backgroundColor:
                              order.status === "Pendiente" ? "rgba(43, 31, 45, 0.06)" :
                              order.status === "Preparando" ? "#FBBF24" :
                              "#25D366",
                            color: order.status === "Pendiente" ? "var(--main-color)" : "#fff"
                          }}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Items Ordered */}
                      <div className="bg-[#2B1F2D]/5 rounded-2xl p-5 space-y-3">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-xs font-semibold text-[var(--main-color)]">
                            <span className="opacity-90">
                              {it.qty}x {it.name} <span className="text-[10px] opacity-60">({it.presentationLabel})</span>
                            </span>
                            <span>
                              ${(it.price * it.qty).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-[#2B1F2D]/10 pt-2 flex justify-between text-xs font-black text-[var(--main-color)]">
                          <span>Total</span>
                          <span>${order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-1">
                      {order.status === "Pendiente" && (
                        <button
                          onClick={() => onUpdateStatus(order.id, "Preparando")}
                          className="flex-1 btn-card !py-2.5 !text-[10px] !bg-amber-500 hover:!bg-amber-600 !text-white shadow-sm cursor-pointer"
                        >
                          <ChefHat size={14} weight="fill" />
                          Preparar
                        </button>
                      )}
                      {order.status === "Preparando" && (
                        <button
                          onClick={() => onUpdateStatus(order.id, "Entregado")}
                          className="flex-1 btn-card !py-2.5 !text-[10px] !bg-green-500 hover:!bg-green-600 !text-white shadow-sm cursor-pointer"
                        >
                          <Check size={14} weight="bold" />
                          Entregar
                        </button>
                      )}
                      {order.status === "Entregado" && (
                        <button
                          onClick={() => onDeleteOrder(order.id)}
                          className="flex-1 btn-card !py-2.5 !text-[10px] !bg-[#2B1F2D]/10 hover:!bg-[#2B1F2D]/20 !text-[var(--main-color)] shadow-sm cursor-pointer"
                        >
                          <Archive size={14} weight="bold" />
                          Archivar
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteOrder(order.id)}
                        aria-label="Borrar pedido permanentemente"
                        className="w-9 h-9 rounded-2xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all flex-shrink-0 cursor-pointer"
                      >
                        <Trash size={15} weight="bold" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#2B1F2D]/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Dashboard Panel */}
          <motion.aside
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 z-[101] w-full max-w-lg flex flex-col shadow-2xl overflow-hidden"
            style={{ 
              backgroundColor: "var(--bg-color)",
              borderRight: "1px solid rgba(43, 31, 45, 0.08)"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2B1F2D]/10 bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[var(--main-color)] text-[var(--bg-color)] flex items-center justify-center">
                  <ChefHat size={22} weight="fill" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                    Recepción de Pedidos
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-green-600 mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Panel de Mesa / Local
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar panel de cocina"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-[#2B1F2D]/5 hover:bg-[#2B1F2D]/10 text-[#2B1F2D]"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Orders list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center mb-4 border border-[#2B1F2D]/5 shadow-inner">
                    <BellRinging size={32} weight="thin" color="rgba(43, 31, 45, 0.4)" />
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                    No hay pedidos activos
                  </h3>
                  <p className="text-xs font-medium max-w-[260px]" style={{ color: "rgba(43, 31, 45, 0.55)" }}>
                    Los pedidos solicitados para "Comer Aquí" sonarán y aparecerán en este panel automáticamente.
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {orders.map((order) => (
                    <motion.div
                      layout
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="bg-white p-6.5 rounded-[24px] border-2 shadow-md flex flex-col gap-5 transition-all duration-300"
                      style={{
                        borderColor: 
                          order.status === "Pendiente" ? "rgba(43, 31, 45, 0.08)" :
                          order.status === "Preparando" ? "rgba(251, 191, 36, 0.3)" :
                          "rgba(37, 211, 102, 0.2)",
                        boxShadow: "0 16px 36px rgba(43, 31, 45, 0.05)"
                      }}
                    >
                      {/* Top banner info */}
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[var(--main-color)] opacity-40">
                            {order.id} — {order.timestamp}
                          </span>
                          <h4 className="text-base font-black" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                            {order.customer}
                          </h4>
                        </div>
                        
                        {/* Status chip */}
                        <span
                          className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-center"
                          style={{
                            backgroundColor:
                              order.status === "Pendiente" ? "rgba(43, 31, 45, 0.06)" :
                              order.status === "Preparando" ? "#FBBF24" :
                              "#25D366",
                            color: order.status === "Pendiente" ? "var(--main-color)" : "#fff"
                          }}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Items Ordered */}
                      <div className="bg-[#2B1F2D]/5 rounded-2xl p-5 space-y-3">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-xs font-semibold text-[var(--main-color)]">
                            <span className="opacity-90">
                              {it.qty}x {it.name} <span className="text-[10px] opacity-60">({it.presentationLabel})</span>
                            </span>
                            <span>
                              ${(it.price * it.qty).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-[#2B1F2D]/10 pt-2 flex justify-between text-xs font-black text-[var(--main-color)]">
                          <span>Total</span>
                          <span>${order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-1">
                        {order.status === "Pendiente" && (
                          <button
                            onClick={() => onUpdateStatus(order.id, "Preparando")}
                            className="flex-1 btn-card !py-2.5 !text-[10px] !bg-amber-500 hover:!bg-amber-600 !text-white shadow-sm"
                          >
                            <ChefHat size={14} weight="fill" />
                            Preparar
                          </button>
                        )}
                        {order.status === "Preparando" && (
                          <button
                            onClick={() => onUpdateStatus(order.id, "Entregado")}
                            className="flex-1 btn-card !py-2.5 !text-[10px] !bg-green-500 hover:!bg-green-600 !text-white shadow-sm"
                          >
                            <Check size={14} weight="bold" />
                            Entregar
                          </button>
                        )}
                        {order.status === "Entregado" && (
                          <button
                            onClick={() => onDeleteOrder(order.id)}
                            className="flex-1 btn-card !py-2.5 !text-[10px] !bg-[#2B1F2D]/10 hover:!bg-[#2B1F2D]/20 !text-[var(--main-color)] shadow-sm"
                          >
                            <Archive size={14} weight="bold" />
                            Archivar
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteOrder(order.id)}
                          aria-label="Borrar pedido permanentemente"
                          className="w-9 h-9 rounded-2xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all flex-shrink-0"
                        >
                          <Trash size={15} weight="bold" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
