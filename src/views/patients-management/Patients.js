// src/pages/Patients.js
import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilPeople, cilWarning } from '@coreui/icons';

const Patients = ({ user }) => {
  // Expanded mock patient database (more realistic volume)
  const [patients, setPatients] = useState([
    {
      id: 1,
      mrn: 'MRN-392481',
      name: 'Aisha Mohammed',
      dob: '1990-05-15',
      age: '35',
      gender: 'Female',
      phone: '0803-123-4567',
      nationalId: 'A12345678',
      barcode: 'BC392481',
      address: 'Plot 45, Wuse Zone 2, Abuja',
      email: 'aisha.mohammed@example.com',
      status: 'Active',
      lastVisit: '2026-02-10',
      duplicates: false,
    },
    {
      id: 2,
      mrn: 'MRN-584920',
      name: 'Chinedu Eze',
      dob: '1985-03-22',
      age: '40',
      gender: 'Male',
      phone: '0812-987-6543',
      nationalId: 'B98765432',
      barcode: 'BC584920',
      address: 'Gwarinpa Estate, Abuja',
      email: 'chinedu.eze@gmail.com',
      status: 'Active',
      lastVisit: '2026-01-28',
      duplicates: false,
    },
    {
      id: 3,
      mrn: 'MRN-129374',
      name: 'Ngozi Okonkwo',
      dob: '1995-07-10',
      age: '30',
      gender: 'Female',
      phone: '0806-555-7788',
      nationalId: 'C11223344',
      barcode: 'BC129374',
      address: 'Maitama, Abuja',
      email: 'ngozi.okonkwo@yahoo.com',
      status: 'Active',
      lastVisit: '2026-02-18',
      duplicates: false,
    },
    {
      id: 4,
      mrn: 'MRN-763920',
      name: 'Tunde Alabi',
      dob: '1978-11-30',
      age: '47',
      gender: 'Male',
      phone: '0701-234-5678',
      nationalId: 'D44556677',
      barcode: 'BC763920',
      address: 'Jabi District, Abuja',
      email: 'tunde.alabi@outlook.com',
      status: 'Active',
      lastVisit: '2025-12-05',
      duplicates: false,
    },
    {
      id: 5,
      mrn: 'MRN-482910',
      name: 'Fatima Hassan',
      dob: '2000-01-05',
      age: '26',
      gender: 'Female',
      phone: '0903-876-5432',
      nationalId: 'E77889900',
      barcode: 'BC482910',
      address: 'Asokoro, Abuja',
      email: 'fatima.hassan@proton.me',
      status: 'New',
      lastVisit: '—',
      duplicates: false,
    },
    {
      id: 6,
      mrn: 'MRN-917364',
      name: 'Yusuf Ibrahim',
      dob: '1982-09-14',
      age: '43',
      gender: 'Male',
      phone: '0809-111-2222',
      nationalId: 'F22334455',
      barcode: 'BC917364',
      address: 'Gudu, Abuja',
      email: 'yusuf.ibrahim@gmail.com',
      status: 'Active',
      lastVisit: '2026-02-20',
      duplicates: true, // Simulate duplicate
    },
    {
      id: 7,
      mrn: 'MRN-917364-B',
      name: 'Yusuf Ibrahim',
      dob: '1982-09-14',
      age: '43',
      gender: 'Male',
      phone: '0809-111-2222',
      nationalId: 'F22334455',
      barcode: 'BC917364B',
      address: 'Gudu, Abuja',
      email: 'yusuf.ibrahim@gmail.com',
      status: 'Duplicate',
      lastVisit: '2025-11-15',
      duplicates: true,
    },
  ]);

  const [searchParams, setSearchParams] = useState({
    name: '',
    mrn: '',
    phone: '',
    nationalId: '',
    dob: '',
    barcode: '',
  });

  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [selectedDuplicates, setSelectedDuplicates] = useState([]);

  // ──────────────────────────────────────────────
  // Real-time multi-parameter search
  useEffect(() => {
    const filtered = patients.filter((p) => {
      return (
        (!searchParams.name || p.name.toLowerCase().includes(searchParams.name.toLowerCase())) &&
        (!searchParams.mrn || p.mrn.toLowerCase().includes(searchParams.mrn.toLowerCase())) &&
        (!searchParams.phone || p.phone.includes(searchParams.phone)) &&
        (!searchParams.nationalId || p.nationalId.toLowerCase().includes(searchParams.nationalId.toLowerCase())) &&
        (!searchParams.dob || p.dob.includes(searchParams.dob)) &&
        (!searchParams.barcode || p.barcode.toLowerCase().includes(searchParams.barcode.toLowerCase()))
      );
    });

    setFilteredPatients(filtered);

    // Auto-detect potential duplicates when search is specific enough
    const hasDuplicateRisk =
      (searchParams.name && filtered.length > 1) ||
      (searchParams.phone && filtered.length > 1) ||
      (searchParams.nationalId && filtered.length > 1) ||
      (searchParams.dob && filtered.length > 1);

    if (hasDuplicateRisk && filtered.some((p) => p.duplicates)) {
      setSelectedDuplicates(filtered.filter((p) => p.duplicates));
    }
  }, [searchParams, patients]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleMerge = (group) => {
    setSelectedDuplicates(group);
    setShowMergeModal(true);
  };

  const confirmMerge = () => {
    // Simulate merge: keep the first record, remove others
    const masterId = selectedDuplicates[0].id;
    const surviving = patients.filter((p) => !selectedDuplicates.some((d) => d.id === p.id) || p.id === masterId);

    // In real system: merge demographics, keep latest MRN, log audit, etc.
    setPatients(surviving);
    setShowMergeModal(false);
    setSelectedDuplicates([]);
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <CIcon icon={cilPeople} className="me-2" />
            Master Patient Index (MPI) – Patient Search & Registration
          </div>
          <Link to="/new-patient">
            <CButton color="primary">
              + Register New Patient
            </CButton>
          </Link>
        </CCardHeader>

        <CCardBody>
          {/* Multi-parameter search form */}
          <CRow className="g-3 mb-4">
            <CCol md={4}>
              <CFormLabel>Full Name</CFormLabel>
              <CFormInput
                name="name"
                placeholder="e.g. Aisha Mohammed"
                value={searchParams.name}
                onChange={handleSearchChange}
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel>Medical Record Number (MRN)</CFormLabel>
              <CFormInput
                name="mrn"
                placeholder="e.g. MRN-392481"
                value={searchParams.mrn}
                onChange={handleSearchChange}
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel>Phone Number</CFormLabel>
              <CFormInput
                name="phone"
                placeholder="e.g. 08031234567"
                value={searchParams.phone}
                onChange={handleSearchChange}
              />
            </CCol>

            <CCol md={4}>
              <CFormLabel>National ID / NIN</CFormLabel>
              <CFormInput
                name="nationalId"
                placeholder="e.g. A12345678"
                value={searchParams.nationalId}
                onChange={handleSearchChange}
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel>Date of Birth</CFormLabel>
              <CFormInput
                type="date"
                name="dob"
                value={searchParams.dob}
                onChange={handleSearchChange}
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel>Barcode / QR</CFormLabel>
              <CFormInput
                name="barcode"
                placeholder="Scan or enter barcode"
                value={searchParams.barcode}
                onChange={handleSearchChange}
              />
            </CCol>
          </CRow>

          {/* Duplicate detection alert */}
          {selectedDuplicates.length > 1 && (
            <CAlert color="warning" className="mb-4 d-flex justify-content-between align-items-center">
              <div>
                <CIcon icon={cilWarning} className="me-2" />
                <strong>Potential duplicate records detected</strong> ({selectedDuplicates.length} similar entries)
              </div>
              <CButton color="warning" size="sm" onClick={() => handleMerge(selectedDuplicates)}>
                Review & Merge
              </CButton>
            </CAlert>
          )}

          {/* Results table */}
          <CTable hover responsive bordered className="mb-0">
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>MRN</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Age / Gender</CTableHeaderCell>
                <CTableHeaderCell>Phone</CTableHeaderCell>
                <CTableHeaderCell>National ID</CTableHeaderCell>
                <CTableHeaderCell>Last Visit</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredPatients.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={8} className="text-center py-5 text-body-secondary">
                    No patients match the search criteria
                  </CTableDataCell>
                </CTableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <CTableRow key={patient.id} className={patient.duplicates ? 'table-warning' : ''}>
                    <CTableDataCell className="fw-semibold">{patient.mrn}</CTableDataCell>
                    <CTableDataCell>{patient.name}</CTableDataCell>
                    <CTableDataCell>
                      {patient.age} yrs • {patient.gender}
                    </CTableDataCell>
                    <CTableDataCell>{patient.phone}</CTableDataCell>
                    <CTableDataCell>{patient.nationalId}</CTableDataCell>
                    <CTableDataCell>{patient.lastVisit}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={patient.status === 'Active' ? 'success' : 'warning'}>
                        {patient.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/patient/${patient.id}`}>
                        <CButton color="info" size="sm" className="me-2">
                          View Profile
                        </CButton>
                      </Link>
                      {patient.duplicates && (
                        <CButton
                          color="warning"
                          size="sm"
                          variant="outline"
                          onClick={() => handleMerge([patient])}
                        >
                          Merge
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>

          <div className="mt-4 text-body-secondary small">
            Showing {filteredPatients.length} of {patients.length} total patient records
          </div>
        </CCardBody>
      </CCard>

      {/* Merge Confirmation Modal */}
      <CModal visible={showMergeModal} onClose={() => setShowMergeModal(false)} alignment="center">
        <CModalHeader>
          <CModalTitle>Merge Duplicate Patient Records</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            You are about to merge the following duplicate records into one master record.
            This action cannot be undone.
          </p>

          <ul className="list-group mb-4">
            {selectedDuplicates.map((dup) => (
              <li key={dup.id} className="list-group-item">
                <strong>{dup.name}</strong> ({dup.mrn}) — DOB: {dup.dob} — Phone: {dup.phone}
              </li>
            ))}
          </ul>

          <CAlert color="info" className="small">
            <strong>Recommended action:</strong> Keep the most recent or complete record as master.
            All visits, documents, and history will be consolidated.
          </CAlert>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowMergeModal(false)}>
            Cancel
          </CButton>
          <CButton color="warning" onClick={confirmMerge}>
            Confirm Merge
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Patients;
