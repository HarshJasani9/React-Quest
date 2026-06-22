export default {
  id: "3.2",
  moduleId: "3",
  title: "Keys: Why React Needs Them",
  prerequisites: ["3.1"],
  estimatedMinutes: 15,

  coreQuestion: "Why does React warn about missing \"key\" props, and what actually breaks without them?",

  beforeProblem: `when a list changes (item added, removed, reordered), React needs to know *which* rendered element corresponds to *which* data item — without that, it can only guess based on position, which causes real bugs (wrong item's state/input sticking to the wrong row).`,

  analogy: {
    text: `**Coat check tickets at a theater.** If everyone's coat is just hung in arrival order with no ticket, and someone in the middle leaves, the staff handing coats back by *position* will get it wrong for everyone after that point. A ticket (key) ties a specific coat to a specific person regardless of where it physically sits on the rack now.`,
    breaksDownWhere: `coat tickets are randomly assigned; React keys must be *stable and tied to the actual data identity* (e.g. a database ID) — a randomly generated key on every render is actually worse than no key at all, since it never matches between renders.`,
    references: [],
  },

  explanation: {
    what: `\`key\` is a special prop that tells React the identity of a list item across renders, used only by React itself (not passed down to the component).`,
    how: `React's diffing algorithm (detailed in Module 11) uses keys to match old and new list items by identity rather than by index, so it can correctly preserve, reorder, or destroy/recreate the right DOM nodes and component state.`,
    when: `always, for any list rendered via \`.map()\`. Use a stable unique ID from the data — never the array index if the list can reorder/filter/insert.`,
  },

  checkpoints: [
    {
      id: "3.2-checkpoint-1",
      type: "live-code",
      prompt: "The code below currently uses the array `index` as a key. If you type text into the input fields, and click 'Add Item to Front', you will see that the text inputs stay at the top and do not move down with their corresponding text labels! Fix this by replacing `key={index}` with a stable unique identifier from the item data: `key={item.id}`.",
      starterCode: `import React, { useState } from 'react';

export default function BrokenKeysList() {
  const [items, setItems] = useState([
    { id: 'a', text: 'Item A' },
    { id: 'b', text: 'Item B' }
  ]);

  const addItemToFront = () => {
    const newItem = { 
      id: Date.now().toString(), 
      text: \`Item \${String.fromCharCode(65 + items.length)}\` 
    };
    setItems([newItem, ...items]);
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <button 
        onClick={addItemToFront} 
        style={{
          marginBottom: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Add Item to Front
      </button>
      
      {items.map((item, index) => (
        // 1. Replace key={index} with a stable unique key
        <div key={index} style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ minWidth: '80px' }}>{item.text}</span>
          <input 
            type="text" 
            placeholder="Type note here..." 
            style={{
              padding: '4px var(--space-2)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      ))}
    </div>
  );
}`,
      solutionCode: `import React, { useState } from 'react';

export default function BrokenKeysList() {
  const [items, setItems] = useState([
    { id: 'a', text: 'Item A' },
    { id: 'b', text: 'Item B' }
  ]);

  const addItemToFront = () => {
    const newItem = { 
      id: Date.now().toString(), 
      text: \`Item \${String.fromCharCode(65 + items.length)}\` 
    };
    setItems([newItem, ...items]);
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <button 
        onClick={addItemToFront} 
        style={{
          marginBottom: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-signal)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Add Item to Front
      </button>
      
      {items.map((item, index) => (
        // 1. Replace key={index} with a stable unique key
        <div key={item.id} style={{ marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ minWidth: '80px' }}>{item.text}</span>
          <input 
            type="text" 
            placeholder="Type note here..." 
            style={{
              padding: '4px var(--space-2)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      ))}
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Using the array index as a key is basically the same as not needing a key."`,
    reality: `It's not — index-as-key works fine for static lists but actively causes the bug above for lists that reorder or have insertions/deletions.`,
  },

  glossaryTerms: [],
};
