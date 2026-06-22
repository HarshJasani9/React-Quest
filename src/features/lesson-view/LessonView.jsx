import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getLessonById, getNextLesson, getPrevLesson, modules } from '../../content/contentRegistry.js'
import { useProgress } from '../progress/ProgressContext.jsx'
import AnalogyBlock from './AnalogyBlock.jsx'
import ExplanationBlock from './ExplanationBlock.jsx'
import MisconceptionCallout from './MisconceptionCallout.jsx'
import CodeSandbox from '../code-sandbox/CodeSandbox.jsx'
import ReactMarkdown from 'react-markdown'
import './lesson-view.css'

export default function LessonView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, completeLesson, completeChallenge, isUnlocked } = useProgress()

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

  // Enforce prerequisite locks
  const unlocked = isUnlocked(lesson)
  if (!unlocked) {
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
        padding: 'var(--space-6)',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '450px',
          background: 'var(--color-paper)',
          padding: 'var(--space-8)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-raised)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)', color: 'var(--color-locked)' }}>
            🔒
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)', color: 'var(--color-ink)' }}>
            Lesson Locked
          </h1>
          <p style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)' }}>
            This lesson is locked. To unlock it, you must first complete the following prerequisites:
          </p>
          <div style={{
            background: 'var(--color-canvas)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-6)',
            textAlign: 'left',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            border: '1px solid var(--color-border)'
          }}>
            {lesson.prerequisites.map(prereqId => {
              const prereqLesson = getLessonById(prereqId)
              const title = prereqLesson ? prereqLesson.title : `Lesson ${prereqId}`
              return (
                <div key={prereqId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ color: 'var(--color-caution)' }}>•</span>
                  <span>{title} ({prereqId})</span>
                </div>
              )
            })}
          </div>
          <Link to="/" style={{
            display: 'inline-block',
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
      </div>
    )
  }

  // Find module metadata
  const currentModule = modules.find(m => m.id === lesson.moduleId)
  const nextLesson = getNextLesson(lesson.id)
  const prevLesson = getPrevLesson(lesson.id)
  const isCompleted = state.completedLessons.has(lesson.id)

  // Grab the first checkpoint
  const checkpoint = lesson.checkpoints?.[0]

  const handleComplete = async () => {
    await completeLesson(lesson.id)
    if (checkpoint) {
      await completeChallenge(lesson.id, checkpoint.id)
    }
  }

  // Render navigation dots representing lessons in the current module
  const renderProgressDots = () => {
    if (!currentModule || !currentModule.lessonIds) return null

    return currentModule.lessonIds.map(lessonId => {
      const isCurrent = lessonId === lesson.id
      const dotLesson = getLessonById(lessonId)
      const isAvailable = dotLesson !== null
      const isDotUnlocked = dotLesson ? isUnlocked(dotLesson) : false
      const isDotCompleted = state.completedLessons.has(lessonId)

      let dotClass = 'progress-dot'
      if (isCurrent) {
        dotClass += ' active'
      } else if (isDotCompleted) {
        dotClass += ' completed'
      }

      const titleText = isCurrent
        ? 'Current Lesson'
        : !isAvailable
          ? `Lesson ${lessonId} (Unauthored)`
          : !isDotUnlocked
            ? `Lesson ${lessonId} (Locked)`
            : `Go to Lesson ${lessonId} ${isDotCompleted ? '(Completed)' : ''}`

      const clickable = isAvailable && isDotUnlocked && !isCurrent

      return (
        <span
          key={lessonId}
          className={dotClass}
          title={titleText}
          onClick={() => {
            if (clickable) {
              navigate(`/lesson/${lessonId}`)
            }
          }}
          style={{
            cursor: clickable ? 'pointer' : 'default',
            opacity: isCurrent || (isAvailable && isDotUnlocked) ? 1 : 0.35,
            borderStyle: isAvailable ? 'solid' : 'dotted'
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
                    fontWeight: 'var(--weight-semibold)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Next Lesson →
                </button>
              ) : (
                <span style={{ color: 'var(--color-locked)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>
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
                <CodeSandbox starterCode={checkpoint.starterCode} height={lesson.sandboxHeight} />
              </div>

              {/* Mark Complete Action Button */}
              <div style={{
                marginTop: 'var(--space-4)',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 'var(--space-4)'
              }}>
                {isCompleted && (
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-signal)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 'var(--weight-semibold)'
                  }}>
                    ✓ Completed!
                  </span>
                )}
                <button
                  onClick={handleComplete}
                  style={{
                    padding: 'var(--space-2) var(--space-6)',
                    background: isCompleted ? 'var(--color-signal)' : 'var(--color-ink)',
                    color: '#fff',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--weight-semibold)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all var(--duration-fast) var(--ease-standard)'
                  }}
                >
                  {isCompleted ? 'Completed (Update)' : 'Complete Checkpoint & Unlock Next'}
                </button>
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
