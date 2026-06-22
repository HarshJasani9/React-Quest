import React from 'react'
import { Route, Link } from 'react-router-dom'
import CurriculumMap from '../features/curriculum-map/CurriculumMap.jsx'
import LessonView from '../features/lesson-view/LessonView.jsx'

/**
 * Route definitions for the app.
 * Phase 3: Root route renders CurriculumMap, /lesson/:id renders LessonView.
 */
export const appRoutes = (
  <>
    <Route path="/" element={<CurriculumMap />} />
    <Route path="/lesson/:id" element={<LessonView />} />
    <Route 
      path="*" 
      element={
        <div style={{
          padding: 'var(--space-20)',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          backgroundColor: 'var(--color-canvas)',
          minHeight: '100vh'
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)', color: 'var(--color-caution)' }}>
            Page Not Found
          </h2>
          <Link to="/" style={{ color: 'var(--color-signal)', fontWeight: 'var(--weight-semibold)' }}>
            Go back to Curriculum Map
          </Link>
        </div>
      } 
    />
  </>
)
