// src/pages/Laboratory.js
import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsF,
  CFormInput,
  CFormSelect,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CProgress,
  CButton,
  CForm,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormCheck,
  CFormTextarea,
  CFormRange,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilSearch,
  cilPlus,
  cilCheckCircle,
  cilXCircle,
  cilClock,
  cilChartLine,
  cilMedicalCross,
  cilDrop,
  cilNotes,
  cilUser,
  cilHospital,
  cilCash,
  cilMagnifyingGlass,
  // cilBlood,
  cilStorage,
  cilClipboard,
  cilPeople,
  cilGraph,
  cilBell,
  cilArrowRight,
  cilWarning,
  cilInfo,
} from '@coreui/icons';

const Laboratory = ({ user }) => {
  // KPI Widgets - Lab module overview
  const [labKpis] = useState({
    pendingSamples: 47,
    inProgress: 31,
    completedToday: 189,
    avgTAT: '2h 14m',
    rejectionRate: 3.8,
    revenueToday: '₦1,245,600',
  });

  // Live alerts / critical notifications
  const [labAlerts, setLabAlerts] = useState([
    { id: 1, msg: 'Critical: Potassium 6.8 mmol/L – Patient MRN-392481', time: '7 min ago', color: 'danger' },
    { id: 2, msg: 'Sample hemolyzed – CBC for MRN-584920 rejected', time: '14 min ago', color: 'warning' },
    { id: 3, msg: 'Urgent Cross-match request – Theatre 3', time: '22 min ago', color: 'info' },
    { id: 4, msg: 'Notifiable disease: Positive TB culture – Alert Infection Control', time: '35 min ago', color: 'danger' },
    { id: 5, msg: 'Reagent expiry alert: Glucose kit lot #G234 expiring in 5 days', time: '1 hour ago', color: 'warning' },
  ]);

  // Pending / Active Lab Orders (Worklist)
  const [activeOrders, setActiveOrders] = useState([
    { id: 'LAB-23891', time: '08:45', patient: 'Aisha Mohammed', mrn: '392481', tests: 'CBC, U&E, CRP', status: 'Collected', progress: 65, priority: 'Routine', collector: 'Nurse Grace', tat: '1h 12m left', location: 'Ward 2' },
    { id: 'LAB-23894', time: '09:20', patient: 'Chinedu Eze', mrn: '584920', tests: 'Malaria Parasite, Blood Culture', status: 'Received', progress: 28, priority: 'Urgent', collector: 'Lab Tech Musa', tat: '45 min left', location: 'OPD' },
    { id: 'LAB-23902', time: '09:55', patient: 'Ngozi Okonkwo', mrn: '129374', tests: 'Lipid Profile, HbA1c', status: 'In Progress', progress: 82, priority: 'Routine', collector: 'Lab Tech Amina', tat: '18 min left', location: 'Clinic 4' },
    { id: 'LAB-23908', time: '10:30', patient: 'Tunde Alabi', mrn: '763920', tests: 'Cross-match, Group & Save', status: 'Ordered', progress: 5, priority: 'STAT', collector: '-', tat: 'Due now', location: 'Theatre' },
    { id: 'LAB-23915', time: '11:00', patient: 'Fatima Hassan', mrn: '482910', tests: 'Urine Culture & Sensitivity', status: 'Verified', progress: 100, priority: 'Routine', collector: 'Nurse Maryam', tat: 'Completed', location: 'Ward 5' },
  ]);

  // Recent / Completed Results (simulated)
  const [recentResults, setRecentResults] = useState([
    { id: 'RES-0912', patient: 'Aisha Mohammed', test: 'Potassium', result: '4.2 mmol/L', unit: 'mmol/L', range: '3.5–5.1', flag: 'Normal', comments: 'No issues', time: '09:32', verifiedBy: 'Dr. Bello' },
    { id: 'RES-0915', patient: 'Fatima Hassan', test: 'HbA1c', result: '8.9 %', unit: '%', range: '<5.7', flag: 'High', comments: 'Recommend follow-up', time: '10:05', verifiedBy: 'Dr. Zara' },
    { id: 'RES-0918', patient: 'Yusuf Ibrahim', test: 'WBC', result: '14.2 ×10³/µL', unit: '×10³/µL', range: '4.0–11.0', flag: 'High', comments: 'Possible infection', time: '10:18', verifiedBy: 'Dr. Ibrahim' },
    { id: 'RES-0920', patient: 'Maryam Ali', test: 'Blood Culture', result: 'Staphylococcus aureus', unit: '-', range: 'Negative', flag: 'Positive', comments: 'Sensitive to Vancomycin', time: '11:45', verifiedBy: 'Microbiologist' },
  ]);

  // Test Master Database (extended with more details)
  const [searchTest, setSearchTest] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);
  const testMaster = [
    { code: 'CBC', name: 'Complete Blood Count', dept: 'Hematology', specimen: 'Whole Blood (EDTA)', container: 'Purple top tube', volume: '3 mL', storage: 'Room temp, 24h', transport: 'Ambient', ranges: [{ age: 'Adult', gender: 'M/F', range: 'WBC: 4-11 x10^9/L' }], critical: 'WBC <2 or >20', tat: '2 hours', method: 'Automated Analyzer', price: '₦4,500', cpt: '85025' },
    { code: 'U&E', name: 'Urea & Electrolytes', dept: 'Biochemistry', specimen: 'Serum', container: 'Red top tube', volume: '5 mL', storage: 'Refrigerate, 48h', transport: 'Cold pack', ranges: [{ age: 'Adult', gender: 'M/F', range: 'Na: 135-145 mmol/L' }], critical: 'Na <120 or >160', tat: '3 hours', method: 'Ion Selective Electrode', price: '₦6,200', cpt: '80051' },
    { code: 'LFT', name: 'Liver Function Tests', dept: 'Biochemistry', specimen: 'Serum', container: 'Red top tube', volume: '5 mL', storage: 'Refrigerate, 72h', transport: 'Cold pack', ranges: [{ age: 'Adult', gender: 'M/F', range: 'ALT: 7-56 U/L' }], critical: 'ALT >500', tat: '4 hours', method: 'Enzymatic', price: '₦8,900', cpt: '80076' },
    { code: 'BS+', name: 'Blood Culture & Sensitivity', dept: 'Microbiology', specimen: 'Blood', container: 'Culture bottles', volume: '10 mL', storage: 'Incubate 35°C', transport: 'Immediate', ranges: [{ age: 'All', gender: 'M/F', range: 'Negative' }], critical: 'Positive growth', tat: '48–72 hours', method: 'Automated Culture System', price: '₦18,000', cpt: '87040' },
    { code: 'XMATCH', name: 'Cross-match', dept: 'Blood Bank', specimen: 'Whole Blood (CPDA)', container: 'Pink top tube', volume: '6 mL', storage: 'Refrigerate, 72h', transport: 'Cold pack', ranges: [{ age: 'All', gender: 'M/F', range: 'Compatible' }], critical: 'Incompatible', tat: '1 hour', method: 'Gel Card', price: '₦12,500', cpt: '86922' },
    { code: 'URCS', name: 'Urine Culture & Sensitivity', dept: 'Microbiology', specimen: 'Urine', container: 'Sterile container', volume: '10 mL', storage: 'Refrigerate, 24h', transport: 'Cold pack', ranges: [{ age: 'All', gender: 'M/F', range: '<10^3 CFU/mL' }], critical: '>10^5 CFU/mL', tat: '24-48 hours', method: 'Plate Culture', price: '₦9,500', cpt: '87077' },
  ];

  // Specimen Collection & Tracking (mock collection list)
  const [collectionList, setCollectionList] = useState([
    { id: 'COLL-001', patient: 'Aisha Mohammed', mrn: '392481', tests: 'CBC, U&E', location: 'Ward 2', status: 'Pending', collector: '-', time: '-', rejection: null },
    { id: 'COLL-002', patient: 'Chinedu Eze', mrn: '584920', tests: 'Blood Culture', location: 'OPD', status: 'Collected', collector: 'Nurse Grace', time: '09:25', rejection: null },
    { id: 'COLL-003', patient: 'Ngozi Okonkwo', mrn: '129374', tests: 'Lipid Profile', location: 'Clinic 4', status: 'Rejected', collector: 'Lab Tech Musa', time: '09:58', rejection: 'Insufficient volume' },
  ]);

  // Inventory Management (mock reagents)
  const [inventory, setInventory] = useState([
    { item: 'CBC Reagent Kit', lot: 'CBC-456', expiry: '2026-05-15', stock: 45, reorder: 20, usage: 'High' },
    { item: 'Glucose Strips', lot: 'GLU-789', expiry: '2026-03-10', stock: 120, reorder: 50, usage: 'Medium' },
    { item: 'Culture Media Plates', lot: 'CUL-123', expiry: '2026-04-20', stock: 85, reorder: 30, usage: 'Low' },
  ]);

  // Billing & Revenue (mock charges)
  const [billingItems, setBillingItems] = useState([
    { id: 'BILL-101', patient: 'Aisha Mohammed', tests: 'CBC, U&E', amount: '₦10,700', status: 'Billed', insurance: 'NHIA', refund: null },
    { id: 'BILL-102', patient: 'Chinedu Eze', tests: 'Blood Culture', amount: '₦18,000', status: 'Pending', insurance: 'Cash', refund: null },
    { id: 'BILL-103', patient: 'Ngozi Okonkwo', tests: 'Lipid Profile', amount: '₦8,900', status: 'Refunded', insurance: 'NHIA', refund: 'Cancelled order' },
  ]);

  // Microbiology Module (mock cultures)
  const [microCultures, setMicroCultures] = useState([
    { id: 'MIC-001', patient: 'Fatima Hassan', specimen: 'Urine', organism: 'E. coli', sensitivity: 'Sensitive to Ciprofloxacin', gram: 'Negative rods', status: 'Final', alerts: 'None' },
    { id: 'MIC-002', patient: 'Yusuf Ibrahim', specimen: 'Blood', organism: 'S. aureus', sensitivity: 'MRSA - Resistant to Methicillin', gram: 'Positive cocci', status: 'Preliminary', alerts: 'Notify IC' },
  ]);

  // Blood Bank Interface (mock requests)
  const [bloodBank, setBloodBank] = useState([
    { id: 'BB-001', patient: 'Tunde Alabi', request: 'Cross-match 2 units PRBC', group: 'O+', status: 'Issued', reaction: 'None', time: '10:45' },
    { id: 'BB-002', patient: 'Maryam Ali', request: 'Group & Screen', group: 'A-', status: 'Pending', reaction: null, time: '-' },
  ]);

  // Reports & Analytics (mock data)
  const [analytics] = useState({
    workload: { hematology: 120, biochemistry: 85, microbiology: 45 },
    revenue: { total: '₦5,678,900', insurance: 65, cash: 35 },
    tat: { avg: '2.5h', delays: 12 },
    abnormals: { high: 28, critical: 9 },
    quality: { rejections: 4.2, repeats: 2.1 },
  });

  // Modals and forms states
  const [showTestDetails, setShowTestDetails] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showResultEntry, setShowResultEntry] = useState(false);
  const [showReportView, setShowReportView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Progress simulation for orders
      setActiveOrders(prev =>
        prev.map(order =>
          (order.status === 'In Progress' || order.status === 'Received') && order.progress < 100
            ? { ...order, progress: Math.min(100, order.progress + Math.floor(Math.random() * 12) + 4) }
            : order
        )
      );

      // Occasionally add new alert
      if (Math.random() > 0.7) {
        const newAlertMsgs = [
          'Critical low hemoglobin – MRN-763920',
          'Sample clotting noted in U&E',
          'New STAT culture order received',
          'Reagent stock low: CBC kit',
          'Transfusion reaction reported – BB-001',
          'Antibiogram update: Increased MRSA resistance',
        ];
        const newAlert = {
          id: labAlerts.length + 1,
          msg: newAlertMsgs[Math.floor(Math.random() * newAlertMsgs.length)],
          time: 'Just now',
          color: Math.random() > 0.5 ? 'danger' : 'warning',
        };
        setLabAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }

      // Simulate order completion and add to recent results
      if (Math.random() > 0.82) {
        setActiveOrders(prev => {
          const updated = prev.map(o =>
            o.progress >= 90 && Math.random() > 0.6 && o.status !== 'Completed'
              ? { ...o, status: 'Completed', progress: 100, tat: 'Completed' }
              : o
          );
          const completed = updated.find(o => o.status === 'Completed' && !recentResults.some(r => r.patient === o.patient));
          if (completed) {
            const newResult = {
              id: `RES-${Math.floor(Math.random() * 10000)}`,
              patient: completed.patient,
              test: completed.tests.split(', ')[0],
              result: `${(Math.random() * 10).toFixed(1)} mmol/L`,
              unit: 'mmol/L',
              range: '3.5–5.1',
              flag: Math.random() > 0.5 ? 'High' : 'Normal',
              comments: 'Auto-generated',
              time: new Date().toLocaleTimeString(),
              verifiedBy: 'System',
            };
            setRecentResults(prev => [newResult, ...prev.slice(0, 9)]);
          }
          return updated;
        });
      }

      // Simulate inventory usage
      setInventory(prev =>
        prev.map(item => ({ ...item, stock: Math.max(0, item.stock - Math.floor(Math.random() * 3)) }))
      );
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [labAlerts, recentResults]);

  // Handle test selection for details modal
  const handleTestSelect = (test) => {
    setSelectedTest(test);
    setShowTestDetails(true);
  };

  // Handle order selection for result entry or report
  const handleSelectOrder = (order, mode) => {
    setSelectedOrder(order);
    if (mode === 'result') setShowResultEntry(true);
    if (mode === 'report') setShowReportView(true);
  };

  return (
    <>
      {/* KPI Widgets - Extended with revenue */}
      <CRow className="mb-4">
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF color="warning" title="Pending Samples" value={labKpis.pendingSamples} icon={<CIcon icon={cilMedicalCross} height={24} />} />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF color="info" title="In Progress" value={labKpis.inProgress} icon={<CIcon icon={cilClock} height={24} />} />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF color="success" title="Completed Today" value={labKpis.completedToday} icon={<CIcon icon={cilCheckCircle} height={24} />} />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF color="primary" title="Avg TAT Today" value={labKpis.avgTAT} icon={<CIcon icon={cilChartLine} height={24} />} />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF color="danger" title="Rejection Rate" value={`${labKpis.rejectionRate}%`} icon={<CIcon icon={cilXCircle} height={24} />} />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF color="success" title="Revenue Today" value={labKpis.revenueToday} icon={<CIcon icon={cilCash} height={24} />} />
        </CCol>
      </CRow>

      {/* Quick Actions / Search */}
      <CRow className="mb-4">
        <CCol lg={6}>
          <CCard>
            <CCardHeader>
              <CIcon icon={cilSearch} className="me-2" />
              Quick Search (Orders, Results, Patients)
            </CCardHeader>
            <CCardBody>
              <CInputGroup size="lg">
                <CInputGroupText><CIcon icon={cilSearch} /></CInputGroupText>
                <CFormInput placeholder="Patient name, MRN, Accession #, Test code..." />
              </CInputGroup>
              <small className="text-body-secondary mt-2 d-block">
                Multi-parameter search: MRN, barcode, test panel, physician...
              </small>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={6}>
          <CCard>
            <CCardHeader>
              <CIcon icon={cilPlus} className="me-2" />
              Test Order Management - Quick Entry
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow className="g-3">
                  <CCol md={6}>
                    <CFormInput placeholder="Patient MRN" label="MRN" />
                  </CCol>
                  <CCol md={6}>
                    <CFormSelect label="Order Type">
                      <option>Single Test</option>
                      <option>Test Panel</option>
                      <option>Standing Order</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={12}>
                    <CFormInput placeholder="Test Codes (comma separated)" label="Tests" />
                  </CCol>
                  <CCol md={6}>
                    <CFormSelect label="Priority">
                      <option>Routine</option>
                      <option>Urgent</option>
                      <option>STAT</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <CFormInput type="date" label="Standing Order End Date" />
                  </CCol>
                  <CCol md={12}>
                    <CButton color="primary" onClick={() => setShowOrderForm(true)}>Submit Order</CButton>
                    <CButton color="warning" variant="outline" className="ms-2">Validate Insurance</CButton>
                    <CButton color="danger" variant="outline" className="ms-2">Cancel Order</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Critical Alerts + Test Master */}
      <CRow className="mb-4">
        <CCol lg={6}>
          <CCard className="mb-4 mb-lg-0">
            <CCardHeader className="bg-danger text-white">
              <CIcon icon={cilBell} className="me-2" />
              Critical, Rejection & System Alerts
            </CCardHeader>
            <CCardBody style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {labAlerts.map(alert => (
                <CAlert key={alert.id} color={alert.color} className="mb-2 d-flex justify-content-between align-items-center">
                  <div>{alert.msg}</div>
                  <small className="text-nowrap ms-3">{alert.time}</small>
                </CAlert>
              ))}
              {labAlerts.length === 0 && <div className="text-center py-4 text-body-secondary">No active alerts</div>}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={6}>
          <CCard>
            <CCardHeader>
              <CIcon icon={cilNotes} className="me-2" />
              Test Master Database
            </CCardHeader>
            <CCardBody>
              <CFormInput
                placeholder="Search test name, code, or department..."
                value={searchTest}
                onChange={e => setSearchTest(e.target.value)}
                className="mb-3"
              />
              <CTable small hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Code</CTableHeaderCell>
                    <CTableHeaderCell>Test Name</CTableHeaderCell>
                    <CTableHeaderCell>Dept</CTableHeaderCell>
                    <CTableHeaderCell>Specimen</CTableHeaderCell>
                    <CTableHeaderCell>TAT</CTableHeaderCell>
                    <CTableHeaderCell>Price</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {testMaster
                    .filter(t => t.name.toLowerCase().includes(searchTest.toLowerCase()) || t.code.toLowerCase().includes(searchTest.toLowerCase()) || t.dept.toLowerCase().includes(searchTest.toLowerCase()))
                    .map((t, i) => (
                      <CTableRow key={i}>
                        <CTableDataCell>{t.code}</CTableDataCell>
                        <CTableDataCell>{t.name}</CTableDataCell>
                        <CTableDataCell>{t.dept}</CTableDataCell>
                        <CTableDataCell>{t.specimen}</CTableDataCell>
                        <CTableDataCell>{t.tat}</CTableDataCell>
                        <CTableDataCell>{t.price}</CTableDataCell>
                        <CTableDataCell>
                          <CButton size="sm" color="info" onClick={() => handleTestSelect(t)}>Details</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
              <small className="text-body-secondary">Central repository of all tests. Click details for full info including ranges, critical values.</small>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Workflow & Productivity Tools - Worklist */}
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilClipboard} className="me-2" />
          Workflow Tools - Active Orders & Worklists
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol>
              <CFormSelect>
                <option>Filter by Department: All</option>
                <option>Hematology</option>
                <option>Biochemistry</option>
                <option>Microbiology</option>
                <option>Blood Bank</option>
              </CFormSelect>
            </CCol>
            <CCol>
              <CFormSelect>
                <option>Sort by: TAT</option>
                <option>Priority</option>
                <option>Time Ordered</option>
              </CFormSelect>
            </CCol>
            <CCol>
              <CButton color="primary">Generate Load List</CButton>
              <CButton color="info" className="ms-2">Assign Technician</CButton>
            </CCol>
          </CRow>
          <CTable align="middle" className="mb-0 border" hover responsive small>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Accession</CTableHeaderCell>
                <CTableHeaderCell>Patient</CTableHeaderCell>
                <CTableHeaderCell>MRN</CTableHeaderCell>
                <CTableHeaderCell>Tests</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Progress</CTableHeaderCell>
                <CTableHeaderCell>Priority</CTableHeaderCell>
                <CTableHeaderCell>Location</CTableHeaderCell>
                <CTableHeaderCell>TAT</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {activeOrders.map(order => (
                <CTableRow key={order.id}>
                  <CTableDataCell className="fw-semibold">{order.id}</CTableDataCell>
                  <CTableDataCell>{order.patient}</CTableDataCell>
                  <CTableDataCell>{order.mrn}</CTableDataCell>
                  <CTableDataCell>{order.tests}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={
                      order.status === 'Completed' ? 'success' :
                        order.status === 'In Progress' ? 'primary' :
                          order.status === 'Collected' ? 'info' :
                            order.status === 'Received' ? 'warning' : 'secondary'
                    }>
                      {order.status}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CProgress thin value={order.progress} color={
                      order.progress >= 100 ? 'success' :
                        order.progress > 70 ? 'info' :
                          order.progress > 40 ? 'warning' : 'danger'
                    } />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={order.priority === 'STAT' ? 'danger' : order.priority === 'Urgent' ? 'warning' : 'secondary'}>
                      {order.priority}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{order.location}</CTableDataCell>
                  <CTableDataCell>{order.tat}</CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="primary" onClick={() => handleSelectOrder(order, 'result')} disabled={order.status === 'Completed'}>Enter Result</CButton>
                    <CButton size="sm" color="info" className="ms-1" onClick={() => handleSelectOrder(order, 'report')} disabled={order.status !== 'Completed'}>View Report</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <small className="text-body-secondary mt-2 d-block">Real-time TAT monitoring with alerts for delays. Productivity: {activeOrders.length} pending / shift.</small>
        </CCardBody>
      </CCard>

      {/* Specimen Collection & Tracking */}
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilDrop} className="me-2" />
          Specimen Collection & Tracking
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol>
              <CButton color="primary">Generate Collection List</CButton>
              <CButton color="success" className="ms-2">Print Barcodes</CButton>
              <CButton color="warning" className="ms-2">Track Chain of Custody</CButton>
            </CCol>
          </CRow>
          <CTable hover responsive small>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Patient</CTableHeaderCell>
                <CTableHeaderCell>MRN</CTableHeaderCell>
                <CTableHeaderCell>Tests</CTableHeaderCell>
                <CTableHeaderCell>Location</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Collector</CTableHeaderCell>
                <CTableHeaderCell>Time</CTableHeaderCell>
                <CTableHeaderCell>Rejection Reason</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {collectionList.map(item => (
                <CTableRow key={item.id}>
                  <CTableDataCell>{item.id}</CTableDataCell>
                  <CTableDataCell>{item.patient}</CTableDataCell>
                  <CTableDataCell>{item.mrn}</CTableDataCell>
                  <CTableDataCell>{item.tests}</CTableDataCell>
                  <CTableDataCell>{item.location}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={item.status === 'Collected' ? 'success' : item.status === 'Rejected' ? 'danger' : 'warning'}>{item.status}</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{item.collector}</CTableDataCell>
                  <CTableDataCell>{item.time}</CTableDataCell>
                  <CTableDataCell>{item.rejection || '-'}</CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="info" disabled={item.status !== 'Pending'}>Confirm Collection</CButton>
                    <CButton size="sm" color="danger" className="ms-1" disabled={item.status === 'Rejected'}>Reject</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <small className="text-body-secondary">Manage collections, confirmations, and rejections with reason codes (e.g., hemolyzed, clotted).</small>
        </CCardBody>
      </CCard>

      {/* Result Entry & Validation - Recent Results */}
      <CCard className="mb-4">
        <CCardHeader>
          <CIcon icon={cilCheckCircle} className="me-2" />
          Result Reporting - Recent Verified Results
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol>
              <CButton color="primary">Generate Cumulative Report</CButton>
              <CButton color="info" className="ms-2">View Trends Chart</CButton>
              <CButton color="success" className="ms-2">Deliver to EMR/Portal</CButton>
            </CCol>
          </CRow>
          <CTable small hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Patient</CTableHeaderCell>
                <CTableHeaderCell>Test</CTableHeaderCell>
                <CTableHeaderCell>Result</CTableHeaderCell>
                <CTableHeaderCell>Unit</CTableHeaderCell>
                <CTableHeaderCell>Range</CTableHeaderCell>
                <CTableHeaderCell>Flag</CTableHeaderCell>
                <CTableHeaderCell>Comments</CTableHeaderCell>
                <CTableHeaderCell>Verified By</CTableHeaderCell>
                <CTableHeaderCell>Time</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {recentResults.map(res => (
                <CTableRow key={res.id}>
                  <CTableDataCell>{res.id}</CTableDataCell>
                  <CTableDataCell>{res.patient}</CTableDataCell>
                  <CTableDataCell>{res.test}</CTableDataCell>
                  <CTableDataCell className="fw-semibold">{res.result}</CTableDataCell>
                  <CTableDataCell>{res.unit}</CTableDataCell>
                  <CTableDataCell>{res.range}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={
                      res.flag === 'Normal' ? 'success' :
                        res.flag === 'High' || res.flag === 'Critical' ? 'danger' :
                          res.flag === 'Low' ? 'warning' : 'info'
                    }>
                      {res.flag}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{res.comments}</CTableDataCell>
                  <CTableDataCell>{res.verifiedBy}</CTableDataCell>
                  <CTableDataCell>{res.time}</CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="info" onClick={() => { setSelectedResult(res); setShowReportView(true); }}>View Report</CButton>
                    <CButton size="sm" color="warning" className="ms-1">Amend</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <small className="text-body-secondary">Structured reports with flags, delta checks, and interpretive comments. Electronic delivery options.</small>
        </CCardBody>
      </CCard>

      {/* Specialized Modules Accordion */}
      <CAccordion alwaysOpen className="mb-4">
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            <CIcon icon={cilMagnifyingGlass} className="me-2" />
            Microbiology Module
          </CAccordionHeader>
          <CAccordionBody>
            <CRow className="mb-3">
              <CCol>
                <CButton color="primary">Create Antibiogram</CButton>
                <CButton color="info" className="ms-2">Enter Gram Stain</CButton>
                <CButton color="warning" className="ms-2">Alert Infection Control</CButton>
              </CCol>
            </CRow>
            <CTable hover responsive small>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Patient</CTableHeaderCell>
                  <CTableHeaderCell>Specimen</CTableHeaderCell>
                  <CTableHeaderCell>Organism</CTableHeaderCell>
                  <CTableHeaderCell>Sensitivity</CTableHeaderCell>
                  <CTableHeaderCell>Gram Stain</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Alerts</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {microCultures.map(culture => (
                  <CTableRow key={culture.id}>
                    <CTableDataCell>{culture.id}</CTableDataCell>
                    <CTableDataCell>{culture.patient}</CTableDataCell>
                    <CTableDataCell>{culture.specimen}</CTableDataCell>
                    <CTableDataCell>{culture.organism}</CTableDataCell>
                    <CTableDataCell>{culture.sensitivity}</CTableDataCell>
                    <CTableDataCell>{culture.gram}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={culture.status === 'Final' ? 'success' : 'warning'}>{culture.status}</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{culture.alerts}</CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="info">Update Sensitivity</CButton>
                      <CButton size="sm" color="danger" className="ms-1">Notify</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <small className="text-body-secondary">Workflow for cultures, sensitivity, serology, and notifiable disease alerts.</small>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>
            {/* <CIcon icon={cilBlood} className="me-2" /> */}
            Blood Bank Interface
          </CAccordionHeader>
          <CAccordionBody>
            <CRow className="mb-3">
              <CCol>
                <CButton color="primary">Process Cross-match</CButton>
                <CButton color="success" className="ms-2">Issue Units</CButton>
                <CButton color="danger" className="ms-2">Report Reaction</CButton>
              </CCol>
            </CRow>
            <CTable hover responsive small>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Patient</CTableHeaderCell>
                  <CTableHeaderCell>Request</CTableHeaderCell>
                  <CTableHeaderCell>Blood Group</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Reaction</CTableHeaderCell>
                  <CTableHeaderCell>Time</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {bloodBank.map(item => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.id}</CTableDataCell>
                    <CTableDataCell>{item.patient}</CTableDataCell>
                    <CTableDataCell>{item.request}</CTableDataCell>
                    <CTableDataCell>{item.group}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={item.status === 'Issued' ? 'success' : 'warning'}>{item.status}</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{item.reaction || '-'}</CTableDataCell>
                    <CTableDataCell>{item.time}</CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="info">Track Units</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <small className="text-body-secondary">Integrated pre-transfusion testing, issue tracking, and reaction reporting.</small>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={3}>
          <CAccordionHeader>
            <CIcon icon={cilStorage} className="me-2" />
            Inventory Management - Reagents & Consumables
          </CAccordionHeader>
          <CAccordionBody>
            <CRow className="mb-3">
              <CCol>
                <CButton color="primary">Reorder Suggestions</CButton>
                <CButton color="warning" className="ms-2">Update Stock</CButton>
                <CButton color="info" className="ms-2">View Usage Analytics</CButton>
              </CCol>
            </CRow>
            <CTable hover responsive small>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Item</CTableHeaderCell>
                  <CTableHeaderCell>Lot #</CTableHeaderCell>
                  <CTableHeaderCell>Expiry</CTableHeaderCell>
                  <CTableHeaderCell>Stock Level</CTableHeaderCell>
                  <CTableHeaderCell>Reorder Point</CTableHeaderCell>
                  <CTableHeaderCell>Usage Rate</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {inventory.map(item => (
                  <CTableRow key={item.lot}>
                    <CTableDataCell>{item.item}</CTableDataCell>
                    <CTableDataCell>{item.lot}</CTableDataCell>
                    <CTableDataCell>{item.expiry}</CTableDataCell>
                    <CTableDataCell>{item.stock}</CTableDataCell>
                    <CTableDataCell>{item.reorder}</CTableDataCell>
                    <CTableDataCell>{item.usage}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={item.stock <= item.reorder ? 'danger' : 'success'}>
                        {item.stock <= item.reorder ? 'Low' : 'Adequate'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="info">Link to Tests</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <small className="text-body-secondary">Track lots, expiries, and consumption ratios. Alerts for low stock.</small>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={4}>
          <CAccordionHeader>
            <CIcon icon={cilCash} className="me-2" />
            Billing & Revenue Management
          </CAccordionHeader>
          <CAccordionBody>
            <CRow className="mb-3">
              <CCol>
                <CButton color="primary">Capture Charges</CButton>
                <CButton color="success" className="ms-2">Submit NHIA Claim</CButton>
                <CButton color="danger" className="ms-2">Process Refund</CButton>
              </CCol>
            </CRow>
            <CTable hover responsive small>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Patient</CTableHeaderCell>
                  <CTableHeaderCell>Tests</CTableHeaderCell>
                  <CTableHeaderCell>Amount</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Insurance</CTableHeaderCell>
                  <CTableHeaderCell>Refund Reason</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {billingItems.map(item => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.id}</CTableDataCell>
                    <CTableDataCell>{item.patient}</CTableDataCell>
                    <CTableDataCell>{item.tests}</CTableDataCell>
                    <CTableDataCell>{item.amount}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={item.status === 'Billed' ? 'success' : item.status === 'Refunded' ? 'danger' : 'warning'}>{item.status}</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{item.insurance}</CTableDataCell>
                    <CTableDataCell>{item.refund || '-'}</CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="info">View Invoice</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <small className="text-body-secondary">Automatic charge capture, bundled pricing, and revenue reports by dept/doctor.</small>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={5}>
          <CAccordionHeader>
            <CIcon icon={cilPeople} className="me-2" />
            Patient & Physician Portals Preview
          </CAccordionHeader>
          <CAccordionBody>
            <CRow className="g-3">
              <CCol lg={6}>
                <CCard className="h-100">
                  <CCardHeader>Patient Portal Simulation</CCardHeader>
                  <CCardBody>
                    <p><strong>Secure Result Access:</strong> View lab reports, trends.</p>
                    <CButton color="primary">Download Report (Mock)</CButton>
                    <CProgress className="mt-3" value={75} color="success">HbA1c Trend</CProgress>
                    <small>Graphical trends for repeated tests.</small>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg={6}>
                <CCard className="h-100">
                  <CCardHeader>Physician Dashboard Simulation</CCardHeader>
                  <CCardBody>
                    <p><strong>Pending/Completed Orders:</strong> {activeOrders.length} active.</p>
                    <CButton color="info">Notify Critical Result</CButton>
                    <CAlert color="danger" className="mt-3">Critical Alert: Low Platelets</CAlert>
                    <small>Mobile notifications for critical results.</small>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <small className="text-body-secondary mt-2 d-block">Online access, notifications, and trends for patients/physicians.</small>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={6}>
          <CAccordionHeader>
            <CIcon icon={cilGraph} className="me-2" />
            Reports & Analytics
          </CAccordionHeader>
          <CAccordionBody>
            <CRow className="g-3">
              <CCol lg={4}>
                <CCard>
                  <CCardHeader>Workload by Department</CCardHeader>
                  <CCardBody>
                    <ul>
                      <li>Hematology: {analytics.workload.hematology}</li>
                      <li>Biochemistry: {analytics.workload.biochemistry}</li>
                      <li>Microbiology: {analytics.workload.microbiology}</li>
                    </ul>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg={4}>
                <CCard>
                  <CCardHeader>Revenue Analysis</CCardHeader>
                  <CCardBody>
                    <p>Total: {analytics.revenue.total}</p>
                    <p>Insurance: {analytics.revenue.insurance}%</p>
                    <p>Cash: {analytics.revenue.cash}%</p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg={4}>
                <CCard>
                  <CCardHeader>TAT Performance</CCardHeader>
                  <CCardBody>
                    <p>Avg TAT: {analytics.tat.avg}</p>
                    <p>Delays: {analytics.tat.delays}</p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg={4}>
                <CCard>
                  <CCardHeader>Abnormal Trends</CCardHeader>
                  <CCardBody>
                    <p>High: {analytics.abnormals.high}</p>
                    <p>Critical: {analytics.abnormals.critical}</p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg={4}>
                <CCard>
                  <CCardHeader>Quality Indicators</CCardHeader>
                  <CCardBody>
                    <p>Rejections: {analytics.quality.rejections}%</p>
                    <p>Repeats: {analytics.quality.repeats}%</p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg={4}>
                <CCard>
                  <CCardHeader>Utilization Review</CCardHeader>
                  <CCardBody>
                    <p>Overutilization Alerts: 3 doctors flagged</p>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CButton color="primary" className="mt-3">Generate Full Report</CButton>
            <small className="text-body-secondary ms-2">Analyze volumes, revenue, TAT, abnormals, quality, and utilization.</small>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>

      {/* Modals */}
      {/* Test Details Modal */}
      <CModal visible={showTestDetails} onClose={() => setShowTestDetails(false)}>
        <CModalHeader>
          Test Details: {selectedTest?.name} ({selectedTest?.code})
        </CModalHeader>
        <CModalBody>
          <p><strong>Department:</strong> {selectedTest?.dept}</p>
          <p><strong>Specimen:</strong> {selectedTest?.specimen} - {selectedTest?.volume} in {selectedTest?.container}</p>
          <p><strong>Storage/Transport:</strong> {selectedTest?.storage} / {selectedTest?.transport}</p>
          <p><strong>Reference Ranges:</strong></p>
          <ul>
            {selectedTest?.ranges.map((r, i) => (
              <li key={i}>{r.age} {r.gender}: {r.range}</li>
            ))}
          </ul>
          <p><strong>Critical Values:</strong> {selectedTest?.critical}</p>
          <p><strong>TAT:</strong> {selectedTest?.tat}</p>
          <p><strong>Method:</strong> {selectedTest?.method}</p>
          <p><strong>Price/CPT:</strong> {selectedTest?.price} / {selectedTest?.cpt}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowTestDetails(false)}>Close</CButton>
        </CModalFooter>
      </CModal>

      {/* Result Entry Modal */}
      <CModal visible={showResultEntry} onClose={() => setShowResultEntry(false)} size="lg">
        <CModalHeader>
          Result Entry & Validation for {selectedOrder?.id} - {selectedOrder?.patient}
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="g-3">
              <CCol md={12}>
                <CFormLabel>Tests: {selectedOrder?.tests}</CFormLabel>
              </CCol>
              <CCol md={6}>
                <CFormInput label="Numeric Result" placeholder="e.g., 4.2" />
              </CCol>
              <CCol md={6}>
                <CFormSelect label="Coded Value">
                  <option>Positive</option>
                  <option>Negative</option>
                  <option>Indeterminate</option>
                </CFormSelect>
              </CCol>
              <CCol md={12}>
                <CFormTextarea label="Comments / Interpretation" rows={3} />
              </CCol>
              <CCol md={6}>
                <CFormCheck type="checkbox" label="Flag as Abnormal" />
                <CFormCheck type="checkbox" label="Critical Value - Notify" />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Delta Check: Previous Result - 3.8 (Normal)</CFormLabel>
              </CCol>
              <CCol md={12}>
                <CButton color="primary">Technician Verify</CButton>
                <CButton color="success" className="ms-2">Pathologist Authorize</CButton>
                <CButton color="warning" className="ms-2">Amend Previous</CButton>
              </CCol>
            </CRow>
          </CForm>
          <small className="text-body-secondary mt-2 d-block">Structured entry with validation, flags, and audit trail.</small>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowResultEntry(false)}>Close</CButton>
        </CModalFooter>
      </CModal>

      {/* Report View Modal */}
      <CModal visible={showReportView} onClose={() => setShowReportView(false)} size="lg">
        <CModalHeader>
          {selectedResult ? 'Result Report' : 'Order Report'} for {selectedOrder?.patient || selectedResult?.patient}
        </CModalHeader>
        <CModalBody>
          <p><strong>Status:</strong> {selectedOrder?.status || 'Completed'}</p>
          <p><strong>Tests/Result:</strong> {selectedOrder?.tests || selectedResult?.test} - {selectedResult?.result || 'N/A'}</p>
          <p><strong>Flag:</strong> {selectedResult?.flag || '-'}</p>
          <p><strong>Comments:</strong> {selectedResult?.comments || 'No comments'}</p>
          <p><strong>Verified By:</strong> {selectedResult?.verifiedBy || 'Pending'}</p>
          <CProgress className="mt-3" value={75} color="info">Trend Chart Placeholder</CProgress>
          <CButton color="success" className="mt-3">Sign & Release</CButton>
          <CButton color="info" className="ms-2 mt-3">Preliminary Release</CButton>
          <CButton color="primary" className="ms-2 mt-3">Send to Patient Portal</CButton>
          <CButton color="warning" className="ms-2 mt-3">Email/SMS</CButton>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowReportView(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Laboratory;
