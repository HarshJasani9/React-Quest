export default {
  id: "3.3",
  moduleId: "3",
  title: "Conditional Rendering",
  prerequisites: ["3.2"],
  estimatedMinutes: 15,

  coreQuestion: "How do you show/hide or swap UI based on a condition?",

  beforeProblem: `JSX has no built-in \`if\` tag (since JSX is just function calls, and you can't \`if\` inside an expression) — yet conditional UI is one of the most common needs.`,

  analogy: {
    text: `**A light switch with more than two positions — sometimes it's a simple on/off, sometimes it's a dimmer with several states.** The *mechanism* (a JS expression) is always the same; only the complexity of the condition changes.`,
    breaksDownWhere: `light switches are physical and singular; conditional rendering in JSX can branch into rendering completely different component trees, not just toggling visibility of the same one.`,
    references: [],
  },

  explanation: {
    what: `conditional rendering is just using normal JS (\`&&\`, ternaries, early returns, if/else before the return) to decide what JSX gets produced.`,
    how: `\`{condition && <Thing />}\` renders \`<Thing />\` if truthy, or the falsy value (careful: \`0\` renders as literal "0" — a classic bug) if not. Ternaries handle either/or. Early returns handle "render nothing/something else entirely."`,
    when: `ternary for simple either/or; \`&&\` for show/hide; early return for guard clauses (e.g. loading/error states) — guidance, not strict rules`,
  },

  checkpoints: [
    {
      id: "3.3-checkpoint-1",
      type: "live-code",
      prompt: "Implement conditional rendering in the component below. If `status` is `'loading'`, render `<div>Loading...</div>`. If `status` is `'error'`, render `<div>Error!</div>`. Otherwise, render the main content containing the message.",
      starterCode: `import React from 'react';

export default function StatusViewer({ status = 'success' }) {
  // 1. Write conditional checks here. Return early for 'loading' and 'error' states.
  

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
      <h3>Dashboard Loaded</h3>
      <p>Your systems are running normally.</p>
    </div>
  );
}`,
      solutionCode: `import React from 'react';

export default function StatusViewer({ status = 'success' }) {
  // 1. Write conditional checks here. Return early for 'loading' and 'error' states.
  if (status === 'loading') {
    return <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-mono)' }}>Loading...</div>;
  }
  if (status === 'error') {
    return <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-mono)', color: 'var(--color-caution)' }}>Error!</div>;
  }

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
      <h3>Dashboard Loaded</h3>
      <p>Your systems are running normally.</p>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `\`{count && <Badge/>}\` is safe.`,
    reality: `When \`count\` is \`0\`, this renders the text "0" on the page — a genuinely common real bug, shown live.`,
  },

  glossaryTerms: [],
};
