import React, { useRef, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SandboxErrorBoundary from './SandboxErrorBoundary.jsx'

export default function SandboxPreviewRoot({ transformedCode }) {
  const containerRef = useRef(null)
  const rootRef = useRef(null)
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
      // We inject exports, require, and React. 
      // The code cannot access the global window easily unless explicitly typed, 
      // but it limits the immediate blast radius for casual mistakes.
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

    // Render the extracted component into the container
    rootRef.current = createRoot(containerRef.current)
    rootRef.current.render(
      <SandboxErrorBoundary>
        <ComponentToRender />
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
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {execError ? (
        <div style={{
          padding: 'var(--space-4)',
          background: 'var(--color-caution-subtle)',
          color: 'var(--color-caution)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-caution)'
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
