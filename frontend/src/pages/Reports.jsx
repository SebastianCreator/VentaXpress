import { useState, useEffect } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import '../styles/reports.css'

function Reports() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [reportData, setReportData] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchReport()
  }, [])

  const fetchReport = async () => {
    try {
      const params = {}
      if (startDate) params.startDate = startDate
      if (endDate) params.endDate = endDate

      const response = await axios.get(`${API_BASE_URL}/api/reports/sales-summary`, {
        params,
        headers: { Authorization: `Bearer ${token}` }
      })
      setReportData(response.data)
    } catch (error) {
      console.error('Error fetching report:', error)
    }
  }

  const handleGeneratePDF = () => {
    if (!reportData) return

    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Reporte de Ventas - VentaXpress', 20, 20)
    
    doc.setFontSize(12)
    doc.text(`Total de Ventas: ${reportData.totalSales}`, 20, 40)
    doc.text(`Ingresos Totales: $${reportData.totalRevenue.toFixed(0)}`, 20, 50)
    doc.text(`Ticket Promedio: $${reportData.averageTicket.toFixed(0)}`, 20, 60)
    doc.text(`Impuestos: $${reportData.totalTax.toFixed(0)}`, 20, 70)
    doc.text(`Descuentos: $${reportData.totalDiscount.toFixed(0)}`, 20, 80)

    doc.save('reporte-ventas.pdf')
  }

  return (
    <div className="reports">
      <h1>Reportes de Ventas</h1>

      <div className="filter-section">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Fecha Inicio"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Fecha Fin"
        />
        <button onClick={fetchReport} className="btn-filter">Filtrar</button>
        <button onClick={handleGeneratePDF} className="btn-pdf">Descargar PDF</button>
      </div>

      {reportData && (
        <div className="report-data">
          <div className="report-card">
            <h3>Total de Ventas</h3>
            <p className="report-value">{reportData.totalSales}</p>
          </div>
          <div className="report-card">
            <h3>Ingresos Totales</h3>
            <p className="report-value">${reportData.totalRevenue.toFixed(0)}</p>
          </div>
          <div className="report-card">
            <h3>Ticket Promedio</h3>
            <p className="report-value">${reportData.averageTicket.toFixed(0)}</p>
          </div>
          <div className="report-card">
            <h3>Impuestos</h3>
            <p className="report-value">${reportData.totalTax.toFixed(0)}</p>
          </div>
          <div className="report-card">
            <h3>Descuentos</h3>
            <p className="report-value">${reportData.totalDiscount.toFixed(0)}</p>
          </div>

          <div className="payment-methods">
            <h3>Métodos de Pago</h3>
            <ul>
              {Object.entries(reportData.paymentMethods || {}).map(([method, amount]) => (
                <li key={method}>{method}: ${amount.toFixed(0)}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports
