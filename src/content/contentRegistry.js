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
import lesson1_1 from './modules/01-foundations/1.1-why-react-exists.js'
import lesson1_2 from './modules/01-foundations/1.2-jsx-is-not-html.js'
import lesson1_3 from './modules/01-foundations/1.3-components-are-just-functions.js'
import lesson1_4 from './modules/01-foundations/1.4-props-passing-data.js'
import lesson2_1 from './modules/02-state-and-rendering/2.1-state-basics.js'
import lesson2_2 from './modules/02-state-and-rendering/2.2-render-and-rerender.js'
import lesson2_3 from './modules/02-state-and-rendering/2.3-events-controlled-inputs.js'
import lesson2_4 from './modules/02-state-and-rendering/2.4-updater-functions.js'
import lesson3_1 from './modules/03-lists-keys-conditional/3.1-rendering-lists.js'
import lesson3_2 from './modules/03-lists-keys-conditional/3.2-keys-why-needed.js'
import lesson3_3 from './modules/03-lists-keys-conditional/3.3-conditional-rendering.js'
import lesson4_1 from './modules/04-composition-lifting-state/4.1-children-composition.js'
import lesson4_2 from './modules/04-composition-lifting-state/4.2-lifting-state-up.js'
import lesson4_3 from './modules/04-composition-lifting-state/4.3-callback-props.js'

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
  '1.1': lesson1_1,
  '1.2': lesson1_2,
  '1.3': lesson1_3,
  '1.4': lesson1_4,
  '2.1': lesson2_1,
  '2.2': lesson2_2,
  '2.3': lesson2_3,
  '2.4': lesson2_4,
  '3.1': lesson3_1,
  '3.2': lesson3_2,
  '3.3': lesson3_3,
  '4.1': lesson4_1,
  '4.2': lesson4_2,
  '4.3': lesson4_3,
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
