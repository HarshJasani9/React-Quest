export default {
  id: "10.2",
  moduleId: "10",
  title: "Compound Components",
  prerequisites: ["10.1", "6.2"],
  estimatedMinutes: 20,
  sandboxHeight: "600px",

  coreQuestion: "How do you build a component (like a <Select> or <Tabs>) made of multiple related pieces that implicitly share state, without prop-drilling between them?",

  beforeProblem: `a component like <Tabs> needs its <Tab> and <TabPanel> children to all stay in sync about which tab is active — passing that as explicit props to every single child is exactly the prop-drilling problem (6.1), but Context (6.2) alone, used loosely, doesn't give a clean, scoped API.`,

  analogy: {
    text: `**A "Choose Your Own Adventure" book's chapters vs. a single chapter trying to describe the entire book's branching structure on one page.** Compound components are separate, related pieces (Tabs.Tab, Tabs.Panel) that each play a defined role within a shared parent (Tabs), implicitly coordinated rather than each needing to be told everything explicitly.`,
    breaksDownWhere: `book chapters are read in isolation and don't communicate with each other live; compound components actively share live state via Context internally — the analogy captures the "structured pieces of a whole" feeling but not the underlying mechanism.`,
    references: [],
  },

  explanation: {
    what: `a compound component is a parent component (e.g. Tabs) that creates a Context internally and exposes related sub-components (Tabs.Tab, Tabs.Panel) which consume that Context — giving a clean external API (<Tabs><Tabs.Tab/>...</Tabs>) while hiding the Context plumbing entirely from whoever uses it.`,
    how: `Tabs creates a Context and Provider internally; Tabs.Tab and Tabs.Panel are attached as properties on the Tabs function and call useContext internally to read/update shared state, with no props need to be passed explicitly by the consumer.`,
    when: `building reusable UI components with multiple coordinated parts (tabs, accordions, custom selects, multi-step forms) intended to be used by other code (including your future self) without needing to know the internal wiring`,
  },

  checkpoints: [
    {
      id: "10.2-checkpoint-1",
      type: "live-code",
      prompt: "The `Tabs` component below is partially wired up. Implement the `Tabs.Tab` and `Tabs.Panel` sub-components by having them consume `TabsContext` via `useContext`. This will allow them to sync the active tab state implicitly without any props passed down manually by the consumer.",
      starterCode: `import React, { createContext, useContext, useState } from 'react';

// 1. Create a TabsContext
const TabsContext = createContext(null);

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// 2. Implement the Tab sub-component (consume TabsContext)
Tabs.Tab = function Tab({ value, children }) {
  // TODO: Get activeTab & setActiveTab from TabsContext using useContext
  const activeTab = '';
  const setActiveTab = () => {};
  
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      style={{
        padding: 'var(--space-2) var(--space-4)',
        background: isActive ? 'var(--color-signal-subtle)' : '#fff',
        border: 'none',
        borderBottom: isActive ? '2px solid var(--color-signal)' : 'none',
        fontWeight: isActive ? 'bold' : 'normal',
        cursor: 'pointer',
        outline: 'none'
      }}
    >
      {children}
    </button>
  );
};

// 3. Implement the Panel sub-component (consume TabsContext)
Tabs.Panel = function Panel({ value, children }) {
  // TODO: Get activeTab from TabsContext and only render children if activeTab === value
  const activeTab = '';
  
  if (activeTab !== value) return null;

  return (
    <div style={{ padding: 'var(--space-4)', background: '#fff' }}>
      {children}
    </div>
  );
};

export default function App() {
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Compound Tabs Demo</h3>
      <Tabs defaultValue="html">
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', background: 'var(--color-canvas)' }}>
          <Tabs.Tab value="html">HTML</Tabs.Tab>
          <Tabs.Tab value="css">CSS</Tabs.Tab>
          <Tabs.Tab value="js">JavaScript</Tabs.Tab>
        </div>
        <Tabs.Panel value="html">
          <p>HTML describes the structure of a Web page.</p>
        </Tabs.Panel>
        <Tabs.Panel value="css">
          <p>CSS describes how HTML elements are to be displayed.</p>
        </Tabs.Panel>
        <Tabs.Panel value="js">
          <p>JavaScript programs the behavior of web pages.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}`,
      solutionCode: `import React, { createContext, useContext, useState } from 'react';

// 1. Create a TabsContext
const TabsContext = createContext(null);

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// 2. Implement the Tab sub-component (consume TabsContext)
Tabs.Tab = function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      style={{
        padding: 'var(--space-2) var(--space-4)',
        background: isActive ? 'var(--color-signal-subtle)' : '#fff',
        border: 'none',
        borderBottom: isActive ? '2px solid var(--color-signal)' : 'none',
        fontWeight: isActive ? 'bold' : 'normal',
        cursor: 'pointer',
        outline: 'none'
      }}
    >
      {children}
    </button>
  );
};

// 3. Implement the Panel sub-component (consume TabsContext)
Tabs.Panel = function Panel({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;

  return (
    <div style={{ padding: 'var(--space-4)', background: '#fff' }}>
      {children}
    </div>
  );
};

export default function App() {
  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>Compound Tabs Demo</h3>
      <Tabs defaultValue="html">
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', background: 'var(--color-canvas)' }}>
          <Tabs.Tab value="html">HTML</Tabs.Tab>
          <Tabs.Tab value="css">CSS</Tabs.Tab>
          <Tabs.Tab value="js">JavaScript</Tabs.Tab>
        </div>
        <Tabs.Panel value="html">
          <p>HTML describes the structure of a Web page.</p>
        </Tabs.Panel>
        <Tabs.Panel value="css">
          <p>CSS describes how HTML elements are to be displayed.</p>
        </Tabs.Panel>
        <Tabs.Panel value="js">
          <p>JavaScript programs the behavior of web pages.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Compound components are a built-in React feature."`,
    reality: `They're not — it's a *pattern* built from Context + plain JS object properties on a function; there's no special React.compound() API.`,
  },

  glossaryTerms: [],
};
