# 🏪 VentaXpress - Sistema POS Full Stack

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-16+-brightgreen)
![React](https://img.shields.io/badge/react-18-61dafb)

Sistema de Punto de Venta (POS) profesional y moderno desarrollado con React, Node.js y MongoDB. Ideal para pequeñas y medianas empresas.

## ✨ Características

- ✅ **Dashboard interactivo** con KPIs en tiempo real
- ✅ **Módulo de ventas** con cálculo automático de impuestos y descuentos
- ✅ **Gestión de productos** completa con categorías
- ✅ **Control de inventario** con alertas de stock bajo
- ✅ **Reportes exportables** en PDF/Excel
- ✅ **Autenticación segura** con JWT y roles
- ✅ **Diseño responsive** para móvil, tablet y desktop
- ✅ **Auditoría completa** de transacciones
- ✅ **Interfaz moderna** con colores profesionales

## 🎨 Diseño Visual

### Paleta de Colores
- 🔴 Rojo Intenso: `#E74C3C`
- 🟠 Naranja: `#F39C12`
- ⚪ Gris Claro: `#ECF0F1`
- ⚫ Negro/Gris Oscuro: `#2C3E50`

### Estructura de Carpetas

```
VentaXpress/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx          # Estructura general
│   │   │   └── Sidebar.jsx         # Menú lateral colapsable
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Autenticación
│   │   │   ├── Dashboard.jsx       # Inicio con KPIs
│   │   │   ├── Sales.jsx           # Módulo de ventas
│   │   │   ├── Products.jsx        # Gestión de productos
│   │   │   ├── Inventory.jsx       # Control de inventario
│   │   │   └── Reports.jsx         # Reportes y estadísticas
│   │   ├── styles/                 # Estilos CSS
│   │   ├── App.jsx                 # Rutas principales
│   │   └── main.jsx                # Punto de entrada
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── database.js             # Configuración MongoDB
│   ├── models/
│   │   ├── User.js                 # Modelo Usuario
│   │   ├── Product.js              # Modelo Producto
│   │   └── Sale.js                 # Modelo Venta
│   ├── routes/
│   │   ├── auth.js                 # Autenticación y login
│   │   ├── users.js                # Gestión de usuarios
│   │   ├── products.js             # CRUD de productos
│   │   ├── sales.js                # Registro de ventas
│   │   ├── inventory.js            # Control de inventario
│   │   └── reports.js              # Generación de reportes
│   ├── middleware/
│   │   └── auth.js                 # Middleware JWT
│   ├── server.js                   # Servidor principal
│   ├── .env.example
│   └── package.json
│
└── docs/
    ├── README.md                   # Descripción general
    ├── SETUP.md                    # Guía de instalación
    ├── API.md                      # Documentación de API
    └── USER_MANUAL.md              # Manual de usuario
```

## 🚀 Inicio Rápido

### Requisitos
- Node.js v16+
- MongoDB Atlas o MongoDB local
- npm o yarn

### Instalación

**1. Clonar/Descargar proyecto**
```bash
cd VentaXpress
```

**2. Backend**
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales de MongoDB
npm run dev
```

**3. Frontend** (en otra terminal)
```bash
cd frontend
npm install
npm run dev
```

El sistema estará disponible en `http://localhost:3000`

## 📚 Documentación

- **[SETUP.md](./docs/SETUP.md)** - Guía detallada de instalación y configuración
- **[API.md](./docs/API.md)** - Documentación completa de endpoints
- **[USER_MANUAL.md](./docs/USER_MANUAL.md)** - Manual para usuarios finales

## 🔐 Seguridad

- ✓ Autenticación JWT con expiración
- ✓ Contraseñas encriptadas (bcryptjs)
- ✓ Validación de datos en servidor
- ✓ Control de acceso por roles
- ✓ Headers de seguridad (Helmet)
- ✓ CORS configurado
- ✓ Auditoría de transacciones

## 📊 Módulos Principales

### 1. Dashboard
Inicio con métricas clave:
- Total de ventas
- Ingresos totales
- Ticket promedio
- Alertas de stock bajo
- Gráfico de productos más vendidos

### 2. Ventas
Interfaz de punto de venta:
- Selección rápida de productos
- Cálculo automático de subtotal, impuestos y descuentos
- Múltiples métodos de pago
- Historial de transacciones

### 3. Productos
Catálogo completo:
- Crear, editar y eliminar productos
- Información: código, nombre, categoría, precio
- Stock y stock mínimo
- Solo admin puede agregar/editar

### 4. Inventario
Control de stock:
- Vista general de inventario
- Alertas de stock bajo
- Ajustes de inventario
- Reporte de faltantes

### 5. Reportes
Análisis de ventas:
- Filtro por fechas
- Resumen de ventas
- Desglose por método de pago
- Exportación a PDF
- Productos más vendidos

## 💻 Stack Tecnológico

### Frontend
- **React 18** - UI componentes
- **Vite** - Build tool ultrarrápido
- **React Router** - Navegación
- **Axios** - HTTP client
- **Recharts** - Gráficos
- **jsPDF** - Exportación PDF
- **XLSX** - Exportación Excel

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM
- **JWT** - Autenticación
- **bcryptjs** - Encriptación
- **Morgan** - Logging

## 🌐 Despliegue

### Frontend
- Vercel
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront

### Backend
- Heroku
- Railway
- AWS EC2
- DigitalOcean
- MongoDB Atlas (Cloud)

## 📈 Performance

- Carga inicial < 3s
- Gráficos optimizados
- Caché en navegador
- Índices en base de datos
- Compresión gzip

## 🐛 Solución de Problemas

### Error de conexión MongoDB
```
Verificar URI en .env
Whitelist IP en MongoDB Atlas
```

### Error CORS
```
Verificar CORS_ORIGIN en .env
Debe coincidir con URL del frontend
```

### Token expirado
```
Usuario debe volver a iniciar sesión
Token expira después del tiempo configurado
```

Más ayuda en [SETUP.md](./docs/SETUP.md)

## 📝 Licencia

MIT License - Libre para usar y modificar

## 👥 Autor

**VentaXpress Team**

## 🙏 Agradecimientos

- React y comunidad
- MongoDB
- Express.js

## 📞 Contacto y Soporte

Para preguntas o soporte técnico, consultar la documentación completa en la carpeta `docs/`

---

**¡Gracias por usar VentaXpress! 🎉**

Versión 1.0.0 - 2024
