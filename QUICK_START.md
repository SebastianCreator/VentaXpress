# 🚀 Quick Start - VentaXpress

## ⚡ 5 Minutos para Empezar

### Paso 1: Preparar Variables de Entorno (Backend)

```bash
cd backend
cp .env.example .env
```

Editar `.env` y reemplazar estos valores:
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ventaxpress
JWT_SECRET=tu_clave_super_segura_aqui
CORS_ORIGIN=http://localhost:3000
```

### Paso 2: Instalar y Ejecutar Backend

```bash
# Terminal 1
cd backend
npm install
npm run dev
# Servidor corriendo en http://localhost:5000
```

### Paso 3: Instalar y Ejecutar Frontend

```bash
# Terminal 2
cd frontend
npm install
npm run dev
# App corriendo en http://localhost:3000
```

### Paso 4: Acceder a la Aplicación

1. Abrir navegador: `http://localhost:3000`
2. Login con credenciales (crear usuario primero vía API)

## 📝 Crear Usuario de Prueba

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@test.com",
    "password": "Admin123!",
    "role": "admin"
  }'
```

## ✅ Checklist de Proyecto

### Backend
- [x] Servidor Express configurado
- [x] MongoDB conectado
- [x] Autenticación JWT implementada
- [x] Modelos: User, Product, Sale
- [x] Rutas: auth, users, products, sales, inventory, reports
- [x] Middleware de seguridad
- [x] Validación de datos

### Frontend
- [x] React + Vite configurado
- [x] Rutas con React Router
- [x] Autenticación con JWT
- [x] Componentes: Layout, Sidebar
- [x] Páginas: Login, Dashboard, Sales, Products, Inventory, Reports
- [x] Estilos CSS profesionales
- [x] Integración con API

### Funcionalidades
- [x] Dashboard con KPIs
- [x] Sistema de Ventas completo
- [x] Gestión de Productos
- [x] Control de Inventario
- [x] Generación de Reportes
- [x] Autenticación por Roles

### Documentación
- [x] README.md - Descripción general
- [x] SETUP.md - Guía de instalación detallada
- [x] API.md - Documentación de endpoints
- [x] USER_MANUAL.md - Manual para usuarios
- [x] ARCHITECTURE.md - Diagrama de arquitectura

## 🎯 Próximos Pasos Recomendados

### 1. Desarrollo Local
- [ ] Agregar más productos de prueba
- [ ] Realizar transacciones de prueba
- [ ] Verificar cálculos de impuestos

### 2. Personalizaciones
- [ ] Cambiar colores según marca
- [ ] Agregar logo de empresa
- [ ] Configurar moneda local

### 3. Testing
- [ ] Pruebas unitarias backend
- [ ] Pruebas de integración frontend
- [ ] Validación de seguridad

### 4. Despliegue
- [ ] Configurar MongoDB Atlas
- [ ] Desplegar backend (Heroku/Railway)
- [ ] Desplegar frontend (Vercel/Netlify)

### 5. Mejoras Futuras
- [ ] Implementar cache (Redis)
- [ ] Agregar más reportes
- [ ] Integración con SMS/Email
- [ ] App móvil nativa

## 📞 Problemas Comunes

### Error: "Cannot connect to MongoDB"
```
✓ Verificar MONGODB_URI en .env
✓ Whitelist IP en MongoDB Atlas
✓ Verificar credenciales
```

### Error: "CORS error"
```
✓ Verificar CORS_ORIGIN en .env
✓ Debe ser http://localhost:3000 en desarrollo
```

### Port 3000 o 5000 en uso
```bash
# Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9

# Matar proceso en puerto 5000
lsof -ti:5000 | xargs kill -9
```

## 📚 Recursos Rápidos

- **API Docs**: Consultar `/docs/API.md`
- **User Manual**: Consultar `/docs/USER_MANUAL.md`
- **Setup Completo**: Consultar `/docs/SETUP.md`

## 🎓 Estructura de Carpetas (Resumen)

```
VentaXpress/
├── backend/           # API Node.js + Express
│   ├── models/        # Esquemas MongoDB
│   ├── routes/        # Endpoints
│   ├── middleware/    # Autenticación
│   └── server.js      # Servidor principal
│
├── frontend/          # App React + Vite
│   ├── src/
│   │   ├── pages/     # Páginas principales
│   │   ├── components/# Componentes reutilizables
│   │   ├── styles/    # CSS
│   │   └── App.jsx    # Rutas
│   └── index.html
│
└── docs/              # Documentación
    ├── API.md
    ├── SETUP.md
    ├── README.md
    └── USER_MANUAL.md
```

## 💡 Consejos

1. **Desarrollo**: Usar `npm run dev` (ambos proyectos)
2. **Testing**: Usar Postman para probar API
3. **Debugging**: Abrir DevTools (F12)
4. **Base de Datos**: Monitorear en MongoDB Atlas Dashboard

## 🔐 Variables de Entorno Principales

```bash
# Backend .env
MONGODB_URI=          # Conexión MongoDB
JWT_SECRET=           # Secreto JWT (cambiar!)
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Frontend (proxy en vite.config.js)
API_URL=/api          # Proxy a localhost:5000
```

## ✨ Características Listas para Usar

- ✅ Dashboard interactivo
- ✅ Punto de venta funcional
- ✅ Gestión de inventario
- ✅ Reportes en PDF
- ✅ Control de usuarios
- ✅ Auditoría de transacciones
- ✅ Interfaz responsive

¡Ahora estás listo para comenzar! 🎉

---

**Versión**: 1.0.0
**Última actualización**: 2024-01-15
