# TODO Implementación (VentaXpress POS)

## Objetivo
Corregir cálculo de impuestos en UI vs backend y agregar validación real de stock al procesar ventas.

## Checklist
- [x] Arreglar Sales.jsx: cálculo de impuesto y decimales usando `tax` real por producto.
- [x] Cambiar Sales.jsx para que use `taxRate`/`tax` desde productos al calcular resumen.

- [x] Añadir validación de stock en backend (routes/sales.js) antes de decrementar.
- [x] Proteger desbordes: si falta stock, responder 400 con mensaje claro.

- [x] (Opcional) Agregar validación también en el frontend para mejorar UX.

## Estado
Listo: impuesto UI (completado) + validación stock (backend + UI)




