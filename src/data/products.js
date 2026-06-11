/**
 * products.js — Catalogo de Productos
 *
 * Estructura de precios por presentacion:
 *   prices.barquilla   — precio 1 unidad en barquilla (cono)
 *   prices.tinitaS     — precio 1 tinita pequena
 *   prices.tinitaL     — precio 1 tinita grande
 *
 * NOTA: Ajusta los precios en cada producto segun tus precios reales.
 */
import gelatoRaffaello from "../assets/images/gelato_raffaello.png";
import gelatoNutella from "../assets/images/gelato_nutella.png";
import marquesaChocolate from "../assets/images/marquesa_chocolate.png";
import chocolateIntenso from "../assets/images/chocolate_intenso.png";
import chocoarancia from "../assets/images/chocoarancia.png";
import cheesecakeFrutosRojos from "../assets/images/cheesecake_frutos_rojos.png";
import pavlovaGelato from "../assets/images/pavlova_gelato.png";
import mantecadoTradicional from "../assets/images/mantecado_tradicional.png";
import pieLimon from "../assets/images/pie_limon.png";
import pistachoGelato from "../assets/images/pistacho_gelato.png";

export const products = [
  // ==================== CHOCOLATE ====================
  {
    id: "choc-raffaello",
    name: "Gelato Raffaello",
    description: "Gelato suave de chocolate blanco con coco y almendras.",
    category: "Chocolate",
    image: gelatoRaffaello,
    available: true,
    prices: { barquilla: 2.00, tinitaS: 3.50, tinitaL: 6.00 },
  },
  {
    id: "choc-nutella",
    name: "Gelato Nutella",
    description: "Crema de chocolate con avellanas en una base de chocolate gelato.",
    category: "Chocolate",
    image: gelatoNutella,
    available: true,
    prices: { barquilla: 2.00, tinitaS: 3.50, tinitaL: 6.00 },
  },
  {
    id: "choc-marquesa",
    name: "Marquesa de Chocolate",
    description: "Delicioso gelato inspirado en la tradicional marquesa. Bajo pedido.",
    category: "Chocolate",
    image: marquesaChocolate,
    available: true,
    prices: { barquilla: 2.00, tinitaS: 3.50, tinitaL: 6.00 },
  },
  {
    id: "choc-intenso",
    name: "Chocolate Intenso",
    description: "Gelato puro de cacao oscuro intenso para los verdaderos amantes del chocolate.",
    category: "Chocolate",
    image: chocolateIntenso,
    available: true,
    prices: { barquilla: 2.00, tinitaS: 3.50, tinitaL: 6.00 },
  },
  {
    id: "choc-arancia",
    name: "Chocoarancia (Naranja)",
    description: "Fusion de chocolate base gelato con toques aromaticos de naranja.",
    category: "Chocolate",
    image: chocoarancia,
    available: true,
    prices: { barquilla: 2.00, tinitaS: 3.50, tinitaL: 6.00 },
  },

  // ==================== CREMA ====================
  {
    id: "crema-cheesecake-frutos",
    name: "Cheesecake Frutos Rojos",
    description: "Base de crema gelato con trozos de galleta y sirope de frutos rojos.",
    category: "Crema",
    image: cheesecakeFrutosRojos,
    available: true,
    prices: { barquilla: 2.00, tinitaS: 3.50, tinitaL: 6.00 },
  },
  {
    id: "crema-pavlova",
    name: "Pavlova Gelato",
    description: "Crema base gelato con merengues crujientes y frutos del bosque.",
    category: "Crema",
    image: pavlovaGelato,
    available: true,
    prices: { barquilla: 2.00, tinitaS: 3.50, tinitaL: 6.00 },
  },
  {
    id: "crema-mantecado",
    name: "Mantecado Tradicional",
    description: "Clasico y cremoso gelato de mantecado elaborado artesanalmente.",
    category: "Crema",
    image: mantecadoTradicional,
    available: true,
    prices: { barquilla: 2.00, tinitaS: 3.50, tinitaL: 6.00 },
  },
  {
    id: "crema-pie-limon",
    name: "Pie de Limon",
    description: "Crema de limon citrica con trozos de galleta crujiente y merengue.",
    category: "Crema",
    image: pieLimon,
    available: true,
    prices: { barquilla: 2.00, tinitaS: 3.50, tinitaL: 6.00 },
  },
  {
    id: "crema-pistacho",
    name: "Pistacho Gelato",
    description: "Cremoso gelato preparado con pistachos puros seleccionados.",
    category: "Crema",
    image: pistachoGelato,
    available: true,
    prices: { barquilla: 2.50, tinitaS: 4.50, tinitaL: 8.00 },
  },
];

export const categories = ["Todos", "Chocolate", "Crema"];
