import React from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * ExplanationBlock Component
 * Renders the What / How / When explanation sections from lesson data.
 *
 * @param {object} props.explanation - Object containing what, how, and when markdown strings
 */
export default function ExplanationBlock({ explanation }) {
  if (!explanation) return null

  return (
    <div className="explanation-block">
      {explanation.what && (
        <section className="explanation-section">
          <span className="section-label">What is it?</span>
          <h3 className="explanation-section-title">The Concept</h3>
          <div className="explanation-section-body">
            <ReactMarkdown>{explanation.what}</ReactMarkdown>
          </div>
        </section>
      )}

      {explanation.how && (
        <section className="explanation-section">
          <span className="section-label">How does it work?</span>
          <h3 className="explanation-section-title">The Mechanics</h3>
          <div className="explanation-section-body">
            <ReactMarkdown>{explanation.how}</ReactMarkdown>
          </div>
        </section>
      )}

      {explanation.when && (
        <section className="explanation-section">
          <span className="section-label">When should you use it?</span>
          <h3 className="explanation-section-title">The Decision</h3>
          <div className="explanation-section-body">
            <ReactMarkdown>{explanation.when}</ReactMarkdown>
          </div>
        </section>
      )}
    </div>
  )
}
