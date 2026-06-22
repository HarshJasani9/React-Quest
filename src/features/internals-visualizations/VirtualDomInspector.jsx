import React, { useState, useEffect } from 'react'

export default function VirtualDomInspector({ transformedCode }) {
  const [vdom, setVdom] = useState(null)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('tree') // 'tree' | 'json'

  useEffect(() => {
    if (!transformedCode) {
      setVdom(null)
      setError(null)
      return
    }

    try {
      // Set up exports and require mock
      const exports = {}
      const mockRequire = (moduleName) => {
        if (moduleName === 'react') return React
        throw new Error(`Module '${moduleName}' not found.`)
      }

      // Execute the transformed Babel code
      const executeFn = new Function('exports', 'require', 'React', transformedCode)
      executeFn(exports, mockRequire, React)

      const ComponentToRender = exports.default || Object.values(exports)[0]
      if (!ComponentToRender) {
        throw new Error('No component exported. Use export default.')
      }

      // Mock hooks temporarily to safely call the component function
      const originalReact = { ...React }
      const mockHooks = {
        useState: (initial) => [initial, () => {}],
        useEffect: () => {},
        useLayoutEffect: () => {},
        useMemo: (fn) => fn(),
        useCallback: (fn) => fn,
        useRef: (initial) => ({ current: initial }),
        useContext: (ctx) => ctx._currentValue,
        useReducer: (r, initial) => [initial, () => {}],
      }
      Object.assign(React, mockHooks)

      let element
      try {
        // Call the component as a function to inspect its returned virtual DOM node
        element = typeof ComponentToRender === 'function' 
          ? ComponentToRender({}) 
          : ComponentToRender
      } finally {
        // Restore React's actual hooks
        Object.assign(React, originalReact)
      }

      if (!element) {
        throw new Error('Component rendered nothing (returned null/undefined).')
      }

      setVdom(element)
      setError(null)
    } catch (err) {
      setError(err)
      setVdom(null)
    }
  }, [transformedCode])

  // Helper to serialize React element into a clean, inspectable format
  const serializeElement = (node) => {
    if (!node) return null
    if (typeof node === 'string' || typeof node === 'number') return node
    if (Array.isArray(node)) return node.map(serializeElement).filter(Boolean)

    const typeName = typeof node.type === 'function' 
      ? node.type.name || 'Component' 
      : node.type

    const props = {}
    if (node.props) {
      Object.entries(node.props).forEach(([key, val]) => {
        if (key === 'children') return
        props[key] = val
      })
    }

    const children = node.props && node.props.children 
      ? serializeElement(node.props.children) 
      : null

    return {
      type: typeName,
      props,
      children: Array.isArray(children) ? children : (children ? [children] : [])
    }
  }

  // Recursive element tree renderer
  const renderTree = (node, depth = 0) => {
    if (!node) return null
    if (typeof node === 'string' || typeof node === 'number') {
      return (
        <div style={{ paddingLeft: 'var(--space-4)', color: 'var(--color-slate)', fontFamily: 'var(--font-mono)' }}>
          "{node}"
        </div>
      )
    }
    if (Array.isArray(node)) {
      return node.map((child, idx) => <div key={idx}>{renderTree(child, depth)}</div>)
    }

    const { type, props, children } = node
    const hasChildren = children && children.length > 0

    return (
      <div style={{ paddingLeft: '16px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
        <span style={{ color: 'var(--color-signal)' }}>&lt;{type}</span>
        {Object.entries(props).map(([key, val]) => (
          <span key={key} style={{ color: 'var(--color-caution)' }}>
            {' '}{key}=
            <span style={{ color: 'var(--color-slate)' }}>"{typeof val === 'object' ? JSON.stringify(val) : String(val)}"</span>
          </span>
        ))}
        {hasChildren ? (
          <>
            <span style={{ color: 'var(--color-signal)' }}>&gt;</span>
            <div style={{ borderLeft: '1px dashed var(--color-border)', margin: '4px 0', paddingLeft: '4px' }}>
              {children.map((child, idx) => (
                <div key={idx}>{renderTree(child, depth + 1)}</div>
              ))}
            </div>
            <span style={{ color: 'var(--color-signal)' }}>&lt;/{type}&gt;</span>
          </>
        ) : (
          <span style={{ color: 'var(--color-signal)' }}> /&gt;</span>
        )}
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        padding: 'var(--space-4)',
        background: 'var(--color-caution-subtle)',
        color: 'var(--color-caution)',
        margin: 'var(--space-4)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-caution)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)'
      }}>
        Failed to inspect Virtual DOM: {error.message}
      </div>
    )
  }

  const serialized = vdom ? serializeElement(vdom) : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 'var(--space-2) var(--space-4)',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-canvas)',
        gap: 'var(--space-2)'
      }}>
        <button
          onClick={() => setViewMode('tree')}
          style={{
            padding: '2px 8px',
            background: viewMode === 'tree' ? 'var(--color-ink)' : '#fff',
            color: viewMode === 'tree' ? '#fff' : 'var(--color-slate)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-xs)',
            cursor: 'pointer'
          }}
        >
          HTML Tag Tree
        </button>
        <button
          onClick={() => setViewMode('json')}
          style={{
            padding: '2px 8px',
            background: viewMode === 'json' ? 'var(--color-ink)' : '#fff',
            color: viewMode === 'json' ? '#fff' : 'var(--color-slate)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-xs)',
            cursor: 'pointer'
          }}
        >
          Raw JSON Object
        </button>
      </div>

      {/* Render Area */}
      <div style={{ flex: 1, padding: 'var(--space-4)', overflow: 'auto', background: '#fff' }}>
        {serialized ? (
          viewMode === 'tree' ? (
            <div style={{ padding: 'var(--space-2)' }}>{renderTree(serialized)}</div>
          ) : (
            <pre style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-slate)',
              whiteSpace: 'pre-wrap'
            }}>
              {JSON.stringify(serialized, null, 2)}
            </pre>
          )
        ) : (
          <div style={{ color: 'var(--color-slate)', fontStyle: 'italic', fontSize: 'var(--text-sm)' }}>
            Empty or loading component...
          </div>
        )}
      </div>
    </div>
  )
}
