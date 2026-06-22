import React, { useState, useEffect } from 'react'

export default function FiberTreeVisualization() {
  const [selectedNode, setSelectedNode] = useState('App')
  const [isRenderActive, setIsRenderActive] = useState(false)
  const [activeStep, setActiveStep] = useState(-1)
  const [theme, setTheme] = useState('light')
  const [count, setCount] = useState(0)

  // Define simplified Fiber node data
  const fiberNodes = {
    App: {
      id: 'App',
      name: '<App />',
      type: 'Component',
      child: 'Header',
      sibling: 'null',
      returnNode: 'null',
      memoizedState: { type: 'useState', value: theme, next: 'null' },
      alternate: 'App (Alternate)',
      description: 'The root component. Holds the "theme" state in its hooks list.'
    },
    Header: {
      id: 'Header',
      name: '<Header />',
      type: 'Component',
      child: 'Button',
      sibling: 'Content',
      returnNode: 'App',
      memoizedState: 'null',
      alternate: 'Header (Alternate)',
      description: 'A layout wrapper. Receives the theme prop but has no internal state.'
    },
    Button: {
      id: 'Button',
      name: '<Button />',
      type: 'DOM Element (button)',
      child: 'null',
      sibling: 'null',
      returnNode: 'Header',
      memoizedState: 'null',
      alternate: 'Button (Alternate)',
      description: 'An interactive toggle. Triggers the state change on click.'
    },
    Content: {
      id: 'Content',
      name: '<Content />',
      type: 'Component',
      child: 'Card',
      sibling: 'null',
      returnNode: 'App',
      memoizedState: { type: 'useState', value: count, next: 'null' },
      alternate: 'Content (Alternate)',
      description: 'Main body content. Holds the "count" state. When count changes, this Fiber is marked for work.'
    },
    Card: {
      id: 'Card',
      name: '<Card />',
      type: 'Component',
      child: 'null',
      sibling: 'null',
      returnNode: 'Content',
      memoizedState: 'null',
      alternate: 'Card (Alternate)',
      description: 'A presentation card. Has no state, but will re-render because its parent Content re-rendered (not memoized!).'
    }
  }

  // Animation sequence steps for the re-render process
  const renderSteps = [
    { node: 'App', status: 'inspecting', text: 'React walks the root fiber. Theme state unchanged.' },
    { node: 'Header', status: 'inspecting', text: 'Enters Header. Reuses current Fiber node (no state change).' },
    { node: 'Button', status: 'inspecting', text: 'Enters Button. Reuses current Fiber node.' },
    { node: 'Header', status: 'completed', text: 'Returns to Header. Complete phase finishes.' },
    { node: 'Content', status: 'updating', text: 'Enters Content. Count state changed! Updates memoizedState hook value.' },
    { node: 'Card', status: 'recreating', text: 'Enters Card. Card has no state change, but parent Content updated. Card is NOT memoized, so a new alternate fiber is created!' },
    { node: 'Content', status: 'completed', text: 'Returns to Content. Rendering completes.' },
    { node: 'App', status: 'completed', text: 'Returns to App. Reconciliation phase finished. Committing updates to DOM.' }
  ]

  useEffect(() => {
    let timer
    if (isRenderActive) {
      if (activeStep < renderSteps.length - 1) {
        timer = setTimeout(() => {
          setActiveStep(prev => prev + 1)
        }, 1200)
      } else {
        setIsRenderActive(false)
      }
    }
    return () => clearTimeout(timer)
  }, [isRenderActive, activeStep])

  const handleStartRender = () => {
    setCount(c => c + 1)
    setActiveStep(0)
    setIsRenderActive(true)
  }

  const handleReset = () => {
    setIsRenderActive(false)
    setActiveStep(-1)
  }

  const getCurrentStatus = (nodeId) => {
    if (activeStep === -1) return 'idle'
    const currentStep = renderSteps[activeStep]
    
    // Check if node is active in the current step
    if (currentStep.node === nodeId) {
      return currentStep.status
    }

    // Determine past states in the walk
    const pastSteps = renderSteps.slice(0, activeStep)
    const nodeCompleted = pastSteps.some(s => s.node === nodeId && s.status === 'completed')
    const nodeUpdated = pastSteps.some(s => s.node === nodeId && s.status === 'updating')
    const nodeRecreated = pastSteps.some(s => s.node === nodeId && s.status === 'recreating')

    if (nodeCompleted) return 'reused'
    if (nodeRecreated) return 'recreated'
    if (nodeUpdated) return 'updated'

    return 'idle'
  }

  const selectedNodeData = fiberNodes[selectedNode]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      fontFamily: 'var(--font-body)',
      background: 'var(--color-canvas)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }}>
      {/* Simulation Controls */}
      <div style={{
        padding: 'var(--space-4)',
        background: 'var(--color-paper)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-2)'
      }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            onClick={handleStartRender}
            disabled={isRenderActive}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-signal)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: isRenderActive ? 'default' : 'pointer',
              fontWeight: 'var(--weight-semibold)',
              fontSize: 'var(--text-sm)'
            }}
          >
            Increment Count & Render
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-slate)'
            }}
          >
            Reset Diagram
          </button>
        </div>
        
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate)', display: 'flex', gap: '16px' }}>
          <span>Theme state: <strong>{theme}</strong></span>
          <span>Count state: <strong>{count}</strong></span>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', flex: 1, minHeight: '380px' }}>
        {/* Left Pane: SVG Interactive Tree */}
        <div style={{ position: 'relative', borderRight: '1px solid var(--color-border)', background: '#fff', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate)', fontStyle: 'italic', marginBottom: '8px' }}>
            Click nodes to inspect fibers. Child links flow down, siblings flow horizontally.
          </div>
          
          <svg style={{ width: '100%', height: '320px' }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="var(--color-border-strong)" />
              </marker>
            </defs>

            {/* Links / Connectors */}
            {/* App -> Header (Child Link) */}
            <path d="M 180 75 L 90 115" stroke="var(--color-border)" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* Header -> Content (Sibling Link) */}
            <path d="M 140 130 L 210 130" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
            {/* Header -> Button (Child Link) */}
            <path d="M 90 155 L 90 195" stroke="var(--color-border)" strokeWidth="2" markerEnd="url(#arrow)" />
            {/* Content -> Card (Child Link) */}
            <path d="M 260 155 L 260 195" stroke="var(--color-border)" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Render Nodes */}
            {Object.keys(fiberNodes).map(nodeId => {
              const node = fiberNodes[nodeId]
              const status = getCurrentStatus(nodeId)
              
              // Coordinates mapping
              const coords = {
                App: { x: 180, y: 50 },
                Header: { x: 90, y: 130 },
                Button: { x: 90, y: 210 },
                Content: { x: 260, y: 130 },
                Card: { x: 260, y: 210 }
              }[nodeId]

              // Status styling
              let strokeColor = 'var(--color-border-strong)'
              let fillColor = '#fff'
              if (selectedNode === nodeId) {
                strokeColor = 'var(--color-signal)'
              }
              if (status === 'inspecting') {
                fillColor = 'var(--color-signal-subtle)'
                strokeColor = 'var(--color-signal)'
              } else if (status === 'updating') {
                fillColor = 'var(--color-caution-subtle)'
                strokeColor = 'var(--color-caution)'
              } else if (status === 'recreating') {
                fillColor = 'var(--color-caution-subtle)'
                strokeColor = 'var(--color-caution)'
              } else if (status === 'reused') {
                fillColor = '#e6f4ea' // Light green
                strokeColor = 'var(--color-signal)'
              } else if (status === 'recreated') {
                fillColor = '#fce8e6' // Light red
                strokeColor = 'var(--color-caution)'
              } else if (status === 'updated') {
                fillColor = '#fef7e0' // Light yellow
                strokeColor = 'var(--color-caution)'
              }

              // Alternate (WIP) node status styling
              let altStroke = 'var(--color-border-strong)'
              let altFill = '#fff'
              let altLabel = 'wip alt'
              if (status === 'updating' || status === 'inspecting') {
                altFill = 'var(--color-signal-subtle)'
                altStroke = 'var(--color-signal)'
                altLabel = 'WIP'
              } else if (status === 'recreating') {
                altFill = 'var(--color-caution-subtle)'
                altStroke = 'var(--color-caution)'
                altLabel = 'WIP: new'
              } else if (status === 'reused') {
                altFill = '#e6f4ea'
                altStroke = 'var(--color-signal)'
                altLabel = 'reused'
              } else if (status === 'recreated') {
                altFill = '#fce8e6'
                altStroke = 'var(--color-caution)'
                altLabel = 'recreated'
              } else if (status === 'updated') {
                altFill = '#fef7e0'
                altStroke = 'var(--color-caution)'
                altLabel = 'updated'
              }

              return (
                <g key={nodeId}>
                  {/* Alternate Pointer Line */}
                  <line
                    x1={coords.x}
                    y1={coords.y}
                    x2={coords.x + 35}
                    y2={coords.y + 25}
                    stroke="var(--color-border-strong)"
                    strokeWidth="1.5"
                    strokeDasharray="2"
                  />
                  
                  {/* Alternate (WIP) Fiber Node Card */}
                  <g transform={`translate(${coords.x + 35}, ${coords.y + 25})`}>
                    <rect
                      x="-30"
                      y="-10"
                      width="60"
                      height="20"
                      rx="3"
                      fill={altFill}
                      stroke={altStroke}
                      strokeWidth="1"
                      strokeDasharray="2"
                    />
                    <text
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      y="1"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '7px',
                        fill: 'var(--color-slate)',
                        fontWeight: '500'
                      }}
                    >
                      {altLabel}
                    </text>
                  </g>

                  {/* Current Fiber Node Card */}
                  <g 
                    transform={`translate(${coords.x}, ${coords.y})`} 
                    onClick={() => setSelectedNode(nodeId)}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect
                      x="-65"
                      y="-20"
                      width="130"
                      height="40"
                      rx="5"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={selectedNode === nodeId ? 2.5 : 1.5}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    <text
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      y="2"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: selectedNode === nodeId ? 'bold' : 'normal',
                        fill: 'var(--color-ink)'
                      }}
                    >
                      {node.name}
                    </text>
                    {/* Status Badge */}
                    {status !== 'idle' && (
                      <circle
                        cx="55"
                        cy="-15"
                        r="7"
                        fill={
                          status === 'reused' ? '#137333' : 
                          status === 'recreated' ? '#c5221f' : 
                          status === 'updated' ? '#b06000' : 'var(--color-signal)'
                        }
                      />
                    )}
                  </g>
                </g>
              )
            })}
          </svg>

          {/* Animation HUD overlay */}
          {isRenderActive && activeStep >= 0 && (
            <div style={{
              marginTop: 'auto',
              padding: 'var(--space-3)',
              background: 'var(--color-canvas)',
              borderLeft: '4px solid var(--color-signal)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-ink)'
            }}>
              <strong>Render Step {activeStep + 1}:</strong> {renderSteps[activeStep].text}
            </div>
          )}
        </div>

        {/* Right Pane: Inspector Details */}
        <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', background: 'var(--color-paper)', overflowY: 'auto' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', marginBottom: 'var(--space-3)' }}>
            Fiber Detail Inspector
          </h4>
          {selectedNodeData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)' }}>FIBER TAG TYPE</label>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>{selectedNodeData.type}</div>
              </div>

              <div>
                <label style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)' }}>FIBER STRUCTURAL LINKS</label>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  background: 'var(--color-canvas)',
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  marginTop: '4px'
                }}>
                  <div>child: <span style={{ color: 'var(--color-signal)' }}>{selectedNodeData.child}</span></div>
                  <div>sibling: <span style={{ color: 'var(--color-signal)' }}>{selectedNodeData.sibling}</span></div>
                  <div>return: <span style={{ color: 'var(--color-signal)' }}>{selectedNodeData.returnNode}</span></div>
                  <div>alternate: <span style={{ color: 'var(--color-caution)' }}>{selectedNodeData.alternate}</span></div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)' }}>MEMOIZED STATE (HOOKS LIST)</label>
                <div style={{ marginTop: '4px' }}>
                  {typeof selectedNodeData.memoizedState === 'object' ? (
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      background: 'var(--color-signal-subtle)',
                      border: '1px solid var(--color-signal)',
                      borderRadius: 'var(--radius-sm)',
                      padding: 'var(--space-2)'
                    }}>
                      <strong>{selectedNodeData.memoizedState.type}</strong>: {selectedNodeData.memoizedState.value}
                      <div style={{ fontSize: '10px', color: 'var(--color-slate)', marginTop: '4px' }}>
                        next → <span style={{ fontStyle: 'italic' }}>{selectedNodeData.memoizedState.next}</span>
                      </div>
                    </div>
                  ) : (
                    <span style={{ fontSize: 'var(--text-sm)', fontStyle: 'italic', color: 'var(--color-slate)' }}>null (no state hooks)</span>
                  )}
                </div>
              </div>

              <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-slate)', lineHeight: '1.4' }}>
                {selectedNodeData.description}
              </div>
            </div>
          ) : (
            <div style={{ fontStyle: 'italic', color: 'var(--color-slate)', fontSize: 'var(--text-sm)' }}>
              Select a node in the graph to view Fiber details.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
