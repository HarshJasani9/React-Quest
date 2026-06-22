export default {
  id: "11.3",
  moduleId: "11",
  title: "Reconciliation: The Diffing Algorithm",
  prerequisites: ["11.2"],
  estimatedMinutes: 20,
  sandboxHeight: "550px",

  coreQuestion: "Given an old tree and a new tree, how does React actually decide what changed, efficiently, without comparing every possible way trees could differ (which would be far too slow)?",

  beforeProblem: `comparing two arbitrary trees fully/optimally is a computationally expensive problem in general; React needs an answer fast, every render, so it uses deliberate heuristics rather than a perfect algorithm.`,

  analogy: {
    text: `**A proofreader who assumes paragraphs that start the same way are "the same paragraph, possibly edited" rather than re-reading the entire document from scratch character by character to mathematically prove what changed.** This assumption (same position + same type = treat as the same thing, just updated) is usually right and is fast — but it's exactly the kind of shortcut that needs keys (3.2) to override when it would otherwise guess wrong.`,
    breaksDownWhere: `a proofreader uses judgment and can be wrong without major consequence; React's heuristic is a strict, fixed rule (same type at same position = update in place; different type = destroy and rebuild) applied uniformly — which is *why* something as seemingly small as conditionally rendering a <div> vs <span> in the same spot causes React to fully discard and rebuild that subtree, including losing any of its state.`,
    references: [],
  },

  explanation: {
    what: `reconciliation is the process of comparing the new element tree to the previous one (via the fiber tree, 11.2) to compute the minimal real DOM operations needed.`,
    how: `React compares elements level by level; if the type matches at a given position, it reuses/updates that fiber and recurses into children; if the type differs, it discards that fiber (and all its state) and builds a new one from scratch. For lists, keys (3.2) override pure positional matching, allowing React to correctly match items even when reordered.`,
    when: `not directly invoked by application code — but this lesson directly explains *why* keys matter (3.2) and *why* changing a rendered element's type at the same position resets its internal state, a very real and previously unexplained gotcha`,
  },

  checkpoints: [
    {
      id: "11.3-checkpoint-1",
      type: "reconciliation-visualizer",
      prompt: "The component below conditionally renders a wrapping element: a `section` if `useSection` is true, and a `div` if it is false. Because the wrapper element *type* changes, React completely destroys the entire subtree (including the `<input>` and its state) whenever you toggle the checkbox! Type something in the input and click toggle to see this state loss in action. Fix this by keeping the wrapping tag consistent (always use a `div`) and using a CSS class for styling instead, so that the input's focus and text persist.",
      starterCode: `import React, { useState } from 'react';

export default function InputKeeper() {
  const [useSection, setUseSection] = useState(true);
  const [text, setText] = useState('');

  const inputNode = (
    <div style={{ marginTop: 'var(--space-2)' }}>
      <label>Enter Text: </label>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type here..."
        style={{ padding: '4px var(--space-2)' }}
      />
    </div>
  );

  // 1. Currently, the wrapping type changes between <section> and <div>
  // This causes React to destroy and rebuild the subtree on toggle.
  if (useSection) {
    return (
      <section style={{ padding: 'var(--space-6)', border: '2px solid var(--color-signal)', borderRadius: 'var(--radius-md)' }}>
        <label>
          <input type="checkbox" checked={useSection} onChange={() => setUseSection(!useSection)} />
          {' '}Wrap in section
        </label>
        {inputNode}
      </section>
    );
  }

  return (
    <div style={{ padding: 'var(--space-6)', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)' }}>
      <label>
        <input type="checkbox" checked={useSection} onChange={() => setUseSection(!useSection)} />
        {' '}Wrap in section
      </label>
      {inputNode}
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

export default function InputKeeper() {
  const [useSection, setUseSection] = useState(true);
  const [text, setText] = useState('');

  // Keep the wrapping element type consistent (always <div>)
  // Toggle the styles/classes instead of the HTML tag type.
  return (
    <div style={{ 
      padding: 'var(--space-6)', 
      borderRadius: 'var(--radius-md)',
      border: useSection ? '2px solid var(--color-signal)' : '2px dashed var(--color-border)'
    }}>
      <label>
        <input type="checkbox" checked={useSection} onChange={() => setUseSection(!useSection)} />
        {' '}Wrap in section
      </label>
      <div style={{ marginTop: 'var(--space-2)' }}>
        <label>Enter Text: </label>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Type here..."
          style={{ padding: '4px var(--space-2)' }}
        />
      </div>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"React's diffing is a generic, smart algorithm that figures out the 'best' set of changes no matter what."`,
    reality: `It's a fast, deliberately simplified heuristic with known, learnable edge cases — not a general solution.`,
  },

  glossaryTerms: [],
};
