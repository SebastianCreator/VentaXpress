import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/products.css'

function Products() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    code: '', barcode: '', name: '', category: '', price: 0, cost: 0, stock: 0, minStock: 5, tax: 0
  })

  const [scanValue, setScanValue] = useState('')
  const [foundProduct, setFoundProduct] = useState(null)
  const [scanError, setScanError] = useState('')
  const token = localStorage.getItem('token')

  const decodeJwtRole = (jwt) => {
    try {
      if (!jwt) return ''
      const parts = jwt.split('.')
      if (parts.length < 2) return ''
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
      return (payload?.role || '').toString().toLowerCase()
    } catch {
      return ''
    }
  }

  const jwtRole = decodeJwtRole(token)




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

  const lookupByScan = async (value) => {
    const trimmed = (value || '').trim()
    if (!trimmed) return null

    const response = await axios.get(`${API_BASE_URL}/api/products/lookup`, {
      params: { value: trimmed }
    })
    return response.data
  }

  const handleScanLookup = async (e) => {
    if (e?.preventDefault) e.preventDefault()
    try {
      setScanError('')
      setFoundProduct(null)

      const product = await lookupByScan(scanValue)
      setFoundProduct(product)
    } catch (error) {
      setScanError(error?.response?.data?.message || 'Producto no encontrado')
      setFoundProduct(null)
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    // Validación visual se hace con jwtRole; validación real la hace el backend (admin).
    if (jwtRole !== 'admin') {
      alert('Solo administradores pueden agregar productos')
      return
    }

    try {
      await axios.post(`${API_BASE_URL}/api/products`, formData, { headers: { Authorization: `Bearer ${token}` } })

      setFormData({ code: '', barcode: '', name: '', category: '', price: 0, cost: 0, stock: 0, minStock: 5, tax: 0 })
      setShowForm(false)
      fetchProducts()
    } catch (error) {
      alert('Error al agregar producto: ' + error.message)
    }
  }

  return (
    <div className="products">
      <h1>Gestión de Productos</h1>

      <div className="scan-lookup">
        <h2>Escanear / Buscar</h2>
        <form onSubmit={handleScanLookup}>
          <input
            type="text"
            value={scanValue}
            onChange={(e) => setScanValue(e.target.value)}
            placeholder="Escanea barcode o código y presiona Enter"
            autoComplete="off"
          />
          <button type="submit" className="btn-add">Buscar</button>
        </form>
        {scanError && <p className="scan-error">{scanError}</p>}
        {foundProduct && (
          <div className="scan-result">
            <p><strong>Encontrado:</strong> {foundProduct.name} (Código: {foundProduct.code})</p>
            <p>Precio: ${foundProduct.price} | Stock: {foundProduct.stock}</p>
          </div>
        )}
      </div>


      {jwtRole === 'admin' && (
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
            type="text"
            placeholder="Barcode"
            value={formData.barcode}
            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
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
