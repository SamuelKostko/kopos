/**
 * CartDrawer.jsx — Panel Lateral del Carrito
 * Muestra el resumen del pedido.
 * Ahora usa el nuevo formato de item: { cartId, name, presentation, presentationLabel, qty, price, image }
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, Minus, Plus, WhatsappLogo, ShoppingCart, Trash, CookingPot, CaretLeft, CheckCircle } from "@phosphor-icons/react";
import { buildWhatsAppUrl } from "../utils/whatsapp";

export function CartDrawer({ isOpen, onClose, items, totalItems, totalPrice, onAdd, onRemove, onRemoveCompletely, onClear, onDineInOrder }) {
  const reduce = useReducedMotion();

  // Checkout Stepper State: "cart" | "method" | "tableInput" | "deliveryInput" | "success"
  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pago Móvil");
  const [lastOrderId, setLastOrderId] = useState("");

  // Reset stepper on drawer close or open
  useEffect(() => {
    if (!isOpen) {
      // Delay reset slightly to avoid visual jumping during closing animation
      const t = setTimeout(() => {
        setCheckoutStep("cart");
        setCustomerName("");
        setTableNumber("");
        setPhone("");
        setAddress("");
        setPaymentMethod("Pago Móvil");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !address.trim() || !phone.trim()) return;

    const orderId = "KOP-" + Math.floor(1000 + Math.random() * 9000);
    setLastOrderId(orderId);

    const deliveryDetails = {
      name: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      paymentMethod
    };

    // Save order in Firebase with type: "delivery"
    onDineInOrder({
      id: orderId,
      name: customerName.trim(),
      table: "Delivery",
      items: [...items],
      totalPrice,
      type: "delivery",
      phone: phone.trim(),
      address: address.trim(),
      paymentMethod
    });

    const customWhatsappUrl = buildWhatsAppUrl(items, totalPrice, deliveryDetails);
    window.open(customWhatsappUrl, "_blank");

    setCheckoutStep("success");
    onClear();
  };

  const handleDineInSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    const orderId = "KOP-" + Math.floor(1000 + Math.random() * 9000);
    setLastOrderId(orderId);

    // Trigger dine in order callback
    onDineInOrder({
      id: orderId,
      name: customerName.trim(),
      table: "-",
      items: [...items],
      totalPrice
    });

    setCheckoutStep("success");
    onClear();
  };

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

          {/* Centered Popup / Bottom Sheet Wrapper */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              key="drawer"
              role="dialog"
              aria-modal="true"
              initial={reduce ? false : { opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full sm:max-w-md h-[92vh] sm:h-auto sm:max-h-[85vh] flex flex-col shadow-2xl rounded-t-[32px] sm:rounded-[24px] overflow-hidden transition-all"
              style={{ 
                backgroundColor: "var(--bg-color)",
                border: "1px solid rgba(43, 31, 45, 0.08)"
              }}
            >
              {/* Drag indicator for mobile bottom sheet */}
              <div className="sm:hidden w-12 h-1 bg-[#2B1F2D]/15 rounded-full mx-auto my-3 flex-shrink-0" />

              {/* Header */}
              <div className="flex items-center justify-between pt-2 sm:pt-6 pb-4 px-6 sm:px-8 border-b border-[#2B1F2D]/10 bg-white/30 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  {checkoutStep !== "cart" && checkoutStep !== "success" && (
                    <button
                      onClick={() => setCheckoutStep((checkoutStep === "tableInput" || checkoutStep === "deliveryInput") ? "method" : "cart")}
                      aria-label="Regresar"
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#2B1F2D]/5 text-[#2B1F2D] mr-1"
                    >
                      <CaretLeft size={18} weight="bold" />
                    </button>
                  )}
                  <div>
                    <h2 className="text-lg sm:text-xl font-black tracking-tight" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                      {checkoutStep === "cart" && "Tu pedido"}
                      {checkoutStep === "method" && "¿Cómo deseas tu helado?"}
                      {checkoutStep === "tableInput" && "Tu Nombre"}
                      {checkoutStep === "deliveryInput" && "Datos de Entrega"}
                      {checkoutStep === "success" && "¡Pedido Recibido!"}
                    </h2>
                    {checkoutStep === "cart" && totalItems > 0 && (
                      <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: "rgba(43, 31, 45, 0.5)" }}>
                        {totalItems} {totalItems === 1 ? "unidad" : "unidades"}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Cerrar carrito"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-[#2B1F2D]/5 hover:bg-[#2B1F2D]/10 text-[#2B1F2D]"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              {/* Contenido Dinámico según Paso del Checkout */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 flex flex-col scrollbar-hide">
                
                {/* PASO 1: VISTA DEL CARRITO */}
                {checkoutStep === "cart" && (
                  <div className="flex-1 flex flex-col justify-between min-h-0">
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center my-auto text-center p-4 py-16">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center mb-4 border border-[#2B1F2D]/5 shadow-inner"
                        >
                          <ShoppingCart size={32} weight="thin" color="var(--main-color)" />
                        </motion.div>
                        <h3 className="text-lg font-bold mb-1" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                          Tu cesta está vacía
                        </h3>
                        <p className="text-xs font-medium mb-6 max-w-[240px]" style={{ color: "rgba(43, 31, 45, 0.6)" }}>
                          Añade tus helados y sorbetes favoritos del menú para empezar tu pedido.
                        </p>
                        <button
                          onClick={onClose}
                          className="btn-primary !py-2.5 !px-6 text-xs shadow-md"
                        >
                          Explorar Sabores
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-3">
                          <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                              <motion.div
                                layout
                                key={item.cartId}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                className="flex items-center gap-3 sm:gap-4 bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-[#2B1F2D]/5 shadow-sm hover:shadow-md hover:bg-white/95 transition-all duration-300"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover bg-white shadow-inner flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs sm:text-sm font-black truncate" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                                    {item.name}
                                  </h4>
                                  <p className="text-[10px] sm:text-xs font-bold opacity-60 mb-1.5 truncate">
                                    {item.presentationLabel} - ${item.price.toFixed(2)} c/u
                                  </p>
                                  
                                  <div className="flex items-center gap-1 bg-[#2B1F2D]/5 rounded-full p-0.5 w-fit border border-[#2B1F2D]/5">
                                    <button
                                      onClick={() => onRemove(item.cartId)}
                                      aria-label="Disminuir cantidad"
                                      className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex items-center justify-center rounded-full text-[#2B1F2D] hover:bg-[#2B1F2D]/15 transition-all"
                                    >
                                      <Minus size={8} weight="bold" />
                                    </button>
                                    <span className="text-[9px] sm:text-xs font-black min-w-[1.5rem] sm:min-w-[2rem] text-center" style={{ color: "var(--main-color)" }}>
                                      {item.qty}
                                    </span>
                                    <button
                                      onClick={() => onAdd({ id: item.id }, item.presentation, item.price, item.presentationLabel)}
                                      aria-label="Aumentar cantidad"
                                      className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex items-center justify-center rounded-full bg-[var(--main-color)] text-[var(--bg-color)] shadow-sm hover:bg-[var(--main-color-light)] transition-all"
                                    >
                                      <Plus size={8} weight="bold" />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-end justify-between h-12 sm:h-14 py-0.5 flex-shrink-0 select-none">
                                  <button
                                    onClick={() => onRemoveCompletely(item.cartId)}
                                    aria-label={`Eliminar todo de ${item.name}`}
                                    className="w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all text-[#2B1F2D]/40 hover:text-red-500 hover:bg-red-50"
                                  >
                                    <Trash size={12} weight="bold" />
                                  </button>
                                  <span className="text-xs sm:text-sm font-black tracking-tight" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                                    ${(item.price * item.qty).toFixed(2)}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                        
                        <div className="pt-2 pb-1 text-center">
                          <button 
                            onClick={onClear} 
                            className="text-[10px] font-bold uppercase tracking-wider text-red-500/70 hover:text-red-600 transition-colors bg-white/40 px-3.5 py-1.5 rounded-full border border-red-500/5 hover:bg-white"
                          >
                            Vaciar todo el pedido
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* PASO 2: SELECCIÓN DE MÉTODO */}
                {checkoutStep === "method" && (
                  <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-6 py-4 sm:py-6">
                    <p className="text-center text-xs font-semibold" style={{ color: "rgba(43, 31, 45, 0.6)" }}>
                      Elige cómo vas a disfrutar de tus helados Kopos:
                    </p>

                    <div className="flex flex-col gap-4">
                      {/* Opción Comer Aquí */}
                      <button
                        onClick={() => setCheckoutStep("tableInput")}
                        className="flex items-center gap-4 sm:gap-5 p-5 sm:p-7 rounded-[24px] sm:rounded-[28px] bg-white hover:border-[var(--main-color)] text-left shadow-sm hover:shadow-md transition-all group cursor-pointer"
                        style={{ border: "2px solid rgba(43, 31, 45, 0.05)" }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--main-color)] text-[var(--bg-color)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all">
                          <CookingPot size={20} weight="fill" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-black leading-tight" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                            Comer Aquí
                          </h3>
                          <p className="text-[11px] sm:text-xs font-medium mt-1 opacity-70">
                            Te lo preparamos y servimos directamente en tu mesa.
                          </p>
                        </div>
                      </button>

                      {/* Opción Delivery */}
                      <button
                        onClick={() => setCheckoutStep("deliveryInput")}
                        className="flex items-center gap-4 sm:gap-5 p-5 sm:p-7 rounded-[24px] sm:rounded-[28px] bg-white hover:border-[#25D366] text-left shadow-sm hover:shadow-md transition-all group cursor-pointer"
                        style={{ border: "2px solid rgba(43, 31, 45, 0.05)" }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all">
                          <WhatsappLogo size={22} weight="fill" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-black leading-tight" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                            Envío a Domicilio / Delivery
                          </h3>
                          <p className="text-[11px] sm:text-xs font-medium mt-1 opacity-70">
                            Envía tu pedido a nuestro WhatsApp y coordinamos la entrega.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* PASO 3: DETALLES DE MESA / COMER AQUÍ */}
                {checkoutStep === "tableInput" && (
                  <form onSubmit={handleDineInSubmit} className="flex-1 flex flex-col justify-between py-4 min-h-[220px]">
                    <div className="space-y-4">
                      <p className="text-xs font-semibold opacity-70 leading-relaxed">
                        Por favor dinos tu nombre para identificar tu pedido en el local:
                      </p>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="cust-name" className="text-[10px] font-bold uppercase tracking-wider text-[var(--main-color)] opacity-60">
                          Tu Nombre *
                        </label>
                        <input
                          id="cust-name"
                          type="text"
                          required
                          placeholder="Ej: Alejandro"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-white border-2 border-[#2B1F2D]/10 focus:border-[var(--main-color)] rounded-xl sm:rounded-2xl px-4 py-3 sm:py-4 text-sm font-semibold outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full !text-xs !py-3.5 shadow-md hover:scale-[1.02] mt-6 transition-all cursor-pointer"
                    >
                      Confirmar y Enviar Pedido
                    </button>
                  </form>
                )}

                {/* PASO 3b: DETALLES DE DELIVERY */}
                {checkoutStep === "deliveryInput" && (
                  <form onSubmit={handleDeliverySubmit} className="flex-1 flex flex-col justify-between py-2 min-h-[300px] gap-4">
                    <div className="space-y-3.5">
                      <p className="text-xs font-semibold opacity-70 leading-relaxed">
                        Completa tus datos para coordinar el envío de tus helados Kopos:
                      </p>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="cust-name-del" className="text-[10px] font-bold uppercase tracking-wider text-[var(--main-color)] opacity-60">
                          Tu Nombre *
                        </label>
                        <input
                          id="cust-name-del"
                          type="text"
                          required
                          placeholder="Ej: Alejandro"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-white border-2 border-[#2B1F2D]/10 focus:border-[var(--main-color)] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="cust-phone" className="text-[10px] font-bold uppercase tracking-wider text-[var(--main-color)] opacity-60">
                          Teléfono de Contacto *
                        </label>
                        <input
                          id="cust-phone"
                          type="tel"
                          required
                          placeholder="Ej: +58 412 1234567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white border-2 border-[#2B1F2D]/10 focus:border-[var(--main-color)] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="cust-address" className="text-[10px] font-bold uppercase tracking-wider text-[var(--main-color)] opacity-60">
                          Dirección de Entrega *
                        </label>
                        <textarea
                          id="cust-address"
                          required
                          rows="2"
                          placeholder="Ej: Av. Principal, Res. El Sol, Apto 5B, Caracas"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-white border-2 border-[#2B1F2D]/10 focus:border-[var(--main-color)] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none transition-all resize-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="payment-method" className="text-[10px] font-bold uppercase tracking-wider text-[var(--main-color)] opacity-60">
                          Método de Pago
                        </label>
                        <select
                          id="payment-method"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full bg-white border-2 border-[#2B1F2D]/10 focus:border-[var(--main-color)] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none transition-all"
                        >
                          <option value="Pago Móvil">Pago Móvil</option>
                          <option value="Efectivo">Efectivo</option>
                          <option value="Zelle">Zelle / Transferencia</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full !text-xs !py-3.5 shadow-md hover:scale-[1.02] mt-4 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      Enviar Pedido por WhatsApp
                    </button>
                  </form>
                )}

                {/* PASO 4: ÉXITO */}
                {checkoutStep === "success" && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-8 px-4 my-auto">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="text-green-500 mb-4"
                    >
                      <CheckCircle size={56} weight="fill" />
                    </motion.div>
                    
                    <h3 className="text-lg sm:text-xl font-black mb-1" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                      ¡Pedido enviado!
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-green-600 uppercase tracking-widest mb-3">
                      Orden: {lastOrderId}
                    </p>
                    <p className="text-xs font-semibold leading-relaxed max-w-[280px] mb-6 opacity-70">
                      Hemos recibido tu pedido en nuestro panel de cocina y también se abrirá WhatsApp para coordinar el envío. ¡Disfruta!
                    </p>

                    <button
                      onClick={onClose}
                      className="btn-primary w-full max-w-[200px] !text-xs !py-2.5 shadow-md"
                    >
                      Volver al Menú
                    </button>
                  </div>
                )}
              </div>

              {/* Footer / Stepper Control (Solo visible en paso de Carrito con items) */}
              {checkoutStep === "cart" && items.length > 0 && (
                <div className="pb-8 pt-4 px-6 sm:px-8 border-t border-[#2B1F2D]/10 bg-white/40 backdrop-blur-md pb-safe">
                  <div className="flex items-center justify-between px-1 mb-3 sm:mb-4">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em]" style={{ color: "rgba(43,31,45,0.45)" }}>Total estimado</span>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-black leading-none" style={{ color: "var(--main-color)", fontFamily: "Outfit" }}>
                        ${totalPrice.toFixed(2)}
                      </span>
                      <p className="text-[9px] font-bold mt-0.5" style={{ color: "rgba(43,31,45,0.35)" }}>USD</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setCheckoutStep("method")}
                    className="btn-primary w-full !text-xs !py-3 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    Confirmar Pedido
                  </button>
                  <p className="text-center text-[9px] font-semibold text-[#2B1F2D]/40 mt-3">
                    Podrás elegir si deseas comer aquí o solicitar entrega a domicilio.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
