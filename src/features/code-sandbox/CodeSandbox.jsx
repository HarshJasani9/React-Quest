import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { useBabelTransform } from './useBabelTransform.js'
import SandboxPreviewRoot from './SandboxPreviewRoot.jsx'
import VirtualDomInspector from '../internals-visualizations/VirtualDomInspector.jsx'
import './codeSandbox.css'

export default function CodeSandbox({ starterCode, height = '400px', inspectVirtualDom = false }) {
  const [code, setCode] = useState(starterCode || '')
  
  // Transform the raw string input
  const { code: transformedCode, error: transformError } = useBabelTransform(code, 300)

  const handleReset = () => {
    setCode(starterCode || '')
  }

  return (
    <div className="sandbox-container" style={{ height: height }}>
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
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: 'var(--text-xs)', 
            letterSpacing: 'var(--tracking-wider)',
            color: 'var(--color-slate)'
          }}>
            EDITOR
          </span>
          <button 
            onClick={handleReset}
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-signal)',
              textDecoration: 'underline'
            }}
          >
            Reset to starter code
          </button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', background: '#fff' }}>
          <CodeMirror
            value={code}
            height="100%"
            extensions={[javascript({ jsx: true })]}
            onChange={(value) => setCode(value)}
            theme="light"
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
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
