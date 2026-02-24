// src/pages/Reports.js
import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CWidgetStatsF,
  CProgress,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CButton,
  CFormSelect,
  CFormLabel,
  CFormInput,
  CAlert,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilChartPie,
  cilPeople,
  cilCalendar,
  cilClock,
  cilMoney,
  cilWarning,
  cilCheckCircle,
  cilXCircle,
  cilArrowTop,
  cilArrowBottom,
  cilCloudDownload,
} from '@coreui/icons';

const Reports = ({ user }) => {
  // Simulated date range filter
  const [dateRange, setDateRange] = useState('last30days');

  // Mock analytics data (February 2026 focus)
  const metrics = {
    appointmentVolume: 1284,
    volumeTrend: 12, // % change from previous period
    showRate: 85.6,
    noShowRate: 12.4,
    cancellationRate: 9.6,
    avgLeadTimeDays: 7.2,
    peakHours: '09:00–11:00 (38%) & 14:00–16:00 (29%)',
    peakDays: 'Wednesday (26%), Tuesday (22%)',
    revenueForecast: { base: 4875000, optimistic: 5230000 },
    noShowReasons: [
      { reason: 'Forgot appointment', count: 142, percent: 38 },
      { reason: 'Transportation issues', count: 98, percent: 26 },
      { reason: 'Work/school conflict', count: 64, percent: 17 },
      { reason: 'Felt better / self-resolved', count: 41, percent: 11 },
      { reason: 'Family emergency', count: 19, percent: 5 },
      { reason: 'Other', count: 12, percent: 3 },
    ],
    providerUtilization: [
      { doctor: 'Dr. Fatima Okoye', slotsFilled: 412, totalSlots: 480, percent: 86, trend: 4 },
      { doctor: 'Dr. Samuel Adebayo', slotsFilled: 328, totalSlots: 460, percent: 71, trend: -3 },
      { doctor: 'Dr. Amina Bello', slotsFilled: 395, totalSlots: 450, percent: 88, trend: 7 },
      { doctor: 'Dr. Zara Khan', slotsFilled: 289, totalSlots: 380, percent: 76, trend: 2 },
      { doctor: 'Dr. Ibrahim Yusuf', slotsFilled: 360, totalSlots: 420, percent: 86, trend: 5 },
    ],
  };

  return (
    <>
      {/* Header & Filters */}
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center bg-primary text-white">
          <div>
            <CIcon icon={cilChartPie} className="me-2" size="lg" />
            Reports & Analytics Dashboard
          </div>
          <div className="d-flex gap-3">
            <div>
              <CFormLabel className="text-white me-2 mb-0">Period</CFormLabel>
              <CFormSelect
                size="sm"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                style={{ background: 'white', color: '#000', border: 'none' }}
              >
                <option value="today">Today</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="thisMonth">This Month (Feb 2026)</option>
                <option value="lastMonth">Last Month</option>
                <option value="yearToDate">Year to Date</option>
              </CFormSelect>
            </div>
            <CButton color="light" size="sm">
              <CIcon icon={cilCloudDownload} className="me-1" />
              Export (PDF/Excel)
            </CButton>
          </div>
        </CCardHeader>
      </CCard>

      {/* KPI Cards */}
      <CRow className="mb-4">
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            color="primary"
            title="Total Appointments"
            value={metrics.appointmentVolume.toLocaleString()}
            icon={<CIcon icon={cilCalendar} height={24} />}
            chart={
              <CProgress
                value={100}
                color={metrics.volumeTrend > 0 ? 'success' : 'danger'}
                className="mt-2"
                height={6}
              />
            }
            footer={
              <span>
                {metrics.volumeTrend > 0 ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                {Math.abs(metrics.volumeTrend)}% vs previous period
              </span>
            }
          />
        </CCol>

        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            color="success"
            title="Show Rate"
            value={`${metrics.showRate}%`}
            icon={<CIcon icon={cilCheckCircle} height={24} />}
            chart={<CProgress value={metrics.showRate} color="success" className="mt-2" height={6} />}
          />
        </CCol>

        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            color="warning"
            title="No-Show Rate"
            value={`${metrics.noShowRate}%`}
            icon={<CIcon icon={cilXCircle} height={24} />}
            chart={<CProgress value={metrics.noShowRate} color="warning" className="mt-2" height={6} />}
          />
        </CCol>

        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsF
            color="danger"
            title="Cancellation Rate"
            value={`${metrics.cancellationRate}%`}
            icon={<CIcon icon={cilWarning} height={24} />}
            chart={<CProgress value={metrics.cancellationRate} color="danger" className="mt-2" height={6} />}
          />
        </CCol>
      </CRow>

      <CRow className="mb-4">
        {/* Average Lead Time & Revenue Forecast */}
        <CCol lg={6}>
          <CCard className="h-100">
            <CCardHeader>Average Booking Lead Time & Revenue Forecast</CCardHeader>
            <CCardBody>
              <div className="text-center mb-4">
                <h4 className="mb-1">Avg Lead Time: {metrics.avgLeadTimeDays} days</h4>
                <small className="text-body-secondary">Time between booking and appointment date</small>
              </div>

              <h6 className="mt-4">Projected Revenue (March 2026)</h6>
              <div className="d-flex justify-content-between mb-2">
                <span>Base Forecast:</span>
                <strong>₦{metrics.revenueForecast.base.toLocaleString()}</strong>
              </div>
              <CProgress value={80} color="success" height={20} className="mb-2" />

              <div className="d-flex justify-content-between mb-2">
                <span>Optimistic (high show rate):</span>
                <strong>₦{metrics.revenueForecast.optimistic.toLocaleString()}</strong>
              </div>
              <CProgress value={100} color="info" variant="striped" animated height={20} />
            </CCardBody>
          </CCard>
        </CCol>

        {/* Peak Hours & Days */}
        <CCol lg={6}>
          <CCard className="h-100">
            <CCardHeader>Peak Hours & Busiest Days</CCardHeader>
            <CCardBody>
              <h6>Peak Hours (daily distribution)</h6>
              <p className="mb-2">{metrics.peakHours}</p>
              <CProgress multi className="mb-4" height={20}>
                <CProgress value={38} color="primary">Morning</CProgress>
                <CProgress value={29} color="info">Afternoon</CProgress>
                <CProgress value={33} color="light">Other</CProgress>
              </CProgress>

              <h6>Busiest Days of Week</h6>
              <CListGroup flush>
                <CListGroupItem className="d-flex justify-content-between">
                  Wednesday <CBadge color="primary">26%</CBadge>
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-between">
                  Tuesday <CBadge color="primary">22%</CBadge>
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-between">
                  Monday <CBadge color="primary">18%</CBadge>
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-between">
                  Thursday <CBadge color="primary">15%</CBadge>
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* No-Show Reasons Table */}
      <CCard className="mb-4">
        <CCardHeader>No-Show Reasons (Last 30 Days)</CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Reason</CTableHeaderCell>
                <CTableHeaderCell>Count</CTableHeaderCell>
                <CTableHeaderCell>Percentage</CTableHeaderCell>
                <CTableHeaderCell>Trend</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {metrics.noShowReasons.map((reason, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{reason.reason}</CTableDataCell>
                  <CTableDataCell>{reason.count}</CTableDataCell>
                  <CTableDataCell>{reason.percent}%</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={index < 2 ? 'danger' : 'warning'}>
                      High impact
                    </CBadge>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Provider Utilization */}
      <CCard>
        <CCardHeader>Provider Utilization & Slot Fill Rate</CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Doctor</CTableHeaderCell>
                <CTableHeaderCell>Slots Filled</CTableHeaderCell>
                <CTableHeaderCell>Total Slots</CTableHeaderCell>
                <CTableHeaderCell>Utilization %</CTableHeaderCell>
                <CTableHeaderCell>Trend</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {metrics.providerUtilization.map((prov, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="fw-semibold">{prov.doctor}</CTableDataCell>
                  <CTableDataCell>{prov.slotsFilled}</CTableDataCell>
                  <CTableDataCell>{prov.totalSlots}</CTableDataCell>
                  <CTableDataCell>
                    <CProgress
                      value={prov.percent}
                      color={prov.percent >= 85 ? 'success' : prov.percent >= 70 ? 'warning' : 'danger'}
                      className="mb-1"
                    >
                      {prov.percent}%
                    </CProgress>
                  </CTableDataCell>
                  <CTableDataCell>
                    <span className={prov.trend > 0 ? 'text-success' : 'text-danger'}>
                      {prov.trend > 0 ? '+' : ''}{prov.trend}%
                    </span>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <div className="mt-4 text-end">
            <CButton color="info" variant="outline">
              <CIcon icon={cilCloudDownload} className="me-1" />
              Export Provider Report
            </CButton>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Reports;
