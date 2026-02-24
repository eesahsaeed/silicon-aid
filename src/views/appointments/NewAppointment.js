// src/pages/NewAppointment.js
import React, { useState, useEffect } from 'react';
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
  CProgress,
  CAlert,
  CListGroup,
  CListGroupItem,
  CBadge,
  CSpinner,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const NewAppointment = ({ user }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 to 5 steps
  const [formData, setFormData] = useState({
    department: '',
    doctor: '',
    date: '',
    time: '',
    type: '',
    duration: '30',
    location: 'Main Hospital - Abuja',
    reason: '',
    isTelemedicine: false,
    notes: '',
  });

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [suggestedAlternatives, setSuggestedAlternatives] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mock departments, doctors, locations
  const departments = [
    { value: 'general', label: 'General Medicine' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'gynaecology', label: 'Gynaecology' },
  ];

  const doctorsByDept = {
    general: ['Dr. Fatima Okoye', 'Dr. Samuel Adebayo'],
    pediatrics: ['Dr. Aisha Ibrahim', 'Dr. Musa Danjuma'],
    cardiology: ['Dr. Zara Khan', 'Dr. Bello Abdullahi'],
    surgery: ['Dr. Amina Bello', 'Dr. Yusuf Garba'],
    dermatology: ['Dr. Halima Sani'],
    gynaecology: ['Dr. Maryam Usman'],
  };

  const locations = [
    'Main Hospital - Abuja',
    'Garki Branch',
    'Wuse Specialist Centre',
    'Telemedicine (Virtual)',
  ];

  const appointmentTypes = [
    { value: 'new', label: 'New Patient Consultation', durationDefault: '45' },
    { value: 'followup', label: 'Follow-up Visit', durationDefault: '30' },
    { value: 'consult', label: 'Specialist Consultation', durationDefault: '60' },
    { value: 'procedure', label: 'Minor Procedure', durationDefault: '60' },
    { value: 'telemedicine', label: 'Telemedicine / Video Consult', durationDefault: '30' },
  ];

  // ──────────────────────────────────────────────
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when field is filled
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Auto-update duration when type changes
    if (name === 'type') {
      const selectedType = appointmentTypes.find(t => t.value === value);
      if (selectedType) {
        setFormData((prev) => ({ ...prev, duration: selectedType.durationDefault }));
      }
      if (value === 'telemedicine') {
        setFormData((prev) => ({ ...prev, isTelemedicine: true, location: 'Telemedicine (Virtual)' }));
      }
    }
  };

  // ──────────────────────────────────────────────
  // Simulate slot availability check when date + doctor selected
  useEffect(() => {
    if (step === 3 && formData.date && formData.doctor) {
      setLoadingSlots(true);
      setAvailableSlots([]);
      setSuggestedAlternatives([]);

      // Fake delay + mock data
      setTimeout(() => {
        const slots = [];
        const baseHour = 9;
        for (let h = 0; h < 8; h++) {
          const hour = baseHour + h;
          if (hour < 17) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
            slots.push(`${hour.toString().padStart(2, '0')}:30`);
          }
        }

        // Randomly remove some slots (simulate booked)
        const available = slots.filter(() => Math.random() > 0.4);

        setAvailableSlots(available.slice(0, 12));
        setLoadingSlots(false);

        // Smart matching suggestions if preferred time not available
        if (formData.time && !available.includes(formData.time)) {
          setSuggestedAlternatives([
            '10:30', '11:00', '14:15', '15:00',
          ]);
        }
      }, 1400);
    }
  }, [step, formData.date, formData.doctor, formData.time]);

  // ──────────────────────────────────────────────
  // Validation before moving to next step
  const validateStep = () => {
    const errors = {};

    if (step === 1) {
      if (!formData.department) errors.department = 'Department is required';
      if (!formData.doctor) errors.doctor = 'Doctor is required';
    }

    if (step === 2) {
      if (!formData.date) errors.date = 'Date is required';
    }

    if (step === 3) {
      if (!formData.time) errors.time = 'Time slot is required';
    }

    if (step === 4) {
      if (!formData.type) errors.type = 'Appointment type is required';
      if (!formData.reason.trim()) errors.reason = 'Reason for visit is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step < 5) {
        setStep(step + 1);
      } else {
        // Final submit
        setBookingSuccess(true);
        setTimeout(() => {
          navigate('/appointments');
        }, 2200);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // ──────────────────────────────────────────────
  // Render progress bar
  const progress = (step / 5) * 100;

  return (
    <CCard className="mb-4 shadow">
      <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
        <div>
          <strong>Book New Appointment</strong>
          <small className="d-block">Guided multi-step booking • {user?.name || 'Staff'}</small>
        </div>
        <CBadge color="light" shape="rounded-pill">
          Step {step} of 5
        </CBadge>
      </CCardHeader>

      <CCardBody>
        <CProgress value={progress} color="primary" className="mb-4" animated striped />

        {bookingSuccess ? (
          <CAlert color="success" className="text-center py-5">
            <h4>Appointment Successfully Booked!</h4>
            <p>Confirmation has been sent via SMS & email.</p>
            <p className="mt-3">
              Redirecting to appointments overview...
            </p>
            <CSpinner color="success" variant="grow" />
          </CAlert>
        ) : (
          <CForm>
            {/* ─── STEP 1 ─── Department & Doctor */}
            {step === 1 && (
              <>
                <h5 className="mb-4">1. Select Department & Doctor</h5>

                <CRow className="g-4">
                  <CCol md={6}>
                    <CFormLabel>Department / Specialty</CFormLabel>
                    <CFormSelect
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      invalid={!!formErrors.department}
                    >
                      <option value="">Choose department...</option>
                      {departments.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </CFormSelect>
                    {formErrors.department && (
                      <div className="invalid-feedback">{formErrors.department}</div>
                    )}
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel>Preferred Doctor</CFormLabel>
                    <CFormSelect
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      disabled={!formData.department}
                      invalid={!!formErrors.doctor}
                    >
                      <option value="">Select doctor...</option>
                      {(doctorsByDept[formData.department] || []).map((doc) => (
                        <option key={doc} value={doc}>
                          {doc}
                        </option>
                      ))}
                    </CFormSelect>
                    {formErrors.doctor && (
                      <div className="invalid-feedback">{formErrors.doctor}</div>
                    )}
                  </CCol>
                </CRow>
              </>
            )}

            {/* ─── STEP 2 ─── Date */}
            {step === 2 && (
              <>
                <h5 className="mb-4">2. Choose Preferred Date</h5>

                <CRow className="g-4">
                  <CCol md={6}>
                    <CFormLabel>Appointment Date</CFormLabel>
                    <CFormInput
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      invalid={!!formErrors.date}
                    />
                    {formErrors.date && (
                      <div className="invalid-feedback">{formErrors.date}</div>
                    )}
                  </CCol>

                  <CCol md={6} className="d-flex align-items-end">
                    <CFormCheck
                      id="urgent"
                      label="This is an urgent / same-day request"
                    />
                  </CCol>
                </CRow>
              </>
            )}

            {/* ─── STEP 3 ─── Time Slot */}
            {step === 3 && (
              <>
                <h5 className="mb-4">3. Select Available Time Slot</h5>

                {loadingSlots ? (
                  <div className="text-center py-5">
                    <CSpinner color="primary" />
                    <p className="mt-2">Checking doctor availability...</p>
                  </div>
                ) : (
                  <>
                    {availableSlots.length > 0 ? (
                      <>
                        <CFormLabel>Available slots on {formData.date || 'selected date'}</CFormLabel>
                        <CRow className="g-2">
                          {availableSlots.map((slot) => (
                            <CCol xs={6} sm={4} md={3} key={slot}>
                              <CButton
                                color={formData.time === slot ? 'primary' : 'outline-secondary'}
                                className="w-100"
                                onClick={() => setFormData({ ...formData, time: slot })}
                              >
                                {slot}
                              </CButton>
                            </CCol>
                          ))}
                        </CRow>

                        {suggestedAlternatives.length > 0 && formData.time && !availableSlots.includes(formData.time) && (
                          <CAlert color="warning" className="mt-4">
                            Preferred time not available. Suggested alternatives:
                            <CListGroup flush className="mt-2">
                              {suggestedAlternatives.map((s) => (
                                <CListGroupItem
                                  key={s}
                                  component="button"
                                  onClick={() => setFormData({ ...formData, time: s })}
                                >
                                  {s}
                                </CListGroupItem>
                              ))}
                            </CListGroup>
                          </CAlert>
                        )}
                      </>
                    ) : (
                      <CAlert color="danger">
                        No available slots found for the selected doctor and date.
                        Please choose a different date or doctor.
                      </CAlert>
                    )}

                    {formErrors.time && (
                      <div className="text-danger mt-2">{formErrors.time}</div>
                    )}
                  </>
                )}
              </>
            )}

            {/* ─── STEP 4 ─── Type, Reason, Duration */}
            {step === 4 && (
              <>
                <h5 className="mb-4">4. Appointment Details</h5>

                <CRow className="g-4">
                  <CCol md={6}>
                    <CFormLabel>Appointment Type</CFormLabel>
                    <CFormSelect
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      invalid={!!formErrors.type}
                    >
                      <option value="">Select type...</option>
                      {appointmentTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </CFormSelect>
                    {formErrors.type && <div className="invalid-feedback">{formErrors.type}</div>}
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel>Duration</CFormLabel>
                    <CFormSelect
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </CFormSelect>
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel>Reason for Visit / Chief Complaint</CFormLabel>
                    <CFormInput
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="e.g. Persistent headache, routine check-up, follow-up after surgery..."
                      invalid={!!formErrors.reason}
                    />
                    {formErrors.reason && <div className="invalid-feedback">{formErrors.reason}</div>}
                  </CCol>

                  <CCol md={12}>
                    <CFormCheck
                      id="telemedicine"
                      name="isTelemedicine"
                      label="This is a telemedicine / video consultation"
                      checked={formData.isTelemedicine}
                      onChange={handleChange}
                    />
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel>Location / Branch</CFormLabel>
                    <CFormSelect
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
              </>
            )}

            {/* ─── STEP 5 ─── Review & Confirm */}
            {step === 5 && (
              <>
                <h5 className="mb-4">5. Review & Confirm Appointment</h5>

                <CCard className="bg-light border-primary mb-4">
                  <CCardBody>
                    <dl className="row mb-0">
                      <dt className="col-sm-4">Patient / Booked for</dt>
                      <dd className="col-sm-8 fw-bold">Walk-in / {user?.name || 'Self'}</dd>

                      <dt className="col-sm-4">Doctor</dt>
                      <dd className="col-sm-8">{formData.doctor || '—'}</dd>

                      <dt className="col-sm-4">Date & Time</dt>
                      <dd className="col-sm-8">
                        {formData.date || '—'} at {formData.time || '—'}
                      </dd>

                      <dt className="col-sm-4">Type</dt>
                      <dd className="col-sm-8">
                        {appointmentTypes.find(t => t.value === formData.type)?.label || formData.type}
                      </dd>

                      <dt className="col-sm-4">Duration</dt>
                      <dd className="col-sm-8">{formData.duration} minutes</dd>

                      <dt className="col-sm-4">Location</dt>
                      <dd className="col-sm-8">{formData.location}</dd>

                      <dt className="col-sm-4">Reason</dt>
                      <dd className="col-sm-8">{formData.reason || '—'}</dd>

                      {formData.isTelemedicine && (
                        <>
                          <dt className="col-sm-4">Telemedicine</dt>
                          <dd className="col-sm-8">
                            <CBadge color="info">Video consultation – link sent on confirmation</CBadge>
                          </dd>
                        </>
                      )}
                    </dl>
                  </CCardBody>
                </CCard>

                <CFormCheck
                  id="confirmTerms"
                  label="I confirm the above details are correct and agree to the hospital appointment policy"
                  className="mb-4"
                />

                <CAlert color="info" className="small">
                  A confirmation SMS and email will be sent to the patient upon booking.
                  Reminders will be sent 24 hours and 2 hours before the appointment.
                </CAlert>
              </>
            )}

            {/* Navigation buttons */}
            <div className="d-flex justify-content-between mt-5">
              {step > 1 && (
                <CButton color="secondary" onClick={prevStep}>
                  ← Previous
                </CButton>
              )}

              <div className="ms-auto">
                {step < 5 ? (
                  <CButton color="primary" onClick={nextStep}>
                    Next →
                  </CButton>
                ) : (
                  <CButton
                    color="success"
                    size="lg"
                    onClick={nextStep}
                    disabled={bookingSuccess}
                  >
                    Confirm & Book Appointment
                  </CButton>
                )}
              </div>
            </div>
          </CForm>
        )}
      </CCardBody>
    </CCard>
  );
};

export default NewAppointment;
