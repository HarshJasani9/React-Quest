import React from 'react'
import { Route, Link } from 'react-router-dom'
import LessonView from '../features/lesson-view/LessonView.jsx'

// Simple landing page for Phase 2, presenting the curriculum and linking to Lesson 2.1
function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-8)',
      background: 'var(--color-canvas)',
      fontFamily: 'var(--font-body)',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        background: 'var(--color-paper)',
        padding: 'var(--space-8)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-raised)',
        border: '1px solid var(--color-border)'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-3xl)',
          color: 'var(--color-ink)',
          marginBottom: 'var(--space-2)'
        }}>
          ReactQuest
        </h1>
        <p style={{
          fontSize: 'var(--text-md)',
          color: 'var(--color-slate)',
          marginBottom: 'var(--space-6)',
          lineHeight: 'var(--leading-relaxed)'
        }}>
          Learn React from the ground up through guided physical analogies and interactive sandbox checkpoints.
        </p>

        <div style={{
          textAlign: 'left',
          background: 'var(--color-canvas)',
          padding: 'var(--space-5)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          marginBottom: 'var(--space-6)'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-signal)',
            fontWeight: 'var(--weight-bold)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 'var(--space-1)'
          }}>
            Module 2: State & Rendering
          </span>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-ink)',
            marginBottom: 'var(--space-2)'
          }}>
            Lesson 2.1 · State: Data That Causes Re-renders
          </h3>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-slate)',
            marginBottom: 'var(--space-4)'
          }}>
            Understand how React remembers data across renders using whiteboards and magic rules, and write your first stateful component.
          </p>
          <Link
            to="/lesson/2.1"
            style={{
              display: 'inline-block',
              padding: 'var(--space-2) var(--space-5)',
              background: 'var(--color-signal)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--weight-semibold)',
              fontSize: 'var(--text-sm)'
            }}
          >
            Start Lesson 2.1
          </Link>
        </div>

        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-locked)' }}>
          Phase 2 Integration Test Shell · Designed by Antigravity
        </div>
      </div>
    </main>
  )
}

/**
 * Route definitions for the app.
 * Phase 2: adds /lesson/:id and root landing page.
 */
export const appRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/lesson/:id" element={<LessonView />} />
    <Route path="*" element={
      <div style={{ padding: 'var(--space-8)', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
        <h2>Page Not Found</h2>
        <Link to="/" style={{ color: 'var(--color-signal)' }}>Go back home</Link>
      </div>
    } />
  </>
)
