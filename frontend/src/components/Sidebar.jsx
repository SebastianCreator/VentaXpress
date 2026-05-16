import { Link } from 'react-router-dom'
import '../styles/sidebar.css'

function Sidebar({ isOpen }) {
  const menuItems = [
    { label: 'Dashboard', path: '/', icon: '📊' },
    { label: 'Ventas', path: '/sales', icon: '🛒' },
    { label: 'Productos', path: '/products', icon: '📦' },
    { label: 'Inventario', path: '/inventory', icon: '📋' },
    { label: 'Reportes', path: '/reports', icon: '📈' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="logo">
        <h1>VentaXpress</h1>
      </div>
      <nav className="menu">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className="menu-item">
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
