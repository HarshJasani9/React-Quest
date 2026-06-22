export default {
  id: "5.4",
  moduleId: "5",
  title: "Cleanup Functions",
  prerequisites: ["5.3"],
  estimatedMinutes: 15,

  coreQuestion: "What happens to things like subscriptions, timers, or event listeners when a component goes away or re-runs its effect?",

  beforeProblem: `without cleanup, every re-run of an effect (or every unmount) that sets up a subscription/timer/listener stacks another one on top — leading to memory leaks, duplicate event firing, and increasingly bizarre bugs.`,

  analogy: {
    text: `**Returning your library books before checking out new ones.** If you keep checking out new books without ever returning old ones, your pile (and your library fines — memory leaks) grows unmanageably. The cleanup function is the "return the books" step React automatically runs before setting up the next version of the effect.`,
    breaksDownWhere: `cleanup also runs when the component unmounts entirely (not just before the next effect run) — there isn't a clean single library analogy for both "before getting a new book" and "leaving the library forever," so this is called out explicitly as two distinct triggers for the same mechanism.`,
    references: [],
  },

  explanation: {
    what: `a function optionally returned from inside \`useEffect\`, run by React right before the effect runs again, and on unmount.`,
    how: `\`useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, [])\` — the returned function is the cleanup.`,
    when: `any effect that sets up something ongoing — timers, subscriptions, event listeners, open connections — needs a matching cleanup; one-off effects (like firing a single fetch) generally don't`,
  },

  checkpoints: [
    {
      id: "5.4-checkpoint-1",
      type: "live-code",
      prompt: "The component below starts an interval timer, but because it doesn't clean it up on unmount, repeated toggle mount/unmount clicks will stack multiple active intervals and spam the console! Add a cleanup return statement `return () => clearInterval(interval);` inside the effect to resolve this leak.",
      starterCode: `import React, { useState, useEffect } from 'react';

function Timer() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Tick!');
    }, 1000);

    // 1. Return a cleanup function here to clear the interval
    
  }, []);

  return <div style={{ color: 'var(--color-signal)', fontWeight: 'var(--weight-semibold)' }}>Timer Active. Check console.</div>;
}

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <button 
        onClick={() => setShow(!show)}
        style={{
          marginBottom: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-ink)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Toggle Timer Component
      </button>
      {show && <Timer />}
    </div>
  );
}`,
      solutionCode: `import React, { useState, useEffect } from 'react';

function Timer() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Tick!');
    }, 1000);

    // 1. Return a cleanup function here to clear the interval
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div style={{ color: 'var(--color-signal)', fontWeight: 'var(--weight-semibold)' }}>Timer Active. Check console.</div>;
}

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <button 
        onClick={() => setShow(!show)}
        style={{
          marginBottom: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-ink)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Toggle Timer Component
      </button>
      {show && <Timer />}
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Cleanup only matters when a component is removed from the page."`,
    reality: `It also runs between every re-run of the effect itself (whenever dependencies change) — both cases use the exact same function.`,
  },

  glossaryTerms: [],
};
