export default {
  id: "2.1",
  moduleId: "2",
  title: "State: Data That Causes Re-renders",
  prerequisites: ["1.4"],
  estimatedMinutes: 15,

  coreQuestion: 'How does a component "remember" something and have the UI update when it changes?',

  beforeProblem: `a plain JS variable inside a function is reset every time the function runs again — it can't hold memory across renders, and even if it could, changing it wouldn't tell React to re-render.`,

  analogy: {
    text: `**A whiteboard with a magic rule: any time you write on it, the room automatically refreshes its lighting to match what's written.** A plain variable is like writing on a piece of paper that gets thrown away and a fresh blank one handed to you next time — \`useState\` is the whiteboard that persists, *and* triggers the "room refresh" (re-render) when written to.`,
    breaksDownWhere: `the "rewrite" must go through the official marker (the setter function, e.g. \`setCount\`) — writing on the whiteboard with any other pen (directly mutating a variable) does NOT trigger the refresh. This is critical and is its own misconception callout below.`,
    references: [],
  },

  explanation: {
    what: `\`useState\` gives a component a piece of persistent data plus a setter function; calling the setter schedules a re-render with the new value.`,
    how: `React stores state outside the function itself (conceptually, tied to that component's "slot" in the tree — this is deliberately left informal here and revisited precisely in the Internals module, 11.2, once Fiber is introduced), so it survives across calls. Calling the setter tells React "this component's output may now be different — call it again."`,
    when: `any value that changes over time AND affects what's rendered. If it doesn't affect rendering, it probably doesn't belong in \`useState\` (foreshadows refs, Module 7).`,
  },

  checkpoints: [
    {
      id: "2.1-checkpoint-1",
      type: "live-code",
      prompt: "Build a counter with `useState`. The component should render the current count and a button. When the button is clicked, the count should increment. Observe how React persists the count state across renders, and updates the display automatically.",
      starterCode: `import React, { useState } from 'react';

export default function Counter() {
  // 1. Declare state variable 'count' and setter 'setCount' using useState, starting at 0
  

  // 2. Implement the handleIncrement function
  const handleIncrement = () => {
    // Increment the count here
  };

  return (
    <div style={{ 
      padding: 'var(--space-6)', 
      textAlign: 'center',
      fontFamily: 'var(--font-body)'
    }}>
      <h2>Count: 0</h2>
      <button 
        style={{
          marginTop: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-body)',
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
  // 1. Declare state variable 'count' and setter 'setCount' using useState, starting at 0
  const [count, setCount] = useState(0);

  // 2. Implement the handleIncrement function
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ 
      padding: 'var(--space-6)', 
      textAlign: 'center',
      fontFamily: 'var(--font-body)'
    }}>
      <h2>Count: {count}</h2>
      <button 
        onClick={handleIncrement}
        style={{
          marginTop: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-body)',
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
    claim: `Mutating state directly (\`state.value = x\`) and calling \`setState(state)\` should work since the data changed.`,
    reality: `It won't reliably — React compares references, not deep equality, by default. This seeds the immutability requirement, hammered hard in Module 3.`,
  },

  glossaryTerms: ["state", "re-render", "useState"],
};
