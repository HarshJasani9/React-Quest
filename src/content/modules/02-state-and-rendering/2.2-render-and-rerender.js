export default {
  id: "2.2",
  moduleId: "2",
  title: "Render and Re-render: What Actually Happens",
  prerequisites: ["2.1"],
  estimatedMinutes: 20,

  coreQuestion: "When state changes, what *exactly* happens — does the whole page reload? Re-run? What?",

  beforeProblem: `without a mental model of render vs. re-render, debugging "why isn't my UI updating" or "why is this so slow" is guesswork.`,

  analogy: {
    text: `**A photographer taking a new photo of the same room after something moved, not repainting the room.** "Render" = call the component function, get a description (a JSX/element tree) of what the UI should look like *right now*. React then compares this new photo to the last one and updates only what's different on the real page.`,
    breaksDownWhere: `a photo is a passive snapshot; the render *also* triggers all the logic in the component function to run again (so any non-state work inside it re-executes too) — this is why "why is this expensive computation running every keystroke" becomes a real and common problem (motivates \`useMemo\` in Module 9).`,
    references: [],
  },

  explanation: {
    what: `rendering = calling the component function and getting back a new element tree. Re-rendering happens after state/prop changes.`,
    how: `React calls the function, gets the new tree, diffs it against the previous tree (reconciliation, deep-dived in Module 11), and applies only the necessary changes to the real DOM.`,
    when: `this isn't something you "use" — it's something that always happens; the skill is recognizing it (e.g. with React DevTools' render highlighting) and knowing when it's a problem (Module 9)`,
  },

  checkpoints: [
    {
      id: "2.2-checkpoint-1",
      type: "live-code",
      prompt: "This code renders a list of log messages whenever the parent re-renders. Open the browser dev tools console (or inspect preview logs) to see that the `Child` component function re-runs completely when the parent's button is clicked. Add a console log inside the `Sibling` component function and verify that it re-runs too!",
      starterCode: `import React, { useState } from 'react';

function Child() {
  console.log('[Child] rendered');
  return <div style={{ marginTop: 'var(--space-2)' }}>I am the Child.</div>;
}

function Sibling() {
  // Add a console.log here to track Sibling renders
  
  return <div style={{ marginTop: 'var(--space-2)' }}>I am the Sibling.</div>;
}

export default function Parent() {
  const [toggle, setToggle] = useState(false);
  console.log('[Parent] rendered');

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <button 
        onClick={() => setToggle(!toggle)}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Trigger Parent Re-render (Toggle: {toggle ? 'ON' : 'OFF'})
      </button>
      <Child />
      <Sibling />
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

function Child() {
  console.log('[Child] rendered');
  return <div style={{ marginTop: 'var(--space-2)' }}>I am the Child.</div>;
}

function Sibling() {
  // Add a console.log here to track Sibling renders
  console.log('[Sibling] rendered');
  return <div style={{ marginTop: 'var(--space-2)' }}>I am the Sibling.</div>;
}

export default function Parent() {
  const [toggle, setToggle] = useState(false);
  console.log('[Parent] rendered');

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <button 
        onClick={() => setToggle(!toggle)}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Trigger Parent Re-render (Toggle: {toggle ? 'ON' : 'OFF'})
      </button>
      <Child />
      <Sibling />
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Re-render means the whole page/DOM is rebuilt."`,
    reality: `It does not — only the parts of the real DOM that actually differ are touched.`,
  },

  glossaryTerms: ["re-render"],
};
