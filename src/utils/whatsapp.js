/**
 * whatsapp.js — Generador de Enlace de WhatsApp
 * Construye la URL de WhatsApp con el pedido formateado.
 */
import { shopConfig } from "../config/shopConfig";

/**
 * Genera el enlace de WhatsApp con el pedido formateado.
 * @param {Array} items — Array de items del carrito
 * @param {number} totalPrice — Total numerico del pedido
 * @returns {string} URL de WhatsApp lista para abrir
 */
export function buildWhatsAppUrl(items, totalPrice) {
  if (!items.length) return null;

  const lines = items.map(
    (item) => `• ${item.qty}x ${item.name} (${item.presentationLabel}) — $${item.price.toFixed(2)} c/u`
  );

  const message = [
    shopConfig.whatsappGreeting,
    ...lines,
    "",
    `*Total estimado: $${totalPrice.toFixed(2)}*`,
    "",
    "¿Estan disponibles estos sabores ahora?",
  ].join("\n");

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${shopConfig.whatsappNumber}?text=${encoded}`;
}
