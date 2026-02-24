// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsF,
  CFormInput,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CProgress,
  CButton
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilCalendar,
  cilPeople,
  cilClock,
  cilChartPie,
  cilHospital,
  cilUser,
  cilBell,
} from '@coreui/icons';

const Dashboard = ({ user }) => {
  // Mock data - today's key metrics
  const [kpiData] = useState({
    appointmentsToday: 187,
    checkedIn: 124,
    waiting: 38,
    noShowRate: 12.4,
    bedOccupancy: 78,
  });

  // Live check-in alerts (simulated incoming)
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      message: 'Aisha Mohammed (MRN-392481) checked in for 09:15 AM follow-up – Room 101',
      time: '4 min ago',
      color: 'success',
    },
    {
      id: 2,
      message: 'Walk-in: Chinedu Eze (MRN-584920) – triage needed',
      time: '11 min ago',
      color: 'warning',
    },
    {
      id: 3,
      message: 'Ngozi Okonkwo (MRN-129374) arrived early for 10:00 consultation',
      time: '19 min ago',
      color: 'info',
    },
    {
      id: 4,
      message: 'Dr. Fatima running 12 minutes behind schedule',
      time: '28 min ago',
      color: 'danger',
    },
  ]);

  // Today's appointments list with simulated wait time progression
  const [todaysAppointments, setTodaysAppointments] = useState([
    {
      id: 1,
      time: '09:15 AM',
      patient: 'Aisha Mohammed',
      mrn: 'MRN-392481',
      type: 'Follow-up',
      doctor: 'Dr. Fatima Okoye',
      status: 'In Progress',
      wait: '0 min',
      color: 'success',
    },
    {
      id: 2,
      time: '09:45 AM',
      patient: 'Chinedu Eze',
      mrn: 'MRN-584920',
      type: 'New Patient',
      doctor: 'Dr. Samuel Adebayo',
      status: 'Waiting',
      wait: '22 min',
      color: 'warning',
    },
    {
      id: 3,
      time: '10:00 AM',
      patient: 'Ngozi Okonkwo',
      mrn: 'MRN-129374',
      type: 'Consultation',
      doctor: 'Dr. Ibrahim Yusuf',
      status: 'Checked-In',
      wait: 'In Room 4',
      color: 'info',
    },
    {
      id: 4,
      time: '10:30 AM',
      patient: 'Tunde Alabi',
      mrn: 'MRN-763920',
      type: 'Procedure',
      doctor: 'Dr. Amina Bello',
      status: 'Scheduled',
      wait: '-',
      color: 'secondary',
    },
    {
      id: 5,
      time: '11:00 AM',
      patient: 'Fatima Hassan',
      mrn: 'MRN-482910',
      type: 'Telemedicine',
      doctor: 'Dr. Zara Khan',
      status: 'Waiting',
      wait: '8 min',
      color: 'primary',
    },
    {
      id: 6,
      time: '11:30 AM',
      patient: 'Yusuf Ibrahim',
      mrn: 'MRN-917364',
      type: 'Follow-up',
      doctor: 'Dr. Fatima Okoye',
      status: 'Scheduled',
      wait: '-',
      color: 'secondary',
    },
  ]);

  // Waitlist summary
  const [waitlist, setWaitlist] = useState([
    { patient: 'Kemi Adeyemi', reason: 'Cancellation in Cardiology', priority: 'High' },
    { patient: 'Maryam Ali', reason: 'Preferred slot opened', priority: 'Medium' },
    { patient: 'John Okoro', reason: 'Urgent walk-in replacement', priority: 'High' },
  ]);

  // Simulate real-time updates (wait time + new alerts)
  useEffect(() => {
    const interval = setInterval(() => {
      // Increase wait times for waiting patients
      setTodaysAppointments((prev) =>
        prev.map((appt) =>
          appt.status === 'Waiting'
            ? { ...appt, wait: `${(parseInt(appt.wait) || 0) + 2} min` }
            : appt
        )
      );

      // Occasionally add new alert (simulation of real arrivals)
      if (Math.random() > 0.65) {
        const newAlert = {
          id: alerts.length + 1,
          message: `New arrival: ${['Maryam Ali', 'Sani Musa', 'Grace Adebayo'][Math.floor(Math.random() * 3)]} checked in`,
          time: 'Just now',
          color: 'info',
        };
        setAlerts((prev) => [newAlert, ...prev.slice(0, 7)]); // keep latest 8
      }
    }, 12000); // update every 12 seconds

    return () => clearInterval(interval);
  }, [alerts.length]);

  return (
    <>
      {/* KPI Widgets */}
      <CRow className="mb-4">
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            title="Today's Appointments"
            value={kpiData.appointmentsToday}
            icon={<CIcon icon={cilCalendar} height={24} />}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            title="Patients Checked-In"
            value={kpiData.checkedIn}
            icon={<CIcon icon={cilPeople} height={24} />}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            title="Currently Waiting"
            value={kpiData.waiting}
            icon={<CIcon icon={cilClock} height={24} />}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            className="mb-3"
            color="danger"
            title="No-Show Rate Today"
            value={`${kpiData.noShowRate}%`}
            icon={<CIcon icon={cilChartPie} height={24} />}
          />
        </CCol>
      </CRow>

      {/* Quick Search */}
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilUser} className="me-2" />
          Quick Patient Search (MPI)
        </CCardHeader>
        <CCardBody>
          <CFormInput
            placeholder="Search by Name, MRN, Phone, National ID, DOB, Barcode..."
            size="lg"
          />
          <small className="text-body-secondary mt-2 d-block">
            Start typing to see matching patients (multi-parameter search simulated)
          </small>
        </CCardBody>
      </CCard>

      {/* Live Check-in Alerts */}
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilBell} className="me-2" />
          Real-time Check-in & Alert Feed
        </CCardHeader>
        <CCardBody style={{ maxHeight: '320px', overflowY: 'auto' }}>
          {alerts.length === 0 ? (
            <div className="text-center text-body-secondary py-4">No recent activity</div>
          ) : (
            alerts.map((alert) => (
              <CAlert
                key={alert.id}
                color={alert.color}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <div>{alert.message}</div>
                <small className="text-nowrap ms-3">{alert.time}</small>
              </CAlert>
            ))
          )}
        </CCardBody>
      </CCard>

      <CRow>
        {/* Waitlist Summary */}
        <CCol lg={6}>
          <CCard className="mb-4">
            <CCardHeader>Waitlist Summary (Cancellations / Preferred Slots)</CCardHeader>
            <CCardBody>
              <CTable hover responsive small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Patient</CTableHeaderCell>
                    <CTableHeaderCell>Reason / Slot</CTableHeaderCell>
                    <CTableHeaderCell>Priority</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {waitlist.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="fw-semibold">{item.patient}</CTableDataCell>
                      <CTableDataCell>{item.reason}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge
                          color={item.priority === 'High' ? 'danger' : 'warning'}
                          shape="rounded-pill"
                        >
                          {item.priority}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="success" size="sm">Notify Patient</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                  {waitlist.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan={4} className="text-center py-3">
                        No patients on waitlist
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Today's Appointments Overview */}
        <CCol lg={6}>
          <CCard className="mb-4">
            <CCardHeader>Today's Appointments & Queue Status</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive small>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell>Time</CTableHeaderCell>
                    <CTableHeaderCell>Patient</CTableHeaderCell>
                    <CTableHeaderCell>MRN</CTableHeaderCell>
                    <CTableHeaderCell>Type</CTableHeaderCell>
                    <CTableHeaderCell>Doctor</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Wait / Location</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {todaysAppointments.map((appt) => (
                    <CTableRow key={appt.id}>
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
                      <CTableDataCell>{appt.wait}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Optional small footer stats */}
      <CCard className="mb-4 border-top border-primary border-3">
        <CCardBody className="text-center text-body-secondary">
          <small>
            Hospital Management Simulation • Abuja, Nigeria • February 24, 2026 • Logged in as {user?.name || 'Guest'}
          </small>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
