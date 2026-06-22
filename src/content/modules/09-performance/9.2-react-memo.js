export default {
  id: "9.2",
  moduleId: "9",
  title: "React.memo: Skipping Re-renders for Unchanged Props",
  prerequisites: ["9.1"],
  estimatedMinutes: 20,

  coreQuestion: "How do you stop a child component from re-rendering when its props haven't actually changed?",

  beforeProblem: `by default, when a parent re-renders, all its children re-render too, even if a specific child's props are identical to last time — wasteful if that child is expensive to render.`,

  analogy: {
    text: `**A bouncer checking IDs before letting someone redo an already-completed task.** \`React.memo\` wraps a component with a bouncer that checks "have your props actually changed since last time?" — if not, it turns the re-render away and reuses the previous result.`,
    breaksDownWhere: `the bouncer's check itself takes a small amount of time/memory — for cheap components, the cost of checking can exceed the cost of just re-rendering anyway, which is why 9.1's "measure first" matters here specifically.`,
    references: [],
  },

  explanation: {
    what: `\`React.memo(Component)\` returns a version of \`Component\` that skips re-rendering if its props are shallow-equal to the previous render's props.`,
    how: `wraps the component; on each parent re-render, compares new props to old props by reference (shallow); if equal, reuses the last render result instead of calling the component function again.`,
    when: `components that are genuinely expensive to render AND receive the same props often relative to their parent's re-render frequency — confirmed via profiling, not assumed`,
  },

  checkpoints: [
    {
      id: "9.2-checkpoint-1",
      type: "live-code",
      prompt: "The `ExpensiveChild` component takes a long time to run (artificially slowed). Currently, typing in the parent input field triggers re-renders of the parent, which wastes CPU re-rendering `ExpensiveChild` every keystroke! Wrap `ExpensiveChild` in `React.memo` so that it only re-renders when its prop `text` changes.",
      starterCode: `import React, { useState } from 'react';

// 1. Wrap this component in React.memo
function ExpensiveChild({ text }) {
  console.log('[ExpensiveChild] Render started...');
  const start = performance.now();
  // Artificial CPU load block
  while (performance.now() - start < 100) {}
  console.log('[ExpensiveChild] Render completed.');

  return (
    <div style={{
      marginTop: 'var(--space-4)',
      padding: 'var(--space-4)',
      background: '#fff',
      border: '1px solid var(--color-border)'
    }}>
      Child Prop Text: <strong>{text}</strong>
    </div>
  );
}

export default function App() {
  const [parentInput, setParentInput] = useState('');
  const [childText, setChildText] = useState('Default Child Text');

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Memoization Demo</h3>
      <div>
        <label>Parent Input: </label>
        <input 
          type="text" 
          value={parentInput}
          onChange={(e) => setParentInput(e.target.value)}
          style={{ padding: '4px var(--space-2)' }}
        />
      </div>
      <button 
        onClick={() => setChildText('Updated Child Text ' + Date.now())}
        style={{
          marginTop: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Update Child Prop
      </button>
      <ExpensiveChild text={childText} />
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

// 1. Wrap this component in React.memo
const ExpensiveChild = React.memo(function ExpensiveChild({ text }) {
  console.log('[ExpensiveChild] Render started...');
  const start = performance.now();
  // Artificial CPU load block
  while (performance.now() - start < 100) {}
  console.log('[ExpensiveChild] Render completed.');

  return (
    <div style={{
      marginTop: 'var(--space-4)',
      padding: 'var(--space-4)',
      background: '#fff',
      border: '1px solid var(--color-border)'
    }}>
      Child Prop Text: <strong>{text}</strong>
    </div>
  );
});

export default function App() {
  const [parentInput, setParentInput] = useState('');
  const [childText, setChildText] = useState('Default Child Text');

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Memoization Demo</h3>
      <div>
        <label>Parent Input: </label>
        <input 
          type="text" 
          value={parentInput}
          onChange={(e) => setParentInput(e.target.value)}
          style={{ padding: '4px var(--space-2)' }}
        />
      </div>
      <button 
        onClick={() => setChildText('Updated Child Text ' + Date.now())}
        style={{
          marginTop: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Update Child Prop
      </button>
      <ExpensiveChild text={childText} />
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Wrapping a component in React.memo guarantees it won't re-render unless I want it to."`,
    reality: `It only helps if props are reference-stable — passing a new object/function literal each render defeats it completely, which is exactly why useMemo/useCallback exist.`,
  },

  glossaryTerms: [],
};
