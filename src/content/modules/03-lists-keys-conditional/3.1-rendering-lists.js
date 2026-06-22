export default {
  id: "3.1",
  moduleId: "3",
  title: "Rendering Lists",
  prerequisites: ["2.4"],
  estimatedMinutes: 15,

  coreQuestion: "How do you render UI for each item in an array of data?",

  beforeProblem: `manually writing JSX for each item doesn't scale — and the list's length isn't even known until runtime.`,

  analogy: {
    text: `**A mail-merge template.** One template (the JSX for a single item), run once per row of data, producing many similar-but-distinct outputs.`,
    breaksDownWhere: `mail merge doesn't care about output order changing later; React lists very much do (this is the seed for 3.2, keys).`,
    references: [],
  },

  explanation: {
    what: `use \`.map()\` over an array, returning JSX for each item.`,
    how: `\`.map()\` is just standard JS array mapping; JSX can render an array of elements directly.`,
    when: `any time the number/contents of rendered items comes from data rather than being hardcoded`,
  },

  checkpoints: [
    {
      id: "3.1-checkpoint-1",
      type: "live-code",
      prompt: "Render a list of tasks from the array using `.map()`. For each task, render an `<li>` element containing the task's `text` property.",
      starterCode: `import React from 'react';

export default function TaskList() {
  const tasks = [
    { id: '1', text: 'Buy groceries' },
    { id: '2', text: 'Clean the kitchen' },
    { id: '3', text: 'Walk the dog' }
  ];

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h2>My Tasks</h2>
      <ul>
        {/* Render tasks list here using tasks.map() */}
        
      </ul>
    </div>
  );
}`,
      solutionCode: `import React from 'react';

export default function TaskList() {
  const tasks = [
    { id: '1', text: 'Buy groceries' },
    { id: '2', text: 'Clean the kitchen' },
    { id: '3', text: 'Walk the dog' }
  ];

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h2>My Tasks</h2>
      <ul>
        {/* Render tasks list here using tasks.map() */}
        {tasks.map(task => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"You need a special React list-rendering API."`,
    reality: `You don't — it's just \`.map()\`, nothing React-specific about the mapping itself.`,
  },

  glossaryTerms: [],
};
