import React from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilUserFemale,
  cilChartPie,
  cilMedicalCross,
  cilHospital,
  cilBed,
  cilCalendar,
  cilMoney,
  cilCloudDownload,
} from '@coreui/icons'

// Mock avatars (you can replace paths with your own or use placeholders)
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

// You can keep WidgetsBrand / WidgetsDropdown / MainChart from original CoreUI if you have them
// For simplicity, I've commented them out or replaced with static content here
// import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'
// import MainChart from './MainChart'

const SiliconAidDashboard = () => {
  // Mock data - Clinical & Administrative overview
  const keyMetrics = [
    { title: 'Inpatients', value: '187 Active', percent: 78, color: 'success' },
    { title: 'Outpatients Today', value: '421 Visits', percent: 65, color: 'info' },
    { title: 'Appointments', value: '89 Scheduled', percent: 92, color: 'warning' },
    { title: 'Bed Occupancy', value: '76%', percent: 76, color: 'danger' },
    { title: 'Revenue Today', value: '$48,320', percent: 82, color: 'primary' },
  ]

  // Mock weekly patient flow (like original progress groups)
  const weeklyPatientFlow = [
    { day: 'Monday', newPatients: 42, followUps: 118 },
    { day: 'Tuesday', newPatients: 58, followUps: 134 },
    { day: 'Wednesday', newPatients: 31, followUps: 97 },
    { day: 'Thursday', newPatients: 67, followUps: 152 },
    { day: 'Friday', newPatients: 49, followUps: 121 },
    { day: 'Saturday', newPatients: 22, followUps: 68 },
    { day: 'Sunday', newPatients: 12, followUps: 45 },
  ]

  // Gender distribution mock
  const genderDistribution = [
    { title: 'Male', icon: cilUser, percent: 54 },
    { title: 'Female', icon: cilUserFemale, percent: 46 },
  ]

  // Mock recent patients / Master Patient Index simulation
  const recentPatients = [
    {
      avatar: { src: avatar1, status: 'success' },
      patient: {
        name: 'Aisha Mohammed',
        id: 'PID-48392',
        registered: 'Feb 10, 2026',
        status: 'Inpatient',
      },
      department: 'Cardiology',
      lastVisit: 'Today',
      alerts: 'Penicillin Allergy',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      patient: {
        name: 'Chukwuma Eze',
        id: 'PID-29104',
        registered: 'Jan 15, 2026',
        status: 'Outpatient',
      },
      department: 'Orthopedics',
      lastVisit: '5 min ago',
      alerts: 'Drug Interaction Warning',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      patient: {
        name: 'Fatima Yusuf',
        id: 'PID-57681',
        registered: 'Feb 1, 2026',
        status: 'New',
      },
      department: 'Pediatrics',
      lastVisit: '1 hour ago',
      alerts: 'None',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      patient: {
        name: 'Oluwaseun Adebayo',
        id: 'PID-34912',
        registered: 'Dec 20, 2025',
        status: 'Follow-up',
      },
      department: 'General Medicine',
      lastVisit: 'Yesterday',
      alerts: 'High BP Monitoring',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      patient: {
        name: 'Ngozi Okonkwo',
        id: 'PID-12847',
        registered: 'Feb 12, 2026',
        status: 'Discharged',
      },
      department: 'OBGYN',
      lastVisit: '2 days ago',
      alerts: 'Postnatal Check',
    },
  ]

  return (
    <>
      {/* You can uncomment WidgetsDropdown if you have it */}
      {/* <WidgetsDropdown className="mb-4" /> */}

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 className="card-title mb-0">SILICON AID Overview</h4>
              <div className="small text-body-secondary">February 2026 Snapshot</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block text-end">
              <CButton color="primary" className="me-2">
                <CIcon icon={cilCloudDownload} /> Export Report
              </CButton>
              <CButtonGroup>
                {['Today', 'Week', 'Month'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Week'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>

          {/* Placeholder for chart – in real project replace with Recharts or Chart.js */}
          <div className="my-4 text-center text-body-secondary">
            [Main Chart: Patient Admissions, Bed Occupancy & Revenue Trend – Feb 2026]
          </div>
        </CCardBody>

        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 3 }}
            xl={{ cols: 5 }}
            className="text-center"
          >
            {keyMetrics.map((item, index) => (
              <CCol key={index}>
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold">{item.value}</div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <CRow>
        <CCol xs={12} md={6} xl={6}>
          <CCard className="mb-4">
            <CCardHeader>Patient Flow & Bed Management</CCardHeader>
            <CCardBody>
              <CRow className="mb-4">
                <CCol xs={6}>
                  <div className="border-start border-start-4 border-start-info py-2 px-3">
                    <div className="text-body-secondary small">Available Beds</div>
                    <div className="fs-4 fw-semibold">47 / 250</div>
                  </div>
                </CCol>
                <CCol xs={6}>
                  <div className="border-start border-start-4 border-start-danger py-2 px-3">
                    <div className="text-body-secondary small">Pending Discharges</div>
                    <div className="fs-4 fw-semibold">19</div>
                  </div>
                </CCol>
              </CRow>

              <hr className="mt-0 mb-4" />

              {weeklyPatientFlow.map((item, index) => (
                <div className="progress-group mb-4" key={index}>
                  <div className="progress-group-prepend">
                    <span className="text-body-secondary small">{item.day}</span>
                  </div>
                  <div className="progress-group-bars">
                    <CProgress thin color="info" value={item.newPatients} />
                    <CProgress thin color="danger" value={item.followUps} />
                  </div>
                  <div className="progress-group-text small text-end">
                    {item.newPatients} new / {item.followUps} FU
                  </div>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={6} xl={6}>
          <CCard className="mb-4">
            <CCardHeader>Demographics & Alerts</CCardHeader>
            <CCardBody>
              <CRow className="mb-4">
                <CCol xs={6}>
                  <div className="border-start border-start-4 border-start-warning py-2 px-3">
                    <div className="text-body-secondary small">Active RPM Patients</div>
                    <div className="fs-4 fw-semibold">63</div>
                  </div>
                </CCol>
                <CCol xs={6}>
                  <div className="border-start border-start-4 border-start-success py-2 px-3">
                    <div className="text-body-secondary small">Critical Alerts</div>
                    <div className="fs-4 fw-semibold">8</div>
                  </div>
                </CCol>
              </CRow>

              <hr className="mt-0 mb-4" />

              {genderDistribution.map((item, index) => (
                <div className="progress-group mb-4" key={index}>
                  <div className="progress-group-header">
                    <CIcon className="me-2" icon={item.icon} size="lg" />
                    <span>{item.title}</span>
                    <span className="ms-auto fw-semibold">{item.percent}%</span>
                  </div>
                  <CProgress thin color="warning" value={item.percent} />
                </div>
              ))}

              <div className="mb-4"></div>

              <div className="progress-group mb-3">
                <div className="progress-group-header">
                  <CIcon className="me-2" icon={cilMedicalCross} size="lg" />
                  <span>Allergy / Interaction Alerts</span>
                  <span className="ms-auto fw-semibold">24 (12%)</span>
                </div>
                <CProgress thin color="danger" value={12} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader>Recent Patients – Master Patient Index (MPI) Preview</CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Patient</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Department
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Last Activity</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Alerts
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {recentPatients.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="fw-semibold">{item.patient.name}</div>
                    <div className="small text-body-secondary">
                      <span>{item.patient.status}</span> | ID: {item.patient.id} | Reg:{' '}
                      {item.patient.registered}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="fw-semibold">{item.department}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-body-secondary">Last interaction</div>
                    <div className="fw-semibold">{item.lastVisit}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {item.alerts.includes('None') ? (
                      <span className="text-success small">None</span>
                    ) : (
                      <span className="text-danger small">{item.alerts}</span>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <div className="text-center text-body-secondary mt-5">
        <small>
          SILICON AID Demo – Frontend Simulation Only<br />
          Modules represented: EHR Overview, MPI, Bed Mgmt, Appointments, Basic Alerts, Revenue Snapshot
        </small>
      </div>
    </>
  )
}

export default SiliconAidDashboard