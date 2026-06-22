export default {
  id: "1.4",
  moduleId: "1",
  title: "Props: Passing Data Down",
  prerequisites: ["1.3"],
  estimatedMinutes: 15,

  coreQuestion: "How does a parent give data to a child component?",

  beforeProblem: `without props, every component would need to hardcode its own data — zero reuse.`,

  analogy: {
    text: `**Function arguments, literally.** \`<Greeting name="Sam" />\` is exactly like calling \`Greeting({ name: "Sam" })\`. Props are not a new concept — they're argument-passing wearing an HTML-attribute costume.`,
    breaksDownWhere: `props are always passed as a single object (not positional args like normal function calls), and they're read-only — a component must never modify its own props (this is foreshadowing for 2.1 on state).`,
    references: [],
  },

  explanation: {
    what: `props are the mechanism for parent → child data flow. One-directional.`,
    how: `JSX attributes become keys on a single props object passed to the component function.`,
    when: `any data a component needs but doesn't own/originate itself`,
  },

  checkpoints: [
    {
      id: "1.4-checkpoint-1",
      type: "live-code",
      prompt: "Refactor the `Greeting` component to check if the `mood` prop is `'excited'`. If it is, render the greeting ending in three exclamation points (`!!!`), otherwise render it ending in a period (`.`).",
      starterCode: `import React from 'react';

function Greeting(props) {
  // Refactor this to conditionally render exclamation marks or a period based on props.mood
  return (
    <h3>Hello, {props.name}!</h3>
  );
}

export default function App() {
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <Greeting name="Alice" mood="excited" />
      <Greeting name="Bob" mood="calm" />
    </div>
  );
}`,
      solutionCode: `import React from 'react';

function Greeting(props) {
  // Refactor this to conditionally render exclamation marks or a period based on props.mood
  if (props.mood === 'excited') {
    return <h3>Hello, {props.name}!!!</h3>;
  }
  return <h3>Hello, {props.name}.</h3>;
}

export default function App() {
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <Greeting name="Alice" mood="excited" />
      <Greeting name="Bob" mood="calm" />
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Props can be changed by the child to update the parent."`,
    reality: `They cannot — this is one-way data flow, and the attempt to "fix" this incorrectly is *exactly* what motivates lifting state up (Module 4).`,
  },

  glossaryTerms: [],
};
