export default {
  id: "6.2",
  moduleId: "6",
  title: "Context: A Direct Line",
  prerequisites: ["6.1"],
  estimatedMinutes: 15,

  coreQuestion: "How do you pass data down a deep tree without mentioning it in every intermediate component?",

  beforeProblem: `see 6.1.`,

  analogy: {
    text: `**A building-wide announcement system vs. passing a note person-to-person down the hallway.** Anyone in any room can tune into the announcement directly, without anyone in between handling it.`,
    breaksDownWhere: `an announcement system broadcasts to everyone simultaneously; Context only delivers to components that explicitly "tune in" via \`useContext\` — the rest of the tree is unaffected and doesn't even know it exists.`,
    references: [],
  },

  explanation: {
    what: `Context provides a value at one point in the tree (a Provider) that any descendant can read directly (via \`useContext\`), regardless of depth.`,
    how: `\`createContext()\` makes a Context object; wrapping a tree in \`<MyContext.Provider value={...}>\` makes that value available; any descendant calls \`useContext(MyContext)\` to read it.`,
    when: `values genuinely needed by many components at varying depths — theme, current user, locale. Not a general-purpose state management replacement (6.3).`,
  },

  checkpoints: [
    {
      id: "6.2-checkpoint-1",
      type: "live-code",
      prompt: "Refactor the prop-drilling example below to use Context. Create a `ThemeContext` using `React.createContext()`. Wrap the tree in `<ThemeContext.Provider value={theme}>`, and read the theme in `ThemeBox` using `React.useContext(ThemeContext)` so that `MiddleComponent` and `DeepComponent` no longer need to pass the prop.",
      starterCode: `import React, { useState } from 'react';

// 1. Create ThemeContext here using React.createContext
const ThemeContext = null;

function ThemeBox() {
  // 2. Consume the context here using React.useContext
  const theme = 'light';
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

function DeepComponent() {
  // Notice: no theme prop passed through here
  return (
    <div style={{ padding: 'var(--space-2)' }}>
      <h4>Deep Component</h4>
      <ThemeBox />
    </div>
  );
}

function MiddleComponent() {
  // Notice: no theme prop passed through here
  return (
    <div style={{ padding: 'var(--space-2)', border: '1px dashed var(--color-border)' }}>
      <h3>Middle Component</h3>
      <DeepComponent />
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

      {/* 3. Wrap MiddleComponent in ThemeContext.Provider */}
      <MiddleComponent />
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

// 1. Create ThemeContext here using React.createContext
const ThemeContext = React.createContext('light');

function ThemeBox() {
  // 2. Consume the context here using React.useContext
  const theme = React.useContext(ThemeContext);
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

function DeepComponent() {
  return (
    <div style={{ padding: 'var(--space-2)' }}>
      <h4>Deep Component</h4>
      <ThemeBox />
    </div>
  );
}

function MiddleComponent() {
  return (
    <div style={{ padding: 'var(--space-2)', border: '1px dashed var(--color-border)' }}>
      <h3>Middle Component</h3>
      <DeepComponent />
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

      {/* 3. Wrap MiddleComponent in ThemeContext.Provider */}
      <ThemeContext.Provider value={theme}>
        <MiddleComponent />
      </ThemeContext.Provider>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Context replaces the need for useState entirely."`,
    reality: `It doesn't — Context is a *transport* mechanism for a value; the value still usually originates from useState (or a reducer) somewhere, typically right alongside the Provider.`,
  },

  glossaryTerms: [],
};
