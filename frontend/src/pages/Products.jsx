import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import '../styles/products.css'
import '../styles/modal.css'


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
  const [productsError, setProductsError] = useState('')
  const token = localStorage.getItem('token')

  // Modal create/edit
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create') // 'create' | 'edit'
  const [editingId, setEditingId] = useState(null)
  const [modalSubmitting, setModalSubmitting] = useState(false)



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

  // Para depurar por qué no carga la lista de productos
  // (puedes borrar esto después de validar)
  // console.log({ jwtRole, token });





  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setProductsError('')
      const response = await axios.get(`${API_BASE_URL}/api/products`, {

        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      const msg = error?.response?.data?.message || error?.message || 'Error al cargar productos'
      setProductsError(msg)
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

  const openCreateModal = () => {
    setModalMode('create')
    setEditingId(null)
    setModalSubmitting(false)
    setFormData({ code: '', barcode: '', name: '', category: '', price: 0, cost: 0, stock: 0, minStock: 5, tax: 0 })
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setModalMode('edit')
    setEditingId(product._id)
    setModalSubmitting(false)
    setFormData({
      code: product.code || '',
      barcode: product.barcode || '',
      name: product.name || '',
      category: product.category || '',
      price: product.price ?? 0,
      cost: product.cost ?? 0,
      stock: product.stock ?? 0,
      minStock: product.minStock ?? 5,
      tax: product.tax ?? 0
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    if (modalSubmitting) return
    setIsModalOpen(false)
    setEditingId(null)
    setModalMode('create')
  }

  const submitModal = async (e) => {
    e.preventDefault()

    if (jwtRole !== 'admin') {
      alert('Solo administradores pueden modificar productos')
      return
    }

    try {
      setModalSubmitting(true)

      if (modalMode === 'create') {
        await axios.post(`${API_BASE_URL}/api/products`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.put(`${API_BASE_URL}/api/products/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }

      setIsModalOpen(false)
      setEditingId(null)
      setModalMode('create')
      setFormData({ code: '', barcode: '', name: '', category: '', price: 0, cost: 0, stock: 0, minStock: 5, tax: 0 })
      fetchProducts()
    } catch (error) {
      alert(`${modalMode === 'create' ? 'Error al agregar producto' : 'Error al editar producto'}: ` + (error?.message || error))
    } finally {
      setModalSubmitting(false)
    }
  }

  const handleAddProduct = async (e) => {
    // Mantener por compatibilidad: ahora crea/edita desde modal.
    return submitModal(e)
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


      {productsError && <p className="products-error">{productsError}</p>}

      {jwtRole === 'admin' && (
        <button onClick={openCreateModal} className="btn-add">
          Nuevo Producto
        </button>
      )}

      {isModalOpen && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <div className="modal-card">
            <div className="modal-header">
              <div className="modal-title">
                {modalMode === 'create' ? 'Crear Producto' : 'Editar Producto'}
              </div>
              <button className="modal-close" type="button" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={submitModal} className="modal-form">
                <div className="field">
                  <label>Código</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    required
                    disabled={modalMode === 'edit' && !!editingId}
                  />
                </div>

                <div className="field">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="field">
                  <label>Categoría</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>

                <div className="field">
                  <label>Barcode</label>
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  />
                </div>

                <div className="field">
                  <label>Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>

                <div className="field">
                  <label>Costo</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="field">
                  <label>Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  />
                </div>

                <div className="field">
                  <label>Min Stock</label>
                  <input
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) })}
                  />
                </div>

                <div className="field">
                  <label>Impuesto (%)</label>
                  <input
                    type="number"
                    value={formData.tax}
                    onChange={(e) => setFormData({ ...formData, tax: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label>Activo</label>
                  <select
                    value={formData.isActive ?? true}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button type="button" className="modal-btn secondary" onClick={closeModal} disabled={modalSubmitting}>
                    Cancelar
                  </button>
                  <button type="submit" className="modal-btn primary" disabled={modalSubmitting}>
                    {modalSubmitting ? 'Guardando...' : (modalMode === 'create' ? 'Crear' : 'Guardar Cambios')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
            <th>Acciones</th>
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
              <td>
                {jwtRole === 'admin' && (
                  <button
                    className="btn-edit"
                    type="button"
                    onClick={() => openEditModal(product)}
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Products
