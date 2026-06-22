export default {
  id: "11.4",
  moduleId: "11",
  title: "Batching and Concurrent Rendering",
  prerequisites: ["11.3"],
  estimatedMinutes: 25,
  sandboxHeight: "600px",

  coreQuestion: "How does React decide when to actually apply pending updates, and how can it do this without blocking the browser?",

  beforeProblem: `2.4 showed that state updates aren't immediate — they're batched. But *why*, and how far does this go? Modern React goes further: it can interrupt, pause, and prioritize rendering work itself, not just batch state updates.`,

  analogy: {
    text: `**An air traffic controller who doesn't act on every individual radio call the instant it comes in, but groups related instructions together, and who can also bump a more urgent landing ahead of a routine one already in progress.** Batching = grouping several radio calls (state updates) into one coordinated action. Concurrent rendering = the controller being able to *pause* a lower-priority plane's instructions mid-sequence to handle a higher-priority one, then resume.`,
    breaksDownWhere: `an air traffic controller's \"pause and resume\" happens between discrete calls; React's concurrent rendering can interrupt mid-render of a single component tree, at a granularity governed by the fiber-as-unit-of-work structure from 11.2 — that fine-grained interruptibility has no clean physical analogy and is precisely *why* Fiber (an architecture built around interruptible units of work) had to be built before concurrent features were possible at all.`,
    references: [],
  },

  explanation: {
    what: `batching groups multiple state updates within an event handler into a single re-render. Concurrent rendering goes further: React can mark some updates as lower priority (e.g. a large list re-filtering) and interrupt that work if something more urgent (e.g. a keystroke) comes in, without throwing away all the in-progress work.`,
    how: `batching is largely automatic in modern React across event handlers, promises, and timeouts. Concurrent features (like useTransition, marking updates as non-urgent) let you explicitly tell React \"this update can be deprioritized if something more important comes in.\"`,
    when: `batching: always happening, mostly invisible. Concurrent APIs: deliberately reached for when a specific interaction (typing, dragging) feels janky because of unrelated expensive re-renders competing for the same render work`,
  },

  checkpoints: [
    {
      id: "11.4-checkpoint-1",
      type: "concurrent-visualizer",
      prompt: "The list search below is artificially slowed. Typing in the search field triggers a state update that filters the list, which blocks the main thread and makes the input feel unresponsive! Fix this lag by wrapping the filtering update inside React's `startTransition` helper, allowing high-priority typing events to interrupt the lower-priority list updates.",
      starterCode: `import React, { useState, startTransition } from 'react';

// Artificially slow item list
function SlowList({ query }) {
  if (!query) return null;
  const start = performance.now();
  // Simulate slow rendering work (150ms block)
  while (performance.now() - start < 150) {}

  return (
    <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-2)', border: '1px solid var(--color-border)' }}>
      Results for: <strong>{query}</strong>
    </div>
  );
}

export default function App() {
  const [inputVal, setInputVal] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setInputVal(val);

    // 1. Refactor this state update to use startTransition
    setSearchQuery(val);
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Search Filter</h3>
      <input 
        type="text" 
        value={inputVal} 
        onChange={handleChange} 
        placeholder="Type to search (feels laggy)..."
        style={{ padding: 'var(--space-2)', width: '100%' }}
      />
      <SlowList query={searchQuery} />
    </div>
  );
}`,
      solutionCode: `import React, { useState, startTransition } from 'react';

// Artificially slow item list
function SlowList({ query }) {
  if (!query) return null;
  const start = performance.now();
  // Simulate slow rendering work (150ms block)
  while (performance.now() - start < 150) {}

  return (
    <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-2)', border: '1px solid var(--color-border)' }}>
      Results for: <strong>{query}</strong>
    </div>
  );
}

export default function App() {
  const [inputVal, setInputVal] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setInputVal(val);

    // 1. Refactor this state update to use startTransition
    startTransition(() => {
      setSearchQuery(val);
    });
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Search Filter</h3>
      <input 
        type="text" 
        value={inputVal} 
        onChange={handleChange} 
        placeholder="Type to search (feels responsive)..."
        style={{ padding: 'var(--space-2)', width: '100%' }}
      />
      <SlowList query={searchQuery} />
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"React renders are always synchronous and block the browser until done — that's just 'how JS works.'"`,
    reality: `Modern React specifically does NOT have to work this way anymore; this entire lesson (and the Fiber architecture it depends on) exists to break that exact assumption.`,
  },

  glossaryTerms: [],
};
