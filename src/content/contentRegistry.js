/**
 * contentRegistry.js
 * Aggregates all module + lesson data files and exposes lookup-by-id helpers.
 */

// Import module metadata indexes
import module1 from './modules/01-foundations/index.js'
import module2 from './modules/02-state-and-rendering/index.js'
import module3 from './modules/03-lists-keys-conditional/index.js'
import module4 from './modules/04-composition-lifting-state/index.js'
import module5 from './modules/05-side-effects-lifecycle/index.js'
import module6 from './modules/06-context-global-state/index.js'
import module7 from './modules/07-refs-dom/index.js'
import module8 from './modules/08-custom-hooks/index.js'
import module9 from './modules/09-performance/index.js'
import module10 from './modules/10-advanced-patterns/index.js'
import module11 from './modules/11-react-internals/index.js'
import module12 from './modules/12-capstone/index.js'

// Import lesson content files
import lesson2_1 from './modules/02-state-and-rendering/2.1-state-basics.js'

// Aggregated modules list in chronological order
export const modules = [
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
  module9,
  module10,
  module11,
  module12
]

// Aggregated lessons dictionary
export const lessons = {
  '2.1': lesson2_1
}

// Flat list of lesson IDs in chronological order based on module sequence
const LESSON_ORDER = modules.reduce((acc, mod) => {
  if (mod && Array.isArray(mod.lessonIds)) {
    return [...acc, ...mod.lessonIds]
  }
  return acc
}, [])

/**
 * Returns a lesson by its unique ID.
 * @param {string} id - The lesson ID (e.g. "2.1")
 * @returns {object|null}
 */
export function getLessonById(id) {
  return lessons[id] ?? null
}

/**
 * Returns the next chronological lesson in the curriculum.
 * @param {string} id - The current lesson ID
 * @returns {object|null}
 */
export function getNextLesson(id) {
  const currentIndex = LESSON_ORDER.indexOf(id)
  if (currentIndex === -1 || currentIndex === LESSON_ORDER.length - 1) {
    return null
  }
  const nextId = LESSON_ORDER[currentIndex + 1]
  return lessons[nextId] ?? null
}

/**
 * Returns the previous chronological lesson in the curriculum.
 * @param {string} id - The current lesson ID
 * @returns {object|null}
 */
export function getPrevLesson(id) {
  const currentIndex = LESSON_ORDER.indexOf(id)
  if (currentIndex === -1 || currentIndex === 0) {
    return null
  }
  const prevId = LESSON_ORDER[currentIndex - 1]
  return lessons[prevId] ?? null
}
