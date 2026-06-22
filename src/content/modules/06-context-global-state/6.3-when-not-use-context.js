export default {
  id: "6.3",
  moduleId: "6",
  title: "When NOT to Use Context",
  prerequisites: ["6.2"],
  estimatedMinutes: 15,

  coreQuestion: "What are the real costs of Context, and when does it make things worse, not better?",

  beforeProblem: `once Context "solves" prop drilling, it's tempting to put everything in Context — but every consumer of a Context re-renders whenever that Context's value changes, even if they only care about one small piece of it.`,

  analogy: {
    text: `**A single shared group chat for an entire company, vs. specific channels per team.** If absolutely everything goes through one giant group chat, everyone gets pinged for things irrelevant to them. Context with one big object of "everything" causes the same problem — every consumer re-renders for every change, relevant or not.`,
    breaksDownWhere: `muting a group chat just stops *notifications*; an over-broad Context actually forces real re-render work on every consumer, with real performance cost, not just annoyance.`,
    references: [],
  },

  explanation: {
    what: `Context causes every consuming component to re-render whenever the Context value changes — even if a consumer only reads one field of a larger value object.`,
    how: `split Context by concern (separate \`UserContext\`, \`ThemeContext\`, rather than one giant \`AppContext\`) so unrelated updates don't cause unrelated re-renders.`,
    when: `avoid Context for state that changes very frequently and is read by many components (e.g. mouse position) — that's better solved with more targeted state or libraries built for high-frequency updates`,
  },

  checkpoints: [
    {
      id: "6.3-checkpoint-1",
      type: "live-code",
      prompt: "This component has a single Context holding both a `theme` and a `count` value. Notice that the `ThemeBox` component (which only reads `theme` and doesn't care about `count`) re-renders every time you increment the counter! Look at the render count in the console. Split the single Context into two separate contexts: `ThemeContext` and `CountContext` to prevent these wasteful re-renders.",
      starterCode: `import React, { useState, createContext, useContext } from 'react';

// Currently we have one giant context
const AppContext = createContext(null);

function ThemeBox() {
  // 1. Change this to consume ThemeContext instead of AppContext
  const { theme } = useContext(AppContext);
  console.log('[ThemeBox] rendered');

  return (
    <div style={{
      padding: 'var(--space-4)',
      background: theme === 'dark' ? '#333' : '#f0f0f0',
      color: theme === 'dark' ? '#fff' : '#000',
      border: '1px solid var(--color-border)'
    }}>
      Theme: {theme}
    </div>
  );
}

function CounterButton() {
  // 2. Change this to consume CountContext instead of AppContext
  const { count, setCount } = useContext(AppContext);
  return (
    <button 
      onClick={() => setCount(c => c + 1)}
      style={{
        padding: 'var(--space-2) var(--space-4)',
        background: 'var(--color-signal)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer'
      }}
    >
      Increment Count ({count})
    </button>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      {/* 3. Wrap components in both ThemeContext.Provider and CountContext.Provider */}
      <AppContext.Provider value={{ theme, count, setCount }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            Toggle Theme
          </button>
          <ThemeBox />
          <CounterButton />
        </div>
      </AppContext.Provider>
    </div>
  );
}`,
      solutionCode: `import React, { useState, createContext, useContext } from 'react';

const ThemeContext = createContext(null);
const CountContext = createContext(null);

function ThemeBox() {
  const theme = useContext(ThemeContext);
  console.log('[ThemeBox] rendered');

  return (
    <div style={{
      padding: 'var(--space-4)',
      background: theme === 'dark' ? '#333' : '#f0f0f0',
      color: theme === 'dark' ? '#fff' : '#000',
      border: '1px solid var(--color-border)'
    }}>
      Theme: {theme}
    </div>
  );
}

function CounterButton() {
  const { count, setCount } = useContext(CountContext);
  return (
    <button 
      onClick={() => setCount(c => c + 1)}
      style={{
        padding: 'var(--space-2) var(--space-4)',
        background: 'var(--color-signal)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer'
      }}
    >
      Increment Count ({count})
    </button>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <ThemeContext.Provider value={theme}>
        <CountContext.Provider value={{ count, setCount }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
              Toggle Theme
            </button>
            <ThemeBox />
            <CounterButton />
          </div>
        </CountContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"Context is a free, general-purpose global state manager with no downsides."`,
    reality: `It has a specific, measurable performance cost that's invisible until you know to look for it.`,
  },

  glossaryTerms: [],
};
