import React from 'react'

/**
 * SandboxErrorBoundary — Phase 1
 * Catches runtime errors thrown inside the sandbox preview root.
 * Displays them inline; never bubbles to crash the lesson page.
 * Design System §4: errors on caution-tinted background, plain language first.
 */
export default class SandboxErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" aria-live="assertive">
          {/* TODO Phase 1: render caution-styled error display */}
          <p>This code threw an error while running.</p>
        </div>
      )
    }
    return this.props.children
  }
}
