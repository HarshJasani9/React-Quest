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
        <div className="sandbox-header">
          <div className="sandbox-header-left">
            {solutionCode ? (
              <>
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`sandbox-tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
                >
                  MY CODE
                </button>
                <button
                  onClick={() => setActiveTab('solution')}
                  className={`sandbox-tab-btn ${activeTab === 'solution' ? 'active' : ''}`}
                >
                  SOLUTION
                </button>
              </>
            ) : (
              <span className="sandbox-header-label">
                EDITOR
              </span>
            )}
            
            {isFullscreen && (
              <span className="sandbox-header-badge">
                ZEN MODE
              </span>
            )}
          </div>
          <div className="sandbox-header-right">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="sandbox-fullscreen-btn"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
            {activeTab === 'editor' && (
              <button 
                onClick={handleReset}
                className="sandbox-reset-btn"
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
