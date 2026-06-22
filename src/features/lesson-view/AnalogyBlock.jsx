import React from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * AnalogyBlock Component
 * Renders the signature Analogy Card element (Design System §2 & §4).
 * Rotates deterministically based on the lesson ID.
 *
 * @param {object} props.analogy - The analogy object containing text and breaksDownWhere
 * @param {string} props.lessonId - The current lesson ID (e.g. "2.1")
 */
export default function AnalogyBlock({ analogy, lessonId }) {
  if (!analogy) return null

  // Determine rotation angle deterministically based on the last digit of the lesson ID
  const match = lessonId.match(/\d+$/)
  const lastNum = match ? parseInt(match[0], 10) : 0
  const isOdd = lastNum % 2 !== 0
  const rotateAngle = isOdd ? 'var(--analogy-card-rotation-a)' : 'var(--analogy-card-rotation-b)'

  return (
    <div className="analogy-card-container">
      <div 
        className="analogy-card" 
        style={{ '--rotate-angle': rotateAngle }}
      >
        {/* UPPERCASE structural label */}
        <span className="analogy-badge">ANALOGY</span>
        
        {/* Main Analogy prose rendered via Markdown */}
        <div className="analogy-body">
          <ReactMarkdown>{analogy.text}</ReactMarkdown>
        </div>

        {/* "Where this breaks down" sub-section */}
        {analogy.breaksDownWhere && (
          <div className="analogy-breakdown">
            <h4 className="analogy-breakdown-title">Where the analogy breaks down</h4>
            <div className="analogy-breakdown-text">
              <ReactMarkdown>{analogy.breaksDownWhere}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
