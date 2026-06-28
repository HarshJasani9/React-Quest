import React, { useState } from 'react'

export default function ReconciliationDiffVisualization() {
  const [scenario, setScenario] = useState('same-type') // 'same-type' | 'different-type'
  const [stage, setStage] = useState('before') // 'before' | 'diffing' | 'after'
  const [inputText, setInputText] = useState('User input text')
  const [log, setLog] = useState([])

  const handleRunDiff = () => {
    setStage('diffing')
    setLog(['Comparing elements at position...', 'Checking element type...'])
    
    setTimeout(() => {
      if (scenario === 'same-type') {
        setLog(prev => [
          ...prev,
          'Element types match (div === div).',
          'Heuristic: Update in place.',
          'DOM node is REUSED. Updating style/props...',
          'State preserved.'
        ])
        setStage('after')
      } else {
        setLog(prev => [
          ...prev,
          'Element types differ (section !== div).',
          'Heuristic: Destroy subtree.',
          'DOM node is UNMOUNTED & destroyed.',
          'New DOM node is MOUNTED.',
          'Subtree state is DISCARDED!'
        ])
        setInputText('') // Reset input state to simulate state loss
        setStage('after')
      }
    }, 1500)
  }

  const handleReset = () => {
    setStage('before')
    setLog([])
    setInputText('User input text')
  }

  return (
    <div style={{
      fontFamily: 'var(--font-body)',
      padding: 'var(--space-4)',
      background: 'var(--color-paper)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      marginTop: 'var(--space-4)'
    }}>
      <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)', marginBottom: 'var(--space-2)' }}>
        Reconciliation Diff Visualizer
      </h4>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate)', marginBottom: 'var(--space-4)' }}>
        Interactive simulator explaining React's diffing heuristic rules.
      </p>

      {/* Scenario Picker */}
      <div className="reconciliation-scenario-picker">
        <label style={{ fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="radio"
            name="scenario"
            checked={scenario === 'same-type'}
            onChange={() => { setScenario('same-type'); handleReset(); }}
            disabled={stage === 'diffing'}
          />
          Same Type (div ➔ div)
        </label>
        <label style={{ fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="radio"
            name="scenario"
            checked={scenario === 'different-type'}
            onChange={() => { setScenario('different-type'); handleReset(); }}
            disabled={stage === 'diffing'}
          />
          Different Type (section ➔ div)
        </label>
      </div>

      {/* Simulation Area */}
      <div className="reconciliation-diff-layout">
        {/* Left column: Trees Comparison */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: 'var(--space-3)',
          background: '#fff'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
            {/* Old Element */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate)', marginBottom: '4px' }}>PREVIOUS RENDER</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                padding: '8px 16px',
                background: 'var(--color-canvas)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-ink)'
              }}>
                {scenario === 'same-type' ? '<div>' : '<section>'}
              </div>
            </div>

            <div style={{ fontSize: '24px', color: 'var(--color-border-strong)' }}>➔</div>

            {/* New Element */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate)', marginBottom: '4px' }}>CURRENT RENDER</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                padding: '8px 16px',
                background: stage === 'after' && scenario === 'same-type' ? '#e6f4ea' : (stage === 'after' && scenario === 'different-type' ? '#fce8e6' : 'var(--color-canvas)'),
                border: stage === 'after' ? (scenario === 'same-type' ? '1px solid #137333' : '1px solid #c5221f') : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-ink)',
                transition: 'all 0.4s ease',
                fontWeight: stage === 'after' ? 'bold' : 'normal'
              }}>
                {'<div>'}
              </div>
            </div>
          </div>

          {/* Subtree DOM input state representation */}
          <div style={{
            marginTop: '12px',
            padding: 'var(--space-2)',
            background: 'var(--color-canvas)',
            borderRadius: 'var(--radius-sm)',
            textAlign: 'center',
            fontSize: 'var(--text-xs)'
          }}>
            Subtree Input state: <input type="text" value={inputText} readOnly style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              padding: '2px 6px',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              width: '120px',
              textAlign: 'center',
              background: '#fff'
            }} />
          </div>
        </div>

        {/* Right column: Logs / Verdict */}
        <div style={{
          background: 'var(--color-canvas)',
          padding: 'var(--space-3)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)',
          lineHeight: '1.4',
          maxHeight: '220px',
          overflowY: 'auto'
        }}>
          <div style={{ fontWeight: 'bold', color: 'var(--color-slate)', borderBottom: '1px solid var(--color-border)', paddingBottom: '4px', marginBottom: '8px' }}>
            DIFF LOG
          </div>
          <div style={{ flex: 1 }}>
            {log.length === 0 && <span style={{ color: 'var(--color-slate)', fontStyle: 'italic' }}>Simulation idle. Select a scenario and run diff.</span>}
            {log.map((line, idx) => {
              let color = 'var(--color-slate)'
              if (line.includes('REUSED')) color = '#137333'
              if (line.includes('UNMOUNTED') || line.includes('DISCARDED')) color = '#c5221f'
              return (
                <div key={idx} style={{ color, marginBottom: '4px' }}>
                  {line}
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: '8px' }}>
            <button
              onClick={handleRunDiff}
              disabled={stage === 'diffing' || stage === 'after'}
              style={{
                flex: 1,
                padding: '4px 8px',
                background: stage === 'diffing' || stage === 'after' ? 'var(--color-border)' : 'var(--color-signal)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: stage === 'diffing' || stage === 'after' ? 'default' : 'pointer',
                fontWeight: 'bold',
                fontSize: '11px'
              }}
            >
              {stage === 'diffing' ? 'Diffing...' : 'Run Diff'}
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '4px 8px',
                background: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
