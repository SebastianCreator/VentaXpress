# VentaXpress - Sistema POS Full Stack

## 📋 Descripción General

**VentaXpress** es un sistema de Punto de Venta (POS) profesional y moderno desarrollado con tecnologías modernas. Diseñado para pequeñas y medianas empresas, ofrece funcionalidades completas de ventas, inventario, reportes y auditoría.

## 🎯 Características Principales

- **Dashboard Interactivo**: KPIs de ventas, inventario y flujo de caja en tiempo real
- **Sistema de Ventas**: Interfaz intuitiva para registrar ventas con cálculo automático de impuestos
- **Gestión de Productos**: Catálogo completo con categorías y códigos de barras
- **Control de Inventario**: Alertas automáticas de stock bajo
- **Reportes**: Generación de reportes en PDF/Excel con análisis de ventas
- **Autenticación JWT**: Seguridad con roles (Admin, Cajero)
- **Diseño Responsive**: Funciona en computadoras, tablets y móviles
- **Auditoría**: Historial completo de transacciones

## 🏗️ Arquitectura

### Stack Tecnológico

**Frontend:**
- React 18 con Vite
- React Router para navegación
- Axios para llamadas HTTP
- Recharts para gráficos
- jsPDF y XLSX para exportación

**Backend:**
- Node.js con Express
- MongoDB con Mongoose
- JWT para autenticación
- bcryptjs para encriptación de contraseñas
- Morgan para logging

## 📁 Estructura del Proyecto

```
VentaXpress/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Sales.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Inventory.jsx
│   │   │   └── Reports.jsx
│   │   ├── styles/
│   │   │   └── *.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Sale.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── products.js
│   │   ├── sales.js
│   │   ├── inventory.js
│   │   └── reports.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── docs/
    ├── README.md
    ├── SETUP.md
    ├── API.md
    └── USER_MANUAL.md
```

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js v16+
- npm o yarn
- MongoDB Atlas (o MongoDB local)

### Instalación Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run dev
```

### Instalación Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## 🔐 Seguridad

- Autenticación JWT con expiración configurable
- Contraseñas encriptadas con bcryptjs
- Validación de datos en servidor
- Middleware CORS configurado
- Headers de seguridad con Helmet
- Roles de usuario para control de acceso

## 📚 Documentación Adicional

- [SETUP.md](./SETUP.md) - Guía detallada de instalación
- [API.md](./API.md) - Documentación de endpoints
- [USER_MANUAL.md](./USER_MANUAL.md) - Manual del usuario

## 🎨 Paleta de Colores

- **Rojo Intenso**: #E74C3C
- **Naranja**: #F39C12
- **Gris Claro**: #ECF0F1
- **Negro/Gris Oscuro**: #2C3E50

## 📦 Despliegue

El proyecto está listo para desplegar en:

- **Frontend**: Firebase Hosting, Vercel, Netlify
- **Backend**: Heroku, Railway, AWS, DigitalOcean

## 📝 Licencia

MIT License

## 👥 Autor

VentaXpress Team
