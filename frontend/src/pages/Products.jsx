import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/products.css'

function Products() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    code: '', name: '', category: '', price: 0, cost: 0, stock: 0, minStock: 5, tax: 0
  })
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role') || 'cajero'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
axios.get(`${API_BASE_URL}/api/products`, { headers: { Authorization: `Bearer ${token}` } })
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (userRole !== 'admin') {
      alert('Solo administradores pueden agregar productos')
      return
    }

    try {
await axios.post(`${API_BASE_URL}/api/products`, formData, { headers: { Authorization: `Bearer ${token}` } })
      setFormData({ code: '', name: '', category: '', price: 0, cost: 0, stock: 0, minStock: 5, tax: 0 })
      setShowForm(false)
      fetchProducts()
    } catch (error) {
      alert('Error al agregar producto: ' + error.message)
    }
  }

  return (
    <div className="products">
      <h1>Gestión de Productos</h1>

      {userRole === 'admin' && (
        <button onClick={() => setShowForm(!showForm)} className="btn-add">
          {showForm ? 'Cancelar' : 'Nuevo Producto'}
        </button>
      )}

      {showForm && (
        <form onSubmit={handleAddProduct} className="product-form">
          <input
            type="text"
            placeholder="Código"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Categoría"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Costo"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
          />
          <button type="submit">Guardar Producto</button>
        </form>
      )}

      <table className="products-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} className={product.stock <= product.minStock ? 'low-stock' : ''}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.stock <= product.minStock ? '⚠️ Bajo' : '✓'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Products
