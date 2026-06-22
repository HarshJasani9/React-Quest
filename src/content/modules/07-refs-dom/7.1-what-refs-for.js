export default {
  id: "7.1",
  moduleId: "7",
  title: "What Refs Are For",
  prerequisites: ["6.3"],
  estimatedMinutes: 15,

  coreQuestion: "How do you reference an actual DOM node, or hold a value that changes without causing a re-render?",

  beforeProblem: `state causes re-renders whenever it changes — but sometimes you need to track or store something (a timer ID, a previous value, a direct DOM node reference) where a re-render is unnecessary or actively wrong.`,

  analogy: {
    text: `**A sticky note on your monitor vs. writing something on the whiteboard from lesson 2.1.** The whiteboard (state) triggers a "room refresh" every time it changes. The sticky note (ref) just quietly holds information for your own reference — nobody re-arranges the room because you updated a sticky note.`,
    breaksDownWhere: `refs aren't just for casual scratch notes — one of their primary real uses is holding an actual reference to a DOM element (for focusing an input, measuring its size, etc.), which has no equivalent in the sticky-note analogy at all; this is called out as a second, distinct use case.`,
    references: [],
  },

  explanation: {
    what: `\`useRef\` returns a mutable object (\`{ current: ... }\`) that persists across renders but does NOT trigger a re-render when changed.`,
    how: `\`const ref = useRef(initialValue);\` read/write via \`ref.current;\` when attached to a JSX element (\`<input ref={ref} />\`), \`ref.current\` becomes that actual DOM node after render.`,
    when: `storing a value that shouldn't cause re-renders (timer IDs, previous values), or directly accessing/imperatively controlling a DOM node (focus, scroll, measuring) — both are legitimate but distinct use cases`,
  },

  checkpoints: [
    {
      id: "7.1-checkpoint-1",
      type: "live-code",
      prompt: "Create a ref named `inputRef` using `useRef(null)`. Attach it to the `<input>` element using `ref={inputRef}`. Then implement the button's click handler to focus the input field imperatively via `inputRef.current.focus()`.",
      starterCode: `import React, { useRef } from 'react';

export default function InputFocus() {
  // 1. Declare inputRef here
  const inputRef = null;

  const handleFocusClick = () => {
    // 2. Focus the input element imperatively using the ref
    
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Input Focus Controller</h3>
      <input 
        type="text" 
        placeholder="Click button to focus me..."
        style={{
          padding: 'var(--space-2)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-sm)',
          width: '100%',
          marginBottom: 'var(--space-4)'
        }}
      />
      <button 
        onClick={handleFocusClick}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Focus Input
      </button>
    </div>
  );
}`,
      solutionCode: `import React, { useRef } from 'react';

export default function InputFocus() {
  // 1. Declare inputRef here
  const inputRef = useRef(null);

  const handleFocusClick = () => {
    // 2. Focus the input element imperatively using the ref
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Input Focus Controller</h3>
      <input 
        ref={inputRef}
        type="text" 
        placeholder="Click button to focus me..."
        style={{
          padding: 'var(--space-2)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-sm)',
          width: '100%',
          marginBottom: 'var(--space-4)'
        }}
      />
      <button 
        onClick={handleFocusClick}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Focus Input
      </button>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Refs are just a worse version of state."`,
    reality: `They serve a fundamentally different purpose — refs are for things explicitly *outside* the render-triggering system, not a shortcut around useState.`,
  },

  glossaryTerms: [],
};
