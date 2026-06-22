import React from 'react'
import CodeSandbox from '../../features/code-sandbox/CodeSandbox.jsx'

const example2_1 = `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>2.1 Counter Example</h2>
      <p>Current count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ padding: '8px 16px', background: '#2D6A4F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Increment
      </button>
    </div>
  );
}`

const example3_2 = `import React, { useState } from 'react';

export default function BrokenKeysList() {
  const [items, setItems] = useState([
    { id: 'a', text: 'Item A' },
    { id: 'b', text: 'Item B' }
  ]);

  const addItemToFront = () => {
    const newItem = { id: Date.now().toString(), text: \`New Item \${items.length + 1}\` };
    setItems([newItem, ...items]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>3.2 Broken Keys Example</h2>
      <button onClick={addItemToFront} style={{ marginBottom: '10px', padding: '8px', cursor: 'pointer' }}>
        Add Item to Front
      </button>
      
      {/* 
        Intentionally using index as key to demonstrate the bug.
        Type something in the input, then click "Add Item to Front".
        Notice how the typed text jumps to the wrong row!
      */}
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <span>{item.text} </span>
          <input type="text" placeholder="Type here..." style={{ marginLeft: '10px' }} />
        </div>
      ))}
    </div>
  );
}`

const exampleInfinite = `import React, { useState } from 'react';

export default function InfiniteLoop() {
  const [count, setCount] = useState(0);
  
  // This causes an infinite re-render, caught by React's internal limit!
  setCount(count + 1);

  return <div>{count}</div>;
}`

export default function PlaceholderPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
        padding: 'var(--space-8)',
        background: 'var(--color-canvas)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>Phase 1: Code Sandbox Tests</h1>
        <p>Testing CodeMirror + Babel Standalone + Error Boundaries</p>
      </div>

      <section>
        <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>Test 1: 2.1 Counter</h3>
        <CodeSandbox starterCode={example2_1} />
      </section>

      <section style={{ marginTop: 'var(--space-8)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>Test 2: 3.2 Broken Keys</h3>
        <CodeSandbox starterCode={example3_2} />
      </section>

      <section style={{ marginTop: 'var(--space-8)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>Test 3: Infinite Re-render Spike</h3>
        <CodeSandbox starterCode={exampleInfinite} />
      </section>
    </main>
  )
}
