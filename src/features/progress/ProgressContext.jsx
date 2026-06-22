import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { progressReducer, initialState } from './progressReducer.js'
import { storageService } from '../../services/storageService.js'
import { getLessonById } from '../../content/contentRegistry.js'

const ProgressContext = createContext(null)

/**
 * ProgressProvider Component
 * Manages curriculum completion progress state, hydrates on mount from storageService,
 * and synchronizes user updates back to localStorage.
 */
export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(progressReducer, initialState)

  // Hydrate progress from storage on mount
  useEffect(() => {
    let active = true
    async function hydrate() {
      const progress = await storageService.getProgress()
      if (active) {
        dispatch({ type: 'HYDRATE', payload: progress })
      }
    }
    hydrate()
    return () => {
      active = false
    }
  }, [])

  // Side-effect wrapped helpers to ensure sync with localStorage
  const completeLesson = async (lessonId) => {
    // Optimistic state update in UI
    dispatch({ type: 'LESSON_COMPLETE', lessonId })
    await storageService.setLessonComplete(lessonId)
  }

  const completeChallenge = async (lessonId, checkpointId) => {
    dispatch({ type: 'CHALLENGE_COMPLETE', checkpointId })
    await storageService.setChallengeComplete(lessonId, checkpointId)
  }

  const resetProgress = async () => {
    dispatch({ type: 'RESET_PROGRESS' })
    await storageService.resetProgress()
  }

  /**
   * Pure predicate to determine if a lesson is unlocked.
   * A lesson is unlocked if and only if every ID in its `prerequisites` array
   * is present in the `completedLessons` set.
   *
   * @param {object} lesson - The lesson metadata or content object
   * @returns {boolean}
   */
  const isUnlocked = (lesson) => {
    if (!lesson) return false
    // If no prerequisites specified, it is unlocked by default
    if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
      return true
    }
    return lesson.prerequisites.every((prereqId) => {
      // Fallback: if the prerequisite lesson is not registered/authored yet,
      // treat it as completed/unlocked so the learner can test later lessons.
      const isAuthored = getLessonById(prereqId) !== null
      if (!isAuthored) return true

      return state.completedLessons.has(prereqId)
    })
  }

  return (
    <ProgressContext.Provider
      value={{
        state,
        dispatch,
        completeLesson,
        completeChallenge,
        resetProgress,
        isUnlocked,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

/**
 * Custom hook to consume progress context.
 */
export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) {
    throw new Error('useProgress must be used inside a ProgressProvider')
  }
  return ctx
}
