import React from 'react'

/**
 * Phase 0 placeholder page.
 * Verifies that:
 *   - the app shell mounts correctly
 *   - all three fonts are loading (Fraunces, Inter, JetBrains Mono)
 *   - CSS custom properties (color tokens) are applied
 *
 * This component is replaced by real feature routes in Phase 2.
 */
export default function PlaceholderPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-8)',
        padding: 'var(--space-8)',
        background: 'var(--color-canvas)',
      }}
    >
      {/* ---- Phase 0 font + token verification ---- */}
      <div
        style={{
          background: 'var(--color-paper)',
          border: 'var(--analogy-card-border)',
          boxShadow: 'var(--analogy-card-shadow)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-8) var(--space-10)',
          transform: `rotate(var(--analogy-card-rotation-a))`,
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wider)',
            color: 'var(--color-slate)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-4)',
          }}
        >
          ANALOGY
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            color: 'var(--color-ink)',
            marginBottom: 'var(--space-4)',
          }}
        >
          ReactQuest
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-slate)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          Phase 0 complete — app shell running, design tokens active,
          fonts loading.
        </p>
      </div>

      {/* ---- Token strip ---- */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          ['paper',   'var(--color-paper)'],
          ['ink',     'var(--color-ink)'],
          ['slate',   'var(--color-slate)'],
          ['canvas',  'var(--color-canvas)'],
          ['signal',  'var(--color-signal)'],
          ['caution', 'var(--color-caution)'],
        ].map(([name, value]) => (
          <div
            key={name}
            style={{
              width: '64px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: value,
                border: '1px solid var(--color-border)',
                marginBottom: 'var(--space-1)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-slate)',
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* ---- Typography specimen ---- */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--color-ink)' }}>
          Fraunces — display face
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-slate)' }}>
          Inter — body face for lesson prose
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-ink)' }}>
          JetBrains Mono — code &amp; structural labels
        </span>
      </div>

      {/* ---- Signal accent ---- */}
      <button
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--weight-medium)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-paper)',
          background: 'var(--color-signal)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-6)',
          cursor: 'default',
        }}
      >
        Signal accent — primary action
      </button>
    </main>
  )
}
