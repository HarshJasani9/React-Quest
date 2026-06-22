// progressReducer.js — Phase 3
// Manages progress state: completed lessons, completed challenges.
// Actions: LESSON_COMPLETE, CHALLENGE_COMPLETE, RESET_PROGRESS, HYDRATE

export const initialState = {
  completedLessons: new Set(),   // Set<lessonId>
  completedChallenges: new Set(), // Set<checkpointId>
}

export function progressReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return {
        completedLessons: new Set(action.payload.completedLessons),
        completedChallenges: new Set(action.payload.completedChallenges),
      }
    case 'LESSON_COMPLETE':
      return {
        ...state,
        completedLessons: new Set([...state.completedLessons, action.lessonId]),
      }
    case 'CHALLENGE_COMPLETE':
      return {
        ...state,
        completedChallenges: new Set([...state.completedChallenges, action.checkpointId]),
      }
    case 'RESET_PROGRESS':
      return initialState
    default:
      return state
  }
}
