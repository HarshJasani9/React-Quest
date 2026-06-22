export default {
  id: "4.1",
  moduleId: "4",
  title: "Children and Composition",
  prerequisites: ["3.3"],
  estimatedMinutes: 15,

  coreQuestion: "How do components nest content inside other components, generically (not just via named props)?",

  beforeProblem: `passing every piece of inner content as a named prop (e.g. \`header\`, \`footer\`, \`body\`) gets unwieldy and inflexible fast.`,

  analogy: {
    text: `**A picture frame.** The frame component doesn't know or care what's inside it — photo, certificate, child's drawing. It just provides the border and structure; whatever you put inside (\`children\`) is up to the user of the frame.`,
    breaksDownWhere: `a physical frame holds exactly one flat object; \`children\` can be arbitrarily complex nested trees, multiple elements, or even functions (render props, Module 10).`,
    references: [],
  },

  explanation: {
    what: `\`children\` is a special prop automatically populated with whatever JSX is nested between a component's opening and closing tags.`,
    how: `\`<Frame><Photo /></Frame>\` is equivalent to \`Frame({ children: <Photo /> })\`. The Frame component decides where in its own JSX to render \`{children}\`.`,
    when: `any time a component is a generic "wrapper" or "layout" concept — cards, modals, layout containers, buttons with icons`,
  },

  checkpoints: [
    {
      id: "4.1-checkpoint-1",
      type: "live-code",
      prompt: "Build a reusable `Card` component that accepts `children` and renders a styled border container around `{children}`. Then use it inside `App` to display some text content.",
      starterCode: `import React from 'react';

// 1. Implement Card component to accept and render props.children
function Card(props) {
  return (
    <div style={{
      border: '1px solid var(--color-border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-4)',
      backgroundColor: 'var(--color-paper)',
      boxShadow: 'var(--shadow-card)',
      marginBottom: 'var(--space-3)'
    }}>
      {/* Render children here */}
      
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      {/* 2. Wrap content inside <Card> */}
      <Card>
        <h3>Card Title</h3>
        <p>This paragraph is nested inside the Card as a child element.</p>
      </Card>
    </div>
  );
}`,
      solutionCode: `import React from 'react';

// 1. Implement Card component to accept and render props.children
function Card(props) {
  return (
    <div style={{
      border: '1px solid var(--color-border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-4)',
      backgroundColor: 'var(--color-paper)',
      boxShadow: 'var(--shadow-card)',
      marginBottom: 'var(--space-3)'
    }}>
      {/* Render children here */}
      {props.children}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      {/* 2. Wrap content inside <Card> */}
      <Card>
        <h3>Card Title</h3>
        <p>This paragraph is nested inside the Card as a child element.</p>
      </Card>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `\`children\` is just an array you always need to \`.map()\` over.`,
    reality: `It can be a single element, multiple elements, text, or even a function — treat it as "whatever was nested," not always a list.`,
  },

  glossaryTerms: [],
};
