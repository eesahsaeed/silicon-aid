import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <CFooter className="px-4 py-3 justify-content-center border-top bg-body-tertiary">
      <div className="text-center text-body-secondary small">
        <strong>SILICON AID</strong> &copy; {currentYear} — Hospital Information System Demo
        <br className="d-block d-sm-none" />
        <span className="mx-2">•</span> in Abuja, Nigeria
        {/* Frontend powered by{' '}
        <a
          href="https://coreui.io/react"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-primary fw-medium"
        >
          CoreUI React
        </a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)