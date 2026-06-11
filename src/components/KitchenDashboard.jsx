/**
 * KitchenDashboard.jsx — Panel de Recepción de Pedidos
 * Tablero Kanban en tiempo real para gestionar pedidos.
 */
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ChefHat, BellRinging, Trash, Archive, Clock, CookingPot, CheckCircle } from "@phosphor-icons/react";

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

  // Grouping orders for Kanban
  const pendingOrders = orders.filter(o => o.status === "Pendiente");
  const preparingOrders = orders.filter(o => o.status === "Preparando");
  const readyOrders = orders.filter(o => o.status === "Entregado"); // "Entregado" means ready to deliver or delivered. We can treat it as "Listo"

  // Reusable Order Card Component
  const OrderCard = ({ order, isSidebar = false }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`bg-white rounded-[20px] p-5 flex flex-col gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 ${isSidebar ? 'border-l-4' : ''}`}
      style={isSidebar ? {
        borderLeftColor: 
          order.status === "Pendiente" ? "#e2e8f0" :
          order.status === "Preparando" ? "#f59e0b" :
          "#10b981"
      } : {}}
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest">
            #{order.id?.substring(0, 6).toUpperCase() || order.timestamp}
          </span>
          <h4 className="text-lg font-bold text-slate-800 leading-tight mt-0.5" style={{ fontFamily: "Outfit" }}>
            {order.customer}
          </h4>
        </div>
        <div className="bg-slate-50 text-slate-500 text-xs font-bold px-2.5 py-1 rounded-md">
          Mesa {order.table || "—"}
        </div>
      </div>

      <div className="bg-slate-50/50 rounded-xl p-3 space-y-2.5">
        {order.items.map((it, idx) => (
          <div key={idx} className="flex justify-between items-start text-[13px] text-slate-700">
            <span className="font-medium leading-snug">
              <span className="font-bold text-slate-900">{it.qty}x</span> {it.name}
              <span className="block text-[11px] text-slate-400 mt-0.5">{it.presentationLabel}</span>
            </span>
            <span className="font-medium text-slate-500 whitespace-nowrap ml-2">
              ${(it.price * it.qty).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t border-slate-200/60 pt-2 flex justify-between text-[13px] font-bold text-slate-800">
          <span>Total</span>
          <span>${order.totalPrice?.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        {order.status === "Pendiente" && (
          <button
            onClick={() => onUpdateStatus(order.id, "Preparando")}
            className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <CookingPot size={16} weight="fill" />
            Preparar
          </button>
        )}
        {order.status === "Preparando" && (
          <button
            onClick={() => onUpdateStatus(order.id, "Entregado")}
            className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <CheckCircle size={16} weight="fill" />
            Listo
          </button>
        )}
        {order.status === "Entregado" && (
          <button
            onClick={() => onDeleteOrder(order.id)}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Archive size={16} weight="bold" />
            Archivar
          </button>
        )}
        <button
          onClick={() => onDeleteOrder(order.id)}
          aria-label="Borrar pedido permanentemente"
          className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all active:scale-90 flex-shrink-0"
        >
          <Trash size={16} weight="bold" />
        </button>
      </div>
    </motion.div>
  );

  // FULL SCREEN KANBAN VIEW
  if (isFullScreen) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-slate-50 font-sans">
        {/* Header - Glassmorphism */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 sm:py-5 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl sticky top-0 z-10 gap-4 sm:gap-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <ChefHat size={24} weight="fill" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "Outfit" }}>
                Panel de Cocina
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  Kanban en Vivo
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => window.location.href = "/"}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
          >
            Volver al Menú
          </button>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          <div className="flex gap-6 h-full min-w-max md:min-w-0 md:grid md:grid-cols-3 md:gap-8 max-w-[1600px] mx-auto">
            
            {/* Column 1: Pendientes */}
            <div className="w-[320px] md:w-auto flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
                  <Clock size={18} className="text-slate-400" />
                  Nuevos
                </h3>
                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2.5 py-0.5 rounded-full">{pendingOrders.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto pb-6 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <AnimatePresence mode="popLayout">
                  {pendingOrders.map(order => <OrderCard key={order.id} order={order} />)}
                  {pendingOrders.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-sm font-medium">
                      Sin nuevos pedidos
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Column 2: Preparando */}
            <div className="w-[320px] md:w-auto flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-bold text-amber-600 flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
                  <CookingPot size={18} />
                  En Preparación
                </h3>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full">{preparingOrders.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto pb-6 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-transparent">
                <AnimatePresence mode="popLayout">
                  {preparingOrders.map(order => <OrderCard key={order.id} order={order} />)}
                  {preparingOrders.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-32 border-2 border-dashed border-amber-200/50 rounded-2xl flex items-center justify-center text-amber-400/80 text-sm font-medium">
                      Ninguno en curso
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Column 3: Listos */}
            <div className="w-[320px] md:w-auto flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-bold text-emerald-600 flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
                  <CheckCircle size={18} />
                  Listos
                </h3>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full">{readyOrders.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto pb-6 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
                <AnimatePresence mode="popLayout">
                  {readyOrders.map(order => <OrderCard key={order.id} order={order} />)}
                  {readyOrders.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-32 border-2 border-dashed border-emerald-200/50 rounded-2xl flex items-center justify-center text-emerald-400/80 text-sm font-medium">
                      Todos entregados
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // SIDEBAR VIEW (Modal drawer)
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 z-[101] w-full max-w-[400px] flex flex-col bg-slate-50 shadow-2xl overflow-hidden border-r border-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <ChefHat size={20} weight="fill" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-none" style={{ fontFamily: "Outfit" }}>
                    Recepción de Pedidos
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Mesa / Local
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all active:scale-95"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 border border-slate-200 text-slate-300 shadow-inner">
                    <BellRinging size={32} weight="thin" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1" style={{ fontFamily: "Outfit" }}>
                    Sin pedidos activos
                  </h3>
                  <p className="text-xs font-medium text-slate-500 max-w-[260px]">
                    Los pedidos de "Comer Aquí" aparecerán aquí automáticamente.
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {orders.map((order) => <OrderCard key={order.id} order={order} isSidebar={true} />)}
                </AnimatePresence>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
