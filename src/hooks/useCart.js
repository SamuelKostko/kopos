/**
 * useCart.js — Hook del Carrito de Pedido
 * Cada item en el carrito representa un producto + presentacion especifica.
 * cartId = productId::presentationKey (permite el mismo sabor en distintas presentaciones)
 * qty = entero de unidades (1, 2, 3...)
 */
import { useState, useCallback } from "react";
import { makeCartId } from "../utils/presentations";

export function useCart() {
  const [items, setItems] = useState([]);

  /**
   * Agrega 1 unidad de un producto con una presentacion especifica.
   * @param {object} product  — objeto completo del producto
   * @param {string} presentationKey — 'barquilla' | 'tinita-s' | 'tinita-l'
   * @param {number} price    — precio unitario de esa presentacion
   * @param {string} presentationLabel — etiqueta legible (ej: "Tinita Grande")
   */
  const addItem = useCallback((product, presentationKey, price, label) => {
    const cartId = makeCartId(product.id, presentationKey);
    setItems((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartId,
          id: product.id,
          name: product.name,
          image: product.image,
          presentation: presentationKey,
          presentationLabel: label,
          price,
          qty: 1,
        },
      ];
    });
  }, []);

  /** Quita 1 unidad; si llega a 0 elimina el item del carrito */
  const removeItem = useCallback((cartId) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (!existing) return prev;
      if (existing.qty <= 1) return prev.filter((i) => i.cartId !== cartId);
      return prev.map((i) =>
        i.cartId === cartId ? { ...i, qty: i.qty - 1 } : i
      );
    });
  }, []);

  /** Elimina un item completamente sin importar la cantidad */
  const removeItemCompletely = useCallback((cartId) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return { items, addItem, removeItem, removeItemCompletely, clearCart, totalItems, totalPrice };
}
