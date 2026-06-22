import React from 'react'
import ReactMarkdown from 'react-markdown'

/**
 * MisconceptionCallout Component
 * Renders common misconceptions styled as a quiet, corrective block with a left border accent.
 * NOT styled as a loud alert/danger box (Design System §4).
 *
 * @param {object} props.misconception - Object containing claim and reality strings
 */
export default function MisconceptionCallout({ misconception }) {
  if (!misconception) return null

  return (
    <div className="misconception-callout">
      <span className="misconception-label">Common Misconception</span>
      <div className="misconception-row">
        <div className="misconception-claim">
          <ReactMarkdown>{`**❌ Misconception:** ${misconception.claim}`}</ReactMarkdown>
        </div>
        <div className="misconception-reality">
          <ReactMarkdown>{`**✅ Reality:** ${misconception.reality}`}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
