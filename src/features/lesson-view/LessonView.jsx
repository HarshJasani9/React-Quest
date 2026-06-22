import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getLessonById, getNextLesson, getPrevLesson, modules } from '../../content/contentRegistry.js'
import AnalogyBlock from './AnalogyBlock.jsx'
import ExplanationBlock from './ExplanationBlock.jsx'
import MisconceptionCallout from './MisconceptionCallout.jsx'
import CodeSandbox from '../code-sandbox/CodeSandbox.jsx'
import ReactMarkdown from 'react-markdown'
import './lesson-view.css'

export default function LessonView() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Retrieve current lesson data
  const lesson = getLessonById(id)

  if (!lesson) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'var(--font-body)',
        backgroundColor: 'var(--color-canvas)',
        color: 'var(--color-slate)',
        padding: 'var(--space-6)'
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)', color: 'var(--color-caution)' }}>
          Lesson Not Found
        </h1>
        <p style={{ marginBottom: 'var(--space-6)' }}>
          We couldn't find a lesson with ID "{id}". It may not be authored yet.
        </p>
        <Link to="/" style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 'var(--weight-semibold)'
        }}>
          Back to Curriculum Map
        </Link>
      </div>
    )
  }

  // Find module metadata
  const currentModule = modules.find(m => m.id === lesson.moduleId)
  const nextLesson = getNextLesson(lesson.id)
  const prevLesson = getPrevLesson(lesson.id)

  // Grab the first checkpoint
  const checkpoint = lesson.checkpoints?.[0]

  // Render navigation dots representing lessons in the current module
  const renderProgressDots = () => {
    if (!currentModule || !currentModule.lessonIds) return null

    return currentModule.lessonIds.map(lessonId => {
      const isCurrent = lessonId === lesson.id
      const isAvailable = getLessonById(lessonId) !== null

      // Mock completion status for Phase 2:
      // In a real app we read this from ProgressContext.
      // For now, treat lessons before the current one in ID as completed.
      const currentNum = parseFloat(lesson.id)
      const dotNum = parseFloat(lessonId)
      const isCompleted = dotNum < currentNum

      let dotClass = 'progress-dot'
      if (isCurrent) {
        dotClass += ' active'
      } else if (isCompleted) {
        dotClass += ' completed'
      }

      return (
        <span
          key={lessonId}
          className={dotClass}
          title={isCurrent ? 'Current lesson' : isAvailable ? `Go to Lesson ${lessonId}` : `Lesson ${lessonId} (locked)`}
          onClick={() => {
            if (isAvailable && !isCurrent) {
              navigate(`/lesson/${lessonId}`)
            }
          }}
          style={{
            cursor: isAvailable && !isCurrent ? 'pointer' : 'default',
            opacity: isAvailable || isCurrent ? 1 : 0.4
          }}
        />
      )
    })
  }

  return (
    <div className="lesson-view-container">
      {/* Top Header Bar */}
      <header className="lesson-header">
        <div className="header-left">
          <Link to="/" className="back-link">
            ← Map
          </Link>
          <span className="lesson-meta">
            Module {lesson.moduleId} · Lesson {lesson.id}
          </span>
          <span className="lesson-title-display">
            {lesson.title}
          </span>
        </div>
        <div className="header-right">
          <div className="progress-dots">
            {renderProgressDots()}
          </div>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <main className="lesson-layout">
        {/* Left Column: Prose & Markdown explanations */}
        <section className="lesson-content-column">
          <div className="prose-container">
            {/* Core Question Box */}
            <div className="core-question-section">
              <div className="core-question-label">Core Question</div>
              <h2 className="core-question-text">
                {lesson.coreQuestion}
              </h2>
            </div>

            {/* Before Problem Box */}
            {lesson.beforeProblem && (
              <div className="before-problem-box">
                <div className="section-label">The "Before" Problem</div>
                <ReactMarkdown>{lesson.beforeProblem}</ReactMarkdown>
              </div>
            )}

            {/* Signature Analogy Card */}
            <AnalogyBlock analogy={lesson.analogy} lessonId={lesson.id} />

            {/* Concept, Mechanics, Decision Sections */}
            <ExplanationBlock explanation={lesson.explanation} />

            {/* Common Misconception Callout */}
            <MisconceptionCallout misconception={lesson.misconception} />

            {/* Footer Navigation within Column */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'var(--space-8)',
              borderTop: '1px solid var(--color-border)',
              paddingTop: 'var(--space-6)'
            }}>
              {prevLesson ? (
                <button
                  onClick={() => navigate(`/lesson/${prevLesson.id}`)}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    border: '1px solid var(--color-border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-slate)',
                    background: '#fff'
                  }}
                >
                  ← Previous: Lesson {prevLesson.id}
                </button>
              ) : (
                <Link
                  to="/"
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    border: '1px solid var(--color-border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-slate)',
                    background: '#fff',
                    textDecoration: 'none'
                  }}
                >
                  ← Back to Map
                </Link>
              )}

              {nextLesson ? (
                <button
                  onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                  style={{
                    padding: 'var(--space-2) var(--space-6)',
                    background: 'var(--color-signal)',
                    color: '#fff',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--weight-semibold)'
                  }}
                >
                  Next Lesson →
                </button>
              ) : (
                <span style={{ color: 'var(--color-locked)', fontSize: 'var(--text-sm)' }}>
                  End of Module
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Right Column: Code Sandbox */}
        <section className="lesson-sandbox-column">
          {checkpoint ? (
            <div className="checkpoint-pane">
              <div className="checkpoint-header">
                <span className="section-label">Interactive Checkpoint</span>
                <h3 className="checkpoint-title">Proof of Concept</h3>
                <div className="checkpoint-prompt">
                  <ReactMarkdown>{checkpoint.prompt}</ReactMarkdown>
                </div>
              </div>

              <div className="checkpoint-sandbox-wrapper">
                <CodeSandbox starterCode={checkpoint.starterCode} />
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'var(--color-slate)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)'
            }}>
              No checkpoint defined for this lesson.
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
