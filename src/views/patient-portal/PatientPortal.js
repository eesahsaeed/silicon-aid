// ───────────────────────────────────────────────
// 2. PatientPortalHome.jsx   (Digital Front Door)
// ───────────────────────────────────────────────
import React from 'react'
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CWidgetStatsF, CButton,
  CListGroup, CListGroupItem, CBadge, CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilMedicalCross, cilFile, cilMoney } from '@coreui/icons'
import avatar1 from 'src/assets/images/avatars/1.jpg'

const PatientPortalHome = () => {
  const quickStats = [
    { title: 'Next Appointment', value: 'Feb 18, 10:00 – Cardiology', icon: cilCalendar, color: 'primary' },
    { title: 'Pending Lab Results', value: '2 Reports Ready', icon: cilFile, color: 'info' },
    { title: 'Active Prescriptions', value: '5 Medications', icon: cilMedicalCross, color: 'success' },
    { title: 'Outstanding Balance', value: '₦24,500', icon: cilMoney, color: 'warning' },
  ]

  const recentActivity = [
    { date: 'Feb 12', desc: 'Lab results uploaded – Lipid Profile' },
    { date: 'Feb 10', desc: 'Appointment completed – Dr. Okoro' },
    { date: 'Feb 5', desc: 'Prescription renewed – Amlodipine 5mg' },
  ]

  return (
    <>
      <h3 className="mb-4">Welcome back, Aisha Mohammed</h3>

      <CRow className="mb-4">
        {quickStats.map((stat, i) => (
          <CCol xs={12} sm={6} lg={3} key={i}>
            <CWidgetStatsF
              className="mb-3"
              color={stat.color}
              title={stat.title}
              value={stat.value}
              icon={<CIcon icon={stat.icon} height={24} />}
            />
          </CCol>
        ))}
      </CRow>

      <CRow>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>Your Upcoming Appointments</CCardHeader>
            <CCardBody>
              <CListGroup flush>
                <CListGroupItem className="d-flex justify-content-between align-items-center">
                  Feb 18, 2026 – 10:00 AM
                  <div>
                    <CBadge color="success" shape="rounded-pill">Cardiology</CBadge>
                    <CButton size="sm" color="link">Reschedule</CButton>
                  </div>
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-between align-items-center">
                  Feb 25, 2026 – 14:30 PM
                  <div>
                    <CBadge color="info" shape="rounded-pill">Follow-up</CBadge>
                    <CButton size="sm" color="link">Details</CButton>
                  </div>
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>Health Summary</CCardHeader>
            <CCardBody>
              <div className="d-flex align-items-center mb-3">
                <CAvatar src={avatar1} size="lg" status="success" className="me-3" />
                <div>
                  <strong>Aisha Mohammed</strong><br />
                  <small className="text-body-secondary">PID-48392 | DOB: 15 May 1990</small>
                </div>
              </div>
              <hr />
              <CListGroup flush>
                {recentActivity.map((item, i) => (
                  <CListGroupItem key={i}>
                    <strong>{item.date}</strong> – {item.desc}
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <div className="text-center mt-4">
        <CButton color="primary" size="lg">Book New Appointment</CButton>
        <CButton color="info" size="lg" className="ms-3">View Full Records</CButton>
      </div>
    </>
  )
}

export default PatientPortalHome