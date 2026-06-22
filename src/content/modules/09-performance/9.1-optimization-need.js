export default {
  id: "9.1",
  moduleId: "9",
  title: "Why Most Apps Don't Need Performance Optimization Yet",
  prerequisites: ["8.2"],
  estimatedMinutes: 10,

  coreQuestion: "When does render performance actually become a real problem worth solving?",

  beforeProblem: `performance tools (\`useMemo\`, \`useCallback\`, \`React.memo\`) are powerful but commonly misused defensively/everywhere "just in case," adding code complexity for zero measurable benefit, and sometimes making things *slower* due to the comparison overhead itself.`,

  analogy: {
    text: `**Wearing a helmet to walk across a quiet living room.** Helmets (memoization) have a real cost and purpose — but applying that protection everywhere, regardless of actual risk, adds friction without benefit, and over-protecting can be its own kind of clumsy.`,
    breaksDownWhere: `a helmet's cost is mostly just inconvenience; unnecessary memoization has a real, measurable runtime and memory cost (the comparison check itself isn't free) — it can occasionally make things slower, not just unnecessarily cautious.`,
    references: [],
  },

  explanation: {
    what: `this lesson sets the philosophy for the entire module — measure before optimizing.`,
    how: `use React DevTools' Profiler to actually observe what's re-rendering and how long it takes, before reaching for any fix.`,
    when: `optimize when there's a *measured, felt* problem (visible lag, profiler-confirmed expensive re-renders) — not preemptively`,
  },

  checkpoints: [
    {
      id: "9.1-checkpoint-1",
      type: "live-code",
      prompt: "This is a play-around dashboard displaying rendering performance metrics. Look at the Profiler HUD on the top right of the Preview pane. Notice the Render Time in milliseconds. Click the 'Force Update' button to trigger re-renders. Since this component takes less than 1ms to render, optimizing it is completely unnecessary!",
      starterCode: `import React, { useState } from 'react';

export default function FastDashboard() {
  const [renders, setRenders] = useState(0);

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
      <h3>Performance Dashboard</h3>
      <p style={{ color: 'var(--color-signal)' }}>
        Render time is measured automatically by the live sandbox Profiler HUD.
      </p>
      <p style={{ margin: 'var(--space-4) 0' }}>Re-render count: {renders}</p>
      <button 
        onClick={() => setRenders(r => r + 1)}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-ink)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Force Update
      </button>
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

export default function FastDashboard() {
  const [renders, setRenders] = useState(0);

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
      <h3>Performance Dashboard</h3>
      <p style={{ color: 'var(--color-signal)' }}>
        Render time is measured automatically by the live sandbox Profiler HUD.
      </p>
      <p style={{ margin: 'var(--space-4) 0' }}>Re-render count: {renders}</p>
      <button 
        onClick={() => setRenders(r => r + 1)}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-ink)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Force Update
      </button>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Senior React developers wrap everything in useMemo/useCallback by default."`,
    reality: `Most don't — overuse is a recognized anti-pattern, not a sign of expertise.`,
  },

  glossaryTerms: [],
};
