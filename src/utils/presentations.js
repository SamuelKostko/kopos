/**
 * presentations.js — Definicion de las presentaciones disponibles
 *
 * barquilla  : 1 solo tamano (cono)
 * tinita-s   : tinita pequena
 * tinita-l   : tinita grande
 */

export const PRESENTATIONS = [
  {
    key: "barquilla",
    label: "Barquilla",
    sublabel: "Cono individual",
    priceKey: "barquilla",
    icon: "🍦",
  },
  {
    key: "tinita-s",
    label: "Tinita Pequena",
    sublabel: "Tamano personal",
    priceKey: "tinitaS",
    icon: "🫙",
  },
  {
    key: "tinita-l",
    label: "Tinita Grande",
    sublabel: "Para compartir",
    priceKey: "tinitaL",
    icon: "🫙",
  },
];

/** Genera el cartId unico combinando producto + presentacion */
export function makeCartId(productId, presentationKey) {
  return `${productId}::${presentationKey}`;
}

/** Etiqueta legible para mostrar en el carrito */
export function presentationLabel(key) {
  return PRESENTATIONS.find((p) => p.key === key)?.label ?? key;
}
