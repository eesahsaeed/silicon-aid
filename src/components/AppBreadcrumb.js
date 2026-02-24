// src/components/AppBreadcrumb.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilHome } from '@coreui/icons';

// Import your sidebar routes
import routes from '../routes'; // or wherever your full routes are defined

const AppBreadcrumb = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper: Find route name by path (supports exact match + dynamic :id segments)
  const getRouteName = (pathname) => {
    // First try exact match
    let route = routes.find(r => r.path === pathname);
    if (route?.name) return route.name;

    // Fallback: match dynamic routes (e.g. /patient/:id → Patients Management > Profile)
    if (pathname.startsWith('/patient/') && pathname !== '/patients') {
      const id = pathname.split('/patient/')[1];
      if (id) return `Patient Profile (ID: ${id})`;
    }

    if (pathname.startsWith('/appointments/')) {
      return 'Appointment Details';
    }

    // Generic fallback
    return pathname.split('/').pop() || 'Dashboard';
  };

  // Generate breadcrumb items
  const getBreadcrumbs = () => {
    const pathSegments = currentPath.split('/').filter(segment => segment);
    const breadcrumbs = [];

    let accumulatedPath = '';

    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      const name = getRouteName(accumulatedPath);

      // Skip if name is empty or numeric-only (e.g. :id)
      if (!name || /^\d+$/.test(segment)) return;

      breadcrumbs.push({
        pathname: accumulatedPath,
        name,
        active: index === pathSegments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // If we're on root or dashboard, show minimal breadcrumb
  if (currentPath === '/' || currentPath === '/dashboard') {
    return (
      <CBreadcrumb className="my-0">
        <CBreadcrumbItem active>
          <CIcon icon={cilHome} className="me-1" />
          Dashboard
        </CBreadcrumbItem>
      </CBreadcrumb>
    );
  }

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/">
        <CIcon icon={cilHome} className="me-1" />
        Home
      </CBreadcrumbItem>

      {breadcrumbs.map((crumb, index) => (
        <CBreadcrumbItem
          key={crumb.pathname}
          href={!crumb.active ? crumb.pathname : undefined}
          active={crumb.active}
        >
          {crumb.name}
        </CBreadcrumbItem>
      ))}
    </CBreadcrumb>
  );
};

export default React.memo(AppBreadcrumb);
