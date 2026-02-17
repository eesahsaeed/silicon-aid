// ───────────────────────────────────────────────
// 3. DoctorAddPatientRecord.jsx  (Doctor's Patient Record Entry)
// ───────────────────────────────────────────────
import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CFormCheck,
  CButton,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CAlert,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilNotes, cilMedicalCross, cilHeart, cilWarning, cilPeople, cilClipboard, cilTablet } from '@coreui/icons'

const DoctorAddPatientRecord = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientID: '',
    age: '',
    gender: '',
    bloodType: '',
    height: '',
    weight: '',
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    symptoms: '',
    medicalHistory: '',
    familyHistory: '',
    allergies: '',
    currentMedications: '',
    socialHistory: '',
    reviewOfSystems: '',
    physicalExam: '',
    preliminaryDiagnosis: '',
    recommendedTests: '',
    treatmentPlan: '',
  })

  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In real app: Send to backend/API for storage and possible AI diagnostics generation
    console.log('Submitted Patient Record:', formData)
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 5000)
    // Reset form (optional)
    setFormData({
      patientName: '',
      patientID: '',
      age: '',
      gender: '',
      bloodType: '',
      height: '',
      weight: '',
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      symptoms: '',
      medicalHistory: '',
      familyHistory: '',
      allergies: '',
      currentMedications: '',
      socialHistory: '',
      reviewOfSystems: '',
      physicalExam: '',
      preliminaryDiagnosis: '',
      recommendedTests: '',
      treatmentPlan: '',
    })
  }

  return (
    <>
      <h3 className="mb-4">Add New Patient Record</h3>

      {submitSuccess && (
        <CAlert color="success" dismissible onClose={() => setSubmitSuccess(false)} className="mb-4">
          Patient record added successfully! (Demo mode – Diagnostics generated below if integrated)
        </CAlert>
      )}

      <CCard className="mb-4 shadow-sm">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <strong>Patient Record Entry Form</strong>
          <CButton color="info" variant="outline" size="sm">
            <CIcon icon={cilClipboard} className="me-2" />
            Load Previous Record
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CAccordion alwaysOpen>
              {/* Section 1: Patient Demographics */}
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <CIcon icon={cilUser} className="me-2" />
                  Patient Demographics
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow className="g-3">
                    <CCol md={6}>
                      <CFormLabel htmlFor="patientName">Full Name</CFormLabel>
                      <CFormInput
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        placeholder="e.g. Aisha Mohammed"
                        required
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="patientID">Patient ID</CFormLabel>
                      <CFormInput
                        id="patientID"
                        name="patientID"
                        value={formData.patientID}
                        onChange={handleInputChange}
                        placeholder="e.g. PID-48392"
                        required
                      />
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="age">Age</CFormLabel>
                      <CFormInput
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="e.g. 35"
                        required
                      />
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="gender">Gender</CFormLabel>
                      <CFormSelect
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="bloodType">Blood Type</CFormLabel>
                      <CFormSelect
                        id="bloodType"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>

              {/* Section 2: Vital Signs */}
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <CIcon icon={cilHeart} className="me-2" />
                  Vital Signs
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow className="g-3">
                    <CCol md={4}>
                      <CFormLabel htmlFor="height">Height (cm)</CFormLabel>
                      <CFormInput
                        type="number"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="e.g. 165"
                      />
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="weight">Weight (kg)</CFormLabel>
                      <CFormInput
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="e.g. 60"
                      />
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="bloodPressure">Blood Pressure (mmHg)</CFormLabel>
                      <CFormInput
                        id="bloodPressure"
                        name="bloodPressure"
                        value={formData.bloodPressure}
                        onChange={handleInputChange}
                        placeholder="e.g. 120/80"
                      />
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="heartRate">Heart Rate (bpm)</CFormLabel>
                      <CFormInput
                        type="number"
                        id="heartRate"
                        name="heartRate"
                        value={formData.heartRate}
                        onChange={handleInputChange}
                        placeholder="e.g. 72"
                      />
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="temperature">Temperature (°C)</CFormLabel>
                      <CFormInput
                        type="number"
                        step="0.1"
                        id="temperature"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleInputChange}
                        placeholder="e.g. 36.8"
                      />
                    </CCol>
                    {/* Add more vitals if needed: Respiratory Rate, Oxygen Saturation, etc. */}
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>

              {/* Section 3: Chief Complaint & Symptoms */}
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <CIcon icon={cilWarning} className="me-2" />
                  Chief Complaint & Current Symptoms
                </CAccordionHeader>
                <CAccordionBody>
                  <CFormLabel htmlFor="symptoms">Describe Symptoms (onset, duration, severity, aggravating/alleviating factors)</CFormLabel>
                  <CFormTextarea
                    id="symptoms"
                    name="symptoms"
                    rows={4}
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    placeholder="e.g. Chest pain started 2 days ago, sharp, worsens with movement, rated 7/10..."
                    required
                  />
                </CAccordionBody>
              </CAccordionItem>

              {/* Section 4: Medical History */}
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <CIcon icon={cilMedicalCross} className="me-2" />
                  Past Medical History
                </CAccordionHeader>
                <CAccordionBody>
                  <CFormLabel htmlFor="medicalHistory">Chronic Conditions, Surgeries, Hospitalizations</CFormLabel>
                  <CFormTextarea
                    id="medicalHistory"
                    name="medicalHistory"
                    rows={3}
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                    placeholder="e.g. Hypertension since 2015, Appendectomy in 2020..."
                  />
                </CAccordionBody>
              </CAccordionItem>

              {/* Section 5: Family & Social History */}
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <CIcon icon={cilPeople} className="me-2" />
                  Family & Social History
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow className="g-3">
                    <CCol md={6}>
                      <CFormLabel htmlFor="familyHistory">Family Medical History</CFormLabel>
                      <CFormTextarea
                        id="familyHistory"
                        name="familyHistory"
                        rows={3}
                        value={formData.familyHistory}
                        onChange={handleInputChange}
                        placeholder="e.g. Father: Diabetes, Mother: Breast Cancer..."
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="socialHistory">Social History (Smoking, Alcohol, Occupation, etc.)</CFormLabel>
                      <CFormTextarea
                        id="socialHistory"
                        name="socialHistory"
                        rows={3}
                        value={formData.socialHistory}
                        onChange={handleInputChange}
                        placeholder="e.g. Non-smoker, Social drinker, Office worker..."
                      />
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>

              {/* Section 6: Allergies & Medications */}
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <CIcon icon={cilTablet} className="me-2" />
                  Allergies & Current Medications
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow className="g-3">
                    <CCol md={6}>
                      <CFormLabel htmlFor="allergies">Allergies (Drugs, Food, Environmental)</CFormLabel>
                      <CFormTextarea
                        id="allergies"
                        name="allergies"
                        rows={3}
                        value={formData.allergies}
                        onChange={handleInputChange}
                        placeholder="e.g. Penicillin (rash), Peanuts (anaphylaxis)..."
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="currentMedications">Current Medications (Dose, Frequency)</CFormLabel>
                      <CFormTextarea
                        id="currentMedications"
                        name="currentMedications"
                        rows={3}
                        value={formData.currentMedications}
                        onChange={handleInputChange}
                        placeholder="e.g. Amlodipine 5mg daily, Paracetamol as needed..."
                      />
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>

              {/* Section 7: Review of Systems & Physical Exam */}
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <CIcon icon={cilNotes} className="me-2" />
                  Review of Systems & Physical Examination
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow className="g-3">
                    <CCol md={6}>
                      <CFormLabel htmlFor="reviewOfSystems">Review of Systems (General, Cardio, Resp, etc.)</CFormLabel>
                      <CFormTextarea
                        id="reviewOfSystems"
                        name="reviewOfSystems"
                        rows={4}
                        value={formData.reviewOfSystems}
                        onChange={handleInputChange}
                        placeholder="e.g. General: Fatigue, Cardio: Palpitations, Resp: Shortness of breath..."
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="physicalExam">Physical Exam Findings</CFormLabel>
                      <CFormTextarea
                        id="physicalExam"
                        name="physicalExam"
                        rows={4}
                        value={formData.physicalExam}
                        onChange={handleInputChange}
                        placeholder="e.g. HEENT: Normal, Chest: Clear lungs, Heart: Regular rhythm..."
                      />
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>

              {/* Section 8: Diagnostics & Plan */}
              <CAccordionItem itemKey={8}>
                <CAccordionHeader>
                  <CIcon icon={cilMedicalCross} className="me-2" />
                  Preliminary Diagnosis & Plan
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow className="g-3">
                    <CCol md={12}>
                      <CFormLabel htmlFor="preliminaryDiagnosis">Preliminary Diagnosis</CFormLabel>
                      <CFormTextarea
                        id="preliminaryDiagnosis"
                        name="preliminaryDiagnosis"
                        rows={3}
                        value={formData.preliminaryDiagnosis}
                        onChange={handleInputChange}
                        placeholder="e.g. Suspected Angina Pectoris..."
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="recommendedTests">Recommended Tests/Investigations</CFormLabel>
                      <CFormTextarea
                        id="recommendedTests"
                        name="recommendedTests"
                        rows={3}
                        value={formData.recommendedTests}
                        onChange={handleInputChange}
                        placeholder="e.g. ECG, Blood work (CBC, Lipid Profile), Chest X-ray..."
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="treatmentPlan">Treatment Plan/Referrals</CFormLabel>
                      <CFormTextarea
                        id="treatmentPlan"
                        name="treatmentPlan"
                        rows={3}
                        value={formData.treatmentPlan}
                        onChange={handleInputChange}
                        placeholder="e.g. Start Aspirin 81mg daily, Refer to Cardiologist, Follow-up in 1 week..."
                      />
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>

            <div className="text-center mt-4">
              <CButton color="primary" type="submit" size="lg">
                <CIcon icon={cilNotes} className="me-2" />
                Save Record & Generate Diagnostics
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>

      {/* Placeholder for Generated Diagnostics */}
      {submitSuccess && (
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Generated Diagnostics (Demo)</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary">
              [In production: Integrate AI/ML for differential diagnosis based on inputs. Demo output:]
            </p>
            <ul>
              <li>Possible Conditions: Hypertension, Cardiac Issue</li>
              <li>Risk Factors: Age, Family History</li>
              <li>Recommendations: Further tests as entered</li>
            </ul>
          </CCardBody>
        </CCard>
      )}
    </>
  )
}

export default DoctorAddPatientRecord
