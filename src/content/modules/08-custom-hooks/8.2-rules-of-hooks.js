export default {
  id: "8.2",
  moduleId: "8",
  title: "Rules of Hooks (and Why They Exist)",
  prerequisites: ["8.1"],
  estimatedMinutes: 15,

  coreQuestion: "Why can't hooks be called conditionally or inside loops?",

  beforeProblem: `hooks rely on being called in the *exact same order* every single render so React can correctly match each hook call to its persisted data slot — conditional calls break that order, causing state to attach to the wrong hook.`,

  analogy: {
    text: `**A numbered coat check system where tickets are handed out strictly in line order, every single time, with no skipping.** If render #1 hands out tickets 1, 2, 3, but render #2 skips ticket 2 because of a conditional, ticket 3's coat (state) now gets handed to whoever's holding ticket 2's number — total mismatch.`,
    breaksDownWhere: `the coat check problem is about physical mix-ups; the real consequence here is silent, hard-to-detect bugs where one piece of state's value bleeds into a completely unrelated hook call — often without an obvious crash.`,
    references: [],
  },

  explanation: {
    what: `hooks must always be called in the same order on every render — never inside conditionals, loops, or nested functions.`,
    how: `React tracks hook state by *call order*, not by name or variable — this is mechanically why the rule exists (deepened further in 11.2 once Fiber's data structure is shown).`,
    when: `always follow this rule; if conditional logic seems needed, put the condition *inside* the hook (e.g. inside the effect function), not around the hook call itself`,
  },

  checkpoints: [
    {
      id: "8.2-checkpoint-1",
      type: "live-code",
      prompt: "The code below currently violates the Rules of Hooks by conditionally calling `useState` inside an `if` block, which causes React runtime errors when toggling states. Fix this violation by moving the condition inside the rendering return logic instead of wrapping the hook call itself.",
      starterCode: `import React, { useState } from 'react';

export default function CondHookApp() {
  const [showFeature, setShowFeature] = useState(false);

  // VIOLATION: Calling a hook conditionally!
  let featureState = 'N/A';
  let setFeatureState = () => {};
  
  if (showFeature) {
    // 1. Move hook calls to the top level (unconditional)
    const [val, setVal] = useState('Enabled');
    featureState = val;
    setFeatureState = setVal;
  }

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Rules of Hooks Violator</h3>
      <button onClick={() => setShowFeature(s => !s)}>
        Toggle Feature ({showFeature ? 'ON' : 'OFF'})
      </button>
      <div style={{ marginTop: 'var(--space-4)' }}>
        Feature state value: <strong>{featureState}</strong>
      </div>
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

export default function CondHookApp() {
  const [showFeature, setShowFeature] = useState(false);

  // Move hooks to top-level, unconditionally
  const [val, setVal] = useState('Enabled');

  const featureState = showFeature ? val : 'N/A';

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Rules of Hooks Violator</h3>
      <button onClick={() => setShowFeature(s => !s)}>
        Toggle Feature ({showFeature ? 'ON' : 'OFF'})
      </button>
      <div style={{ marginTop: 'var(--space-4)' }}>
        Feature state value: <strong>{featureState}</strong>
      </div>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"This rule is just a style guideline enforced by a linter for readability."`,
    reality: `It's a hard mechanical requirement — breaking it causes genuine, confusing runtime bugs, not just lint warnings.`,
  },

  glossaryTerms: [],
};
