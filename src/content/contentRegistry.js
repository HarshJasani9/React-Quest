/**
 * contentRegistry.js
 * Aggregates all module + lesson data files and exposes lookup-by-id helpers.
 * Built in Phase 2. Empty placeholder for Phase 0 folder structure compliance.
 */

// TODO Phase 2: import all module index files and build lookup maps
export const modules = []
export const lessons = {}

export function getLessonById(id) {
  return lessons[id] ?? null
}

export function getNextLesson(id) {
  return null
}

export function getPrevLesson(id) {
  return null
}
