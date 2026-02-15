// ───────────────────────────────────────────────
// 3. BillingSummary.jsx
// ───────────────────────────────────────────────
import React from 'react'
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell,
  CTableHead, CTableHeaderCell, CTableRow, CProgress, CWidgetStatsA, CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMoney, cilChartPie } from '@coreui/icons'

const BillingSummary = () => {
  const revenueData = [
    { title: 'Today', value: '₦1.28M', percent: 82, color: 'success' },
    { title: 'This Week', value: '₦7.94M', percent: 94, color: 'info' },
    { title: 'This Month', value: '₦32.1M', percent: 88, color: 'warning' },
    { title: 'Outstanding Claims', value: '₦4.2M', percent: 45, color: 'danger' },
  ]

  const recentInvoices = [
    { id: 'INV-3921', patient: 'Aisha Mohammed', amount: '₦145,000', status: 'Paid', date: 'Feb 14' },
    { id: 'INV-3920', patient: 'Chukwuma Eze', amount: '₦78,500', status: 'Pending', date: 'Feb 13' },
    { id: 'INV-3919', patient: 'Fatima Yusuf', amount: '₦210,000', status: 'Claim Submitted', date: 'Feb 12' },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Revenue & Billing Overview – February 2026</CCardHeader>
        <CCardBody>
          <CRow className="mb-4">
            {revenueData.map((item, i) => (
              <CCol xs={12} sm={6} lg={3} key={i}>
                <CWidgetStatsA
                  color={item.color}
                  value={item.value}
                  title={item.title}
                  chart={<CProgress value={item.percent} color={item.color} className="mt-3" />}
                />
              </CCol>
            ))}
          </CRow>

          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Invoice ID</CTableHeaderCell>
                <CTableHeaderCell>Patient</CTableHeaderCell>
                <CTableHeaderCell>Amount</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {recentInvoices.map((inv, i) => (
                <CTableRow key={i}>
                  <CTableDataCell>{inv.id}</CTableDataCell>
                  <CTableDataCell>{inv.patient}</CTableDataCell>
                  <CTableDataCell className="fw-semibold">{inv.amount}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={inv.status === 'Paid' ? 'success' : inv.status.includes('Claim') ? 'info' : 'warning'}>
                      {inv.status}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{inv.date}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default BillingSummary