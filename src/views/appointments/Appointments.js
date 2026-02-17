// ───────────────────────────────────────────────
// 1. AppointmentCalendar.jsx
// ───────────────────────────────────────────────
import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CButton,
  CWidgetStatsA,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilClock, cilUser, cilRoom, cilPlus } from '@coreui/icons'

const AppointmentCalendar = () => {
  const [modalVisible, setModalVisible] = useState(false)

  // Demo form state
  const [newAppointment, setNewAppointment] = useState({
    time: '',
    patient: '',
    doctor: '',
    dept: '',
    status: 'Pending',
    room: '',
  })

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { time: '09:00', patient: 'Aisha Mohammed', doctor: 'Dr. Okoro', dept: 'Cardiology', status: 'Confirmed', room: 'Room 204' },
    { time: '10:15', patient: 'Chukwuma Eze', doctor: 'Dr. Adebayo', dept: 'Orthopedics', status: 'Waiting', room: 'Room 108' },
    { time: '11:30', patient: 'Fatima Yusuf', doctor: 'Dr. Nwosu', dept: 'Pediatrics', status: 'Pending', room: 'Consult 3' },
    { time: '14:00', patient: 'Ngozi Okonkwo', doctor: 'Dr. Ibrahim', dept: 'OBGYN', status: 'Confirmed', room: 'Room 305' },
    { time: '15:45', patient: 'Oluwaseun Ade', doctor: 'Dr. Okoro', dept: 'Cardiology', status: 'Cancelled', room: '-' },
    // ── Added demo appointment ───────────────────────────────
    { time: '16:30', patient: 'Amaka Obi', doctor: 'Dr. Nwosu', dept: 'Pediatrics', status: 'Confirmed', room: 'Consult 1' },
  ])

  const doctorsOnDuty = [
    { name: 'Dr. Okoro', specialty: 'Cardiology', slots: 12, booked: 9 },
    { name: 'Dr. Adebayo', specialty: 'Orthopedics', slots: 10, booked: 7 },
    { name: 'Dr. Nwosu', specialty: 'Pediatrics', slots: 14, booked: 11 },
    // You can add more if needed
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAppointment((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In real app → send to backend / validate / etc.
    setUpcomingAppointments((prev) => [...prev, { ...newAppointment }].sort((a, b) => a.time.localeCompare(b.time)))
    setModalVisible(false)
    // Reset form
    setNewAppointment({
      time: '',
      patient: '',
      doctor: '',
      dept: '',
      status: 'Pending',
      room: '',
    })
    alert('Appointment added (demo mode – data not persisted)')
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <strong>Appointment Calendar – February 17, 2026</strong>
          <CButton color="primary" onClick={() => setModalVisible(true)}>
            <CIcon icon={cilPlus} className="me-2" />
            New Appointment
          </CButton>
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
                  {['Mon 16', 'Tue 17', 'Wed 18', 'Thu 19', 'Fri 20', 'Sat 21', 'Sun 22'].map((day) => (
                    <div key={day} className="border p-2 text-center" style={{ minWidth: '80px' }}>
                      <strong>{day}</strong>
                      <br />
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
                  <CTableDataCell>
                    <CIcon icon={cilClock} className="me-2" />
                    {appt.time}
                  </CTableDataCell>
                  <CTableDataCell>{appt.patient}</CTableDataCell>
                  <CTableDataCell>{appt.doctor}</CTableDataCell>
                  <CTableDataCell>{appt.dept}</CTableDataCell>
                  <CTableDataCell>{appt.room}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge
                      color={
                        appt.status === 'Confirmed'
                          ? 'success'
                          : appt.status === 'Waiting'
                          ? 'warning'
                          : appt.status === 'Cancelled'
                          ? 'danger'
                          : 'secondary'
                      }
                    >
                      {appt.status}
                    </CBadge>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* ── New Appointment Modal ─────────────────────────────────────── */}
      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        alignment="center"
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>New Appointment</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="time">Time</CFormLabel>
              <CFormInput
                type="time"
                id="time"
                name="time"
                value={newAppointment.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="patient">Patient Name</CFormLabel>
              <CFormInput
                type="text"
                id="patient"
                name="patient"
                value={newAppointment.patient}
                onChange={handleInputChange}
                placeholder="e.g. Blessing Adeyemi"
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="doctor">Doctor</CFormLabel>
              <CFormSelect
                id="doctor"
                name="doctor"
                value={newAppointment.doctor}
                onChange={handleInputChange}
                required
              >
                <option value="">Select doctor</option>
                {doctorsOnDuty.map((doc) => (
                  <option key={doc.name} value={doc.name}>
                    {doc.name} ({doc.specialty})
                  </option>
                ))}
              </CFormSelect>
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="dept">Department</CFormLabel>
              <CFormInput
                type="text"
                id="dept"
                name="dept"
                value={newAppointment.dept}
                onChange={handleInputChange}
                placeholder="e.g. Pediatrics"
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="room">Room</CFormLabel>
              <CFormInput
                type="text"
                id="room"
                name="room"
                value={newAppointment.room}
                onChange={handleInputChange}
                placeholder="e.g. Consult 4 or Room 212"
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="status">Status</CFormLabel>
              <CFormSelect
                id="status"
                name="status"
                value={newAppointment.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Waiting">Waiting</option>
                <option value="Cancelled">Cancelled</option>
              </CFormSelect>
            </div>

            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                Cancel
              </CButton>
              <CButton color="primary" type="submit">
                Save Appointment
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default AppointmentCalendar
