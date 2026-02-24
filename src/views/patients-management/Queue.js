// src/pages/Queue.js
// Enhanced with real-time display, estimated waits, SMS alerts sim, provider dashboard, analytics

import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CAlert } from '@coreui/react';

// More mock queue
const initialQueue = [
  { id: 1, patient: 'Aisha Mohammed', status: 'Waiting', waitTime: 10, estimated: 15, priority: 'Normal' },
  { id: 2, patient: 'Chinedu Eze', status: 'Waiting', waitTime: 5, estimated: 10, priority: 'Urgent' },
  // More
];

const Queue = ({ user }) => {
  const [queue, setQueue] = useState(initialQueue);
  const [analytics, setAnalytics] = useState({ avgWait: 12, bottlenecks: 'Room 2 delay' });

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prev => prev.map(q => q.status === 'Waiting' ? { ...q, waitTime: q.waitTime + 1, estimated: q.estimated + 1 } : q));
      // Simulate analytics update
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const sendSMS = (patient) => {
    alert(`SMS sent to ${patient}: Your turn is approaching.`);
  };

  return (
    <CCard>
      <CCardHeader>Queue & Wait Time Management</CCardHeader>
      <CCardBody>
        <CAlert color="info">Avg Wait: {analytics.avgWait} min | Bottlenecks: {analytics.bottlenecks}</CAlert>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Patient</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Wait Time (min)</CTableHeaderCell>
              <CTableHeaderCell>Estimated Wait</CTableHeaderCell>
              <CTableHeaderCell>Priority</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {queue.sort((a, b) => a.priority === 'Urgent' ? -1 : 1).map(q => (
              <CTableRow key={q.id}>
                <CTableDataCell>{q.patient}</CTableDataCell>
                <CTableDataCell>{q.status}</CTableDataCell>
                <CTableDataCell>{q.waitTime}</CTableDataCell>
                <CTableDataCell>{q.estimated}</CTableDataCell>
                <CTableDataCell>{q.priority}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="success" size="sm">Call Next</CButton>
                  <CButton color="info" size="sm" className="ms-2" onClick={() => sendSMS(q.patient)}>Send Alert</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default Queue;
