export default {
  id: "10.1",
  moduleId: "10",
  title: "useReducer: State Transitions as a Single Source of Truth",
  prerequisites: ["9.3"],
  estimatedMinutes: 15,

  coreQuestion: "When state logic has many related pieces or complex transitions, why does scattering many useState calls become unmanageable?",

  beforeProblem: `as the number of related state values and the ways they can change grows, multiple useState calls updated from many different places make it hard to guarantee the state stays internally consistent (e.g. "loading" and "error" both true at once, an invalid combination that's easy to accidentally create with separate booleans).`,

  analogy: {
    text: `**A vending machine's internal logic vs. a person juggling separate sticky notes for "coins inserted," "item selected," "dispensing," all updated independently and possibly inconsistently.** A reducer is the vending machine's single control board: every action (insert coin, select item) goes through one defined process that always produces a valid next state — you cannot reach an invalid combination by accident.`,
    breaksDownWhere: `a vending machine's states are usually simple and few; reducers genuinely shine more as complexity *grows*, so for very simple cases the analogy may make useReducer look more necessary than it is at small scale (directly tied to the "when" guidance below).`,
    references: [],
  },

  explanation: {
    what: `useReducer manages state via a function (state, action) => newState (the reducer) and a dispatch function used to send actions, rather than many separate setters.`,
    how: `const [state, dispatch] = useReducer(reducerFn, initialState); calling dispatch({ type: 'increment' }) runs reducerFn(state, action) and re-renders with the result.`,
    when: `when several pieces of state change together in coordinated ways, or when the same state transitions are triggered from many different places (centralizing the "rules" in one reducer function) — for one or two independent pieces of state, plain useState remains simpler and is preferred`,
  },

  checkpoints: [
    {
      id: "10.1-checkpoint-1",
      type: "live-code",
      prompt: "The component below manages loading, success, and error states using three separate `useState` calls. Refactor this component to use `useReducer` to manage the fetching lifecycle state cleanly and guarantee consistency.",
      starterCode: `import React, { useState } from 'react';

export default function UserLoader() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setStatus('loading');
    setData(null);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (Math.random() > 0.5) {
        throw new Error('Connection timeout');
      }
      setData('User profile: Jane Doe, Software Engineer');
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>User Profile Loader</h3>
      <button 
        onClick={fetchData} 
        disabled={status === 'loading'}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-ink)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        {status === 'loading' ? 'Loading...' : 'Load Profile'}
      </button>

      <div style={{ marginTop: 'var(--space-4)' }}>
        {status === 'idle' && <p>Click to load user data.</p>}
        {status === 'loading' && <p>Fetching...</p>}
        {status === 'success' && <p style={{ color: 'var(--color-signal)', fontWeight: 'bold' }}>{data}</p>}
        {status === 'error' && <p style={{ color: 'var(--color-caution)' }}>Error: {error}</p>}
      </div>
    </div>
  );
}`,
      solutionCode: `import React, { useReducer } from 'react';

const initialState = {
  status: 'idle',
  data: null,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading', data: null, error: null };
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { status: 'error', data: null, error: action.payload };
    default:
      return state;
  }
}

export default function UserLoader() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, data, error } = state;

  const fetchData = async () => {
    dispatch({ type: 'FETCH_START' });

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (Math.random() > 0.5) {
        throw new Error('Connection timeout');
      }
      dispatch({ type: 'FETCH_SUCCESS', payload: 'User profile: Jane Doe, Software Engineer' });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  return (
    <div style={{ padding: 'var(--space-6)', fontFamily: 'var(--font-body)' }}>
      <h3>User Profile Loader</h3>
      <button 
        onClick={fetchData} 
        disabled={status === 'loading'}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-ink)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        {status === 'loading' ? 'Loading...' : 'Load Profile'}
      </button>

      <div style={{ marginTop: 'var(--space-4)' }}>
        {status === 'idle' && <p>Click to load user data.</p>}
        {status === 'loading' && <p>Fetching...</p>}
        {status === 'success' && <p style={{ color: 'var(--color-signal)', fontWeight: 'bold' }}>{data}</p>}
        {status === 'error' && <p style={{ color: 'var(--color-caution)' }}>Error: {error}</p>}
      </div>
    </div>
  );
}`,
      validation: null,
    }
  ],

  misconception: {
    claim: `"useReducer is always better than useState for 'serious' apps."`,
    reality: `It's a tool for a specific kind of complexity (coordinated transitions), not a universal upgrade — many components are correctly simpler with plain useState.`,
  },

  glossaryTerms: [],
};
