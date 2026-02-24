// src/pages/Appointments.js
import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
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
  CRow,
  CCol,
  CFormCheck,
  CProgress
} from '@coreui/react';
import { Link } from 'react-router-dom';

const Appointments = ({ user }) => {
  const [activeTab, setActiveTab] = useState(1);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      time: '09:15',
      patient: 'Aisha Mohammed',
      mrn: 'MRN-392481',
      type: 'Follow-up',
      doctor: 'Dr. Fatima Okoye',
      status: 'Booked',
      resource: 'Consult Room 101',
      department: 'General Medicine',
      color: 'success',
      notes: 'BP check + medication review',
      isTelemedicine: false,
    },
    {
      id: 2,
      time: '09:45',
      patient: 'Chinedu Eze',
      mrn: 'MRN-584920',
      type: 'New Patient',
      doctor: 'Dr. Samuel Adebayo',
      status: 'Tentative',
      resource: 'Consult Room 102',
      department: 'Pediatrics',
      color: 'info',
      notes: 'First visit – full history & immunization catch-up',
      isTelemedicine: false,
    },
    {
      id: 3,
      time: '10:30',
      patient: 'Ngozi Okonkwo',
      mrn: 'MRN-129374',
      type: 'Procedure',
      doctor: 'Dr. Amina Bello',
      status: 'Confirmed',
      resource: 'Minor Theatre 1',
      department: 'Surgery',
      color: 'primary',
      notes: 'Wound dressing change + suture removal',
      isTelemedicine: false,
    },
    {
      id: 4,
      time: '11:00',
      patient: 'Fatima Hassan',
      mrn: 'MRN-482910',
      type: 'Telemedicine',
      doctor: 'Dr. Zara Khan',
      status: 'Booked',
      resource: 'Virtual – Zoom',
      department: 'Cardiology',
      color: 'warning',
      notes: 'Post-stent follow-up + ECG review',
      isTelemedicine: true,
    },
    {
      id: 5,
      time: '14:00–15:00',
      patient: '—',
      mrn: '—',
      type: 'Blocked',
      doctor: 'Dr. Fatima Okoye',
      status: 'Admin / Meeting',
      resource: 'Consult Room 101',
      department: 'General Medicine',
      color: 'dark',
      notes: 'Weekly department meeting',
      isTelemedicine: false,
    },
    {
      id: 6,
      time: '15:30',
      patient: 'Yusuf Ibrahim',
      mrn: 'MRN-917364',
      type: 'Recurring – Dialysis',
      doctor: 'Dr. Ibrahim Yusuf',
      status: 'Booked',
      resource: 'Dialysis Unit – Bed 3',
      department: 'Nephrology',
      color: 'success',
      notes: 'Session 12/24 – every Tue & Fri',
      isTelemedicine: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [actionType, setActionType] = useState(''); // 'reschedule' or 'cancel'
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Simulate new appointments / walk-ins over time
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.65) {
        const newAppt = {
          id: appointments.length + 1,
          time: `${Math.floor(Math.random() * 8 + 9).toString().padStart(2, '0')}:${
            Math.random() > 0.5 ? '00' : '30'
          }`,
          patient: ['Walk-in – Abdominal pain', 'New registration', 'Emergency triage'][Math.floor(Math.random() * 3)],
          mrn: `MRN-${Math.floor(Math.random() * 900000 + 100000)}`,
          type: 'Walk-in',
          doctor: 'Triage / Available',
          status: 'Pending',
          resource: 'Triage Area',
          department: 'Emergency',
          color: 'danger',
          notes: 'Urgent assessment required',
          isTelemedicine: false,
        };
        setAppointments((prev) => [...prev, newAppt]);
      }
    }, 22000);

    return () => clearInterval(interval);
  }, [appointments.length]);

  const handleActionClick = (appt, type) => {
    setSelectedAppointment(appt);
    setActionType(type);
    setModalVisible(true);
    setNewDate('');
    setNewTime('');
    setCancelReason('');
    setFeedbackMessage(null);
  };

  const canConfirm = () => {
    if (actionType === 'reschedule') {
      return newDate || newTime; // at least one field changed
    }
    if (actionType === 'cancel') {
      return cancelReason !== '';
    }
    return false;
  };

  const handleConfirm = () => {
    if (!canConfirm()) return;

    let updatedAppointments = [...appointments];

    if (actionType === 'reschedule') {
      updatedAppointments = updatedAppointments.map((a) =>
        a.id === selectedAppointment.id
          ? {
              ...a,
              time: `${newDate || a.time.split(' ')[0]} ${newTime || a.time.split(' ')[1] || '??:??'}`,
              status: 'Rescheduled',
              color: 'warning',
              notes: `${a.notes} (rescheduled)`,
            }
          : a
      );
      setFeedbackMessage('Appointment successfully rescheduled.');
    } else if (actionType === 'cancel') {
      updatedAppointments = updatedAppointments.map((a) =>
        a.id === selectedAppointment.id
          ? {
              ...a,
              status: 'Cancelled',
              color: 'danger',
              notes: `${a.notes} – Cancelled: ${cancelReason}`,
            }
          : a
      );
      setFeedbackMessage('Appointment cancelled successfully.');
    }

    setAppointments(updatedAppointments);
    setModalVisible(false);

    // Clear feedback after 4 seconds
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const todayAppointments = appointments.filter((a) => !a.time.includes('–'));

  return (
    <>
      {feedbackMessage && (
        <CAlert color="success" dismissible className="mb-4">
          {feedbackMessage}
        </CAlert>
      )}

      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Appointments & Scheduling</strong>
            <small className="d-block text-body-secondary">
              February 2026 • Abuja Central Hospital • Logged in as {user?.name || 'Staff'}
            </small>
          </div>
          <Link to="/new-appointment">
            <CButton color="primary">+ New Appointment</CButton>
          </Link>
        </CCardHeader>

        <CCardBody>
          <CTabs activeItemKey={activeTab} onChange={(key) => setActiveTab(key)}>
            <CTabList variant="tabs" layout="fill">
              <CTab itemKey={1}>Daily View</CTab>
              <CTab itemKey={2}>Weekly View</CTab>
              <CTab itemKey={3}>Monthly View</CTab>
              <CTab itemKey={4}>List View</CTab>
              <CTab itemKey={5}>Agenda View</CTab>
            </CTabList>

            <CTabContent>
              {/* Daily View */}
              <CTabPanel itemKey={1} className="pt-4">
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead className="text-nowrap">
                    <CTableRow>
                      <CTableHeaderCell>Time</CTableHeaderCell>
                      <CTableHeaderCell>Patient</CTableHeaderCell>
                      <CTableHeaderCell>MRN</CTableHeaderCell>
                      <CTableHeaderCell>Type</CTableHeaderCell>
                      <CTableHeaderCell>Doctor</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Resource</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {todayAppointments.length === 0 ? (
                      <CTableRow>
                        <CTableDataCell colSpan={8} className="text-center py-5 text-body-secondary">
                          No appointments scheduled for today
                        </CTableDataCell>
                      </CTableRow>
                    ) : (
                      todayAppointments.map((appt) => (
                        <CTableRow key={appt.id} className={`table-${appt.color}`}>
                          <CTableDataCell className="fw-semibold">{appt.time}</CTableDataCell>
                          <CTableDataCell>{appt.patient}</CTableDataCell>
                          <CTableDataCell>{appt.mrn}</CTableDataCell>
                          <CTableDataCell>{appt.type}</CTableDataCell>
                          <CTableDataCell>{appt.doctor}</CTableDataCell>
                          <CTableDataCell>
                            <CBadge color={appt.color} shape="rounded-pill">
                              {appt.status}
                            </CBadge>
                          </CTableDataCell>
                          <CTableDataCell>{appt.resource}</CTableDataCell>
                          <CTableDataCell>
                            {appt.status !== 'Cancelled' && appt.status !== 'Blocked' && (
                              <>
                                <CButton
                                  color="warning"
                                  size="sm"
                                  className="me-1"
                                  onClick={() => handleActionClick(appt, 'reschedule')}
                                >
                                  Reschedule
                                </CButton>
                                <CButton
                                  color="danger"
                                  size="sm"
                                  onClick={() => handleActionClick(appt, 'cancel')}
                                >
                                  Cancel
                                </CButton>
                              </>
                            )}
                            {appt.isTelemedicine && appt.status === 'Booked' && (
                              <CButton color="info" size="sm" className="ms-1">
                                Join Video
                              </CButton>
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    )}
                  </CTableBody>
                </CTable>
              </CTabPanel>

              {/* Weekly View – summary cards */}
              <CTabPanel itemKey={2} className="pt-4">
                <CRow>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <CCol md={3} key={day} className="mb-4">
                      <CCard className="h-100 shadow-sm">
                        <CCardHeader className="bg-light fw-bold">{day} • Feb {24 + idx}</CCardHeader>
                        <CCardBody className="text-center">
                          <div className="mb-2 fs-5">
                            <strong>{Math.floor(Math.random() * 35 + 25)}</strong> booked
                          </div>
                          <div className="mb-3">
                            <small className="text-body-secondary">
                              {Math.floor(Math.random() * 12 + 4)} slots available
                            </small>
                          </div>
                          <CProgress
                            value={Math.floor(Math.random() * 30 + 65)}
                            color="success"
                            height={10}
                            className="mb-2"
                          />
                          <small>Peak: {Math.random() > 0.5 ? 'Morning' : 'Afternoon'}</small>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  ))}
                </CRow>
              </CTabPanel>

              {/* Monthly View – placeholder */}
              <CTabPanel itemKey={3} className="pt-5 text-center">
                <h4 className="mb-4">February 2026 – Monthly Overview</h4>
                <p className="text-body-secondary mb-4">
                  In production this section would display a full interactive calendar (e.g. FullCalendar) with:
                  <br />• Drag-and-drop rescheduling
                  <br />• Resource timeline (rooms, equipment)
                  <br />• Recurring events
                  <br />• Holiday / leave blocks
                  <br />• Color coding by type, insurance, priority
                </p>
                <div style={{ fontSize: '8rem', opacity: 0.12 }}>📅</div>
                <CAlert color="info" className="d-inline-block mt-4">
                  Total scheduled: 1,284 • Utilization: 82% • Busiest day: Wednesday
                </CAlert>
              </CTabPanel>

              {/* List View */}
              <CTabPanel itemKey={4} className="pt-4">
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Date / Time</CTableHeaderCell>
                      <CTableHeaderCell>Patient</CTableHeaderCell>
                      <CTableHeaderCell>Type</CTableHeaderCell>
                      <CTableHeaderCell>Doctor</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Resource</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {appointments.map((appt) => (
                      <CTableRow key={appt.id}>
                        <CTableDataCell>{appt.time}</CTableDataCell>
                        <CTableDataCell>{appt.patient}</CTableDataCell>
                        <CTableDataCell>{appt.type}</CTableDataCell>
                        <CTableDataCell>{appt.doctor}</CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={appt.color}>{appt.status}</CBadge>
                        </CTableDataCell>
                        <CTableDataCell>{appt.resource}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color="link" size="sm" className="p-0 me-3">
                            Details
                          </CButton>
                          <CButton color="link" size="sm" className="p-0 text-danger">
                            Cancel
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CTabPanel>

              {/* Agenda View */}
              <CTabPanel itemKey={5} className="pt-4">
                <div className="list-group">
                  {todayAppointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((appt) => (
                      <div
                        key={appt.id}
                        className={`list-group-item list-group-item-action border-start border-5 border-${appt.color} mb-2`}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">
                            {appt.time} – {appt.patient}
                          </h5>
                          <small>{appt.doctor}</small>
                        </div>
                        <p className="mb-1">
                          <strong>Type:</strong> {appt.type} • <strong>Room:</strong> {appt.resource}
                        </p>
                        <small className="text-body-secondary">{appt.notes}</small>
                      </div>
                    ))}
                </div>
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>

      {/* ────────────────────────────────────────────── */}
      {/* Action Modal (Reschedule or Cancel) */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} alignment="center" size="lg">
        <CModalHeader closeButton>
          <CModalTitle>
            {actionType === 'reschedule' ? 'Reschedule Appointment' : 'Cancel Appointment'}
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          {selectedAppointment && (
            <div className="mb-4 p-3 bg-light rounded">
              <strong>Patient:</strong> {selectedAppointment.patient} ({selectedAppointment.mrn})<br />
              <strong>Current time:</strong> {selectedAppointment.time}<br />
              <strong>Doctor:</strong> {selectedAppointment.doctor}<br />
              <strong>Type:</strong> {selectedAppointment.type}
            </div>
          )}

          {actionType === 'reschedule' ? (
            <>
              <CForm>
                <CRow className="g-3">
                  <CCol md={6}>
                    <CFormLabel>New appointment date</CFormLabel>
                    <CFormInput
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>New appointment time</CFormLabel>
                    <CFormInput
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                    />
                  </CCol>
                </CRow>

                <div className="mt-4">
                  <CFormCheck
                    id="notifyPatient"
                    label="Send SMS & email notification to patient"
                    defaultChecked
                  />
                </div>

                <CAlert color="info" className="mt-4 small">
                  Availability check (simulated): 4 alternative slots found in the next 7 days
                </CAlert>
              </CForm>
            </>
          ) : (
            <>
              <CForm>
                <CFormLabel>Cancellation reason (required for audit trail)</CFormLabel>
                <CFormSelect
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                >
                  <option value="">-- Select reason --</option>
                  <option>Patient forgot / no-show risk</option>
                  <option>Patient requested cancellation</option>
                  <option>Doctor / clinic unavailable</option>
                  <option>Better slot available</option>
                  <option>Other medical reason</option>
                  <option>Other (please specify below)</option>
                </CFormSelect>

                {cancelReason.includes('Other') && (
                  <CFormInput
                    className="mt-3"
                    placeholder="Please specify the reason..."
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                )}

                <div className="mt-4">
                  <CFormCheck
                    id="notifyPatientCancel"
                    label="Notify patient via SMS & email"
                    defaultChecked
                  />
                </div>

                <CAlert color="warning" className="mt-4 small">
                  <strong>Policy reminder:</strong> Cancellations within 24 hours may incur a fee.
                </CAlert>
              </CForm>
            </>
          )}
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Close
          </CButton>
          <CButton
            color={actionType === 'reschedule' ? 'primary' : 'danger'}
            disabled={!canConfirm()}
            onClick={handleConfirm}
          >
            {actionType === 'reschedule' ? 'Confirm Reschedule' : 'Confirm Cancellation'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Appointments;
