# Build Log

## Phase 0 — 2026-06-22
- Status: complete
- Exit criteria check: Verified that the Vite + React app is successfully bootstrapped, all dependencies from the tech stack are installed, the folder structure is perfectly matched to Architecture §8, `variables.css` implements all Design System tokens, and `index.html` loads the required fonts. Verified the shell successfully builds (`npm run build`), including the Phase 0 `PlaceholderPage` confirming styles and fonts.
- Notes: `create-vite` CLI failed with non-empty directory error, so the project was scaffolded manually (writing `package.json`, `vite.config.js`, and `index.html` manually before `npm install`). 

## Phase 1 — 2026-06-22
- Status: complete
- Exit criteria check: Built `CodeSandbox` with `CodeMirror`, `useBabelTransform` (debounced `@babel/standalone`), and `SandboxPreviewRoot` (execution via scoped `new Function`). Verified it correctly transforms, isolates, catches syntax/runtime errors via `SandboxErrorBoundary`, and supports "Reset to starter code". Tested specifically with the 2.1 counter example and the 3.2 broken-keys example from the Curriculum Spec.
- Notes: Conducted the infinite-loop spike test. Decided to rely on try/catch + React's internal render cap rather than Web Worker isolation.

## Phase 2 — 2026-06-22
- Status: complete
- Exit criteria check: Verified that `contentRegistry.js` aggregates module index metadata and registers Lesson 2.1 data. Implemented `LessonView.jsx` with a responsive two-column layout on desktop. Built `AnalogyBlock.jsx` with a physical index card aesthetic, deterministic rotation based on the lesson ID, and a dashed divider for the breakdown sub-section. Built `MisconceptionCallout.jsx` styled as a quiet corrective block with a left border accent. Built `ExplanationBlock.jsx` to render markdown-formatted What/How/When sections. Wired up routing for `/lesson/:id` and a root landing page. Confirmed that lesson 2.1 is fully playable, rendering the analogy card, explanation, live code sandbox editor, and misconception callout correctly.
- Notes: Lesson 2.1 content was transcribed exactly from the Curriculum Spec without alteration.

## Phase 3 — 2026-06-22
- Status: complete
- Exit criteria check: Built `storageService.js` supporting async read/write operations to localStorage, with support for schema versioning. Built `ProgressContext.jsx` with a custom `useReducer` to manage progress, including custom action helpers `completeLesson`, `completeChallenge`, and `resetProgress`. Implemented `isUnlocked` logic that correctly locks/unlocks lessons based on their prerequisites. Created `CurriculumMap.jsx` featuring a vertical path layout styled with locked, unlocked, and completed lesson nodes, alongside a progress dashboard. Confirmed that completing Lesson 2.1 in the browser updates the state, persists to localStorage (surviving browser reload), and correctly unlocks the subsequent lesson (Lesson 2.2) on the Curriculum Map.
- Notes: Implemented a developer fallback in `isUnlocked` that automatically unlocks lessons if their prerequisites are not yet authored in the system, preventing blocked curriculum flows during intermediate development phases.

## Phase 4 — 2026-06-22
- Status: complete
- Exit criteria check: Authored all 13 lessons in Modules 1–4 from `docs/02-Curriculum-Spec.md` (Module 1: 1.1–1.4, Module 2: 2.1–2.4, Module 3: 3.1–3.3, Module 4: 4.1–4.3) and registered them in `contentRegistry.js`. Completed the playthrough QA pass across all 13 lessons, validating that:
  - The lesson page displays the correct analogy card, explanations, and misconception callout.
  - The interactive checkpoints load and execute user edits correctly.
  - Resetting to starter code restores the editor safely.
  - Completing checkpoints unlocks subsequent lessons correctly on the Curriculum Map.
  - State updates are persisted and survive browser reloads.
- Notes: Conducted play-through testing:
  - *Checkpoint 1.1* (Why React Exists): Designed as an observation-only checkpoint, letting the learner view how React manages updates automatically compared to vanilla JS. Clicking complete behaves correctly.
  - *Checkpoint 3.2* (Keys): Successfully replicates the index-as-key input binding bug. When text is entered into inputs and items are prepended, the values incorrectly float, which is resolved instantly when switching the key prop to `item.id`.

## Phase 5 — 2026-06-22
- Status: complete
- Exit criteria check: Authored and registered all 14 lessons in Modules 5–9 (Module 5: 5.1–5.4, Module 6: 6.1–6.3, Module 7: 7.1–7.2, Module 8: 8.1–8.2, Module 9: 9.1–9.3) in `contentRegistry.js`. Completed the playthrough QA pass across all 14 lessons, validating that:
  - The lesson page renders correctly with the physical index card aesthetic for analogy cards, What/How/When explanation blocks, and misconception callouts.
  - Interactive checkpoints load, run correctly, and reset to starter code.
  - Progress updates, unlocks subsequent lessons, and persists on page reload.
  - The React.Profiler HUD overlay in the sandbox preview displays render duration (ms), phase (mount/update), and render counts without triggering infinite loops.
- Notes: Corrected template string escaping errors in `5.3`, `5.4`, `6.2`, and `7.1` to ensure correct syntax parsing under Vite/Rollup.

## Phase 6 — 2026-06-22
- Status: complete
- Exit criteria check: Authored and registered all 3 lessons in Module 10 (10.1: useReducer, 10.2: Compound Components, 10.3: Render Props) in `contentRegistry.js`. Completed the playthrough QA pass across all 3 lessons, validating that:
  - The lesson page renders correctly.
  - Interactive checkpoints load, run correctly, and reset to starter code.
  - The content-driven layout override successfully increases the sandbox editor height to `600px` on lessons `10.2` and `10.3`, providing a cleaner workspace for dense code structures.
  - Progress updates and unlocks subsequent lessons on the Curriculum Map.

## Phase 7 — 2026-06-22
- Status: complete
- Exit criteria check: Authored and registered all 4 lessons in Module 11 (11.1: Virtual DOM, 11.2: Fiber, 11.3: Reconciliation, 11.4: Concurrent Rendering) in `contentRegistry.js`. Built and integrated 4 custom visualizers:
  - `VirtualDomInspector` (11.1): Evaluates component JSX on initial render with mocked hooks to avoid execution errors, rendering it as a formatted HTML tag tree and raw JSON object.
  - `FiberTreeVisualization` (11.2): SVG interactive graph displaying Fiber node details (return, sibling, child links) and hooks linked lists. Includes a step-by-step walk animation highlighting node reuse vs recreation.
  - `ReconciliationDiffVisualization` (11.3): Sandbox stacked above an interactive diff simulator that details DOM recycling and state persistence rules.
  - `ConcurrentRenderingVisualization` (11.4): Sandbox stacked above an air traffic control timeline simulating synchronous blocking thread blocks vs concurrent rendering time-slicing.
- Notes: Evaluated lesson lengths and logical grouping during playthrough QA; confirmed that the 4 lessons flow naturally and do not need to be split.

## Phase 8 — 2026-06-22
- Status: complete
- Exit criteria check: Verified that lesson 12.1 (Recognizing Patterns in Real Code) is authored, registered, and successfully builds under production bundle settings. Checked that all 36 lessons across 12 modules can be completed in chronological order without locks, deadlocks, or cycle loops.
- Sourced Components:
  - `useClickAway` hook: Sourced from `streamich/react-use` (useClickAway.ts).
  - `ImageWithFallback` component: Sourced from patterns in `react-image-fallback` (by dariuszkuc).
- Misconception & Bug Details:
  - Sourced the diagnostic exercise from a stale closure misconception in Lesson 5.3 (The Dependency Array) and Lesson 2.4 (Updater Functions) combined with a missing cleanup bug in Lesson 5.4 (Cleanup Functions).
  - The `AutoSaveBadge` component failed to count past 1 (due to `setSeconds(seconds + 1)` enclosing over the initial render state inside `setInterval` without adding `seconds` to the dependency array or using an updater) and leaked memory intervals on toggle unmount.
  - Successfully validated that fixing it using the functional updater `setSeconds(prev => prev + 1)` and returning `() => clearInterval(interval)` solves the bugs.
- Play-through QA results: Completed a simulated full play-through of all 12 modules (36 lessons) sequentially. Verified lock/unlock mechanics, lesson progression, and build reliability.

## Deviations & Decisions

- [Phase 1 / Sandbox]: Infinite Loop Protection Isolation → Decided to rely on try/catch + React's internal "Too many re-renders" limit rather than Web Worker isolation. → Reasoning: While a literal synchronous `while(true)` will freeze the browser tab, it is exceptionally rare compared to an infinite *re-render* (e.g. `setState` during render, or missing `useEffect` dependency array), which React already limits natively and throws an error that our ErrorBoundary cleanly catches. A Web Worker cannot render DOM elements without complex message passing or virtual DOM synchronization. Given the target audience is a single learner running known lesson snippets rather than untrusted public execution, the complexity of Web Worker DOM isolation outweighs the minor risk of a tab freeze for literal `while(true)` mistakes.
- [Phase 3 / Unlock System]: Unauthored Prerequisite Fallback → Added a dynamic check in `isUnlocked` that treats prerequisites not registered in the system as completed. → Reasoning: Since curriculum modules are built out in phases (e.g. Module 2 before Module 1 was fully populated), strict prerequisite validation would keep later modules locked. Bypassing locks for unauthored lessons lets the user play through later lessons without being blocked by development sequencing. Once a lesson is registered, lock enforcement naturally takes effect.
- [Phase 5 / Sandbox]: React.Profiler HUD Rendering → Decided to update the Profiler HUD overlay synchronously via direct DOM manipulation (mutating a DOM ref inner text) rather than triggering React state updates in the sandbox shell. → Reasoning: Triggering a React state change (e.g., `setRenderStats(...)`) inside `React.Profiler`'s `onRender` callback causes the sandbox shell component to re-render, which in turn causes the Profiler to fire again, leading to a synchronous infinite loop. Mutating the inner DOM element directly bypasses React's render cycle completely while displaying the correct stats live in the preview pane.
- [Phase 6 / Sandbox]: Content-Driven Sandbox Height Override → Added a `height` prop to `CodeSandbox` (defaulting to `'400px'`) and wired it to `lesson.sandboxHeight` in `LessonView.jsx`. → Reasoning: Lesson `10.2` and `10.3` checkpoints have denser, multi-component starter/solution codes. Increasing the editor height dynamically to `600px` for these lessons prevents scrolling fatigue and keeps the editor and preview side-by-side cleanly without breaking the global layout.
- [Phase 7 / Sandbox]: Integrated Virtual DOM Inspector → Integrated `VirtualDomInspector` inside `CodeSandbox` as a custom rendering mode toggleable via `inspectVirtualDom` prop. → Reasoning: Reusing the existing code editor, compilation pipeline, syntax error feedback, and reset button simplifies code inspection and avoids copy-pasting editor boilerplate.
- [Phase 7 / Visualizers]: Fiber, Reconciliation, and Concurrent Rendering Diagrams → Implemented interactive visualizers directly in the sandbox column: `FiberTreeVisualization` (rendered in place of the editor on `11.2`), `ReconciliationDiffVisualization` (stacked below `11.3` editor), and `ConcurrentRenderingVisualization` (stacked below `11.4` editor). → Reasoning: Providing visual timelines, interactive diff scenarios, and step-by-step tree walk animations helps clarify these highly abstract internals topics in a way that code alone cannot.

## Final QA Pass — Findings

- **[content-drift]** (Lesson 6.2): The `coreQuestion` field in `6.2-context-direct-line.js` was slightly paraphrased compared to the curriculum specification.
  - Spec: `Core question: How do you pass data down a deep tree without mentioning it in every intermediate component?`
  - Rendered: `How can a deeply nested component read a value without every component in between passing it explicitly?`
  - *Resolution*: Corrected the file `6.2-context-direct-line.js` to match the spec sentence exactly.
- **[design-mismatch]** (Sandbox Layout): The CodeSandbox editor and preview are hardcoded in a two-column grid using inline styles. It does not stack vertically on narrow viewports, violating the responsive layout requirements (Design System §6).
  - *Resolution*: Created `codeSandbox.css` to manage responsive layout coordinates. Stacks elements vertically on screen sizes smaller than `768px` and ensures appropriate scroll/display heights.
- **[design-mismatch]** (Accessibility): CodeSandbox runtime error boundaries do not use `role="alert"` or `aria-live="assertive"` to announce execution errors to screen readers (Design System §6).
  - *Resolution*: Added `role="alert"` and `aria-live="assertive"` to the syntax error box in `CodeSandbox.jsx` and the runtime execution error box in `SandboxPreviewRoot.jsx`.
- **[design-mismatch]** (Voice & Writing): Sandbox error box displays the header "Execution Error:" instead of the Voice & Writing spec's prescribed phrase "This code threw an error while running:" (Design System §7).
  - *Resolution*: Replaced headers with the exact Voice & Writing copy `"This code threw an error while running:"`.
- **[unclear-explanation]** (Visualizers): In Lesson 11.2 (FiberTreeVisualization), the walk animation shows fiber node state transitions but does not visually represent the dual-tree architecture ("current" vs "work-in-progress" alternate fiber trees), which might feel slightly abstract for complete beginners trying to understand the alternate pointer.
  - *Resolution*: Updated the SVG tree render to draw Work-in-Progress (WIP) alternate fiber nodes directly next to the current fiber nodes, linked via a dashed alternate line. The alternate nodes and labels (`WIP`, `reused`, `recreated`, etc.) light up in real time as the traversal animation walks the tree, making the dual-tree architecture fully concrete.

## Final Deliverables — 2026-06-28
- **Status**: Complete
- **Tasks**:
  1. Created a comprehensive root-level `README.md` with product vision, key features, technology stack, folder structure, getting started instructions, development commands, curriculum verification command, and design system color tokens.
  2. Designed and created a custom SVG favicon (`public/favicon.svg`) that represents the ReactQuest identity: a rounded tile matching the warm paper theme (`#FAF7F0`), containing the signal-green React atom orbits (`#2D6A4F`) and a central red-and-slate compass rose (`#9A3B26` / `#3D4451`) to highlight the "Quest" metaphor.
  3. Updated `index.html` to reference the new `/favicon.svg` favicon.
  4. Verified that the production build completes successfully (`npm run build`).
  5. Implemented a Fullscreen (Zen) Mode toggle for the `CodeSandbox` editor to allow learners to expand their coding workspace to a full-viewport layout with split editor and preview, including body scroll locking and Escape key navigation.
  6. Resolved the layout scroll preservation bug by implementing systematic scroll-to-top restoration on lesson transitions for both individual column scroll containers and the global window.
  7. Designed and built **Interactive Concept Checks**: Created [quizRegistry.js](file:///h:/ALL_Projects/ReactLearner/src/content/quizRegistry.js) and [ConceptCheck.jsx](file:///h:/ALL_Projects/ReactLearner/src/features/lesson-view/ConceptCheck.jsx) to test user understanding of analogies and React mechanics, rendering inline before footer navigation.
  8. Created a **Solution Reference Tab** inside [CodeSandbox.jsx](file:///h:/ALL_Projects/ReactLearner/src/features/code-sandbox/CodeSandbox.jsx): If a checkpoint has a solution, learners can toggle between 'My Code' (editable) and 'Solution' (read-only reference) for easy code comparison.
  9. Upgraded the **Profiler HUD** in [SandboxPreviewRoot.jsx](file:///h:/ALL_Projects/ReactLearner/src/features/code-sandbox/SandboxPreviewRoot.jsx) to include a dynamic rolling render timeline showing render duration and phase color-coding for instant performance visualization.
  10. Made the lesson header navbar (`.lesson-header`) sticky at the top of the viewport to ensure navigation elements remain accessible at all times, especially when scrolling through long lesson texts on mobile.
  11. Updated [README.md](file:///h:/ALL_Projects/ReactLearner/README.md) to add details on the client-side `localStorage` progress tracking, confirming that it persists indefinitely (never expires) and can be resumed at any time, with notes on incognito limits and backup export/reset operations.
  12. Fixed mobile viewport layout bugs: reduced text spacing and button padding, configured lesson titles to truncate cleanly without breaking the header grid, turned off card rotations to stop horizontal clipping, and refactored footer navigation to use a stacked full-width layout (`.lesson-footer-nav`) on screens smaller than 520px.
  13. Performed additional mobile UI polish: optimized the **Curriculum Map** timeline nodes and progress dashboard to stack vertically on narrow devices (preventing title-button overlap), refactored the **CodeSandbox Header** (extracting style rules to [codeSandbox.css](file:///h:/ALL_Projects/ReactLearner/src/features/code-sandbox/codeSandbox.css) and scaling down buttons to prevent overflow), and refactored the **Reconciliation Diff Visualizer** columns to stack vertically on small mobile viewports.
  14. Created the GitHub Actions CI build workflow inside [.github/workflows/ci.yml](file:///h:/ALL_Projects/ReactLearner/.github/workflows/ci.yml) to validate pushed commits and pull requests, installing dependencies with `npm ci`, caching npm dependencies, compiling the React+Vite bundle, and uploading the `dist/` directory as an artifact.
  15. Modified the CI build workflow to check for the existence of a `lint` script in `package.json` dynamically using `jq` and, if found, run `npm run lint` prior to the production build stage.
  16. Created [Dockerfile](file:///h:/ALL_Projects/ReactLearner/Dockerfile) and [.dockerignore](file:///h:/ALL_Projects/ReactLearner/.dockerignore) for local development containerization, and updated [vite.config.js](file:///h:/ALL_Projects/ReactLearner/vite.config.js) to configure host listening (`0.0.0.0`) and polling watch queries, ensuring hot module reloading operates reliably across Windows-to-Linux container boundary mounts.
  17. Created [docker-compose.yml](file:///h:/ALL_Projects/ReactLearner/docker-compose.yml) to orchestrate multi-container orchestration for local development, defining the `frontend` service (with source mounting and anonymous node_modules volume) and a placeholder `backend` API service to model network composition and start-up ordering.
  18. Upgraded the Docker Compose configuration to add named node modules volume (`frontend_node_modules`) to avoid file system leaks, environment variable fallbacks (like port mapping variables `VITE_PORT` and `PORT`), container-level health checks using `wget` and `netcat`, long-form `depends_on` wait conditions (`service_healthy`), and an isolated `validator` service running on a `tools` profile.
  19. Integrated Docker with GitHub Actions inside [.github/workflows/ci.yml](file:///h:/ALL_Projects/ReactLearner/.github/workflows/ci.yml) by adding a concurrent `docker-build` job that checks out the codebase, sets up Buildx caching, and runs `docker compose build` to verify both the frontend web app and developer tools images compile successfully (failing the workflow run if any compilation errors occur).
  20. Updated [README.md](file:///h:/ALL_Projects/ReactLearner/README.md) to add a **Containerization & CI/CD** section detailing Docker dev container commands (`docker compose up`, `docker compose build`), hot-reloading configurations, tools profile usage, and GitHub Actions workflow specifications.
















