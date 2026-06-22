export default {
  id: "1.3",
  moduleId: "1",
  title: "Components Are Just Functions",
  prerequisites: ["1.2"],
  estimatedMinutes: 15,

  coreQuestion: "What makes a function a \"component\"?",

  beforeProblem: `without a unit of reuse, every part of a UI is one giant tangle — no boundaries, no reuse, no way to reason about a piece in isolation.`,

  analogy: {
    text: `**LEGO bricks vs. a single molded plastic toy.** A molded toy can't be rearranged or reused. A LEGO brick is a small, well-defined unit that snaps into larger structures, and the same brick design is reused everywhere.`,
    breaksDownWhere: `LEGO bricks are static and identical every time; components can render *differently* depending on the props they're given — they're more like a brick mold that can stamp out slightly different bricks based on input.`,
    references: [],
  },

  explanation: {
    what: `a component is a function that returns JSX (describing UI), named with a capital letter by convention so React (and JSX) can distinguish it from a regular HTML tag.`,
    how: `when JSX sees \`<MyComponent />\`, it calls \`MyComponent()\` as a function and uses its return value as that part of the tree.`,
    when: `any time a piece of UI is reused, or is complex enough to deserve its own name and boundary — not a hard rule, a judgment call refined with practice`,
  },

  checkpoints: [
    {
      id: "1.3-checkpoint-1",
      type: "live-code",
      prompt: "Build a `Greeting` component that takes a `props` parameter and returns an `h3` element rendering `'Hello, ' + props.name + '!'`. Then inside the main `App` component, render `<Greeting name=\"Alice\" />`, `<Greeting name=\"Bob\" />`, and `<Greeting name=\"Charlie\" />`.",
      starterCode: `import React from 'react';

// 1. Define the Greeting component function here (make sure it starts with a capital G)


export default function App() {
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      {/* 2. Render Greeting three times with name props: "Alice", "Bob", and "Charlie" */}
      
    </div>
  );
}`,
      solutionCode: `import React from 'react';

// 1. Define the Greeting component function here (make sure it starts with a capital G)
function Greeting(props) {
  return <h3>Hello, {props.name}!</h3>;
}

export default function App() {
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      {/* 2. Render Greeting three times with name props: "Alice", "Bob", and "Charlie" */}
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Greeting name="Charlie" />
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Components are a special React-only construct with magic behavior."`,
    reality: `They're plain functions; the magic is entirely in how React *calls* them, not in the function itself.`,
  },

  glossaryTerms: [],
};
