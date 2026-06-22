import React, { useState, useEffect } from 'react'

export default function ConcurrentRenderingVisualization() {
  const [schedulerMode, setSchedulerMode] = useState('sync') // 'sync' | 'concurrent'
  const [timeline, setTimeline] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [textTyped, setTextTyped] = useState('')
  const [inputValue, setInputValue] = useState('')

  const fullWord = 'REACT INTERNALS'

  useEffect(() => {
    let intervalId
    let charIndex = 0

    if (isPlaying) {
      setTimeline([])
      setTextTyped('')
      setInputValue('')
      
      intervalId = setInterval(() => {
        if (charIndex < fullWord.length) {
          const nextChar = fullWord[charIndex]
          setTextTyped(prev => prev + nextChar)
          
          if (schedulerMode === 'sync') {
            // In Sync mode, typing a character triggers a long, blocking render block
            setTimeline(prev => [
              ...prev,
              { type: 'key', char: nextChar, time: Date.now() },
              { type: 'render-block', label: 'Blocking Render (150ms)', blocked: true, time: Date.now() + 5 }
            ])
            setInputValue(prev => prev + nextChar)
          } else {
            // In Concurrent mode, typing triggers interruptible slices
            setTimeline(prev => [
              ...prev,
              { type: 'key', char: nextChar, time: Date.now() },
              { type: 'render-slice', label: 'Slice 1', time: Date.now() + 5 },
              { type: 'render-slice', label: 'Slice 2', time: Date.now() + 15 },
              { type: 'render-slice', label: 'Slice 3', time: Date.now() + 25 }
            ])
            // Instant input update
            setInputValue(prev => prev + nextChar)
          }
          charIndex++
        } else {
          setIsPlaying(false)
          clearInterval(intervalId)
        }
      }, 400)
    }

    return () => clearInterval(intervalId)
  }, [isPlaying, schedulerMode])

  const handleStartSim = () => {
    setIsPlaying(true)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setTimeline([])
    setTextTyped('')
    setInputValue('')
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
        Concurrent Scheduler Timeline
      </h4>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate)', marginBottom: 'var(--space-4)' }}>
        Compare how React 18's Concurrent rendering slices long render tasks to keep inputs responsive.
      </p>

      {/* Mode Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--color-canvas)',
        padding: 'var(--space-3)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: 'var(--space-4)',
        flexWrap: 'wrap',
        gap: 'var(--space-2)'
      }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <label style={{ fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="schedulerMode"
              checked={schedulerMode === 'sync'}
              onChange={() => { setSchedulerMode('sync'); handleReset(); }}
              disabled={isPlaying}
            />
            Synchronous (Sync/Blocking)
          </label>
          <label style={{ fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="schedulerMode"
              checked={schedulerMode === 'concurrent'}
              onChange={() => { setSchedulerMode('concurrent'); handleReset(); }}
              disabled={isPlaying}
            />
            Concurrent (Interruptible Slices)
          </label>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleStartSim}
            disabled={isPlaying}
            style={{
              padding: '4px 10px',
              background: isPlaying ? 'var(--color-border)' : 'var(--color-signal)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: isPlaying ? 'default' : 'pointer',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            Start Simulation
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '4px 10px',
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '11px',
              color: 'var(--color-slate)'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Simulator view */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Mock input field showing latency */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          background: '#fff',
          padding: 'var(--space-3)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)'
        }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate)', display: 'block', marginBottom: '4px' }}>
              MOCK SEARCH INPUT (simulating keystrokes)
            </label>
            <input
              type="text"
              value={inputValue}
              readOnly
              placeholder="Waiting to start..."
              style={{
                width: '100%',
                padding: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-mono)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-canvas)',
                color: 'var(--color-ink)'
              }}
            />
          </div>
          {schedulerMode === 'sync' && isPlaying && (
            <div style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-caution)',
              fontWeight: 'bold',
              animation: 'pulse 1s infinite',
              padding: '4px 8px',
              background: 'var(--color-caution-subtle)',
              border: '1px solid var(--color-caution)',
              borderRadius: 'var(--radius-sm)'
            }}>
              ⚠️ INPUT LAG DETECTED
            </div>
          )}
        </div>

        {/* Timeline Visualization */}
        <div>
          <label style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate)', display: 'block', marginBottom: '8px' }}>
            MAIN THREAD TIMELINE (Left to Right)
          </label>
          <div style={{
            height: '80px',
            background: 'var(--color-canvas)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            padding: 'var(--space-2)',
            overflowX: 'auto',
            gap: '6px'
          }}>
            {timeline.length === 0 && (
              <div style={{ width: '100%', textAlign: 'center', color: 'var(--color-slate)', fontStyle: 'italic', fontSize: 'var(--text-xs)' }}>
                Click "Start Simulation" to see threads scheduling.
              </div>
            )}
            {timeline.map((item, idx) => {
              if (item.type === 'key') {
                return (
                  <div
                    key={idx}
                    style={{
                      minWidth: '28px',
                      height: '28px',
                      background: 'var(--color-signal)',
                      color: '#fff',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'bold',
                      boxShadow: 'var(--shadow-card)'
                    }}
                  >
                    {item.char}
                  </div>
                )
              }
              if (item.type === 'render-block') {
                return (
                  <div
                    key={idx}
                    style={{
                      minWidth: '130px',
                      height: '24px',
                      background: 'var(--color-caution-subtle)',
                      border: '1.5px solid var(--color-caution)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      color: 'var(--color-caution)',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.label}
                  </div>
                )
              }
              if (item.type === 'render-slice') {
                return (
                  <div
                    key={idx}
                    style={{
                      minWidth: '32px',
                      height: '24px',
                      background: '#e6f4ea',
                      border: '1.5px solid #137333',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      color: '#137333',
                      fontWeight: 'bold'
                    }}
                  >
                    R
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
