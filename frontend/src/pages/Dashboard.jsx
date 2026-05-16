import { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import '../styles/dashboard.css'

function Dashboard() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [kpis, setKpis] = useState({
    totalSales: 0,
    totalRevenue: 0,
    averageTicket: 0,
    lowStockProducts: 0
  })
  const [topProducts, setTopProducts] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [summaryRes, topRes, inventoryRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/reports/sales-summary`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/api/reports/top-products`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/api/inventory`, { headers: { Authorization: `Bearer ${token}` } })
      ])

      setKpis({
        totalSales: summaryRes.data.totalSales,
        totalRevenue: summaryRes.data.totalRevenue,
        averageTicket: summaryRes.data.averageTicket.toFixed(0),
        lowStockProducts: inventoryRes.data.lowStock
      })
      setTopProducts(topRes.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="kpi-container">
        <div className="kpi-card">
          <h3>Total de Ventas</h3>
          <p className="kpi-value">{kpis.totalSales}</p>
        </div>
        <div className="kpi-card">
          <h3>Ingresos Totales</h3>
          <p className="kpi-value">${kpis.totalRevenue.toFixed(0)}</p>
        </div>
        <div className="kpi-card">
          <h3>Ticket Promedio</h3>
          <p className="kpi-value">${kpis.averageTicket}</p>
        </div>
        <div className="kpi-card alert">
          <h3>Productos en Stock Bajo</h3>
          <p className="kpi-value">{kpis.lowStockProducts}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h2>Productos Más Vendidos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#E74C3C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
