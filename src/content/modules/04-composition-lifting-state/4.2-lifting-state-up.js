export default {
  id: "4.2",
  moduleId: "4",
  title: "Lifting State Up",
  prerequisites: ["4.1", "2.1"],
  estimatedMinutes: 15,

  coreQuestion: "Two sibling components need to share/sync data — where should that state actually live?",

  beforeProblem: `if each sibling holds its own separate state, they can never agree with each other — there's no shared source of truth.`,

  analogy: {
    text: `**A shared family calendar on the fridge vs. everyone keeping their own private mental note of plans.** If everyone just remembers plans individually, conflicts and confusion are inevitable. Moving the schedule to one shared place (the parent component's state) that everyone reads from fixes it.`,
    breaksDownWhere: `a fridge calendar can be edited by anyone directly; lifted state can *only* be changed via a setter function passed down as a prop — children still can't mutate it directly (callback props, 4.3).`,
    references: [],
  },

  explanation: {
    what: `when multiple components need the same piece of data, that data's \`useState\` should live in their closest common parent, not duplicated in each child.`,
    how: `move the \`useState\` call up to the parent; pass the value down as a prop to whichever children need to *read* it, and pass a callback down to whichever children need to *change* it.`,
    when: `the moment two components need to stay in sync — this is a refactor you'll do constantly, and the instinct to recognize "this needs to move up" is one of the most valuable React skills`,
  },

  checkpoints: [
    {
      id: "4.2-checkpoint-1",
      type: "live-code",
      prompt: "Two sibling cards below currently hold their own independent state for whether they are 'active', meaning clicking one card does not affect the other. Refactor the code to lift the active state up to the parent component `App`, so that only one card can be active at a time (like an accordion or tab panel).",
      starterCode: `import React, { useState } from 'react';

function SiblingCard({ title, isActive, onSelect }) {
  return (
    <div 
      onClick={onSelect}
      style={{
        border: isActive ? '2px solid var(--color-signal)' : '1px solid var(--color-border-strong)',
        background: isActive ? 'var(--color-signal-subtle)' : '#fff',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-3)',
        cursor: 'pointer'
      }}
    >
      <h3>{title}</h3>
      <p>{isActive ? 'I am ACTIVE!' : 'Click me to activate.'}</p>
    </div>
  );
}

export default function App() {
  // 1. Declare activeId state here to keep track of the active card ID ('A' or 'B')
  const [activeId, setActiveId] = useState('A');

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h2>Accordion / Tabs Panel</h2>
      
      {/* 2. Bind isActive and onSelect handler props using activeId state */}
      <SiblingCard 
        title="Card A" 
        isActive={activeId === 'A'}
        onSelect={() => setActiveId('A')}
      />
      <SiblingCard 
        title="Card B" 
        isActive={activeId === 'B'}
        onSelect={() => setActiveId('B')}
      />
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

function SiblingCard({ title, isActive, onSelect }) {
  return (
    <div 
      onClick={onSelect}
      style={{
        border: isActive ? '2px solid var(--color-signal)' : '1px solid var(--color-border-strong)',
        background: isActive ? 'var(--color-signal-subtle)' : '#fff',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-3)',
        cursor: 'pointer'
      }}
    >
      <h3>{title}</h3>
      <p>{isActive ? 'I am ACTIVE!' : 'Click me to activate.'}</p>
    </div>
  );
}

export default function App() {
  // 1. Declare activeId state here to keep track of the active card ID ('A' or 'B')
  const [activeId, setActiveId] = useState('A');

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h2>Accordion / Tabs Panel</h2>
      
      {/* 2. Bind isActive and onSelect handler props using activeId state */}
      <SiblingCard 
        title="Card A" 
        isActive={activeId === 'A'}
        onSelect={() => setActiveId('A')}
      />
      <SiblingCard 
        title="Card B" 
        isActive={activeId === 'B'}
        onSelect={() => setActiveId('B')}
      />
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"State should live as close to where it's used as possible, always."`,
    reality: `That's the *default* heuristic, but it breaks the moment two "users" of the state aren't in a parent-child relationship — then it must move up, even if that feels like it's now "far" from one of them.`,
  },

  glossaryTerms: [],
};
