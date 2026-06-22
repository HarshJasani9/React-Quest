export default {
  id: "6.1",
  moduleId: "6",
  title: "The Prop-Drilling Problem",
  prerequisites: ["5.4", "4.3"],
  estimatedMinutes: 10,

  coreQuestion: "What happens when deeply nested components need data from far up the tree?",

  beforeProblem: `passing a prop through five layers of components that don't themselves use it, just to get it to a sixth layer that does, is repetitive, fragile (renaming/refactoring touches every layer), and pollutes intermediate components with props they don't care about.`,

  analogy: {
    text: `**A bucket brigade passing water by hand down a long line of people, versus a single hose connected directly to the source.** Every person in the brigade who doesn't actually need water still has to handle the bucket just to pass it on.`,
    breaksDownWhere: `in a bucket brigade, everyone is doing the same physical task; intermediate React components might have completely unrelated jobs, making the "pollution" worse than the analogy suggests — they're forced into a "data plumbing" role unrelated to what they actually do.`,
    references: [],
  },

  explanation: {
    what: `prop drilling is passing a prop through components that don't use it, only to reach one that does, repeated across many tree levels.`,
    how: `this lesson is descriptive, not corrective — the fix (Context) is next.`,
    when: `this is a problem to recognize, not a technique to apply — the skill is noticing when prop drilling has become painful enough to warrant Context.`,
  },

  checkpoints: [
    {
      id: "6.1-checkpoint-1",
      type: "live-code",
      prompt: "Observe how the `theme` prop is threaded down from `App` -> `MiddleComponent` -> `DeepComponent` -> `ThemeBox` even though the middle component doesn't use it. Modify the theme prop value from `'light'` to `'dark'` and notice how the state change propagates down the chain manually.",
      starterCode: `import React, { useState } from 'react';

function ThemeBox({ theme }) {
  const isDark = theme === 'dark';
  return (
    <div style={{
      padding: 'var(--space-4)',
      background: isDark ? '#333' : '#f0f0f0',
      color: isDark ? '#fff' : '#000',
      border: '1px solid var(--color-border-strong)',
      borderRadius: 'var(--radius-sm)'
    }}>
      Current Theme: <strong>{theme}</strong>
    </div>
  );
}

function DeepComponent({ theme }) {
  // DeepComponent doesn't use theme, it just passes it down
  return (
    <div style={{ padding: 'var(--space-2)' }}>
      <h4>Deep Component</h4>
      <ThemeBox theme={theme} />
    </div>
  );
}

function MiddleComponent({ theme }) {
  // MiddleComponent doesn't use theme, it just passes it down
  return (
    <div style={{ padding: 'var(--space-2)', border: '1px dashed var(--color-border)' }}>
      <h3>Middle Component</h3>
      <DeepComponent theme={theme} />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light'); // 1. Try toggling this default to 'dark'

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h2>App Root</h2>
      <button 
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        style={{
          marginBottom: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Toggle Theme
      </button>
      <MiddleComponent theme={theme} />
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

function ThemeBox({ theme }) {
  const isDark = theme === 'dark';
  return (
    <div style={{
      padding: 'var(--space-4)',
      background: isDark ? '#333' : '#f0f0f0',
      color: isDark ? '#fff' : '#000',
      border: '1px solid var(--color-border-strong)',
      borderRadius: 'var(--radius-sm)'
    }}>
      Current Theme: <strong>{theme}</strong>
    </div>
  );
}

function DeepComponent({ theme }) {
  return (
    <div style={{ padding: 'var(--space-2)' }}>
      <h4>Deep Component</h4>
      <ThemeBox theme={theme} />
    </div>
  );
}

function MiddleComponent({ theme }) {
  return (
    <div style={{ padding: 'var(--space-2)', border: '1px dashed var(--color-border)' }}>
      <h3>Middle Component</h3>
      <DeepComponent theme={theme} />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h2>App Root</h2>
      <button 
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        style={{
          marginBottom: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Toggle Theme
      </button>
      <MiddleComponent theme={theme} />
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Prop drilling is always bad and should always be avoided."`,
    reality: `It's often the *right* choice for 1–2 levels — Context has its own costs (6.3), and reaching for it immediately is a common overcorrection.`,
  },

  glossaryTerms: [],
};
