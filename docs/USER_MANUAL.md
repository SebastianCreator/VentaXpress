# Manual de Usuario - VentaXpress

## 📚 Tabla de Contenidos

1. [Acceso al Sistema](#acceso)
2. [Dashboard](#dashboard)
3. [Módulo de Ventas](#ventas)
4. [Gestión de Productos](#productos)
5. [Control de Inventario](#inventario)
6. [Reportes](#reportes)
7. [Preguntas Frecuentes](#faq)

---

## 🔐 Acceso al Sistema {#acceso}

### Primer Acceso

1. Abrir navegador y ir a: `http://localhost:3000`
2. Ingresar credenciales:
   - **Email**: Tu correo registrado
   - **Contraseña**: Tu contraseña

3. Hacer clic en "Iniciar Sesión"

### Roles de Usuario

- **Admin**: Acceso completo a todas las funciones
- **Cajero**: Acceso a ventas, productos e inventario

### Cerrar Sesión

Hacer clic en "Cerrar Sesión" en la esquina superior derecha

---

## 📊 Dashboard {#dashboard}

El dashboard es tu punto de inicio con métricas clave del negocio.

### Indicadores Clave (KPIs)

1. **Total de Ventas**: Número de transacciones realizadas
2. **Ingresos Totales**: Monto total de dinero recaudado
3. **Ticket Promedio**: Monto promedio por venta
4. **Productos en Stock Bajo**: Alertas de inventario crítico

### Gráfico de Ventas

Muestra los **10 productos más vendidos** en un gráfico de barras

**Interpretación:**
- Eje X: Nombre del producto
- Eje Y: Cantidad vendida

---

## 🛒 Módulo de Ventas {#ventas}

### Registrar una Venta

#### Paso 1: Seleccionar Producto

1. En la sección "Agregar Productos"
2. Hacer clic en el dropdown "Seleccionar producto..."
3. Elegir un producto (se muestra nombre y precio)

#### Paso 2: Ingresar Cantidad

1. Escribir la cantidad en el campo "Cantidad"
2. Hacer clic en botón "Agregar"

#### Paso 3: Revisar Items

En la tabla "Items de la Venta" se muestran:
- **Producto**: Nombre del artículo
- **Cant.**: Cantidad solicitada
- **P. Unitario**: Precio por unidad
- **Subtotal**: Cantidad × Precio

Para eliminar un item, hacer clic en "Eliminar"

#### Paso 4: Procesar Venta

1. En la sección "Resumen":
   - Se calcula automáticamente el subtotal
   - Se aplica impuesto (16%)
   - Se puede ingresar descuento (opcional)

2. Seleccionar método de pago:
   - 💵 Efectivo
   - 💳 Tarjeta
   - 📝 Cheque

3. Hacer clic en "Procesar Venta"

4. Sistema confirmará: "¡Venta completada!"

### Cálculos Automáticos

```
Subtotal = Σ(Cantidad × Precio)
Impuesto = Subtotal × 16%
Descuento = Valor ingresado
Total = Subtotal + Impuesto - Descuento
```

---

## 📦 Gestión de Productos {#productos}

### Ver Productos

1. Ir a menú → "Productos"
2. Se muestra tabla con:
   - **Código**: ID único del producto
   - **Nombre**: Descripción
   - **Categoría**: Tipo de producto
   - **Precio**: Precio de venta
   - **Stock**: Cantidad disponible
   - **Estado**: ✓ Normal o ⚠️ Stock Bajo

### Agregar Nuevo Producto (Solo Admin)

1. Hacer clic en botón "Nuevo Producto"
2. Completar formulario:
   - **Código**: ID único (ej: PROD-001)
   - **Nombre**: Descripción del producto
   - **Categoría**: Clasificación
   - **Precio**: Precio de venta
   - **Costo**: Costo de adquisición
   - **Stock**: Cantidad inicial

3. Hacer clic en "Guardar Producto"

### Estados de Producto

- **✓ Verde**: Stock suficiente
- **⚠️ Rojo**: Stock por debajo del mínimo (ALERTAR)

---

## 📋 Control de Inventario {#inventario}

### Vista de Inventario

1. Ir a menú → "Inventario"
2. Se muestran tarjetas con estadísticas:
   - **Total de Productos**: Cantidad de ítems únicos
   - **Stock Bajo** ⚠️: Productos críticos

### Productos con Stock Bajo

Tabla que muestra:
- **Código**: Identificador del producto
- **Nombre**: Descripción
- **Stock Actual**: Cantidad disponible ahora
- **Stock Mínimo**: Nivel de alerta configurado
- **Diferencia**: Cuánto falta para alcanzar el mínimo

### Acciones

- Si **Diferencia es negativa**: Necesita reorden urgentemente
- Reportar a encargado de compras

---

## 📈 Reportes {#reportes}

### Generar Reportes

1. Ir a menú → "Reportes"
2. Establecer filtros (opcional):
   - **Fecha Inicio**: YYYY-MM-DD
   - **Fecha Fin**: YYYY-MM-DD

3. Hacer clic en "Filtrar"

### Métricas del Reporte

Se muestran tarjetas con:

1. **Total de Ventas**: Cantidad de transacciones
2. **Ingresos Totales**: Dinero recaudado
3. **Ticket Promedio**: Promedio por venta
4. **Impuestos**: Total de impuestos cobrados
5. **Descuentos**: Total de descuentos aplicados

### Métodos de Pago

Desglose de ingresos por:
- 💵 Efectivo
- 💳 Tarjeta
- 📝 Cheque

### Exportar Reporte

Hacer clic en botón "Descargar PDF" para generar:
- Archivo PDF descargable
- Listo para impresión
- Contiene todas las métricas

---

## ⚙️ Configuración del Menú {#menu}

### Elementos del Menú Lateral

Hacer clic en el ícono **☰** para expandir/colapsar:

| Ícono | Opción | Descripción |
|-------|--------|-------------|
| 📊 | Dashboard | Inicio y KPIs |
| 🛒 | Ventas | Registrar ventas |
| 📦 | Productos | Catálogo y gestión |
| 📋 | Inventario | Control de stock |
| 📈 | Reportes | Análisis y exportación |

---

## ❓ Preguntas Frecuentes {#faq}

### P: ¿Cómo recupero mi contraseña?

R: Contactar al administrador del sistema. No hay recuperación automática.

### P: ¿Qué pasa si me equivoco al registrar una venta?

R: Por ahora no se puede cancelar. Contactar al administrador para ajustes manuales.

### P: ¿El sistema guarda respaldos?

R: Sí, MongoDB realiza copias automáticas. Consultar con administrador.

### P: ¿Puedo acceder desde móvil?

R: Sí, el diseño es responsive. Usar mismo enlace desde navegador móvil.

### P: ¿Qué significa "Stock Bajo"?

R: Producto con stock ≤ stock mínimo configurado. Requiere reorden.

### P: ¿Cuál es el impuesto por defecto?

R: 16% (configurable por producto)

### P: ¿Puedo modificar una venta después de procesada?

R: No. Las ventas son inmutables por auditoría. Contactar admin.

### P: ¿Qué roles existen?

R: 
- **Admin**: Control completo
- **Cajero**: Solo ventas, productos e inventario

---

## 💡 Tips y Mejores Prácticas

### Para Cajeros

1. ✓ Verificar siempre cantidad y precio antes de procesar
2. ✓ Usar método de pago correcto
3. ✓ Revisar alertas de stock bajo
4. ✓ Registrar notas si la venta tiene condiciones especiales

### Para Administradores

1. ✓ Actualizar stock mínimos regularmente
2. ✓ Monitorear productos con stock bajo
3. ✓ Generar reportes semanales
4. ✓ Hacer respaldos regulares
5. ✓ Revisar acceso de usuarios

---

## 📞 Soporte

Para problemas técnicos:
1. Contactar al administrador del sistema
2. Proporcionar:
   - Descripción del problema
   - Hora exacta del incidente
   - Pasos para reproducir

---

## 📝 Registro de Cambios

### Versión 1.0.0
- Sistema inicial
- Funciones de venta, productos, inventario
- Reportes básicos
- Autenticación y roles

