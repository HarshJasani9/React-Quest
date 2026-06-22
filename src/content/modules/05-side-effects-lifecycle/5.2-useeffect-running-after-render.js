export default {
  id: "5.2",
  moduleId: "5",
  title: "useEffect: Running Code After Render",
  prerequisites: ["5.1"],
  estimatedMinutes: 15,

  coreQuestion: "How do you run side-effect code at the right time, without it running uncontrollably?",

  beforeProblem: `side effects called directly during render run every single render, with no control over timing or repetition — leading to infinite loops, duplicate requests, or effects running before the DOM is even ready.`,

  analogy: {
    text: `**A "do this after the room is set up" instruction, not "do this while arranging the furniture."** \`useEffect\` code runs *after* React has finished updating the real DOM for this render — like waiting for the room to be fully arranged before turning on the music, rather than blasting music while still moving furniture around.`,
    breaksDownWhere: `the "room setup" (render + DOM update) always fully completes before any effect runs — but multiple effects in the same component, or in parent vs. child, have a specific, learnable order (children's effects run before parents') which the analogy doesn't capture; that ordering is covered when it becomes practically relevant, not memorized upfront.`,
    references: [],
  },

  explanation: {
    what: `\`useEffect(fn)\` registers \`fn\` to run after the DOM has been updated for this render.`,
    how: `React renders, updates the real DOM, then runs effect functions whose dependencies indicate they should run.`,
    when: `data fetching, subscriptions, manually syncing with non-React systems, timers — anything that needs to happen as a *reaction* to a render, not as part of computing what to render`,
  },

  checkpoints: [
    {
      id: "5.2-checkpoint-1",
      type: "live-code",
      prompt: "Move the fetch side effect out of the render body and into a `useEffect` hook. Notice that this schedules the fetch to run after rendering, but without dependencies, it still runs on every single render (which we will fix in the next lesson!).",
      starterCode: `import React, { useState, useEffect } from 'react';

export default function UserList() {
  const [renders, setRenders] = useState(0);

  // 1. Move this console.log and state increment inside useEffect to stop the infinite loop
  console.log('Fetching data...');

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>useEffect Basics</h3>
      <p>Render count tracked: {renders}</p>
      <button onClick={() => setRenders(r => r + 1)}>Force Re-render</button>
    </div>
  );
}`,
      solutionCode: `import React, { useState, useEffect } from 'react';

export default function UserList() {
  const [renders, setRenders] = useState(0);

  // 1. Move this console.log and state increment inside useEffect to stop the infinite loop
  useEffect(() => {
    console.log('Fetching data...');
  });

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>useEffect Basics</h3>
      <p>Render count tracked: {renders}</p>
      <button onClick={() => setRenders(r => r + 1)}>Force Re-render</button>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Adding useEffect automatically prevents it from running too often."`,
    reality: `It doesn't, by itself — that's entirely controlled by the dependency array, taught next.`,
  },

  glossaryTerms: ["useEffect"],
};
