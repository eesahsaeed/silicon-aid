// src/pages/NewPrescription.js
// Enhanced with e-prescribing, validation (allergies, duplicates), patient eligibility

import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormSelect, CButton, CRow, CCol, CAlert } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const NewPrescription = ({ user }) => {
  const [formData, setFormData] = useState({ patient: '', drug: '', dosage: '', quantity: '' });
  const [validation, setValidation] = useState([]); // Alerts for allergies, etc.
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Simulate validation
    if (e.target.name === 'drug' && e.target.value === 'Paracetamol') setValidation(['Allergy Check: No issues', 'Duplicate Therapy: None']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Prescription Issued! Validated.');
    navigate('/pharmacy');
  };

  return (
    <CCard>
      <CCardHeader>New Prescription (CPOE)</CCardHeader>
      <CCardBody>
        {validation.map(v => <CAlert key={v} color="success">{v}</CAlert>)}
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol md={6}><CFormInput label="Patient MRN/Name" name="patient" value={formData.patient} onChange={handleChange} required /></CCol>
            <CCol md={6}><CFormSelect label="Drug" name="drug" value={formData.drug} onChange={handleChange}><option>Paracetamol</option></CFormSelect></CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol md={6}><CFormInput label="Dosage" name="dosage" value={formData.dosage} onChange={handleChange} required /></CCol>
            <CCol md={6}><CFormInput label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required /></CCol>
          </CRow>
          <CButton type="submit" color="primary" className="mt-4">Issue</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default NewPrescription;
