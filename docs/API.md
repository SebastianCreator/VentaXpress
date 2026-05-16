# Documentación de API - VentaXpress

## URL Base

```
http://localhost:5000/api
```

## 🔐 Autenticación

Todos los endpoints (excepto auth) requieren token JWT en el header:

```
Authorization: Bearer <token>
```

## 📝 Endpoints

### Autenticación

#### POST /auth/register

Registrar nuevo usuario

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "SecurePass123!",
  "role": "cajero"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "cajero"
  }
}
```

#### POST /auth/login

Iniciar sesión

**Request:**
```json
{
  "email": "juan@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "cajero"
  }
}
```

#### POST /auth/logout

Cerrar sesión (requiere token)

**Response (200):**
```json
{
  "message": "Sesión cerrada exitosamente"
}
```

---

### Productos

#### GET /products

Obtener lista de productos

**Query Parameters:**
- `category` (optional): filtrar por categoría
- `search` (optional): búsqueda por nombre o código

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "code": "PROD-001",
    "name": "Laptop",
    "category": "Electrónica",
    "price": 999.99,
    "cost": 600.00,
    "stock": 10,
    "minStock": 5,
    "tax": 16,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### GET /products/:id

Obtener producto específico

**Response (200):** Objeto de producto (ver arriba)

#### POST /products

Crear nuevo producto (requiere rol: admin)

**Request:**
```json
{
  "code": "PROD-002",
  "name": "Mouse Inalámbrico",
  "description": "Mouse inalámbrico de precisión",
  "category": "Accesorios",
  "price": 25.99,
  "cost": 12.00,
  "stock": 100,
  "minStock": 10,
  "tax": 16
}
```

**Response (201):** Objeto de producto creado

#### PUT /products/:id

Actualizar producto (requiere rol: admin)

**Request:** (los mismos campos que POST)

**Response (200):** Objeto de producto actualizado

#### DELETE /products/:id

Desactivar producto (requiere rol: admin)

**Response (200):**
```json
{
  "message": "Producto eliminado"
}
```

---

### Ventas

#### POST /sales

Crear nueva venta

**Request:**
```json
{
  "items": [
    {
      "product": "507f1f77bcf86cd799439011",
      "quantity": 2
    },
    {
      "product": "507f1f77bcf86cd799439012",
      "quantity": 1
    }
  ],
  "discount": 10.00,
  "paymentMethod": "cash",
  "notes": "Venta especial"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "saleNumber": "SALE-1705315800000",
  "cashier": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Juan Pérez"
  },
  "items": [
    {
      "product": {...},
      "quantity": 2,
      "unitPrice": 25.99,
      "subtotal": 51.98,
      "tax": 8.32
    }
  ],
  "subtotal": 51.98,
  "tax": 8.32,
  "discount": 10.00,
  "total": 50.30,
  "paymentMethod": "cash",
  "status": "completed",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### GET /sales

Obtener lista de ventas

**Query Parameters:**
- `startDate` (optional): YYYY-MM-DD
- `endDate` (optional): YYYY-MM-DD
- `cashier` (optional): ID del cajero

**Response (200):** Array de ventas

#### GET /sales/:id

Obtener detalles de una venta

**Response (200):** Objeto de venta

---

### Inventario

#### GET /inventory

Obtener estado del inventario

**Response (200):**
```json
{
  "total": 50,
  "lowStock": 3,
  "products": [...]
}
```

#### PUT /inventory/adjust/:id

Ajustar stock de un producto (requiere rol: admin)

**Request:**
```json
{
  "quantity": 10,
  "reason": "Compra a proveedor"
}
```

**Response (200):**
```json
{
  "message": "Inventario ajustado",
  "product": {...}
}
```

---

### Reportes

#### GET /reports/sales-summary

Resumen de ventas

**Query Parameters:**
- `startDate` (optional): YYYY-MM-DD
- `endDate` (optional): YYYY-MM-DD

**Response (200):**
```json
{
  "totalSales": 45,
  "totalRevenue": 4520.50,
  "totalTax": 723.28,
  "totalDiscount": 150.00,
  "averageTicket": 100.46,
  "paymentMethods": {
    "cash": 3000.00,
    "card": 1520.50
  }
}
```

#### GET /reports/top-products

Productos más vendidos

**Query Parameters:**
- `limit` (optional): número de productos (default: 10)

**Response (200):**
```json
[
  {
    "name": "Laptop",
    "quantity": 15,
    "revenue": 14999.85
  },
  {
    "name": "Mouse",
    "quantity": 45,
    "revenue": 1169.55
  }
]
```

---

### Usuarios

#### GET /users

Obtener lista de usuarios (requiere rol: admin)

**Response (200):** Array de usuarios (sin contraseñas)

#### GET /users/profile

Obtener perfil del usuario actual

**Response (200):** Objeto de usuario actual

#### PUT /users/:id

Actualizar usuario (requiere rol: admin)

**Request:**
```json
{
  "name": "Nuevo Nombre",
  "phone": "123456789",
  "role": "admin"
}
```

**Response (200):** Objeto de usuario actualizado

---

## 🔄 Códigos de Error

- `200`: OK
- `201`: Creado
- `400`: Solicitud inválida
- `401`: No autenticado
- `403`: No autorizado
- `404`: No encontrado
- `500`: Error interno del servidor

## 📊 Modelos de Datos

### User
```
id: ObjectId
name: String
email: String
password: String (encriptada)
role: 'admin' | 'cajero'
phone: String
isActive: Boolean
lastLogin: Date
createdAt: Date
updatedAt: Date
```

### Product
```
id: ObjectId
code: String
name: String
category: String
price: Number
cost: Number
stock: Number
minStock: Number
tax: Number
isActive: Boolean
createdAt: Date
```

### Sale
```
id: ObjectId
saleNumber: String
cashier: ObjectId (User)
items: Array of Items
subtotal: Number
tax: Number
discount: Number
total: Number
paymentMethod: 'cash' | 'card' | 'check'
status: 'completed' | 'cancelled'
createdAt: Date
```

## 🧪 Ejemplos con cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ventaxpress.com",
    "password": "password123"
  }'
```

### Obtener Productos
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Crear Venta
```bash
curl -X POST http://localhost:5000/api/sales \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"product": "ID", "quantity": 2}],
    "paymentMethod": "cash"
  }'
```

