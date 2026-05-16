# Guía de Instalación y Configuración

## 📋 Requisitos Previos

- Node.js v16 o superior
- npm o yarn
- MongoDB Atlas cuenta (https://www.mongodb.com/cloud/atlas)
- Git

## 🔧 Configuración de MongoDB Atlas

1. Crear una cuenta en MongoDB Atlas
2. Crear un nuevo cluster (seleccionar plan gratuito)
3. Crear usuario y contraseña
4. Obtener connection string
5. Reemplazar en `.env`

## 🛠️ Instalación Backend

### Paso 1: Navegar a la carpeta backend

```bash
cd backend
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` y reemplazar:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ventaxpress
JWT_SECRET=your_very_secure_secret_key_here
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Paso 4: Iniciar servidor de desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

## 🎨 Instalación Frontend

### Paso 1: Navegar a la carpeta frontend

```bash
cd frontend
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Iniciar servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## 🧪 Pruebas Iniciales

### 1. Crear usuario de prueba (en backend)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@ventaxpress.com",
    "password": "Password123!",
    "role": "admin"
  }'
```

### 2. Login en la interfaz

- URL: http://localhost:3000/login
- Email: admin@ventaxpress.com
- Contraseña: Password123!

### 3. Agregar productos de prueba

En la sección "Productos":
- Código: PROD-001
- Nombre: Producto de Prueba
- Categoría: Electrónica
- Precio: 100.00
- Stock: 50

## 📊 Estructura de Base de Datos

### Colecciones

#### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (único),
  password: String (encriptada),
  role: String (admin | cajero),
  phone: String,
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Products
```javascript
{
  _id: ObjectId,
  code: String (único),
  name: String,
  description: String,
  category: String,
  price: Number,
  cost: Number,
  stock: Number,
  minStock: Number,
  barcode: String,
  image: String,
  isActive: Boolean,
  tax: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Sales
```javascript
{
  _id: ObjectId,
  saleNumber: String (único),
  cashier: ObjectId (ref User),
  items: [{
    product: ObjectId (ref Product),
    quantity: Number,
    unitPrice: Number,
    subtotal: Number,
    tax: Number
  }],
  subtotal: Number,
  tax: Number,
  discount: Number,
  total: Number,
  paymentMethod: String,
  notes: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Compilación para Producción

### Backend

```bash
cd backend
npm run build
NODE_ENV=production npm start
```

### Frontend

```bash
cd frontend
npm run build
# Desplegar contenido de dist/
```

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"

- Verificar que la URI de MongoDB sea correcta
- Verificar conexión a internet
- Verificar que IP esté whitelisted en MongoDB Atlas

### Error: "CORS error"

- Verificar que CORS_ORIGIN en .env coincida con frontend
- En desarrollo: `http://localhost:3000`

### Error: "JWT token expired"

- El token tiene expiración configurada en JWT_EXPIRE
- Usuario debe loguearse nuevamente

## 📈 Performance

### Optimizaciones Recomendadas

1. **Índices en MongoDB**:
   - Products: índice en `code` y `name`
   - Users: índice en `email`
   - Sales: índice en `createdAt` y `cashier`

2. **Caché**:
   - Considerar Redis para sesiones
   - Caché de productos en frontend

3. **CDN**:
   - Usar CDN para archivos estáticos

## 🔒 Seguridad en Producción

1. Cambiar todos los secretos por valores fuertes
2. Usar HTTPS
3. Configurar CORS restrictivo
4. Implementar rate limiting
5. Usar variables de entorno seguros
6. Validar y sanitizar todas las entradas
7. Implementar logging y monitoreo

## 📞 Soporte

Para preguntas o problemas, consultar la documentación de API.md
