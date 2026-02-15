// ───────────────────────────────────────────────
// 5. InventorySnapshot.jsx
// ───────────────────────────────────────────────
import React from 'react'
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell,
  CTableHead, CTableHeaderCell, CTableRow, CProgress, CBadge,
} from '@coreui/react'

const InventorySnapshot = () => {
  const inventoryItems = [
    { name: 'Paracetamol 500mg', stock: 1240, min: 300, status: 'Good', percent: 82 },
    { name: 'Normal Saline 500ml', stock: 420, min: 500, status: 'Low', percent: 42 },
    { name: 'Surgical Gloves (pairs)', stock: 2850, min: 800, status: 'Good', percent: 95 },
    { name: 'Amoxicillin 250mg', stock: 180, min: 400, status: 'Critical', percent: 18 },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Pharmacy & Supplies Inventory Snapshot</CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Item</CTableHeaderCell>
                <CTableHeaderCell>Current Stock</CTableHeaderCell>
                <CTableHeaderCell>Min Level</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Stock Level</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {inventoryItems.map((item, i) => (
                <CTableRow key={i}>
                  <CTableDataCell className="fw-semibold">{item.name}</CTableDataCell>
                  <CTableDataCell>{item.stock}</CTableDataCell>
                  <CTableDataCell>{item.min}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={item.status === 'Good' ? 'success' : item.status === 'Low' ? 'warning' : 'danger'}>
                      {item.status}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CProgress thin color={item.percent > 50 ? 'success' : item.percent > 30 ? 'warning' : 'danger'} value={item.percent} />
                    <small>{item.percent}%</small>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <div className="text-center mt-4 text-body-secondary">
            <small>Auto-reorder alerts active for items below minimum level</small>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default InventorySnapshot