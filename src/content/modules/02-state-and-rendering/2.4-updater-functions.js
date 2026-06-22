export default {
  id: "2.4",
  moduleId: "2",
  title: "Updater Functions and Stale State",
  prerequisites: ["2.3"],
  estimatedMinutes: 15,

  coreQuestion: "Why does calling `setCount(count + 1)` twice in a row sometimes only increment once?",

  beforeProblem: `state updates are not applied instantly — they're scheduled. Code that assumes \`count\` is already updated immediately after calling \`setCount\` will read a stale value.`,

  analogy: {
    text: `**Submitting a form to change your address vs. the address actually updating in the system the instant you click submit.** There's a queue, a processing step. If you submit the form twice quickly using the value you saw *before either submission processed*, both submissions might be based on the same outdated address.`,
    breaksDownWhere: `state updates usually resolve within the same event handler's execution before the next render — it's fast, but the "old value" trap is about reading variables captured at render time, not network-style delay.`,
    references: [],
  },

  explanation: {
    what: `\`setCount(count + 1)\` uses the \`count\` value from the render that defined this function (a "snapshot"). Calling it twice in the same handler uses the same stale snapshot both times.`,
    how: `use the updater function form, \`setCount(prev => prev + 1)\`, which always receives the most current pending value, not the snapshot.`,
    when: `any time a state update depends on the previous value AND there's a chance of multiple updates batching together (rapid clicks, multiple calls in one handler)`,
  },

  checkpoints: [
    {
      id: "2.4-checkpoint-1",
      type: "live-code",
      prompt: "The button below is supposed to increment the counter by 2 on every click, but it currently only goes up by 1 because it calls `setCount(count + 1)` twice synchronously. Fix it by refactoring both state setters to use the functional updater pattern: `prev => prev + 1`.",
      starterCode: `import React, { useState } from 'react';

export default function DoubleCounter() {
  const [count, setCount] = useState(0);

  const handleDoubleIncrement = () => {
    // 1. Refactor these two lines to use the updater function style
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div style={{ padding: 'var(--space-6)', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
      <h2>Double Counter</h2>
      <p style={{ fontSize: 'var(--text-lg)' }}>Count: {count}</p>
      <button 
        onClick={handleDoubleIncrement}
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
        +2 Increment
      </button>
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

export default function DoubleCounter() {
  const [count, setCount] = useState(0);

  const handleDoubleIncrement = () => {
    // 1. Refactor these two lines to use the updater function style
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div style={{ padding: 'var(--space-6)', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
      <h2>Double Counter</h2>
      <p style={{ fontSize: 'var(--text-lg)' }}>Count: {count}</p>
      <button 
        onClick={handleDoubleIncrement}
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
        +2 Increment
      </button>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"State updates happen synchronously and immediately."`,
    reality: `They don't — this lesson is the first real introduction to React's scheduling behavior, deepened later in 11.4 (batching).`,
  },

  glossaryTerms: [],
};
