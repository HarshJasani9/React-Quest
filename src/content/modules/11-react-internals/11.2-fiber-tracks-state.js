export default {
  id: "11.2",
  moduleId: "11",
  title: "Fiber: How React Actually Tracks Component State",
  prerequisites: ["11.1"],
  estimatedMinutes: 20,

  coreQuestion: "Earlier (2.1, 8.2) we said React \"remembers\" state tied to a component's position in the tree, and hooks must be called in the same order — what data structure actually makes this true?",

  beforeProblem: `without Fiber, this was true but unexplained "magic" — this lesson removes the magic.`,

  analogy: {
    text: `**A library's card catalog, where each card corresponds to one shelf slot, tracking not just what book is there now but also what was there in the last reshuffling, so the librarian can efficiently figure out what moved.** A Fiber node is React's internal \"card\" for each component instance in the tree — it persists across renders and holds that component's hooks (as a linked list, in call order — directly explaining 8.2's rule), its pending work, and a pointer to its previous version.`,
    breaksDownWhere: `a card catalog is passively read; Fiber nodes are actively used by React as *units of work* that can be paused, resumed, or abandoned mid-render (this is the direct setup for 11.4, concurrent rendering) — there's no passive library equivalent for "pausable, resumable units of work."`,
    references: [],
  },

  explanation: {
    what: `Fiber is React's internal data structure — a tree of \"fiber nodes,\" one per component instance, each holding that component's state (hooks, in call order), its type, its props, and links to related fibers (parent, sibling, child, and \"alternate\" — its previous version).`,
    how: `when a component re-renders, React doesn't discard the fiber — it reuses it, walking its hooks linked list in order (which is *why* hook call order must never change, 8.2) to match each useState/useEffect call to its persisted data.`,
    when: `not directly used by application code — but this is the concrete mechanism behind nearly every earlier \"just trust me\" explanation in this curriculum`,
  },

  checkpoints: [
    {
      id: "11.2-checkpoint-1",
      type: "fiber-visualizer",
      prompt: "This is an interactive visualization of the Fiber tree. Explore the nodes representing components and see how hooks are stored as linked lists on the Fibers. Click the 'Trigger Re-render' button to watch React walk the tree and reuse fibers vs. creating new alternates.",
      starterCode: ``,
      solutionCode: ``,
      validation: null,
    }
  ],

  misconception: {
    claim: `"React state lives 'inside' the component function somehow, persisting through some JS closure trick."`,
    reality: `It lives in this entirely separate, persistent data structure (the fiber tree) that React maintains outside of and alongside your component functions.`,
  },

  glossaryTerms: [],
};
