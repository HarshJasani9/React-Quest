export default {
  id: "7.2",
  moduleId: "7",
  title: "Refs Don't Trigger Re-renders — And Why That Matters",
  prerequisites: ["7.1"],
  estimatedMinutes: 15,

  coreQuestion: "What goes wrong if you try to use a ref to display something on screen?",

  beforeProblem: `it's tempting to use \`useRef\` to "avoid re-renders" for performance, including for values that ARE displayed — this breaks the UI silently, since the screen won't update even though the underlying value did.`,

  analogy: {
    text: `continuing the sticky-note analogy from 7.1 — if you wrote the room's current temperature on a sticky note instead of the whiteboard, the room's display panel (the rendered UI) would never show the updated temperature, because the display panel only watches the whiteboard.`,
    breaksDownWhere: `n/a (direct continuation, no new breakdown introduced)`,
    references: [],
  },

  explanation: {
    what: `updating \`ref.current\` never causes a re-render — if a ref's value is shown in JSX, that JSX will show a stale value until *something else* causes a re-render.`,
    how: `there's no "how" to fix this other than the existing tools — if a value needs to be displayed, it belongs in \`useState\`, not \`useRef\`.`,
    when: `this is a boundary-recognition lesson — knowing instantly "this value is displayed, so it can't be a ref" is the actual skill`,
  },

  checkpoints: [
    {
      id: "7.2-checkpoint-1",
      type: "live-code",
      prompt: "This counter currently uses `useRef` to store the click count. Notice how clicking the button prints the updated ref value to the console, but the display on the screen stays at `0`! Refactor the component to use `useState` instead of `useRef` so that click changes are rendered on screen.",
      starterCode: `import React, { useRef } from 'react';

export default function BrokenRefCounter() {
  // 1. Refactor this clickCount to use useState instead of useRef
  const clickCountRef = useRef(0);

  const handleClick = () => {
    clickCountRef.current++;
    console.log('Ref updated:', clickCountRef.current);
  };

  return (
    <div style={{ padding: 'var(--space-6)', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
      <h3>Click Counter</h3>
      {/* 2. Update this to reference state instead of clickCountRef.current */}
      <p style={{ fontSize: 'var(--text-lg)' }}>Clicks: {clickCountRef.current}</p>
      <button 
        onClick={handleClick}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Click Me
      </button>
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

export default function BrokenRefCounter() {
  // 1. Refactor this clickCount to use useState instead of useRef
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(c => c + 1);
    console.log('State updated:', clickCount + 1);
  };

  return (
    <div style={{ padding: 'var(--space-6)', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
      <h3>Click Counter</h3>
      {/* 2. Update this to reference state instead of clickCountRef.current */}
      <p style={{ fontSize: 'var(--text-lg)' }}>Clicks: {clickCount}</p>
      <button 
        onClick={handleClick}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Click Me
      </button>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"I'll use a ref here to avoid unnecessary re-renders since I read that re-renders are slow."`,
    reality: `Premature optimization that breaks correctness — Module 9 teaches the *real*, correct tools for render performance.`,
  },

  glossaryTerms: [],
};
