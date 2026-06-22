export default {
  id: "10.3",
  moduleId: "10",
  title: "Render Props (and Why Hooks Mostly Replaced Them)",
  prerequisites: ["10.2"],
  estimatedMinutes: 20,
  sandboxHeight: "600px",

  coreQuestion: "Before custom hooks existed, how was stateful logic shared between components — and why is that older pattern rarer now?",

  beforeProblem: `custom hooks (Module 8) didn't always exist (pre-2019 React); sharing logic before then required different patterns, and recognizing render props matters for reading older/legacy codebases and certain libraries that still use them.`,

  analogy: {
    text: `**Hiring a tour guide who narrates *whatever* you choose to look at, vs. a tour bus route.** A render prop component handles the "logic" (the guide doing research, tracking position) but hands you a function so *you* decide exactly what to render with that data — flexible, but the "handing you a function to call inside JSX" syntax is the part that feels unusual at first.`,
    breaksDownWhere: `a tour guide is a continuous, ongoing relationship; a render prop is technically just a function passed as a specific prop (often literally named children or render) called once per render — the "ongoing guide" framing is for intuition only, not a literal mechanism match.`,
    references: [],
  },

  explanation: {
    what: `a render prop is a prop whose value is a function; the component calls that function (often passing it some internal state/data) and renders whatever it returns.`,
    how: `<MouseTracker render={(pos) => <div>{pos.x}, {pos.y}</div>} /> — MouseTracker tracks mouse position internally and calls render(position) to produce output.`,
    when: `rare in new code today — almost everything render props did is now done more simply with a custom hook (useMousePosition()); still appears in some existing libraries and is worth recognizing on sight`,
  },

  checkpoints: [
    {
      id: "10.3-checkpoint-1",
      type: "live-code",
      prompt: "The code below shows how mouse position tracking is shared using the old Render Props pattern (`MouseTracker`). Refactor the mouse-tracking logic into the custom hook `useMousePosition`, and update the `App` component to consume this hook directly for a cleaner component structure.",
      starterCode: `import React, { useState, useEffect } from 'react';

// Older Render Prop Component
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return render(position);
}

// 1. Refactor the logic above into a custom hook: useMousePosition
function useMousePosition() {
  // TODO: Extract state and mousemove effect here
  const position = { x: 0, y: 0 };
  
  return position;
}

export default function App() {
  // TODO: 2. Call your useMousePosition hook here
  
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Shared Mouse Position Logic</h3>
      
      {/* 3. Comment out this MouseTracker and render the position directly using the hook */}
      <MouseTracker render={(pos) => (
        <div style={{
          padding: 'var(--space-4)',
          background: 'var(--color-canvas)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)'
        }}>
          Mouse Position: <strong>X: {pos.x}, Y: {pos.y}</strong>
        </div>
      )} />

      {/* RENDER HOOK DATA HERE:
      <div style={{
        padding: 'var(--space-4)',
        background: 'var(--color-signal-subtle)',
        border: '1px solid var(--color-signal)',
        borderRadius: 'var(--radius-md)'
      }}>
        Hook Position: <strong>X: {position.x}, Y: {position.y}</strong>
      </div>
      */}
    </div>
  );
}`,
      solutionCode: `import React, { useState, useEffect } from 'react';

// 1. Refactor the logic above into a custom hook: useMousePosition
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

export default function App() {
  const position = useMousePosition();
  
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Shared Mouse Position Logic</h3>
      
      <div style={{
        padding: 'var(--space-4)',
        background: 'var(--color-signal-subtle)',
        border: '1px solid var(--color-signal)',
        borderRadius: 'var(--radius-md)'
      }}>
        Hook Position: <strong>X: {position.x}, Y: {position.y}</strong>
      </div>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Render props are an outdated, bad pattern that should never be used."`,
    reality: `They're largely superseded for *this specific use case*, but the underlying idea (passing a function as a prop) remains a normal, valid tool in other contexts — it's the "primary state-sharing mechanism" role that's outdated, not the technique itself.`,
  },

  glossaryTerms: [],
};
