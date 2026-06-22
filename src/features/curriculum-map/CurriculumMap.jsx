import React from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../progress/ProgressContext.jsx'
import { modules, getLessonById } from '../../content/contentRegistry.js'
import './curriculumMap.css'

// Pre-populate lesson metadata for unauthored lessons in Module 1 and 2
// so the curriculum map displays them with proper titles and prerequisites.
const LESSON_METADATA_FALLBACK = {
  '1.1': { title: 'Why React Exists', prerequisites: [] },
  '1.2': { title: 'JSX Is Not HTML', prerequisites: ['1.1'] },
  '1.3': { title: 'Components Are Just Functions', prerequisites: ['1.2'] },
  '1.4': { title: 'Props: Passing Data Down', prerequisites: ['1.3'] },
  '2.1': { title: 'State: Data That Causes Re-renders', prerequisites: ['1.4'] },
  '2.2': { title: 'Render and Re-render: What Actually Happens', prerequisites: ['2.1'] },
  '2.3': { title: 'State Updates Are Scheduled', prerequisites: ['2.2'] },
  '2.4': { title: 'Immutability & State Arrays/Objects', prerequisites: ['2.3'] },
}

export default function CurriculumMap() {
  const { state, resetProgress, isUnlocked } = useProgress()

  // Calculate stats
  const totalLessons = modules.reduce((sum, mod) => sum + (mod.lessonIds?.length || 0), 0)
  const completedCount = state.completedLessons.size

  return (
    <div className="curriculum-container">
      <div className="curriculum-inner">
        {/* Progress Dashboard Panel */}
        <section className="progress-dashboard">
          <div>
            <h1 className="dashboard-title">ReactQuest</h1>
            <p className="dashboard-desc">Your learning path from absolute fundamentals to deep internals.</p>
          </div>
          <div className="dashboard-stats">
            <div className="stat-box">
              <div className="stat-number">{completedCount} / {totalLessons}</div>
              <div className="stat-label">Lessons Done</div>
            </div>
            <button className="reset-button" onClick={resetProgress} title="Reset all progress">
              Reset Progress
            </button>
          </div>
        </section>

        {/* Vertical Timeline Path */}
        <section className="curriculum-path">
          {modules.map((mod) => {
            if (!mod.lessonIds || mod.lessonIds.length === 0) return null

            return (
              <div key={mod.id} className="module-group">
                {/* Module Header */}
                <div className="module-header">
                  <span className="module-badge">Module {mod.id}</span>
                  <h2 className="module-title">{mod.title}</h2>
                  <p className="module-description">{mod.description}</p>
                </div>

                {/* Module Lessons */}
                <div className="module-lessons">
                  {mod.lessonIds.map((lessonId) => {
                    const realLesson = getLessonById(lessonId)
                    const fallback = LESSON_METADATA_FALLBACK[lessonId] || { title: `Lesson ${lessonId}`, prerequisites: [] }
                    
                    const lessonObj = realLesson || {
                      id: lessonId,
                      moduleId: mod.id,
                      title: fallback.title,
                      prerequisites: fallback.prerequisites
                    }

                    const isCompleted = state.completedLessons.has(lessonId)
                    const unlocked = isUnlocked(lessonObj)
                    const isAuthored = realLesson !== null

                    let nodeClass = 'lesson-node'
                    if (isCompleted) {
                      nodeClass += ' completed'
                    } else if (unlocked) {
                      nodeClass += ' unlocked'
                    } else {
                      nodeClass += ' locked'
                    }

                    return (
                      <div key={lessonId} className={nodeClass}>
                        {/* Circle Status Indicator */}
                        <div className="node-indicator">
                          {isCompleted ? '✓' : unlocked ? lessonId : '🔒'}
                        </div>

                        {/* Node Card */}
                        <div className="node-card">
                          <div className="node-card-left">
                            <span className="node-lesson-id">LESSON {lessonId}</span>
                            <h3 className="node-lesson-title">{lessonObj.title}</h3>
                            
                            {!unlocked && lessonObj.prerequisites.length > 0 && (
                              <div className="node-lesson-prereqs">
                                Requires: {lessonObj.prerequisites.map(p => {
                                  const prereqMeta = getLessonById(p) || LESSON_METADATA_FALLBACK[p]
                                  return `${prereqMeta?.title || p} (${p})`
                                }).join(', ')}
                              </div>
                            )}

                            {!isAuthored && (
                              <div className="node-lesson-status-badge">
                                ⚙️ Available soon (Stub)
                              </div>
                            )}
                          </div>

                          {/* Node Action Link */}
                          {unlocked ? (
                            isAuthored ? (
                              <Link 
                                to={`/lesson/${lessonId}`} 
                                className={`node-action-btn ${isCompleted ? 'review' : 'start'}`}
                              >
                                {isCompleted ? 'Review' : 'Start'}
                              </Link>
                            ) : (
                              <span className="node-action-btn unauthored">
                                Ready
                              </span>
                            )
                          ) : (
                            <span className="node-action-btn unauthored" style={{ color: 'var(--color-locked)' }}>
                              Locked
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}
