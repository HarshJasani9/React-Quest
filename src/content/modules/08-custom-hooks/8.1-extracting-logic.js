export default {
  id: "8.1",
  moduleId: "8",
  title: "Extracting Reusable Logic",
  prerequisites: ["7.2"],
  estimatedMinutes: 15,

  coreQuestion: "When the same stateful logic (not just UI) is needed in multiple components, how do you share it without copy-pasting?",

  beforeProblem: `copy-pasting the same \`useState\`/\`useEffect\` combination across multiple components means any bug fix or change must be repeated everywhere it was copied — a maintenance trap.`,

  analogy: {
    text: `**A custom hook is a recipe you write once and hand to anyone, vs. everyone independently re-inventing their own version of the same dish from memory.** The recipe (custom hook) encapsulates the steps; each "cook" (component) just follows it, getting consistent results, and if the recipe improves, everyone benefits at once.`,
    breaksDownWhere: `a recipe produces a finished dish that's then static; a custom hook returns *live, ongoing* state and functions that continue to update over the component's lifetime — it's less "finished dish" and more "a fully staffed kitchen station handed to you."`,
    references: [],
  },

  explanation: {
    what: `a custom hook is just a regular JavaScript function, named starting with \`use\`, that itself calls other hooks (\`useState\`, \`useEffect\`, etc.) — extracting and packaging stateful logic for reuse.`,
    how: `write a function \`useSomething()\`, move the relevant \`useState\`/\`useEffect\` calls into it, return whatever the consuming components need (values, setters, helper functions).`,
    when: `the moment the same combination of state + effect logic appears in two or more components, or even in one component where extracting it improves clarity`,
  },

  checkpoints: [
    {
      id: "8.1-checkpoint-1",
      type: "live-code",
      prompt: "Extract the toggle logic into a custom hook named `useToggle`. It should manage a boolean state `value` and return an array containing `[value, toggleFunction]`. Then, refactor the `ToggleComponent` to use your custom hook.",
      starterCode: `import React, { useState } from 'react';

// 1. Write the custom hook useToggle here
function useToggle(initialValue = false) {
  // Move useState hook here and return [value, toggleFn]
  
}

export default function ToggleComponent() {
  // 2. Refactor to consume your custom hook useToggle
  const [isOn, setIsOn] = useState(false);
  const handleToggle = () => setIsOn(prev => !prev);

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Custom Toggle Hook</h3>
      <p>State is: <strong>{isOn ? 'ON' : 'OFF'}</strong></p>
      <button 
        onClick={handleToggle}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Toggle
      </button>
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

// 1. Write the custom hook useToggle here
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(prev => !prev);
  return [value, toggle];
}

export default function ToggleComponent() {
  // 2. Refactor to consume your custom hook useToggle
  const [isOn, handleToggle] = useToggle(false);

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Custom Toggle Hook</h3>
      <p>State is: <strong>{isOn ? 'ON' : 'OFF'}</strong></p>
      <button 
        onClick={handleToggle}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Toggle
      </button>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Custom hooks share state between the components that use them, like Context does."`,
    reality: `They don't — each component calling a custom hook gets its own independent state; only the *logic* is shared, never the data itself (unless that hook internally uses Context, which is a deliberate separate choice).`,
  },

  glossaryTerms: [],
};
