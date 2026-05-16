import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/inventory.css'

function Inventory() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [inventory, setInventory] = useState([])
  const [stats, setStats] = useState({ total: 0, lowStock: 0 })
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
await axios.get(`${API_BASE_URL}/api/inventory`, { headers: { Authorization: `Bearer ${token}` } })
      setInventory(response.data.products)
      setStats({ total: response.data.total, lowStock: response.data.lowStock })
    } catch (error) {
      console.error('Error fetching inventory:', error)
    }
  }

  const lowStockProducts = inventory.filter(p => p.stock <= p.minStock)

  return (
    <div className="inventory">
      <h1>Control de Inventario</h1>

      <div className="inventory-stats">
        <div className="stat-card">
          <h3>Total de Productos</h3>
          <p className="stat-value">{stats.total}</p>
        </div>
        <div className="stat-card alert">
          <h3>Stock Bajo</h3>
          <p className="stat-value">{stats.lowStock}</p>
        </div>
      </div>

      <h2>Productos con Stock Bajo</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Stock Actual</th>
            <th>Stock Mínimo</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {lowStockProducts.map(product => (
            <tr key={product._id} className="low-stock">
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.minStock}</td>
              <td className="negative">{product.stock - product.minStock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {lowStockProducts.length === 0 && (
        <p className="no-data">✓ Todos los productos tienen stock adecuado</p>
      )}
    </div>
  )
}

export default Inventory
