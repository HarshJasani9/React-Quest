export default {
  id: "9.3",
  moduleId: "9",
  title: "useMemo and useCallback: Keeping References Stable",
  prerequisites: ["9.2"],
  estimatedMinutes: 20,

  coreQuestion: "How do you prevent a freshly-created object, array, or function from looking \"different\" to React every render?",

  beforeProblem: `\`React.memo\`'s shallow comparison fails the moment a parent passes a new object/array/function literal as a prop — even with identical contents, a new reference is created every render, so the comparison always says "changed."`,

  analogy: {
    text: `**Two identical photocopies of the same document handed out fresh each time vs. handing someone the exact same physical sheet of paper they already have.** Even if the copies are pixel-identical, a strict "is this literally the same piece of paper" check says no. \`useMemo\`/\`useCallback\` are what let you hand back the *same physical sheet* instead of printing a fresh copy every time, as long as nothing relevant changed.`,
    breaksDownWhere: `deciding whether to "reprint" still costs something (checking the dependency array) — there's no free lunch; this is a deliberate echo back to 9.1's core lesson, not a new exception.`,
    references: [],
  },

  explanation: {
    what: `\`useMemo(fn, deps)\` caches the *result* of calling \`fn\`, only recalculating when \`deps\` change. \`useCallback(fn, deps)\` does the same but caches the *function itself* (it's really \`useMemo\` specialized for functions).`,
    how: `React stores the last result/function and the last deps array; on each render, compares new deps to old (shallow); if unchanged, returns the cached value/function instead of creating a new one.`,
    when: `pair with \`React.memo\`'d children that receive object/array/function props, or for genuinely expensive calculations — not as a default wrapper around every value or function`,
  },

  checkpoints: [
    {
      id: "9.3-checkpoint-1",
      type: "live-code",
      prompt: "The child component is memoized using `React.memo` but it still re-renders on every keystroke because the parent passes an inline function `onSelect` and an inline object `style`. Fix this by wrapping the inline handler with `useCallback` and the style object with `useMemo` so their references remain stable.",
      starterCode: `import React, { useState, useMemo, useCallback } from 'react';

const StableChild = React.memo(function StableChild({ onSelect, style }) {
  console.log('[StableChild] rendered!');
  return (
    <div style={style}>
      <button onClick={onSelect} style={{ cursor: 'pointer' }}>
        Select Child
      </button>
    </div>
  );
});

export default function App() {
  const [inputText, setInputText] = useState('');
  const [selected, setSelected] = useState(false);

  // 1. Refactor to wrap in useCallback
  const handleSelect = () => {
    setSelected(prev => !prev);
  };

  // 2. Refactor to wrap in useMemo
  const cardStyle = {
    padding: 'var(--space-4)',
    border: '2px solid var(--color-signal)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: selected ? 'var(--color-signal-subtle)' : '#fff',
    marginTop: 'var(--space-4)',
    textAlign: 'center'
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Stable References</h3>
      <input 
        type="text" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type here to re-render parent..."
        style={{ padding: '4px var(--space-2)', width: '100%' }}
      />
      <p style={{ marginTop: 'var(--space-2)' }}>
        Selected state: <strong>{selected ? 'ACTIVE' : 'INACTIVE'}</strong>
      </p>
      
      {/* Passing references down */}
      <StableChild onSelect={handleSelect} style={cardStyle} />
    </div>
  );
}`,
      solutionCode: `import React, { useState, useMemo, useCallback } from 'react';

const StableChild = React.memo(function StableChild({ onSelect, style }) {
  console.log('[StableChild] rendered!');
  return (
    <div style={style}>
      <button onClick={onSelect} style={{ cursor: 'pointer' }}>
        Select Child
      </button>
    </div>
  );
});

export default function App() {
  const [inputText, setInputText] = useState('');
  const [selected, setSelected] = useState(false);

  // 1. Refactor to wrap in useCallback
  const handleSelect = useCallback(() => {
    setSelected(prev => !prev);
  }, []);

  // 2. Refactor to wrap in useMemo
  const cardStyle = useMemo(() => ({
    padding: 'var(--space-4)',
    border: '2px solid var(--color-signal)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: selected ? 'var(--color-signal-subtle)' : '#fff',
    marginTop: 'var(--space-4)',
    textAlign: 'center'
  }), [selected]);

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Stable References</h3>
      <input 
        type="text" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type here to re-render parent..."
        style={{ padding: '4px var(--space-2)', width: '100%' }}
      />
      <p style={{ marginTop: 'var(--space-2)' }}>
        Selected state: <strong>{selected ? 'ACTIVE' : 'INACTIVE'}</strong>
      </p>
      
      {/* Passing references down */}
      <StableChild onSelect={handleSelect} style={cardStyle} />
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"useCallback prevents the function from being recreated."`,
    reality: `It still creates a new function on every render internally if deps changed — what it actually does is return the *previous* function reference when deps are unchanged, skipping the new one. The function-creation cost itself is trivial; the reference-stability is the entire point.`,
  },

  glossaryTerms: [],
};
