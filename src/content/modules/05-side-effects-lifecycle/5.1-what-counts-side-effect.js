export default {
  id: "5.1",
  moduleId: "5",
  title: "What Counts as a \"Side Effect\"",
  prerequisites: ["4.3"],
  estimatedMinutes: 10,

  coreQuestion: "What kinds of code don't belong directly in a component's render logic?",

  beforeProblem: `component functions are expected to be pure-ish (same input → same output, no side effects) so React can call them as needed; things like network requests, timers, subscriptions, or manual DOM manipulation break that purity if done inline.`,

  analogy: {
    text: `**A restaurant kitchen's order ticket vs. the actual cooking.** The render is the ticket — a clean, repeatable description of what's wanted. Side effects are the cooking — messy, takes time, can fail, shouldn't happen multiple times accidentally just because someone re-read the ticket.`,
    breaksDownWhere: `tickets in a kitchen are static once written; component render output legitimately changes every time it runs (that's the whole point) — the analogy is purely about *separating description from action*, not about repetition.`,
    references: [],
  },

  explanation: {
    what: `a side effect is anything that reaches "outside" the component's own rendering — network calls, subscriptions, timers, manually touching the DOM, logging to external systems.`,
    how: `not covered yet mechanically — this lesson is purely about recognizing the category before introducing the tool (\`useEffect\`, 5.2)`,
    when: `anytime a component needs to do something that isn't "calculate what JSX to return"`,
  },

  checkpoints: [
    {
      id: "5.1-checkpoint-1",
      type: "live-code",
      prompt: "Observe the side effects in the code below. We are fetching a random user inside the render body. Notice how this causes the component to constantly re-render and re-fetch in an infinite loop! Change the code to log a message on every render to see how many times it gets called.",
      starterCode: `import React, { useState } from 'react';

export default function UserFetcher() {
  const [user, setUser] = useState(null);

  // SIDE EFFECT: Fetching inside render body causes an infinite loop!
  // Every time we fetch, we call setUser which triggers a re-render, 
  // which calls fetch again.
  console.log('Rendering component...');

  fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => {
      // In a real app, setting state here directly causes the crash/loop:
      // setUser(data.results[0]);
    });

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Side Effect Observation</h3>
      <p>Check the console logs. Notice how many times it logs during render.</p>
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

export default function UserFetcher() {
  const [user, setUser] = useState(null);

  console.log('Rendering component...');

  fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => {
      // setUser(data.results[0]);
    });

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Side Effect Observation</h3>
      <p>Check the console logs. Notice how many times it logs during render.</p>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Calling fetch() directly in the component body, during render, should work fine since it's just JS."`,
    reality: `It technically runs, but causes an infinite loop of requests (every render fires a new request, which often triggers a re-render) — this exact bug is staged live in 5.2.`,
  },

  glossaryTerms: [],
};
