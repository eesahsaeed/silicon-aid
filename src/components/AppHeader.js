// src/components/AppHeader.js
import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
  useColorModes,
  CBadge
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilMenu,
  cilMoon,
  cilSun,
  cilHospital,
} from '@coreui/icons';

import { AppBreadcrumb } from './index';
import { AppHeaderDropdown } from './header/index';

const AppHeader = () => {
  const headerRef = useRef();
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      headerRef.current?.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0);
    };
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        {/* Sidebar Toggle */}
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        {/* Hospital Branding */}
        <CHeaderNav className="d-none d-md-flex align-items-center ms-3">
          <CNavItem>
            <CNavLink as={NavLink} to="/dashboard" className="fw-semibold text-primary">
              <CIcon icon={cilHospital} className="me-2" />
              Abuja Central Hospital
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        {/* Right Side – Notifications, Theme, User */}
        <CHeaderNav className="ms-auto">
          {/* Notifications Bell */}
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
              <CBadge color="danger" shape="rounded-pill" position="top-end" size="sm">
                5
              </CBadge>
            </CNavLink>
          </CNavItem>

          {/* Messages */}
          <CNavItem className="d-none d-lg-flex">
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>

          {/* Theme Switcher */}
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          {/* Vertical divider */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-50"></div>
          </li>

          {/* User Dropdown */}
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>

      {/* Breadcrumb Section */}
      <CContainer className="px-4 py-2" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default React.memo(AppHeader);
