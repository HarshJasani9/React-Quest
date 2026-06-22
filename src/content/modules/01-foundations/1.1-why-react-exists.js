export default {
  id: "1.1",
  moduleId: "1",
  title: "Why React Exists",
  prerequisites: [],
  estimatedMinutes: 10,

  coreQuestion: "What problem does React solve that vanilla JS doesn't?",

  beforeProblem: `in vanilla JS, when data changes, *you* must remember every place the DOM needs updating, and do it manually, in the right order, every time. As apps grow, this becomes unmanageable — UI and data quietly drift out of sync.`,

  analogy: {
    text: `**A spreadsheet with formulas vs. a spreadsheet with hardcoded numbers.** If cell C1 = A1+B1 (a formula), changing A1 automatically updates C1. If C1 is just typed in as a number, you must remember to retype it every time A1 changes — and you will eventually forget. React lets you write UI as "formulas" of your data (\`UI = f(state)\`), not hand-typed values.`,
    breaksDownWhere: `spreadsheets recalculate the whole sheet trivially because cells are cheap; React must be smart about *what* to recalculate (the DOM is expensive to touch) — this is the seed for later lessons on rendering and reconciliation.`,
    references: [],
  },

  explanation: {
    what: `React is a library for building UI as a function of state. You describe *what* the UI should look like for any given state, not the steps to get there.`,
    how: `not yet (this lesson is purely conceptual — mechanics start in Module 2)`,
    when: `anywhere UI needs to reflect changing data reliably — not just web; React Native uses the same model`,
  },

  checkpoints: [
    {
      id: "1.1-checkpoint-1",
      type: "live-code",
      prompt: "Observe this React counter component. Notice how we write a function `Counter` that describes the UI based on `count`, and React takes care of rendering it. Try changing the text inside the button from 'Increment' to 'Click Me' to see it update, and click it!",
      starterCode: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: 'var(--space-6)', 
      textAlign: 'center', 
      fontFamily: 'var(--font-body)' 
    }}>
      <h2>React Spreadsheet Metaphor</h2>
      <p style={{ fontSize: 'var(--text-lg)', margin: 'var(--space-4) 0' }}>
        Count cell: <strong>{count}</strong>
      </p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ 
          padding: 'var(--space-2) var(--space-4)', 
          background: 'var(--color-signal)', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 'var(--radius-sm)', 
          fontWeight: 'var(--weight-semibold)',
          cursor: 'pointer' 
        }}
      >
        Increment
      </button>
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: 'var(--space-6)', 
      textAlign: 'center', 
      fontFamily: 'var(--font-body)' 
    }}>
      <h2>React Spreadsheet Metaphor</h2>
      <p style={{ fontSize: 'var(--text-lg)', margin: 'var(--space-4) 0' }}>
        Count cell: <strong>{count}</strong>
      </p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ 
          padding: 'var(--space-2) var(--space-4)', 
          background: 'var(--color-signal)', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 'var(--radius-sm)', 
          fontWeight: 'var(--weight-semibold)',
          cursor: 'pointer' 
        }}
      >
        Increment
      </button>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"React is just a templating engine like Handlebars."`,
    reality: `It's not — it's a re-render-on-change model, not a one-time string substitution.`,
  },

  glossaryTerms: ["state"],
};
