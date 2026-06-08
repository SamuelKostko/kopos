# Heladería Kopos — Landing Page

Landing page moderna y de alta conversión para pedidos por WhatsApp.

## Estructura del proyecto

```
src/
├── assets/images/    ← Imágenes del proyecto (reemplazar con fotos reales)
├── components/       ← Componentes React de cada sección
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Catalog.jsx
│   ├── ProductCard.jsx
│   ├── CartDrawer.jsx
│   └── FloatingCartBar.jsx
├── config/
│   └── shopConfig.js ← ⭐ EDITA ESTE ARCHIVO PRIMERO
├── data/
│   └── products.js   ← ⭐ CATÁLOGO DE PRODUCTOS
├── hooks/
│   └── useCart.js    ← Lógica del carrito
└── utils/
    └── whatsapp.js   ← Generador de enlace de WhatsApp
```

## Personalización rápida (en orden)

1. **`src/config/shopConfig.js`** — Nombre, WhatsApp, horarios, redes sociales
2. **`src/data/products.js`** — Tu catálogo de sabores y precios
3. **`src/assets/images/`** — Reemplaza las fotos de ejemplo con tus fotos reales
4. **`public/favicon.svg`** — Reemplaza con tu logo en formato SVG

## Comandos

```bash
npm run dev     # Servidor de desarrollo (http://localhost:5173)
npm run build   # Build para producción
npm run preview # Previsualizar el build
```

## Número de WhatsApp

Edita `src/config/shopConfig.js`:
```js
whatsappNumber: "58412XXXXXXX", // Sin el signo +
```
