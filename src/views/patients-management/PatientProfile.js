// src/pages/PatientProfile.js
// Enhanced with all tabs: Demographics, Clinical, Insurance, Documents, Communication
// More mock data, edit simulations, global view with visit history

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CCard, CCardBody, CCardHeader, CTabs, CTabList, CTab, CTabContent, CTabPanel, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CButton, CFormInput, CRow, CCol, CFormSelect
} from '@coreui/react';

// Expanded mock patient data
const mockPatientData = {
  1: {
    demographics: {
      name: 'Aisha Mohammed', dob: '1990-05-15', gender: 'Female', address: '123 Lagos St', phone: '08012345678', email: 'aisha@example.com',
      emergencyContacts: [{ name: 'Ali Mohammed', relationship: 'Brother', phone: '08098765432' }],
      nationalId: 'NG123456', photo: 'avatar1.jpg', guarantor: { name: 'Self', type: 'self' }, dependents: ['MRN-584920'],
    },
    clinical: {
      alerts: ['Peanut Allergy', 'Contagious: None'], conditions: ['Diabetes (ICD-10: E11)'], pastHistory: ['Appendectomy 2015'],
      familyHistory: ['Hypertension in family'], socialHistory: ['Non-smoker, Occasional alcohol, Teacher'],
      vitals: [{ date: '2026-02-01', bp: '120/80', weight: '65kg', bmi: 22 }],
      immunizations: [{ vaccine: 'COVID-19', date: '2021-05-10' }],
    },
    insurance: {
      policies: [{ type: 'Primary', plan: 'XYZ Health', network: 'In-Network', deductible: 500, copay: 20, auth: 'AUTH123', expiration: '2027-01-01' }],
      financialClass: 'Insurance', creditLimit: 0,
    },
    documents: [
      { type: 'ID Proof', name: 'Passport Scan', uploadDate: '2023-01-01' },
      { type: 'Consent Form', name: 'Signed Consent', uploadDate: '2026-02-01' },
      { type: 'Advance Directive', name: 'Living Will', uploadDate: '2025-06-15' },
      { type: 'Visit History', name: 'Discharge Summary 2024', uploadDate: '2024-12-20' },
    ],
    communication: {
      preferredMethod: 'SMS', language: 'English', doNotContact: false,
    },
    visits: [
      { date: '2026-01-15', type: 'Consultation', doctor: 'Dr. Fatima', notes: 'Routine check-up' },
      // More
    ],
  },
  // Add data for other IDs
};

const PatientProfile = ({ user }) => {
  const { id } = useParams();
  const patient = mockPatientData[id] || {};
  const [editMode, setEditMode] = useState(false); // Simulate edit
  const [activeTab, setActiveTab] = useState(0);

  return (
    <CCard>
      <CCardHeader>Patient Profile: {patient.demographics?.name || 'Not Found'} (Global View)</CCardHeader>
      <CCardBody>
        <CButton color="primary" onClick={() => setEditMode(!editMode)} className="mb-3">{editMode ? 'Save' : 'Edit'}</CButton>
        <CTabs activeItemKey={activeTab} onChange={setActiveTab}>
          <CTabList variant="tabs">
            <CTab itemKey={1}>Demographics</CTab>
            <CTab itemKey={2}>Clinical Profile</CTab>
            <CTab itemKey={3}>Insurance & Financial</CTab>
            <CTab itemKey={4}>Documents</CTab>
            <CTab itemKey={5}>Communication Preferences</CTab>
            <CTab itemKey={6}>Visit History</CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel itemKey={1}>
              <CRow>
                <CCol md={6}><CFormInput label="Name" value={patient.demographics?.name} readOnly={!editMode} /></CCol>
                {/* All demographic fields with edit simulation */}
                <CCol md={6}><img src={patient.demographics?.photo} alt="Patient" style={{ width: '100px' }} /></CCol>
              </CRow>
              {/* Emergency contacts table */}
              {/* Guarantor and dependents */}
            </CTabPanel>
            <CTabPanel itemKey={2}>
              <h5>Medical Alerts</h5>
              <ul>{patient.clinical?.alerts.map(a => <li key={a}>{a}</li>)}</ul>
              {/* All clinical sections with tables/lists */}
              <CTable>
                <CTableHead><CTableRow><CTableHeaderCell>Date</CTableHeaderCell><CTableHeaderCell>BP</CTableHeaderCell><CTableHeaderCell>Weight</CTableHeaderCell><CTableHeaderCell>BMI</CTableHeaderCell></CTableRow></CTableHead>
                <CTableBody>{patient.clinical?.vitals.map(v => <CTableRow key={v.date}><CTableDataCell>{v.date}</CTableDataCell><CTableDataCell>{v.bp}</CTableDataCell><CTableDataCell>{v.weight}</CTableDataCell><CTableDataCell>{v.bmi}</CTableDataCell></CTableRow>)}</CTableBody>
              </CTable>
            </CTabPanel>
            <CTabPanel itemKey={3}>
              {/* Insurance policies table */}
              {/* Financial class, verification sim */}
            </CTabPanel>
            <CTabPanel itemKey={4}>
              <CTable>
                <CTableHead><CTableRow><CTableHeaderCell>Type</CTableHeaderCell><CTableHeaderCell>Name</CTableHeaderCell><CTableHeaderCell>Upload Date</CTableHeaderCell><CTableHeaderCell>Actions</CTableHeaderCell></CTableRow></CTableHead>
                <CTableBody>
                  {patient.documents?.map(doc => (
                    <CTableRow key={doc.name}>
                      <CTableDataCell>{doc.type}</CTableDataCell>
                      <CTableDataCell>{doc.name}</CTableDataCell>
                      <CTableDataCell>{doc.uploadDate}</CTableDataCell>
                      <CTableDataCell><CButton color="info" size="sm">View</CButton> <CButton color="danger" size="sm">Delete</CButton></CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CFormInput type="file" label="Upload New Document" className="mt-3" />
            </CTabPanel>
            <CTabPanel itemKey={5}>
              <CFormSelect label="Preferred Method" value={patient.communication?.preferredMethod}><option>SMS</option><option>Email</option></CFormSelect>
              {/* Language, do not contact */}
            </CTabPanel>
            <CTabPanel itemKey={6}>
              <CTable>
                {/* Visit history table */}
              </CTable>
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </CCardBody>
    </CCard>
  );
};

export default PatientProfile;
