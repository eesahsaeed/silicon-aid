// ───────────────────────────────────────────────
// 2. PatientPortalHome.jsx   (Digital Front Door)
// ───────────────────────────────────────────────
import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsF,
  CButton,
  CListGroup,
  CListGroupItem,
  CBadge,
  CAvatar,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cilMedicalCross,
  cilFile,
  cilMoney,
  cilPlus,
  cilClock,
} from '@coreui/icons'
import avatar1 from 'src/assets/images/avatars/1.jpg'

const PatientPortalHome = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [newAppt, setNewAppt] = useState({
    date: '',
    time: '',
    department: 'General',
    doctor: '',
    type: 'Consultation',
  })

  const [quickStats] = useState([
    { title: 'Next Appointment', value: 'Feb 18, 10:00 – Cardiology', icon: cilCalendar, color: 'primary' },
    { title: 'Pending Lab Results', value: '2 Reports Ready', icon: cilFile, color: 'info' },
    { title: 'Active Prescriptions', value: '5 Medications', icon: cilMedicalCross, color: 'success' },
    { title: 'Outstanding Balance', value: '₦24,500', icon: cilMoney, color: 'warning' },
  ])

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { date: 'Feb 18, 2026', time: '10:00 AM', dept: 'Cardiology', badgeColor: 'success', type: 'Cardiology' },
    { date: 'Feb 25, 2026', time: '14:30 PM', dept: 'General', badgeColor: 'info', type: 'Follow-up' },
    // ── Added demo appointment ───────────────────────────────
    { date: 'Mar 03, 2026', time: '09:30 AM', dept: 'Pediatrics', badgeColor: 'primary', type: 'Child Check-up' },
  ])

  const recentActivity = [
    { date: 'Feb 12', desc: 'Lab results uploaded – Lipid Profile' },
    { date: 'Feb 10', desc: 'Appointment completed – Dr. Okoro' },
    { date: 'Feb 5', desc: 'Prescription renewed – Amlodipine 5mg' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAppt((prev) => ({ ...prev, [name]: value }))
  }

  const handleBookSubmit = (e) => {
    e.preventDefault()
    const newEntry = {
      date: newAppt.date ? new Date(newAppt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD',
      time: newAppt.time ? `${newAppt.time} ${newAppt.time < '12:00' ? 'AM' : 'PM'}` : 'TBD',
      dept: newAppt.department,
      badgeColor: newAppt.department === 'Cardiology' ? 'success' : newAppt.department === 'Pediatrics' ? 'primary' : 'info',
      type: newAppt.type,
    }

    setUpcomingAppointments((prev) => [...prev, newEntry])
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 4000)

    setModalVisible(false)
    setNewAppt({ date: '', time: '', department: 'General', doctor: '', type: 'Consultation' })
  }

  return (
    <>
      <h3 className="mb-4">Welcome back, Aisha Mohammed</h3>

      {submitSuccess && (
        <CAlert color="success" dismissible onClose={() => setSubmitSuccess(false)} className="mb-4">
          Appointment request submitted successfully! (Demo mode)
        </CAlert>
      )}

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
          <CCard className="mb-4 shadow-sm">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              Your Upcoming Appointments
              <CButton
                color="primary"
                size="sm"
                variant="outline"
                onClick={() => setModalVisible(true)}
              >
                <CIcon icon={cilPlus} className="me-1" />
                Book
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CListGroup flush>
                {upcomingAppointments.map((appt, i) => (
                  <CListGroupItem
                    key={i}
                    className="d-flex justify-content-between align-items-center py-3"
                  >
                    <div>
                      <strong>{appt.date}</strong> – {appt.time}
                    </div>
                    <div>
                      <CBadge color={appt.badgeColor} shape="rounded-pill" className="me-2">
                        {appt.type}
                      </CBadge>
                      <CButton size="sm" color="link">Details</CButton>
                    </div>
                  </CListGroupItem>
                ))}
                {upcomingAppointments.length === 0 && (
                  <CListGroupItem className="text-center text-body-secondary">
                    No upcoming appointments
                  </CListGroupItem>
                )}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard className="mb-4 shadow-sm">
            <CCardHeader>Health Summary</CCardHeader>
            <CCardBody>
              <div className="d-flex align-items-center mb-4">
                <CAvatar src={avatar1} size="lg" status="success" className="me-3" />
                <div>
                  <strong>Aisha Mohammed</strong>
                  <br />
                  <small className="text-body-secondary">PID-48392 | DOB: 15 May 1990</small>
                </div>
              </div>
              <hr />
              <CListGroup flush>
                {recentActivity.map((item, i) => (
                  <CListGroupItem key={i} className="py-2">
                    <strong>{item.date}</strong> – {item.desc}
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <div className="text-center mt-5">
        <CButton color="primary" size="lg" onClick={() => setModalVisible(true)}>
          <CIcon icon={cilCalendar} className="me-2" />
          Book New Appointment
        </CButton>
        <CButton color="info" size="lg" className="ms-3">
          View Full Records
        </CButton>
      </div>

      {/* ── Booking Modal ─────────────────────────────────────────────── */}
      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        alignment="center"
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Book New Appointment</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleBookSubmit}>
            <CRow>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="date">Preferred Date</CFormLabel>
                  <CFormInput
                    type="date"
                    id="date"
                    name="date"
                    value={newAppt.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CCol>
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel htmlFor="time">Preferred Time</CFormLabel>
                  <CFormInput
                    type="time"
                    id="time"
                    name="time"
                    value={newAppt.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CCol>
            </CRow>

            <div className="mb-3">
              <CFormLabel htmlFor="department">Department</CFormLabel>
              <CFormSelect
                id="department"
                name="department"
                value={newAppt.department}
                onChange={handleInputChange}
              >
                <option value="General">General Consultation</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="OBGYN">OBGYN</option>
              </CFormSelect>
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="doctor">Preferred Doctor (optional)</CFormLabel>
              <CFormInput
                type="text"
                id="doctor"
                name="doctor"
                value={newAppt.doctor}
                onChange={handleInputChange}
                placeholder="e.g. Dr. Okoro"
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="type">Appointment Type</CFormLabel>
              <CFormSelect
                id="type"
                name="type"
                value={newAppt.type}
                onChange={handleInputChange}
              >
                <option value="Consultation">New Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Check-up">Routine Check-up</option>
                <option value="Review">Test Results Review</option>
              </CFormSelect>
            </div>

            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                Cancel
              </CButton>
              <CButton color="primary" type="submit">
                Submit Request
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default PatientPortalHome
