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
export function buildWhatsAppUrl(items, totalPrice, deliveryDetails = null) {
  if (!items.length) return null;

  let message = "";

  if (deliveryDetails) {
    const lines = items.map(
      (item) => `• ${item.qty}x ${item.name} (${item.presentationLabel}) — $${item.price.toFixed(2)} c/u`
    );

    message = [
      `🍦 *NUEVO PEDIDO — KOPOS* 🍦`,
      `----------------------------------`,
      `👤 *Cliente:* ${deliveryDetails.name}`,
      `🛵 *Tipo:* Delivery`,
      deliveryDetails.phone ? `📞 *Teléfono:* ${deliveryDetails.phone}` : null,
      deliveryDetails.address ? `📍 *Dirección:* ${deliveryDetails.address}` : null,
      deliveryDetails.paymentMethod ? `💳 *Método de Pago:* ${deliveryDetails.paymentMethod}` : null,
      `----------------------------------`,
      `📦 *Detalle de Productos:*`,
      ...lines,
      ``,
      `💵 *Total a Pagar: $${totalPrice.toFixed(2)}*`,
      `----------------------------------`,
      `¡Muchas gracias por elegir Kopos! ¿Me confirman la disponibilidad para procesar el pedido?`
    ].filter(Boolean).join("\n");
  } else {
    const lines = items.map(
      (item) => `• ${item.qty}x ${item.name} (${item.presentationLabel}) — $${item.price.toFixed(2)} c/u`
    );

    message = [
      shopConfig.whatsappGreeting,
      ...lines,
      "",
      `*Total estimado: $${totalPrice.toFixed(2)}*`,
      "",
      "¿Están disponibles estos sabores ahora?",
    ].join("\n");
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${shopConfig.whatsappNumber}?text=${encoded}`;
}

