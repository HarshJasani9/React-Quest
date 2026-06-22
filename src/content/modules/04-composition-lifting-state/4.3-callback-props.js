export default {
  id: "4.3",
  moduleId: "4",
  title: "Callback Props: Children Talking to Parents",
  prerequisites: ["4.2"],
  estimatedMinutes: 15,

  coreQuestion: "Since props only flow down, how does a child ever cause a change in its parent?",

  beforeProblem: `without this pattern, child components are inert — they can display data but never affect anything outside themselves.`,

  analogy: {
    text: `**A doorbell.** The visitor (child) can't open the door themselves — they don't have a key. But they can press a button that *notifies* the person inside (parent), who decides what to do about it. The child triggers a notification; the parent owns the actual response.`,
    breaksDownWhere: `a doorbell only sends one fixed signal ("someone's here"); callback props can pass arbitrary data along with the notification (e.g. \`onSelect(itemId)\` tells the parent *which* item, not just "something happened").`,
    references: [],
  },

  explanation: {
    what: `a callback prop is a function passed from parent to child; the child calls it (usually in an event handler) to "report" something upward, often with data as arguments.`,
    how: `parent defines a handler function, passes it down as a prop (e.g. onItemClick), child calls props.onItemClick(item.id) when its button is clicked.`,
    when: `any time a child needs to report an event or piece of data up to whatever owns the relevant state — this is the *only* way to do it; there is no other channel`,
  },

  checkpoints: [
    {
      id: "4.3-checkpoint-1",
      type: "live-code",
      prompt: "Implement a callback prop named `onSelectItem` in the `SiblingCard` child component, and wire it up to the parent's `setActiveId` state handler. Additionally, implement a delete button that notifies the parent to delete an item via `onDeleteItem` callback prop.",
      starterCode: `import React, { useState } from 'react';

function SiblingCard({ id, title, isActive, onSelect, onDelete }) {
  return (
    <div 
      style={{
        border: isActive ? '2px solid var(--color-signal)' : '1px solid var(--color-border-strong)',
        background: isActive ? 'var(--color-signal-subtle)' : '#fff',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div onClick={onSelect} style={{ cursor: 'pointer', flex: 1 }}>
        <h3>{title}</h3>
        <p>{isActive ? 'I am ACTIVE!' : 'Click to select.'}</p>
      </div>
      <button 
        onClick={onDelete}
        style={{
          background: 'transparent',
          border: '1px solid var(--color-caution)',
          color: 'var(--color-caution)',
          padding: '4px 8px',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState([
    { id: '1', title: 'Card 1' },
    { id: '2', title: 'Card 2' },
    { id: '3', title: 'Card 3' }
  ]);
  const [activeId, setActiveId] = useState('1');

  const handleDelete = (idToDelete) => {
    setItems(items.filter(item => item.id !== idToDelete));
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h2>Callback Props Demo</h2>
      
      {items.map(item => (
        <SiblingCard 
          key={item.id}
          id={item.id}
          title={item.title}
          isActive={activeId === item.id}
          // 1. Wire up the onSelect callback prop
          onSelect={() => setActiveId(item.id)}
          // 2. Wire up the onDelete callback prop
          onDelete={() => handleDelete(item.id)}
        />
      ))}
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

function SiblingCard({ id, title, isActive, onSelect, onDelete }) {
  return (
    <div 
      style={{
        border: isActive ? '2px solid var(--color-signal)' : '1px solid var(--color-border-strong)',
        background: isActive ? 'var(--color-signal-subtle)' : '#fff',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div onClick={onSelect} style={{ cursor: 'pointer', flex: 1 }}>
        <h3>{title}</h3>
        <p>{isActive ? 'I am ACTIVE!' : 'Click to select.'}</p>
      </div>
      <button 
        onClick={onDelete}
        style={{
          background: 'transparent',
          border: '1px solid var(--color-caution)',
          color: 'var(--color-caution)',
          padding: '4px 8px',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState([
    { id: '1', title: 'Card 1' },
    { id: '2', title: 'Card 2' },
    { id: '3', title: 'Card 3' }
  ]);
  const [activeId, setActiveId] = useState('1');

  const handleDelete = (idToDelete) => {
    setItems(items.filter(item => item.id !== idToDelete));
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h2>Callback Props Demo</h2>
      
      {items.map(item => (
        <SiblingCard 
          key={item.id}
          id={item.id}
          title={item.title}
          isActive={activeId === item.id}
          // 1. Wire up the onSelect callback prop
          onSelect={() => setActiveId(item.id)}
          // 2. Wire up the onDelete callback prop
          onDelete={() => handleDelete(item.id)}
        />
      ))}
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"There must be some way for a child to just directly call a parent's setState."`,
    reality: `There isn't, by design — it always goes through an explicitly passed-down function. This constraint is what makes data flow predictable.`,
  },

  glossaryTerms: [],
};
