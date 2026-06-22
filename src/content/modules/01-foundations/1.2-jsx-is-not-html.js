export default {
  id: "1.2",
  moduleId: "1",
  title: "JSX Is Not HTML",
  prerequisites: ["1.1"],
  estimatedMinutes: 15,

  coreQuestion: "What is JSX actually, mechanically?",

  beforeProblem: `writing UI trees with raw function calls (\`createElement('div', {}, createElement('h1', ...))\`) is unreadable at scale.`,

  analogy: {
    text: `**JSX is sugar, like a recipe card vs. the actual cooking instructions written out in full sentences.** The recipe card (JSX) is shorthand for a longer, more mechanical process (function calls) happening underneath.`,
    breaksDownWhere: `a recipe card is just for humans; JSX shorthand is *compiled* into real executable code (via Babel) — it's not just stylistic, it has a literal 1:1 transformation.`,
    references: [],
  },

  explanation: {
    what: `JSX is syntax that compiles to \`React.createElement(type, props, children)\` calls.`,
    how: `a build tool (Babel/esbuild) transforms JSX into plain JS before it ever reaches the browser.`,
    when: `always, in practice — but understanding the compiled output matters for debugging weird errors (e.g. "why can't I return two elements" → because a function can only return one value, not "two JSX tags")`,
  },

  checkpoints: [
    {
      id: "1.2-checkpoint-1",
      type: "live-code",
      prompt: "Write a React component that returns a simple JSX structure: a wrapping `div` containing an `h1` with the text 'Welcome' and a `p` with the text 'Learning JSX'. Let Babel transform this JSX syntax into nested createElement calls automatically.",
      starterCode: `import React from 'react';

export default function WelcomeCard() {
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      {/* Render an h1 element saying 'Welcome' and a p element saying 'Learning JSX' below it */}
      
    </div>
  );
}`,
      solutionCode: `import React from 'react';

export default function WelcomeCard() {
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      {/* Render an h1 element saying 'Welcome' and a p element saying 'Learning JSX' below it */}
      <h1>Welcome</h1>
      <p>Learning JSX</p>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"JSX is a templating language with its own rules."`,
    reality: `It's not — it's JS, so \`{}\` always means "drop into real JavaScript."`,
  },

  glossaryTerms: [],
};
