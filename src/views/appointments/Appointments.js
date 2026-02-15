// ───────────────────────────────────────────────
// 1. AppointmentCalendar.jsx
// ───────────────────────────────────────────────
import React from 'react'
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell,
  CTableHead, CTableHeaderCell, CTableRow, CBadge, CButton, CWidgetStatsA,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilClock, cilUser, cilRoom } from '@coreui/icons'

const AppointmentCalendar = () => {
  const upcomingAppointments = [
    { time: '09:00', patient: 'Aisha Mohammed', doctor: 'Dr. Okoro', dept: 'Cardiology', status: 'Confirmed', room: 'Room 204' },
    { time: '10:15', patient: 'Chukwuma Eze', doctor: 'Dr. Adebayo', dept: 'Orthopedics', status: 'Waiting', room: 'Room 108' },
    { time: '11:30', patient: 'Fatima Yusuf', doctor: 'Dr. Nwosu', dept: 'Pediatrics', status: 'Pending', room: 'Consult 3' },
    { time: '14:00', patient: 'Ngozi Okonkwo', doctor: 'Dr. Ibrahim', dept: 'OBGYN', status: 'Confirmed', room: 'Room 305' },
    { time: '15:45', patient: 'Oluwaseun Ade', doctor: 'Dr. Okoro', dept: 'Cardiology', status: 'Cancelled', room: '-' },
  ]

  const doctorsOnDuty = [
    { name: 'Dr. Okoro', specialty: 'Cardiology', slots: 12, booked: 9 },
    { name: 'Dr. Adebayo', specialty: 'Orthopedics', slots: 10, booked: 7 },
    { name: 'Dr. Nwosu', specialty: 'Pediatrics', slots: 14, booked: 11 },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Appointment Calendar – February 15, 2026</strong>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={8}>
              <div className="border rounded p-3 mb-4 text-center bg-light">
                <h5>Mock Weekly Calendar View</h5>
                <p className="text-body-secondary">
                  [Interactive calendar placeholder – in production use FullCalendar or similar]
                </p>
                <div className="d-flex justify-content-around flex-wrap gap-3 mt-3">
                  {['Mon 10', 'Tue 11', 'Wed 12', 'Thu 13', 'Fri 14', 'Sat 15', 'Sun 16'].map(day => (
                    <div key={day} className="border p-2 text-center" style={{ minWidth: '80px' }}>
                      <strong>{day}</strong><br />
                      <small className="text-success">12–18 slots</small>
                    </div>
                  ))}
                </div>
              </div>
            </CCol>
            <CCol md={4}>
              <CRow>
                {doctorsOnDuty.map((doc, i) => (
                  <CCol xs={12} key={i}>
                    <CWidgetStatsA
                      className="mb-3"
                      color="info"
                      value={`${doc.booked}/${doc.slots}`}
                      title={doc.name}
                      action={<CIcon icon={cilUser} />}
                      chart={
                        <div className="position-absolute top-50 end-0 pe-3 text-end">
                          <small>{doc.specialty}</small>
                        </div>
                      }
                    />
                  </CCol>
                ))}
              </CRow>
            </CCol>
          </CRow>

          <CTable hover responsive className="mt-4">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Time</CTableHeaderCell>
                <CTableHeaderCell>Patient</CTableHeaderCell>
                <CTableHeaderCell>Doctor</CTableHeaderCell>
                <CTableHeaderCell>Dept</CTableHeaderCell>
                <CTableHeaderCell>Room</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {upcomingAppointments.map((appt, i) => (
                <CTableRow key={i}>
                  <CTableDataCell><CIcon icon={cilClock} className="me-2" />{appt.time}</CTableDataCell>
                  <CTableDataCell>{appt.patient}</CTableDataCell>
                  <CTableDataCell>{appt.doctor}</CTableDataCell>
                  <CTableDataCell>{appt.dept}</CTableDataCell>
                  <CTableDataCell>{appt.room}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={appt.status === 'Confirmed' ? 'success' : appt.status === 'Waiting' ? 'warning' : appt.status === 'Cancelled' ? 'danger' : 'secondary'}>
                      {appt.status}
                    </CBadge>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AppointmentCalendar