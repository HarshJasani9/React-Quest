export default {
  id: "11.1",
  moduleId: "11",
  title: "The Virtual DOM, Precisely",
  prerequisites: ["10.3"],
  estimatedMinutes: 15,

  coreQuestion: "What is the \"virtual DOM\" actually, as a data structure — not as a buzzword?",

  beforeProblem: `"virtual DOM" is thrown around as a magic phrase; without a concrete picture, later lessons on reconciliation and fiber have nothing solid to build on.`,

  analogy: {
    text: `**An architect's blueprint vs. the constructed building.** The blueprint (virtual DOM — really just plain JS objects describing what should exist) is cheap to draw and redraw. The building (real DOM) is expensive to change. React keeps redrawing blueprints quickly and only sends *the differences* to the expensive construction crew.`,
    breaksDownWhere: `a blueprint is typically a complete redraw used once for one build. React's "blueprint" (the element tree) is intentionally redrawn from scratch *every single render* — the cheapness of doing this repeatedly is the entire premise, more like a flipbook than a single static blueprint.`,
    references: [],
  },

  explanation: {
    what: `the "virtual DOM" is simply the tree of plain JavaScript objects produced by calling component functions (recall 1.2 — JSX compiles to createElement calls, which return these objects) — it's not a browser feature, not magic, just objects with a type, props, and children.`,
    how: `every render produces a fresh tree of these objects; React compares (diffs) the new tree against the previous one to compute the minimal real DOM changes needed.`,
    when: `not something you directly use — understanding it is what makes reconciliation (11.2) make sense`,
  },

  checkpoints: [
    {
      id: "11.1-checkpoint-1",
      type: "virtual-dom",
      prompt: "Write a React component that returns a nested JSX structure representing a blog post card: a wrapping `div` containing an `h2` title, a `p` paragraph body, and a `span` tag for the date. Observe the inspectable Virtual DOM object tree it compiles into.",
      starterCode: `import React from 'react';

export default function BlogPost() {
  return (
    <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
      {/* Add an h2 title, a p paragraph, and a span date */}
      
    </div>
  );
}`,
      solutionCode: `import React from 'react';

export default function BlogPost() {
  return (
    <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
      <h2>React Internals Unlocked</h2>
      <p>Exploring how React works under the hood can change how you build apps.</p>
      <span style={{ color: 'var(--color-slate)', fontSize: 'var(--text-xs)' }}>June 22, 2026</span>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"The virtual DOM is a faster copy of the real DOM living in memory."`,
    reality: `It's not a DOM at all — it has no browser APIs, no actual rendering capability; it's plain descriptive data, which is precisely *why* it's cheap.`,
  },

  glossaryTerms: [],
};
