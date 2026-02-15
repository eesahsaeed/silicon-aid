// ───────────────────────────────────────────────
// 4. BedManagement.jsx
// ───────────────────────────────────────────────
import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBed, cilCheckCircle, cilXCircle } from '@coreui/icons'

const BedManagement = () => {
  const bedStats = [
    { title: 'Total Beds', value: '250', icon: cilBed, color: 'primary' },
    { title: 'Occupied', value: '187 (75%)', icon: cilCheckCircle, color: 'danger' },
    { title: 'Available', value: '63', icon: cilXCircle, color: 'success' },
    { title: 'Cleaning / Reserved', value: '12', icon: cilBed, color: 'warning' },
  ]

  const wards = [
    { name: 'General Ward', total: 80, occupied: 64, available: 16 },
    { name: 'ICU', total: 20, occupied: 18, available: 2 },
    { name: 'Maternity', total: 45, occupied: 31, available: 14 },
    { name: 'Pediatrics', total: 35, occupied: 22, available: 13 },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Real-time Bed Management Dashboard</CCardHeader>
        <CCardBody>
          <CRow className="mb-4">
            {bedStats.map((stat, i) => (
              <CCol xs={12} sm={6} lg={3} key={i}>
                <CWidgetStatsF
                  color={stat.color}
                  title={stat.title}
                  value={stat.value}
                  icon={<CIcon icon={stat.icon} height={24} />}
                />
              </CCol>
            ))}
          </CRow>

          <CRow>
            {wards.map((ward, i) => (
              <CCol md={6} xl={3} key={i}>
                <CCard className="mb-4">
                  <CCardBody>
                    <h5>{ward.name}</h5>
                    <div className="text-body-secondary small">Total: {ward.total}</div>
                    <div className="fw-semibold mt-2">
                      Occupied: {ward.occupied} ({Math.round(ward.occupied / ward.total * 100)}%)
                    </div>
                    <div className="text-success">Available: {ward.available}</div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default BedManagement