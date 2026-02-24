// src/components/AppFooter.js
import React from 'react';
import { CFooter, CLink } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilHospital, cilHeart } from '@coreui/icons';

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <CFooter
      fixed
      className="px-4 py-3"
      style={{
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        fontSize: '0.85rem',
        color: '#555',
      }}
    >
      <div className="d-flex align-items-center justify-content-between w-100">
        {/* Left */}
        <div className="d-flex align-items-center">
          <CIcon
            icon={cilHospital}
            size="lg"
            className="me-2 text-primary opacity-75"
          />
          <span>
            Abuja Central Hospital © {currentYear}
          </span>
        </div>

        {/* Center – subtle heart */}
        <div className="small text-muted d-none d-md-block">
          <CIcon icon={cilHeart} size="sm" className="text-danger me-1" />
          Better care through better systems
        </div>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
