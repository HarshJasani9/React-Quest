import React from 'react'
import { Route } from 'react-router-dom'
import PlaceholderPage from '../shared/components/PlaceholderPage.jsx'

/**
 * Route definitions for the app.
 * Phase 0: single placeholder route to confirm the shell works.
 * Phase 2+ will add /lesson/:id and /curriculum routes.
 */
export const appRoutes = (
  <Route path="*" element={<PlaceholderPage />} />
)
