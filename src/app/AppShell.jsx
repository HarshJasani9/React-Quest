import React from 'react'
import { Routes } from 'react-router-dom'
import { appRoutes } from './routes.jsx'

/**
 * AppShell — the top-level container.
 * Renders the route tree defined in routes.jsx.
 * Phase 0: displays a placeholder confirming fonts + tokens are working.
 */
export default function AppShell() {
  return (
    <div className="app-shell">
      <Routes>{appRoutes}</Routes>
    </div>
  )
}
