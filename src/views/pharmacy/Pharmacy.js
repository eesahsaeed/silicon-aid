// src/pages/Pharmacy.js
import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CWidgetStatsF,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CProgress,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormSelect,
  CFormLabel,
  CFormCheck,
  CAlert,
  CListGroup,
  CListGroupItem,
  CSpinner,
  CFormTextarea
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  // cilPill,
  cilWarning,
  cilPlus,
  cilMinus,
  cilTransfer,
  cilTrash,
  cilSearch,
  cilChartPie,
  cilClock,
  cilCheckCircle,
} from '@coreui/icons';

const Pharmacy = ({ user }) => {
  // ──────────────────────────────────────────────
  // Mock Drug Master + Inventory Data (expanded)
  const [drugs, setDrugs] = useState([
    {
      id: 1,
      generic: 'Paracetamol',
      brand: 'Panadol',
      strength: '500 mg',
      form: 'Tablet',
      classification: 'Analgesic / Antipyretic',
      atc: 'N02BE01',
      ndc: '12345-6789-01',
      manufacturer: 'GlaxoSmithKline',
      supplier: 'Emzor Pharma',
      storage: 'Room temperature (<30°C), protect from light',
      unit: 'Tablet',
      reorderLevel: 200,
      locations: { main: 320, wardA: 80, wardB: 45 },
      batches: [
        { batchNo: 'P2025A01', expiry: '2027-06-30', qty: 180, received: '2025-01-10' },
        { batchNo: 'P2025B03', expiry: '2027-09-15', qty: 140, received: '2025-03-22' },
        { batchNo: 'P2024C12', expiry: '2026-04-05', qty: 25, received: '2024-11-18' },
      ],
    },
    {
      id: 2,
      generic: 'Amoxicillin',
      brand: 'Moxacil',
      strength: '500 mg',
      form: 'Capsule',
      classification: 'Antibiotic – Penicillin',
      atc: 'J01CA04',
      ndc: '54321-0987-02',
      manufacturer: 'May & Baker',
      supplier: 'HealthPlus Ltd',
      storage: 'Below 25°C, dry place',
      unit: 'Capsule',
      reorderLevel: 150,
      locations: { main: 90, wardA: 30, wardB: 0 },
      batches: [
        { batchNo: 'AMX-2025-07', expiry: '2027-07-20', qty: 90, received: '2025-02-05' },
        { batchNo: 'AMX-2026-01', expiry: '2026-03-10', qty: 0, received: '2025-01-15' },
      ],
    },
    {
      id: 3,
      generic: 'Metformin',
      brand: 'Glucophage',
      strength: '500 mg',
      form: 'Tablet',
      classification: 'Antidiabetic – Biguanide',
      atc: 'A10BA02',
      ndc: '98765-4321-03',
      manufacturer: 'Merck',
      supplier: 'Medcourt Pharmacy',
      storage: 'Room temperature, dry',
      unit: 'Tablet',
      reorderLevel: 300,
      locations: { main: 420, wardA: 120, wardB: 65 },
      batches: [
        { batchNo: 'MET-2025-A', expiry: '2028-01-15', qty: 300, received: '2025-04-01' },
        { batchNo: 'MET-2025-B', expiry: '2027-11-30', qty: 220, received: '2025-02-18' },
      ],
    },
    {
      id: 4,
      generic: 'Ceftriaxone',
      brand: 'Rocephin',
      strength: '1 g',
      form: 'Injection – Vial',
      classification: 'Antibiotic – Cephalosporin (3rd gen)',
      atc: 'J01DD04',
      ndc: '65432-1098-04',
      manufacturer: 'Roche',
      supplier: 'Jawa International',
      storage: '2–8°C (refrigerated)',
      unit: 'Vial',
      reorderLevel: 50,
      locations: { main: 38, wardA: 12, wardB: 5 },
      batches: [
        { batchNo: 'CTR-2026-03', expiry: '2027-08-31', qty: 38, received: '2026-01-20' },
      ],
    },
    // ... you can keep adding more drugs
  ]);

  // ──────────────────────────────────────────────
  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [adjustmentType, setAdjustmentType] = useState('dispense'); // dispense, receive, transfer, writeoff
  const [adjustmentQty, setAdjustmentQty] = useState(0);
  const [adjustmentLocation, setAdjustmentLocation] = useState('main');
  const [adjustmentNote, setAdjustmentNote] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  // ──────────────────────────────────────────────
  // Derived data
  const filteredDrugs = drugs.filter((drug) =>
    searchTerm === '' ||
    drug.generic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.atc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // KPI calculations
  const totalStockValue = drugs.reduce((sum, d) => {
    const totalQty = Object.values(d.locations).reduce((a, b) => a + b, 0);
    // fake price for demo
    const unitPrice = Math.floor(Math.random() * 800 + 200);
    return sum + totalQty * unitPrice;
  }, 0);

  const lowStockCount = drugs.filter(d => {
    const total = Object.values(d.locations).reduce((a, b) => a + b, 0);
    return total <= d.reorderLevel;
  }).length;

  const nearExpiryCount = drugs.reduce((count, d) => {
    const hasNearExpiry = d.batches.some(b => {
      const exp = new Date(b.expiry);
      const today = new Date('2026-02-24');
      const diff = (exp - today) / (1000 * 60 * 60 * 24);
      return diff > 0 && diff <= 90; // 90 days
    });
    return count + (hasNearExpiry ? 1 : 0);
  }, 0);

  // ──────────────────────────────────────────────
  // Handlers
  const openDetail = (drug) => {
    setSelectedDrug(drug);
    setShowDetailModal(true);
  };

  const openAdjustment = (type, drug) => {
    setSelectedDrug(drug);
    setAdjustmentType(type);
    setAdjustmentQty(0);
    setAdjustmentLocation('main');
    setAdjustmentNote('');
    setShowAdjustmentModal(true);
  };

  const confirmAdjustment = () => {
    if (adjustmentQty <= 0) return;

    const updatedDrugs = drugs.map(d => {
      if (d.id !== selectedDrug.id) return d;

      let newLocations = { ...d.locations };
      let newBatches = [...d.batches];

      if (adjustmentType === 'dispense') {
        newLocations[adjustmentLocation] = Math.max(0, newLocations[adjustmentLocation] - adjustmentQty);
      } else if (adjustmentType === 'receive') {
        newLocations[adjustmentLocation] += adjustmentQty;
        // add dummy batch for simplicity
        newBatches.push({
          batchNo: `REC-${Date.now().toString().slice(-6)}`,
          expiry: '2028-01-01',
          qty: adjustmentQty,
          received: new Date().toISOString().split('T')[0],
        });
      } else if (adjustmentType === 'writeoff') {
        newLocations[adjustmentLocation] = Math.max(0, newLocations[adjustmentLocation] - adjustmentQty);
      } // transfer would need from/to logic — simplified here

      return {
        ...d,
        locations: newLocations,
        batches: newBatches,
      };
    });

    setDrugs(updatedDrugs);
    setShowAdjustmentModal(false);
    setSuccessMessage(`Successfully ${adjustmentType}d ${adjustmentQty} units of ${selectedDrug.generic}`);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <>
      {/* Success feedback */}
      {successMessage && (
        <CAlert color="success" dismissible className="mb-4">
          {successMessage}
        </CAlert>
      )}

      {/* KPIs */}
      <CRow className="mb-4">
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            color="primary"
            title="Total Stock Value"
            value={`₦${totalStockValue.toLocaleString()}`}
            icon={<CIcon icon={cilChartPie} height={24} />}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            color="warning"
            title="Low Stock Items"
            value={lowStockCount}
            icon={<CIcon icon={cilWarning} height={24} />}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            color="danger"
            title="Near Expiry (90 days)"
            value={nearExpiryCount}
            icon={<CIcon icon={cilClock} height={24} />}
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            color="success"
            title="Pending Prescriptions"
            value="17"
            // icon={<CIcon icon={cilPill} height={24} />}
          />
        </CCol>
      </CRow>

      {/* Main Card */}
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <div>
            {/* <CIcon icon={cilPill} className="me-2" /> */}
            Pharmacy & Drug Inventory Management
          </div>
          <div>
            <CButton color="primary" className="me-2">
              <CIcon icon={cilPlus} className="me-1" /> Receive New Stock
            </CButton>
            <CButton color="info">
              <CIcon icon={cilSearch} className="me-1" /> Advanced Search
            </CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          {/* Search & Filter */}
          <CRow className="mb-4">
            <CCol md={8}>
              <CFormInput
                placeholder="Search drug name, brand, generic, ATC, NDC…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="lg"
              />
            </CCol>
            <CCol md={4} className="text-end">
              <CButton color="success">
                <CIcon icon={cilPlus} className="me-1" /> Add New Drug
              </CButton>
            </CCol>
          </CRow>

          {/* Drug List Table */}
          <CTable hover responsive bordered className="mb-0">
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Generic / Brand</CTableHeaderCell>
                <CTableHeaderCell>Strength / Form</CTableHeaderCell>
                <CTableHeaderCell>ATC / Class</CTableHeaderCell>
                <CTableHeaderCell>Total Stock</CTableHeaderCell>
                <CTableHeaderCell>Reorder Status</CTableHeaderCell>
                <CTableHeaderCell>Expiry Risk</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredDrugs.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={7} className="text-center py-5">
                    No drugs match your search
                  </CTableDataCell>
                </CTableRow>
              ) : (
                filteredDrugs.map((drug) => {
                  const totalStock = Object.values(drug.locations).reduce((a, b) => a + b, 0);
                  const isLow = totalStock <= drug.reorderLevel;
                  const hasNearExpiry = drug.batches.some(b => {
                    const daysLeft = (new Date(b.expiry) - new Date('2026-02-24')) / (1000*60*60*24);
                    return daysLeft > 0 && daysLeft <= 90;
                  });

                  return (
                    <CTableRow key={drug.id} className={isLow ? 'table-warning' : ''}>
                      <CTableDataCell className="fw-semibold">
                        {drug.generic}<br />
                        <small className="text-body-secondary">{drug.brand}</small>
                      </CTableDataCell>
                      <CTableDataCell>{drug.strength} • {drug.form}</CTableDataCell>
                      <CTableDataCell>
                        {drug.atc}<br />
                        <small>{drug.classification}</small>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{totalStock}</strong> {drug.unit}s<br />
                        <small>Main: {drug.locations.main} | Ward A: {drug.locations.wardA} | Ward B: {drug.locations.wardB}</small>
                      </CTableDataCell>
                      <CTableDataCell>
                        {isLow ? (
                          <CBadge color="danger">Below reorder ({drug.reorderLevel})</CBadge>
                        ) : (
                          <CBadge color="success">OK</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {hasNearExpiry ? (
                          <CBadge color="warning">Near expiry</CBadge>
                        ) : (
                          <CBadge color="success">OK</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          size="sm"
                          className="me-1"
                          onClick={() => openDetail(drug)}
                        >
                          Details
                        </CButton>
                        <CButton
                          color="success"
                          size="sm"
                          className="me-1"
                          onClick={() => openAdjustment('dispense', drug)}
                        >
                          Dispense
                        </CButton>
                        <CButton
                          color="primary"
                          size="sm"
                          onClick={() => openAdjustment('receive', drug)}
                        >
                          Receive
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  );
                })
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* ────────────────────────────────────────────── */}
      {/* Drug Detail Modal */}
      <CModal size="xl" visible={showDetailModal} onClose={() => setShowDetailModal(false)}>
        <CModalHeader>
          <CModalTitle>
            {selectedDrug?.generic} ({selectedDrug?.brand})
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedDrug && (
            <CRow>
              <CCol md={6}>
                <h6>Drug Information</h6>
                <dl className="row mb-0">
                  <dt className="col-sm-4">Generic</dt><dd className="col-sm-8">{selectedDrug.generic}</dd>
                  <dt className="col-sm-4">Brand</dt><dd className="col-sm-8">{selectedDrug.brand}</dd>
                  <dt className="col-sm-4">Strength / Form</dt><dd className="col-sm-8">{selectedDrug.strength} • {selectedDrug.form}</dd>
                  <dt className="col-sm-4">ATC</dt><dd className="col-sm-8">{selectedDrug.atc}</dd>
                  <dt className="col-sm-4">Classification</dt><dd className="col-sm-8">{selectedDrug.classification}</dd>
                  <dt className="col-sm-4">NDC</dt><dd className="col-sm-8">{selectedDrug.ndc}</dd>
                  <dt className="col-sm-4">Manufacturer</dt><dd className="col-sm-8">{selectedDrug.manufacturer}</dd>
                  <dt className="col-sm-4">Supplier</dt><dd className="col-sm-8">{selectedDrug.supplier}</dd>
                  <dt className="col-sm-4">Storage</dt><dd className="col-sm-8">{selectedDrug.storage}</dd>
                </dl>
              </CCol>

              <CCol md={6}>
                <h6>Current Stock Summary</h6>
                <CListGroup flush className="mb-3">
                  {Object.entries(selectedDrug.locations).map(([loc, qty]) => (
                    <CListGroupItem key={loc} className="d-flex justify-content-between">
                      <span>{loc.charAt(0).toUpperCase() + loc.slice(1)}</span>
                      <strong>{qty} {selectedDrug.unit}s</strong>
                    </CListGroupItem>
                  ))}
                </CListGroup>

                <h6>Batches & Expiry</h6>
                <CTable small hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Batch</CTableHeaderCell>
                      <CTableHeaderCell>Expiry</CTableHeaderCell>
                      <CTableHeaderCell>Quantity</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {selectedDrug.batches.map((b, i) => {
                      const daysLeft = (new Date(b.expiry) - new Date('2026-02-24')) / (1000*60*60*24);
                      let statusColor = 'success';
                      if (daysLeft <= 0) statusColor = 'danger';
                      else if (daysLeft <= 90) statusColor = 'warning';

                      return (
                        <CTableRow key={i}>
                          <CTableDataCell>{b.batchNo}</CTableDataCell>
                          <CTableDataCell className={statusColor === 'danger' ? 'text-danger fw-bold' : ''}>
                            {b.expiry}
                          </CTableDataCell>
                          <CTableDataCell>{b.qty}</CTableDataCell>
                          <CTableDataCell>
                            <CBadge color={statusColor}>
                              {daysLeft <= 0 ? 'Expired' : daysLeft <= 90 ? 'Near Expiry' : 'Good'}
                            </CBadge>
                          </CTableDataCell>
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => {
            setShowDetailModal(false);
            openAdjustment('dispense', selectedDrug);
          }}>
            Dispense Stock
          </CButton>
        </CModalFooter>
      </CModal>

      {/* ────────────────────────────────────────────── */}
      {/* Stock Adjustment Modal */}
      <CModal visible={showAdjustmentModal} onClose={() => setShowAdjustmentModal(false)}>
        <CModalHeader>
          <CModalTitle>
            {adjustmentType === 'dispense' ? 'Dispense Stock' :
             adjustmentType === 'receive' ? 'Receive New Stock' :
             adjustmentType === 'writeoff' ? 'Write-off / Adjust Loss' : 'Stock Adjustment'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedDrug && (
            <div className="mb-4">
              <strong>{selectedDrug.generic} ({selectedDrug.brand})</strong><br />
              Current stock in {adjustmentLocation}: <strong>{selectedDrug.locations[adjustmentLocation]} {selectedDrug.unit}s</strong>
            </div>
          )}

          <CForm>
            <CRow className="g-3">
              <CCol md={6}>
                <CFormLabel>Quantity</CFormLabel>
                <CFormInput
                  type="number"
                  min="1"
                  value={adjustmentQty}
                  onChange={(e) => setAdjustmentQty(Number(e.target.value))}
                />
              </CCol>

              <CCol md={6}>
                <CFormLabel>Location</CFormLabel>
                <CFormSelect
                  value={adjustmentLocation}
                  onChange={(e) => setAdjustmentLocation(e.target.value)}
                >
                  <option value="main">Main Pharmacy</option>
                  <option value="wardA">Ward A Stock</option>
                  <option value="wardB">Ward B Stock</option>
                </CFormSelect>
              </CCol>

              {adjustmentType === 'receive' && (
                <CCol md={12}>
                  <CFormLabel>Batch / Expiry Info (optional)</CFormLabel>
                  <CFormInput placeholder="Batch number & expiry date" />
                </CCol>
              )}

              <CCol md={12}>
                <CFormLabel>Note / Reason</CFormLabel>
                <CFormTextarea
                  rows={2}
                  value={adjustmentNote}
                  onChange={(e) => setAdjustmentNote(e.target.value)}
                  placeholder="e.g. Dispensed to patient MRN-392481, 30 tabs"
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowAdjustmentModal(false)}>
            Cancel
          </CButton>
          <CButton
            color={adjustmentType === 'dispense' || adjustmentType === 'writeoff' ? 'danger' : 'success'}
            disabled={adjustmentQty <= 0}
            onClick={confirmAdjustment}
          >
            {adjustmentType === 'dispense' ? 'Confirm Dispense' :
             adjustmentType === 'receive' ? 'Confirm Receipt' :
             adjustmentType === 'writeoff' ? 'Confirm Write-off' : 'Confirm'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Pharmacy;
