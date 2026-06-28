import React, { useState, useEffect } from 'react'
import { quizzes } from '../../content/quizRegistry.js'

export default function ConceptCheck({ lessonId }) {
  const lessonQuizzes = quizzes[lessonId]
  
  if (!lessonQuizzes || lessonQuizzes.length === 0) return null

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)

  // Reset state when lesson changes
  useEffect(() => {
    setCurrentIdx(0)
    setSelectedIdx(null)
    setIsAnswered(false)
    setScore(0)
  }, [lessonId])

  const quiz = lessonQuizzes[currentIdx]

  const handleSelect = (idx) => {
    if (isAnswered) return
    setSelectedIdx(idx)
    setIsAnswered(true)
    if (idx === quiz.answerIndex) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    setCurrentIdx(prev => prev + 1)
    setSelectedIdx(null)
    setIsAnswered(false)
  }

  const handleRestart = () => {
    setCurrentIdx(0)
    setSelectedIdx(null)
    setIsAnswered(false)
    setScore(0)
  }

  const isFinished = currentIdx >= lessonQuizzes.length

  return (
    <div style={{
      background: 'var(--color-paper)',
      border: '2px solid var(--color-border-strong)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      margin: 'var(--space-8) 0',
      boxShadow: 'var(--shadow-card)',
      fontFamily: 'var(--font-body)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: 'var(--space-3)',
        marginBottom: 'var(--space-4)'
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-wider)',
          color: 'var(--color-signal)',
          fontWeight: 'var(--weight-bold)',
          textTransform: 'uppercase'
        }}>
          💡 Concept Check
        </span>
        <span style={{
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-slate)'
        }}>
          {isFinished ? 'Completed' : `Question ${currentIdx + 1} of ${lessonQuizzes.length}`}
        </span>
      </div>

      {!isFinished ? (
        <div>
          {/* Question Text */}
          <h4 style={{
            fontSize: 'var(--text-lg)',
            fontFamily: 'var(--font-display)',
            color: 'var(--color-ink)',
            fontWeight: 'var(--weight-bold)',
            lineHeight: 'var(--leading-tight)',
            marginBottom: 'var(--space-5)'
          }}>
            {quiz.question}
          </h4>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {quiz.options.map((option, idx) => {
              let btnStyle = {
                padding: 'var(--space-4)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: '#fff',
                textAlign: 'left',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                cursor: 'pointer',
                transition: 'all var(--duration-fast) var(--ease-standard)',
                width: '100%'
              }

              if (isAnswered) {
                if (idx === quiz.answerIndex) {
                  // Correct answer
                  btnStyle.border = '2px solid var(--color-signal)'
                  btnStyle.background = 'var(--color-signal-subtle)'
                  btnStyle.color = 'var(--color-signal)'
                  btnStyle.fontWeight = 'var(--weight-semibold)'
                } else if (idx === selectedIdx) {
                  // Selected incorrect answer
                  btnStyle.border = '2px solid var(--color-caution)'
                  btnStyle.background = 'var(--color-caution-subtle)'
                  btnStyle.color = 'var(--color-caution)'
                } else {
                  btnStyle.opacity = 0.6
                }
              } else {
                // Interactive hover state mockup using mouse events, but inline style works fine
                btnStyle[':hover'] = { background: 'var(--color-canvas)' } // We do inline check or simple button hover
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  style={btnStyle}
                  className="quiz-option-button"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isAnswered && idx === quiz.answerIndex ? 'var(--color-signal)' : isAnswered && idx === selectedIdx ? 'var(--color-caution)' : 'var(--color-canvas)',
                      color: isAnswered && (idx === quiz.answerIndex || idx === selectedIdx) ? '#fff' : 'var(--color-slate)',
                      fontSize: '12px',
                      fontWeight: 'var(--weight-bold)',
                      border: '1px solid var(--color-border)'
                    }}>
                      {isAnswered && idx === quiz.answerIndex ? '✓' : isAnswered && idx === selectedIdx ? '✗' : String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Feedback & Explanation */}
          {isAnswered && (
            <div style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${selectedIdx === quiz.answerIndex ? 'var(--color-signal)' : 'var(--color-caution)'}`,
              background: selectedIdx === quiz.answerIndex ? 'var(--color-signal-subtle)' : 'var(--color-caution-subtle)',
              animation: 'fadeIn var(--duration-fast) var(--ease-standard)'
            }}>
              <p style={{
                fontWeight: 'var(--weight-bold)',
                color: selectedIdx === quiz.answerIndex ? 'var(--color-signal)' : 'var(--color-caution)',
                marginBottom: 'var(--space-1)',
                fontSize: 'var(--text-sm)'
              }}>
                {selectedIdx === quiz.answerIndex ? '✨ Correct!' : '⚠️ Incorrect. Try reading the explanation below:'}
              </p>
              <p style={{
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--leading-normal)',
                color: 'var(--color-ink)'
              }}>
                {quiz.explanation}
              </p>

              {/* Next Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
                <button
                  onClick={currentIdx < lessonQuizzes.length - 1 ? handleNext : () => setCurrentIdx(prev => prev + 1)}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    background: 'var(--color-signal)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--weight-semibold)',
                    cursor: 'pointer'
                  }}
                >
                  {currentIdx < lessonQuizzes.length - 1 ? 'Next Question →' : 'Finish Check'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished View */
        <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>
            {score === lessonQuizzes.length ? '🏆' : '👍'}
          </div>
          <h4 style={{
            fontSize: 'var(--text-xl)',
            fontFamily: 'var(--font-display)',
            color: 'var(--color-ink)',
            fontWeight: 'var(--weight-bold)',
            marginBottom: 'var(--space-2)'
          }}>
            Concept Check Completed!
          </h4>
          <p style={{
            color: 'var(--color-slate)',
            fontSize: 'var(--text-sm)',
            marginBottom: 'var(--space-6)'
          }}>
            You got {score} out of {lessonQuizzes.length} questions correct. Your mental model is locked in!
          </p>
          <button
            onClick={handleRestart}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-slate)',
              background: '#fff',
              fontFamily: 'var(--font-body)',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
