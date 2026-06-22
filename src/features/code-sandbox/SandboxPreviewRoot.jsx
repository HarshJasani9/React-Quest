import React, { useRef, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SandboxErrorBoundary from './SandboxErrorBoundary.jsx'

/**
 * SandboxPreviewRoot Component
 * Mounts and unmounts the compiled sandbox React component.
 * Integrates a React.Profiler HUD to measure render phases, counts, and durations.
 */
export default function SandboxPreviewRoot({ transformedCode }) {
  const containerRef = useRef(null)
  const rootRef = useRef(null)
  const hudRef = useRef(null)
  const [execError, setExecError] = useState(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Unmount previous tree fully to ensure isolated state across runs
    if (rootRef.current) {
      rootRef.current.unmount()
      rootRef.current = null
    }

    if (!transformedCode) {
      setExecError(null)
      if (hudRef.current) {
        hudRef.current.innerText = 'Waiting for code...'
      }
      return
    }

    let ComponentToRender = null
    setExecError(null)

    try {
      // Create a mock CommonJS environment for the Babel output
      const exports = {}
      const mockRequire = (moduleName) => {
        if (moduleName === 'react') return React
        throw new Error(`Module '${moduleName}' not found or not allowed.`)
      }

      // Execute code in a scoped function
      const executeFn = new Function('exports', 'require', 'React', transformedCode)
      executeFn(exports, mockRequire, React)

      // Find the default export or the first exported component
      ComponentToRender = exports.default || Object.values(exports)[0]

      if (!ComponentToRender) {
        throw new Error("No component was exported. Make sure to use 'export default function ...'")
      }
    } catch (err) {
      setExecError(err)
      return
    }

    let renderCount = 0
    const handleProfile = (id, phase, actualDuration) => {
      renderCount++
      if (hudRef.current) {
        hudRef.current.innerText = `Profiler HUD — Render: ${phase} | Time: ${actualDuration.toFixed(2)}ms | Count: ${renderCount}`
      }
    }

    // Render the extracted component into the container
    rootRef.current = createRoot(containerRef.current)
    rootRef.current.render(
      <SandboxErrorBoundary>
        <React.Profiler id="sandbox-preview-root" onRender={handleProfile}>
          <ComponentToRender />
        </React.Profiler>
      </SandboxErrorBoundary>
    )

    // Cleanup on unmount or code change
    return () => {
      if (rootRef.current) {
        rootRef.current.unmount()
        rootRef.current = null
      }
    }
  }, [transformedCode])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Profiler HUD overlay */}
      {!execError && (
        <div 
          ref={hudRef}
          style={{
            position: 'absolute',
            top: 'var(--space-2)',
            right: 'var(--space-2)',
            background: 'var(--color-paper)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '2px 8px',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-slate)',
            zIndex: 10,
            pointerEvents: 'none',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          Waiting for render...
        </div>
      )}

      {execError ? (
        <div style={{
          padding: 'var(--space-4)',
          background: 'var(--color-caution-subtle)',
          color: 'var(--color-caution)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-caution)',
          margin: 'var(--space-4)'
        }}>
          <p style={{ fontWeight: 'var(--weight-bold)', marginBottom: 'var(--space-2)' }}>
            Execution Error:
          </p>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap' }}>
            {execError.toString()}
          </pre>
        </div>
      ) : null}
      
      {/* The actual mounting container for the preview */}
      <div 
        ref={containerRef} 
        style={{ 
          flex: 1, 
          padding: 'var(--space-4)',
          display: execError ? 'none' : 'block' 
        }} 
      />
    </div>
  )
}
