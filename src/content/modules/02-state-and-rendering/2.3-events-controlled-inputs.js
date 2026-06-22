export default {
  id: "2.3",
  moduleId: "2",
  title: "Events and Controlled Inputs",
  prerequisites: ["2.2"],
  estimatedMinutes: 15,

  coreQuestion: "How does React handle user interaction (clicks, typing) and keep an input's displayed value in sync with state?",

  beforeProblem: `in raw HTML, an \`<input>\` manages its own value internally — React has no way to know what's in it unless explicitly told, which leads to UI and state disagreeing.`,

  analogy: {
    text: `**A controlled input is a thermostat display that only shows what the thermostat's internal setting says — you can't scribble a different number on the display itself; you can only ask the thermostat to change its setting, and the display updates to match.** An uncontrolled input is a sticky note someone can write on directly, with no system knowing what's on it.`,
    breaksDownWhere: `thermostats don't usually let you set them by typing freely (controlled inputs do) — the analogy is about *source of truth*, not the interaction style.`,
    references: [],
  },

  explanation: {
    what: `a controlled input has its \`value\` driven by state, and an \`onChange\` handler that updates that state — the DOM input never has its own independent truth.`,
    how: `every keystroke fires \`onChange\`, which calls the setter, which triggers a re-render, which re-renders the input with the new \`value\` — it feels instant but it is, mechanically, a full round trip every keystroke.`,
    when: `nearly always, for any input whose value the app logic needs to read, validate, or react to. Uncontrolled inputs (Module 7, refs) exist for narrower cases like simple forms or integrating non-React libraries.`,
  },

  checkpoints: [
    {
      id: "2.3-checkpoint-1",
      type: "live-code",
      prompt: "Build a controlled text input that mirrors its value into a heading above it live. Bind the input's `value` to the `text` state and use an `onChange` handler to update the `text` state as the user types.",
      starterCode: `import React, { useState } from 'react';

export default function TextMirror() {
  const [text, setText] = useState('');

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h2>Heading: {text || '(Type something below...)'}</h2>
      
      <input 
        type="text"
        placeholder="Type here..."
        style={{
          padding: 'var(--space-2)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-sm)',
          width: '100%',
          marginTop: 'var(--space-4)'
        }}
      />
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

export default function TextMirror() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h2>Heading: {text || '(Type something below...)'}</h2>
      
      <input 
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type here..."
        style={{
          padding: 'var(--space-2)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-sm)',
          width: '100%',
          marginTop: 'var(--space-4)'
        }}
      />
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"onChange fires only when the user finishes typing."`,
    reality: `It fires on every single keystroke — there is no debounce by default.`,
  },

  glossaryTerms: [],
};
