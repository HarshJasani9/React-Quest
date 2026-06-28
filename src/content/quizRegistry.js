/**
 * ReactQuest — Quiz Registry
 * Maps lesson IDs to conceptual verification questions based on analogies and mechanics.
 */
export const quizzes = {
  "1.1": [
    {
      question: "In the physical mailroom analogy, what represents a DOM update in vanilla JavaScript?",
      options: [
        "Replacing the entire mailroom sorting desk manually for every single letter.",
        "A helper boy delivering letters automatically.",
        "A mailbox sorting rack that re-arranges itself dynamically."
      ],
      answerIndex: 0,
      explanation: "Vanilla JS is imperative: you must manually tear down and recreate elements to update the screen, just like tearing down the whole mailroom desk to sort a letter."
    }
  ],
  "1.2": [
    {
      question: "What is JSX under the hood before React renders it?",
      options: [
        "Plain HTML code sent directly to the browser.",
        "Nested JavaScript function calls (React.createElement) that return plain JS objects.",
        "A binary compiled file format."
      ],
      answerIndex: 1,
      explanation: "JSX is a syntactic sugar. Babel compiles it into `React.createElement` calls, which return plain virtual DOM objects describing the UI."
    }
  ],
  "2.1": [
    {
      question: "If useState is a persistent whiteboard, what does mutating a local variable (e.g. `count = 5`) represent?",
      options: [
        "Writing on a scrap of paper that gets thrown in the trash on the next render.",
        "Scribbling on the wall with permanent marker.",
        "Updating the whiteboard with a dry-erase marker."
      ],
      answerIndex: 0,
      explanation: "Local variables are recreated from scratch on every render cycle. Direct mutation doesn't persist, nor does it notify React to update the page."
    },
    {
      question: "Why does directly mutating state (e.g., `state.value = 10`) fail to update the UI?",
      options: [
        "React locks the state object against modifications.",
        "React doesn't know anything changed because the setter function was never called to trigger a re-render.",
        "State can only be mutated inside useEffect."
      ],
      answerIndex: 1,
      explanation: "React triggers updates reactively. It depends on you calling the state setter function to schedule a re-render. Direct mutations bypass this notification system."
    }
  ],
  "2.2": [
    {
      question: "In the drawing whiteboard analogy, what is a 're-render'?",
      options: [
        "Erasing and re-drawing the entire frame from scratch based on the current state.",
        "Updating only the single pixel that changed.",
        "Replacing the whiteboard with a sheet of paper."
      ],
      answerIndex: 0,
      explanation: "React components are declarative functions. A render is simply calling the component function again to describe the entire UI based on current props and state."
    }
  ],
  "3.2": [
    {
      question: "In the catalog card analogy, why does using the index as a key cause issues when items are re-ordered or prepended?",
      options: [
        "Indices are not unique inside an array.",
        "The catalog card number stays attached to the slot (0, 1, 2) rather than the item, confusing React into reusing incorrect state.",
        "React requires keys to be strings, not numbers."
      ],
      answerIndex: 1,
      explanation: "If you use index, the key is tied to the position. If you prepend an item, React thinks position 0 is the same component as before, mapping the old input/state to the new item."
    }
  ],
  "5.3": [
    {
      question: "What is a 'stale closure' in a useEffect hook?",
      options: [
        "A callback that captures old variables because they were not listed in the dependency array.",
        "An effect that runs too many times.",
        "A component that does not unmount."
      ],
      answerIndex: 0,
      explanation: "JavaScript functions enclose variables in scope. If you don't list dependencies, React won't recreate the effect function, so it retains references to outdated state/props."
    }
  ],
  "6.1": [
    {
      question: "In the direct-line radio transmission analogy, what is the main purpose of React Context?",
      options: [
        "To broadcast data globally so any component can tune in directly without passing props.",
        "To speed up state updates.",
        "To replace useState completely."
      ],
      answerIndex: 0,
      explanation: "Context broadcasts data to a subtree, allowing descendant components to read it directly and avoiding 'prop drilling' down through intermediate nodes."
    }
  ],
  "11.2": [
    {
      question: "What are the two trees React maintains in the Fiber architecture?",
      options: [
        "The Current tree (on screen) and the Work-in-Progress tree (under construction).",
        "The Virtual DOM tree and the Real DOM tree.",
        "The Render tree and the Layout tree."
      ],
      answerIndex: 0,
      explanation: "React uses a double-buffering strategy: it keeps the 'Current' tree for what's active, while building modifications in the 'Work-in-Progress' (WIP) tree."
    }
  ]
}
