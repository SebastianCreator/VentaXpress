import { useEffect } from 'react'

function Modal({ open, title, message, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="modal-card" style={{ maxWidth: 520 }}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <p style={{ margin: 0, color: '#2c3e50', fontWeight: 600 }}>{message}</p>
          <div className="modal-actions">
            <button className="modal-btn primary" type="button" onClick={onClose}>
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

