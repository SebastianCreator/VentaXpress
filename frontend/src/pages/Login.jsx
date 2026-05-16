import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/login.css'

function Login({ onLogin }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', response.data.user.name)
      onLogin()
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">VentaXpress</h1>
        <p className="login-subtitle">Sistema POS</p>
        
        <form onSubmit={handleSubmit}>
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>

        <p className="login-footer">
          ¿No tienes cuenta? <a href="#register">Registrarse</a>
        </p>
      </div>
    </div>
  )
}

export default Login
