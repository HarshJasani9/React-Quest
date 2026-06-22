import React from 'react'

/**
 * SandboxErrorBoundary — Phase 1
 * Catches runtime errors thrown inside the sandbox preview root.
 * Displays them inline; never bubbles to crash the lesson page.
 */
export default class SandboxErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Sandbox execution error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 'var(--space-4)',
          background: 'var(--color-caution-subtle)',
          color: 'var(--color-caution)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-caution)'
        }}>
          <p style={{ fontWeight: 'var(--weight-bold)', marginBottom: 'var(--space-2)' }}>
            Runtime Error:
          </p>
          <pre style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: 'var(--text-sm)',
            whiteSpace: 'pre-wrap'
          }}>
            {this.state.error.toString()}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
