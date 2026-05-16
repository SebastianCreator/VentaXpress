import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/sales.css'

function Sales() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [items, setItems] = useState([])
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`, { headers: { Authorization: `Bearer ${token}` } })
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const addItem = () => {
    if (!selectedProduct || quantity <= 0) return

    const product = products.find(p => p._id === selectedProduct)
    if (!product) return

    const newItem = {
      product: product._id,
      name: product.name,
      quantity: parseInt(quantity),
      unitPrice: product.price,
      subtotal: product.price * quantity
    }

    setItems([...items, newItem])
    setSelectedProduct('')
    setQuantity(1)
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0)
    const tax = subtotal * 0.16
    const total = subtotal + tax - discount

    return { subtotal: subtotal.toFixed(2), tax: tax.toFixed(2), total: total.toFixed(2) }
  }

  const handleSale = async () => {
    if (items.length === 0) {
      alert('Añade productos a la venta')
      return
    }

    try {
      const saleData = {
        items: items.map(item => ({
          product: item.product,
          quantity: item.quantity
        })),
        discount: parseFloat(discount),
        paymentMethod
      }

      const response = await axios.post(`${API_BASE_URL}/api/sales`, saleData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert('¡Venta completada!')
      setItems([])
      setDiscount(0)
    } catch (error) {
      alert('Error al procesar la venta: ' + error.message)
    }
  }

  const totals = calculateTotals()

  return (
    <div className="sales">
      <h1>Sistema de Ventas</h1>

      <div className="sales-container">
        <div className="sales-form">
          <h2>Agregar Productos</h2>
          
          <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="">Seleccionar producto...</option>
            {products.map(p => (
              <option key={p._id} value={p._id}>{p.name} - ${p.price}</option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Cantidad"
          />

          <button onClick={addItem} className="btn-add">Agregar</button>
        </div>

        <div className="sales-items">
          <h2>Items de la Venta</h2>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th>P. Unitario</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.unitPrice}</td>
                  <td>${item.subtotal}</td>
                  <td><button onClick={() => removeItem(idx)}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sales-checkout">
          <h2>Resumen</h2>
          <p>Subtotal: <strong>${totals.subtotal}</strong></p>
          <p>Impuesto (16%): <strong>${totals.tax}</strong></p>
          
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Descuento"
            min="0"
          />
          
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cash">Efectivo</option>
            <option value="card">Tarjeta</option>
            <option value="check">Cheque</option>
          </select>

          <p className="total">Total: <strong>${totals.total}</strong></p>
          <button onClick={handleSale} className="btn-sale">Procesar Venta</button>
        </div>
      </div>
    </div>
  )
}

export default Sales
