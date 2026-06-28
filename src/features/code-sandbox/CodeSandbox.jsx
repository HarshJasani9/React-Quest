import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { useBabelTransform } from './useBabelTransform.js'
import SandboxPreviewRoot from './SandboxPreviewRoot.jsx'
import VirtualDomInspector from '../internals-visualizations/VirtualDomInspector.jsx'
import './codeSandbox.css'

export default function CodeSandbox({ starterCode, solutionCode, height = '400px', inspectVirtualDom = false }) {
  const [code, setCode] = useState(starterCode || '')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState('editor') // 'editor' | 'solution'
  
  // Transform the raw string input
  const { code: transformedCode, error: transformError } = useBabelTransform(code, 300)

  const handleReset = () => {
    setCode(starterCode || '')
  }

  // Prevent scroll when fullscreen is active
  React.useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isFullscreen])

  // Support ESC key to exit fullscreen
  React.useEffect(() => {
    if (!isFullscreen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  return (
    <div 
      className={`sandbox-container ${isFullscreen ? 'is-fullscreen' : ''}`} 
      style={isFullscreen ? {} : { height: height }}
    >
      {/* Editor Pane */}
      <div className="sandbox-editor-pane">
        <div style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-canvas)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
            {solutionCode ? (
              <>
                <button
                  onClick={() => setActiveTab('editor')}
                  style={{
                    fontFamily: 'var(--font-mono)', 
                    fontSize: 'var(--text-xs)', 
                    letterSpacing: 'var(--tracking-wider)',
                    color: activeTab === 'editor' ? 'var(--color-signal)' : 'var(--color-slate)',
                    background: activeTab === 'editor' ? 'var(--color-signal-subtle)' : 'transparent',
                    border: 'none',
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: activeTab === 'editor' ? 'var(--weight-bold)' : 'var(--weight-normal)',
                    cursor: 'pointer'
                  }}
                >
                  MY CODE
                </button>
                <button
                  onClick={() => setActiveTab('solution')}
                  style={{
                    fontFamily: 'var(--font-mono)', 
                    fontSize: 'var(--text-xs)', 
                    letterSpacing: 'var(--tracking-wider)',
                    color: activeTab === 'solution' ? 'var(--color-signal)' : 'var(--color-slate)',
                    background: activeTab === 'solution' ? 'var(--color-signal-subtle)' : 'transparent',
                    border: 'none',
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: activeTab === 'solution' ? 'var(--weight-bold)' : 'var(--weight-normal)',
                    cursor: 'pointer'
                  }}
                >
                  SOLUTION
                </button>
              </>
            ) : (
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: 'var(--text-xs)', 
                letterSpacing: 'var(--tracking-wider)',
                color: 'var(--color-slate)',
                padding: 'var(--space-1) var(--space-3)'
              }}>
                EDITOR
              </span>
            )}
            
            {isFullscreen && (
              <span style={{
                color: 'var(--color-signal)',
                fontWeight: 'var(--weight-bold)',
                background: 'var(--color-signal-subtle)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '10px',
                marginLeft: 'var(--space-2)'
              }}>
                ZEN MODE
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-signal)',
                fontWeight: 'var(--weight-semibold)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-1) var(--space-2)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-canvas)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
            {activeTab === 'editor' && (
              <button 
                onClick={handleReset}
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-signal)',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Reset code
              </button>
            )}
          </div>
        </div>

        {activeTab === 'solution' && (
          <div style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-signal-subtle)',
            color: 'var(--color-signal)',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-body)',
            borderBottom: '1px solid var(--color-border)',
            fontWeight: 'var(--weight-semibold)'
          }}>
            ℹ️ Solution Reference (Read-Only). Use this to compare with your implementation.
          </div>
        )}

        <div style={{ flex: 1, overflow: 'auto', background: '#fff' }}>
          <CodeMirror
            value={activeTab === 'editor' ? code : (solutionCode || '')}
            height="100%"
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => {
              if (activeTab === 'editor') {
                setCode(value)
              }
            }}
            theme="light"
            readOnly={activeTab === 'solution'}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: activeTab === 'editor',
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: false
            }}
          />
        </div>
      </div>

      {/* Preview Pane */}
      <div className="sandbox-preview-pane">
        <div style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-canvas)',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: 'var(--text-xs)', 
            letterSpacing: 'var(--tracking-wider)',
            color: 'var(--color-slate)'
          }}>
            PREVIEW
          </span>
        </div>
        
        <div style={{ flex: 1, overflow: 'auto' }}>
          {transformError ? (
             <div 
              role="alert" 
              aria-live="assertive" 
              style={{
                padding: 'var(--space-4)',
                background: 'var(--color-caution-subtle)',
                color: 'var(--color-caution)',
                margin: 'var(--space-4)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-caution)'
              }}
            >
              <p style={{ fontWeight: 'var(--weight-bold)', marginBottom: 'var(--space-2)' }}>
                This code threw an error while running:
              </p>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap' }}>
                {transformError.message}
              </pre>
            </div>
          ) : inspectVirtualDom ? (
            <VirtualDomInspector transformedCode={transformedCode} />
          ) : (
            <SandboxPreviewRoot transformedCode={transformedCode} />
          )}
        </div>
      </div>
    </div>
  )
}
