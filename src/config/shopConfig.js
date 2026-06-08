/**
 * ================================================================
 * shopConfig.js — Configuración Central de la Tienda
 * ================================================================
 * Este archivo centraliza todos los datos que necesitas personalizar.
 * Edita solo este archivo para actualizar la info de tu heladería.
 * ================================================================
 */

// Logos — variantes del branding Kopos
import logoNavbar    from "../assets/images/2.PNG"; // Wordmark "KOPOS" — navbar/footer
import logoHero      from "../assets/images/1.PNG"; // Logo completo — hero
import logoMascot    from "../assets/images/4.PNG"; // Solo mascota — decorativo

export { logoNavbar, logoHero, logoMascot };

export const shopConfig = {
  // ---------------------------------------------------------------
  // NOMBRE E IDENTIDAD
  // Reemplaza con el nombre oficial de tu heladería.
  // ---------------------------------------------------------------
  shopName: "Kopos",
  tagline: "Artesanal de verdad.",
  description:
    "Helados hechos a mano con ingredientes frescos, sin conservantes y con mucho amor desde 2018.",

  // ---------------------------------------------------------------
  // LOGO — ahora usando los archivos reales de Kopos
  // Los logos se importan arriba y se usan directamente en los componentes.
  // Para cambiar un logo, reemplaza el archivo PNG correspondiente en
  // src/assets/images/ manteniendo el mismo nombre de archivo.
  // ---------------------------------------------------------------
  logoAlt: "Logo Heladería Kopos Ice Cream",

  // ---------------------------------------------------------------
  // WHATSAPP
  // Reemplaza con tu número real en formato internacional.
  // Ejemplo para Venezuela: "58412XXXXXXX"
  // Ejemplo para Colombia:  "57300XXXXXXX"
  // NO incluyas el signo + ni espacios.
  // ---------------------------------------------------------------
  whatsappNumber: "58412XXXXXXX",
  whatsappGreeting:
    "Hola! Vi su catálogo en línea y me gustaría hacer el siguiente pedido:\n\n",

  // ---------------------------------------------------------------
  // HORARIOS DE ATENCIÓN
  // Edita los días y horas según tu disponibilidad real.
  // ---------------------------------------------------------------
  schedule: [
    { days: "Lunes a Viernes", hours: "12:00 pm – 9:00 pm" },
    { days: "Sábados y Domingos", hours: "10:00 am – 10:00 pm" },
  ],

  // ---------------------------------------------------------------
  // UBICACIÓN
  // Reemplaza con tu dirección o zona de cobertura.
  // ---------------------------------------------------------------
  location: "Caracas, Venezuela",
  deliveryNote: "Pedidos por WhatsApp con delivery o retiro en tienda.",

  // ---------------------------------------------------------------
  // REDES SOCIALES
  // Deja en null las que no uses.
  // ---------------------------------------------------------------
  social: {
    instagram: "https://instagram.com/heladeria_kopos", // reemplaza tu usuario
    tiktok: null,
    facebook: null,
  },

  // ---------------------------------------------------------------
  // COLORES DE MARCA (para referencia — los tokens CSS están en index.css)
  // ---------------------------------------------------------------
  colors: {
    primary: "#FF3D5A",   // Rosa coral vibrante — CTA principal
    secondary: "#FFB800", // Amarillo mango — acento cálido
    dark: "#0A0A0A",      // Negro profundo — fondo
    light: "#FAFAF8",     // Blanco crudo — secciones claras
  },
};
