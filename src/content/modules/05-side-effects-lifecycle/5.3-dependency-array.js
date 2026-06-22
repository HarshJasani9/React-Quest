export default {
  id: "5.3",
  moduleId: "5",
  title: "The Dependency Array",
  prerequisites: ["5.2"],
  estimatedMinutes: 15,

  coreQuestion: "How do you control exactly when an effect re-runs?",

  beforeProblem: `an effect with no dependency array runs after every single render, which is rarely what's wanted, and is expensive/buggy for things like network requests.`,

  analogy: {
    text: `**A guest list for a recurring alarm: "only ring this alarm again if one of these specific people's status changed."** The dependency array is that named guest list — React checks only those specific named values; if none changed since last render, the alarm (effect) doesn't ring again.`,
    breaksDownWhere: `the comparison React does is shallow reference equality, not "did anything meaningful change" — an object or array recreated fresh every render (even with identical contents) will always count as "changed," a sharp edge that causes real bugs (foreshadows \`useMemo\`/\`useCallback\`, Module 9).`,
    references: [],
  },

  explanation: {
    what: `the second argument to \`useEffect\` is an array of values; the effect only re-runs if at least one of those values differs from the previous render.`,
    how: `\`[]\` (empty array) means "no dependencies, so never re-run after the first time." Omitting the array entirely means "always re-run." Listing values means "re-run only if any of these changed."`,
    when: `always include every reactive value the effect actually uses (the "exhaustive deps" rule) — skipping this to "make a bug go away" creates a worse, harder-to-find bug (stale closures, related to 2.4)`,
  },

  checkpoints: [
    {
      id: "5.3-checkpoint-1",
      type: "live-code",
      prompt: "The code below currently logs 'API Fetched' on every single render. Add an empty dependency array `[]` as the second argument to `useEffect` so that the effect runs only once when the component mounts.",
      starterCode: `import React, { useState, useEffect } from 'react';

export default function UserFetcher() {
  const [renders, setRenders] = useState(0);

  useEffect(() => {
    console.log('API Fetched (should only run once on mount)');
  }); // 1. Add dependency array here

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Dependency Array</h3>
      <p>Render count: {renders}</p>
      <button onClick={() => setRenders(r => r + 1)}>Force Re-render</button>
    </div>
  );
}`,
      solutionCode: `import React, { useState, useEffect } from 'react';

export default function UserFetcher() {
  const [renders, setRenders] = useState(0);

  useEffect(() => {
    console.log('API Fetched (should only run once on mount)');
  }, []); // 1. Add dependency array here

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Dependency Array</h3>
      <p>Render count: {renders}</p>
      <button onClick={() => setRenders(r => r + 1)}>Force Re-render</button>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Leaving the dependency array empty is the 'safe default' to avoid extra runs."`,
    reality: `It's not safe — it silently causes the effect to use stale values from the very first render forever (a real, common, hard-to-spot bug).`,
  },

  glossaryTerms: [],
};
