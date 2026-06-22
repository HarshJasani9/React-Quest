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
import lesson5_1 from './modules/05-side-effects-lifecycle/5.1-what-counts-side-effect.js'
import lesson5_2 from './modules/05-side-effects-lifecycle/5.2-useeffect-running-after-render.js'
import lesson5_3 from './modules/05-side-effects-lifecycle/5.3-dependency-array.js'
import lesson5_4 from './modules/05-side-effects-lifecycle/5.4-cleanup-functions.js'
import lesson6_1 from './modules/06-context-global-state/6.1-prop-drilling-problem.js'
import lesson6_2 from './modules/06-context-global-state/6.2-context-direct-line.js'
import lesson6_3 from './modules/06-context-global-state/6.3-when-not-use-context.js'
import lesson7_1 from './modules/07-refs-dom/7.1-what-refs-for.js'
import lesson7_2 from './modules/07-refs-dom/7.2-refs-no-rerender.js'
import lesson8_1 from './modules/08-custom-hooks/8.1-extracting-logic.js'
import lesson8_2 from './modules/08-custom-hooks/8.2-rules-of-hooks.js'
import lesson9_1 from './modules/09-performance/9.1-optimization-need.js'
import lesson9_2 from './modules/09-performance/9.2-react-memo.js'
import lesson9_3 from './modules/09-performance/9.3-usememo-usecallback.js'
import lesson10_1 from './modules/10-advanced-patterns/10.1-usereducer-state-transitions.js'
import lesson10_2 from './modules/10-advanced-patterns/10.2-compound-components.js'
import lesson10_3 from './modules/10-advanced-patterns/10.3-render-props.js'
import lesson11_1 from './modules/11-react-internals/11.1-virtual-dom-precisely.js'
import lesson11_2 from './modules/11-react-internals/11.2-fiber-tracks-state.js'
import lesson11_3 from './modules/11-react-internals/11.3-reconciliation-diffing.js'
import lesson11_4 from './modules/11-react-internals/11.4-batching-concurrent.js'

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
  '5.1': lesson5_1,
  '5.2': lesson5_2,
  '5.3': lesson5_3,
  '5.4': lesson5_4,
  '6.1': lesson6_1,
  '6.2': lesson6_2,
  '6.3': lesson6_3,
  '7.1': lesson7_1,
  '7.2': lesson7_2,
  '8.1': lesson8_1,
  '8.2': lesson8_2,
  '9.1': lesson9_1,
  '9.2': lesson9_2,
  '9.3': lesson9_3,
  '10.1': lesson10_1,
  '10.2': lesson10_2,
  '10.3': lesson10_3,
  '11.1': lesson11_1,
  '11.2': lesson11_2,
  '11.3': lesson11_3,
  '11.4': lesson11_4,
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
