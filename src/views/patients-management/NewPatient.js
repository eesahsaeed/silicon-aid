// src/pages/NewPatient.js
import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CFormCheck,
  CButton,
  CRow,
  CCol,
  CAlert,
  CListGroup,
  CListGroupItem,
  CProgress,
  CFormTextarea,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilUser, cilPhone, cilLocationPin, cilMedicalCross, cilSave } from '@coreui/icons';

const NewPatient = ({ user }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    address: '',
    phonePrimary: '',
    phoneSecondary: '',
    email: '',
    nationalId: '',
    photo: null, // URL preview only (simulation)
    emergencyContacts: [
      { name: '', relationship: '', phone: '', isPrimary: false },
    ],
    guarantor: {
      name: '',
      relationship: '',
      type: 'Self',
      phone: '',
    },
    dependentsMRNs: '', // comma-separated
    notes: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // success / error

  // ──────────────────────────────────────────────
  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleEmergencyChange = (index, field, value) => {
    const contacts = [...formData.emergencyContacts];
    contacts[index][field] = value;
    setFormData((prev) => ({ ...prev, emergencyContacts: contacts }));
  };

  const addEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { name: '', relationship: '', phone: '', isPrimary: false },
      ],
    }));
  };

  const removeEmergencyContact = (index) => {
    const contacts = formData.emergencyContacts.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, emergencyContacts: contacts }));
  };

  const handleGuarantorChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      guarantor: { ...prev.guarantor, [name]: value },
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photo: previewUrl }));
    }
  };

  // ──────────────────────────────────────────────
  // Validation
  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.dob) errors.dob = 'Date of birth is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.phonePrimary.trim()) errors.phonePrimary = 'Primary phone is required';

    // At least one emergency contact with phone
    const hasValidContact = formData.emergencyContacts.some(
      (c) => c.name.trim() && c.phone.trim()
    );
    if (!hasValidContact) {
      errors.emergencyContacts = 'At least one emergency contact with phone is recommended';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ──────────────────────────────────────────────
  // Submit simulation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus({ type: 'danger', message: 'Please correct the errors in the form.' });
      return;
    }

    // Generate MRN and barcode
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newMRN = `MRN-${randomNum}`;
    const newBarcode = `BC${randomNum}`;

    // In real app: POST to API / save to state / show success
    setSubmitStatus({
      type: 'success',
      message: `Patient registered successfully!\nMRN: ${newMRN}\nBarcode: ${newBarcode}`,
    });

    // Reset form after 3 seconds & redirect
    setTimeout(() => {
      navigate('/patients-management');
    }, 3200);
  };

  return (
    <CCard className="mb-4 shadow">
      <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
        <div>
          <CIcon icon={cilUser} className="me-2" size="lg" />
          Register New Patient
        </div>
        <small>Staff: {user?.name || 'Registration Officer'}</small>
      </CCardHeader>

      <CCardBody>
        {submitStatus && (
          <CAlert
            color={submitStatus.type}
            dismissible
            className="mb-4"
            onClose={() => setSubmitStatus(null)}
          >
            {submitStatus.message}
          </CAlert>
        )}

        <CForm onSubmit={handleSubmit}>
          {/* ─── BASIC DEMOGRAPHICS ─── */}
          <h5 className="mb-3 border-bottom pb-2">1. Personal Information</h5>

          <CRow className="g-4 mb-5">
            <CCol md={4}>
              <CFormLabel>First Name *</CFormLabel>
              <CFormInput
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                invalid={!!formErrors.firstName}
              />
              {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
            </CCol>

            <CCol md={4}>
              <CFormLabel>Last Name *</CFormLabel>
              <CFormInput
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                invalid={!!formErrors.lastName}
              />
              {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
            </CCol>

            <CCol md={4}>
              <CFormLabel>Date of Birth *</CFormLabel>
              <CFormInput
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                invalid={!!formErrors.dob}
              />
              {formErrors.dob && <div className="invalid-feedback">{formErrors.dob}</div>}
            </CCol>

            <CCol md={4}>
              <CFormLabel>Gender *</CFormLabel>
              <CFormSelect
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                invalid={!!formErrors.gender}
              >
                <option value="">Select...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </CFormSelect>
              {formErrors.gender && <div className="invalid-feedback">{formErrors.gender}</div>}
            </CCol>

            <CCol md={8}>
              <CFormLabel>Residential Address</CFormLabel>
              <CFormInput
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House number, street, area, city, state"
              />
            </CCol>

            <CCol md={6}>
              <CFormLabel>Primary Phone Number *</CFormLabel>
              <CFormInput
                name="phonePrimary"
                value={formData.phonePrimary}
                onChange={handleChange}
                placeholder="080xxxxxxxx"
                invalid={!!formErrors.phonePrimary}
              />
              {formErrors.phonePrimary && <div className="invalid-feedback">{formErrors.phonePrimary}</div>}
            </CCol>

            <CCol md={6}>
              <CFormLabel>Secondary Phone / WhatsApp</CFormLabel>
              <CFormInput
                name="phoneSecondary"
                value={formData.phoneSecondary}
                onChange={handleChange}
              />
            </CCol>

            <CCol md={6}>
              <CFormLabel>Email Address</CFormLabel>
              <CFormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </CCol>

            <CCol md={6}>
              <CFormLabel>National ID / NIN / Passport Number</CFormLabel>
              <CFormInput
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
              />
            </CCol>

            <CCol md={12}>
              <CFormLabel>Patient Photo (optional)</CFormLabel>
              <CFormInput
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              {formData.photo && (
                <div className="mt-3">
                  <img
                    src={formData.photo}
                    alt="Patient preview"
                    style={{ maxWidth: '180px', borderRadius: '8px', border: '2px solid #ddd' }}
                  />
                </div>
              )}
            </CCol>
          </CRow>

          {/* ─── EMERGENCY CONTACTS ─── */}
          <h5 className="mb-3 border-bottom pb-2">2. Emergency Contacts</h5>

          {formErrors.emergencyContacts && (
            <CAlert color="warning" className="mb-3">
              {formErrors.emergencyContacts}
            </CAlert>
          )}

          {formData.emergencyContacts.map((contact, index) => (
            <CRow className="g-3 mb-3 align-items-end" key={index}>
              <CCol md={3}>
                <CFormLabel>Name</CFormLabel>
                <CFormInput
                  value={contact.name}
                  onChange={(e) => handleEmergencyChange(index, 'name', e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <CFormLabel>Relationship</CFormLabel>
                <CFormSelect
                  value={contact.relationship}
                  onChange={(e) => handleEmergencyChange(index, 'relationship', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option>Spouse</option>
                  <option>Parent</option>
                  <option>Sibling</option>
                  <option>Child</option>
                  <option>Friend</option>
                  <option>Other</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel>Phone Number</CFormLabel>
                <CFormInput
                  value={contact.phone}
                  onChange={(e) => handleEmergencyChange(index, 'phone', e.target.value)}
                />
              </CCol>
              <CCol md={2}>
                <CFormCheck
                  label="Primary"
                  checked={contact.isPrimary}
                  onChange={(e) => handleEmergencyChange(index, 'isPrimary', e.target.checked)}
                />
              </CCol>
              <CCol md={1}>
                {index > 0 && (
                  <CButton
                    color="danger"
                    variant="outline"
                    size="sm"
                    onClick={() => removeEmergencyContact(index)}
                  >
                    Remove
                  </CButton>
                )}
              </CCol>
            </CRow>
          ))}

          <CButton
            color="success"
            variant="outline"
            className="mb-4"
            onClick={addEmergencyContact}
          >
            + Add Another Contact
          </CButton>

          {/* ─── GUARANTOR ─── */}
          <h5 className="mb-3 border-bottom pb-2">3. Guarantor / Responsible Party</h5>

          <CRow className="g-3 mb-5">
            <CCol md={4}>
              <CFormLabel>Guarantor Type</CFormLabel>
              <CFormSelect
                name="type"
                value={formData.guarantor.type}
                onChange={handleGuarantorChange}
              >
                <option>Self</option>
                <option>Family Member</option>
                <option>Organization / Employer</option>
                <option>Other</option>
              </CFormSelect>
            </CCol>

            <CCol md={4}>
              <CFormLabel>Name</CFormLabel>
              <CFormInput
                name="name"
                value={formData.guarantor.name}
                onChange={handleGuarantorChange}
              />
            </CCol>

            <CCol md={4}>
              <CFormLabel>Relationship to Patient</CFormLabel>
              <CFormInput
                name="relationship"
                value={formData.guarantor.relationship}
                onChange={handleGuarantorChange}
              />
            </CCol>

            <CCol md={6}>
              <CFormLabel>Phone Number</CFormLabel>
              <CFormInput
                name="phone"
                value={formData.guarantor.phone}
                onChange={handleGuarantorChange}
              />
            </CCol>
          </CRow>

          {/* ─── DEPENDENTS ─── */}
          <h5 className="mb-3 border-bottom pb-2">4. Dependents / Family Linking</h5>

          <CFormInput
            name="dependentsMRNs"
            value={formData.dependentsMRNs}
            onChange={handleChange}
            placeholder="Enter MRNs of dependents/family members (comma-separated)"
            className="mb-3"
          />
          <small className="text-body-secondary">
            Example: MRN-584920, MRN-129374
          </small>

          {/* ─── NOTES & SUBMIT ─── */}
          <h5 className="mt-5 mb-3 border-bottom pb-2">Additional Notes</h5>

          <CFormTextarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any special instructions, allergies noted during registration, etc."
            className="mb-4"
          />

          <div className="d-flex justify-content-end mt-5">
            <CButton
              type="submit"
              color="success"
              size="lg"
              className="px-5"
              onClick={handleSubmit}
            >
              <CIcon icon={cilSave} className="me-2" />
              Register Patient
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default NewPatient;
