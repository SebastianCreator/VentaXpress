import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'

function Register() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
        role,
      })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Registrar</h1>
        <p className="login-subtitle">VentaXpress</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Rol:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="cajero">Cajero</option>
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">Crear cuenta</button>
        </form>

        <p className="login-footer">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  )
}

export default Register

