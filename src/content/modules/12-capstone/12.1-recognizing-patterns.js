export default {
  id: "12.1",
  moduleId: "12",
  title: "Recognizing Patterns in Real Code",
  prerequisites: [
    "1.1", "1.2", "1.3", "1.4",
    "2.1", "2.2", "2.3", "2.4",
    "3.1", "3.2", "3.3",
    "4.1", "4.2", "4.3",
    "5.1", "5.2", "5.3", "5.4",
    "6.1", "6.2", "6.3",
    "7.1", "7.2",
    "8.1", "8.2",
    "9.1", "9.2", "9.3",
    "10.1", "10.2", "10.3",
    "11.1", "11.2", "11.3", "11.4"
  ],
  estimatedMinutes: 30,

  coreQuestion: "Given an unfamiliar real-world React codebase or library's source, can the learner identify which concepts from this curriculum are at play, and why they were used?",

  beforeProblem: `knowing isolated concepts is different from recognizing them combined, in the wild, in someone else's code, possibly written less cleanly than these lessons' examples.`,

  analogy: {
    text: `**Knowing individual chess piece moves vs. reading a real game in progress and understanding the strategy.** Every prior module taught a "piece move." This module is about reading the whole board.`,
    breaksDownWhere: `chess has fixed rules with no ambiguity; real codebases often mix good and questionable patterns, requiring judgment about what's idiomatic vs. what's a workaround for a deeper issue — there's no chess equivalent of "this move is technically legal but probably a mistake."`,
    references: [],
  },

  explanation: {
    what: `this is an integrative, applied module — no new concepts, only synthesis.`,
    how: `read real, moderately complex open-source component code (chosen for genuine pattern density, not toy examples); annotate which concepts from Modules 1–11 are present and why.`,
    when: `this is the bridge to the original kanban-app project (or any real project) — the actual point of the entire curriculum.`,
  },

  checkpoints: [
    {
      id: "12.1-checkpoint-1",
      type: "live-code",
      prompt: `### Part 1: Real-World Pattern Annotation
Below is a real-world utility hook, \`useClickAway\` (sourced from \`streamich/react-use\`), and a custom \`ImageWithFallback\` component (similar to patterns in \`react-image\`). Read their source code in the editor, paying attention to the annotations in the comments. Notice how they apply the React concepts you have learned, such as \`useRef\` for preserving callbacks (Lesson 7.2), \`useEffect\` listener registration and cleanup (Lessons 5.3 & 5.4), and state reset side effects.

### Part 2: The Debugging Challenge
Below the annotated utilities, you will find a deliberately buggy \`AutoSaveBadge\` component. It is supposed to display an auto-saved message that updates every second and increments a counter. However, it has two critical bugs:
1. It is stuck on the first tick and never counts past 1. This is a **stale closure** bug (refer back to **Lesson 5.3: The Dependency Array** and **Lesson 2.4: Updater Functions**).
2. It leaks interval timers, which you can see causing performance issues if the component mounts/remounts. This is a **missing cleanup** bug (refer back to **Lesson 5.4: Cleanup Functions**).

**Your Task**: Find the bugs in \`AutoSaveBadge\` and fix them:
1. Ensure the interval increments the count correctly every second.
2. Return a cleanup function in the effect to clear the interval on unmount.`,
      starterCode: `import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// PART 1: ANNOTATED REAL-WORLD COMPONENTS
// ==========================================

/**
 * Hook 1: useClickAway
 * Sourced from: streamich/react-use (useClickAway.ts)
 * 
 * ANNOTATIONS:
 * 1. useRef (Lesson 7.2): Holds a reference to the latest callback function.
 *    This allows the click handler to call the fresh callback without having
 *    to re-register the event listener (avoiding churn in useEffect).
 * 2. useEffect (Lesson 5.3): Registers mousedown/touchstart listeners on the document.
 * 3. Cleanup function (Lesson 5.4): Removes event listeners on unmount.
 */
function useClickAway(ref, onClickAway) {
  const savedCallback = useRef(onClickAway);

  // Keep savedCallback.current up-to-date with the latest onClickAway
  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event) => {
      const { current: el } = ref;
      // If the clicked element is outside the referenced container, fire callback
      if (el && !el.contains(event.target)) {
        savedCallback.current(event);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [ref]);
}

/**
 * Component 2: ImageWithFallback
 * Sourced from patterns in: react-image-fallback (by dariuszkuc)
 * 
 * ANNOTATIONS:
 * 1. useState (Lesson 2.1): Tracks local image source and status ('loading' | 'loaded' | 'error').
 * 2. useEffect (Lesson 5.3): Resets state when the 'src' prop changes.
 * 3. Event handlers (Lesson 2.3): onLoad and onError trigger state transitions.
 */
function ImageWithFallback({ src, fallbackSrc, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setImgSrc(src);
    setStatus('loading');
  }, [src]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onLoad={() => setStatus('loaded')}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
          setStatus('error');
        }
      }}
      style={{
        ...props.style,
        opacity: status === 'loading' ? 0.5 : 1,
        transition: 'opacity var(--duration-standard) var(--ease-standard)'
      }}
    />
  );
}

// ==========================================
// PART 2: THE BUGGY COMPONENT (YOUR TASK)
// ==========================================

function AutoSaveBadge() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // BUG 1 (Lesson 5.3, 2.4): Stale closure - count never increments past 1
    // BUG 2 (Lesson 5.4): Missing cleanup - interval leaks on unmount
    setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }, []);

  return (
    <div style={{
      padding: 'var(--space-4)',
      background: 'var(--color-paper)',
      border: '1px solid var(--color-border-strong)',
      borderRadius: 'var(--radius-md)',
      textAlign: 'center'
    }}>
      <h4 style={{ margin: 0, color: 'var(--color-ink)' }}>Auto-saving progress...</h4>
      <p style={{ 
        fontFamily: 'var(--font-mono)', 
        fontSize: 'var(--text-sm)',
        color: 'var(--color-signal)',
        margin: 'var(--space-2) 0 0 0'
      }}>
        Elapsed: {seconds}s
      </p>
    </div>
  );
}

// Parent container to preview both components
export default function App() {
  const [showBadge, setShowBadge] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  
  const clickAwayRef = useRef(null);
  useClickAway(clickAwayRef, () => {
    setClickCount((c) => c + 1);
  });

  return (
    <div style={{ padding: 'var(--space-4)', fontFamily: 'var(--font-body)' }}>
      <h3 style={{ margin: '0 0 var(--space-4) 0', color: 'var(--color-slate)' }}>Capstone Sandbox</h3>
      
      {/* 1. useClickAway test area */}
      <div 
        ref={clickAwayRef} 
        style={{
          padding: 'var(--space-4)',
          background: 'var(--color-canvas)',
          border: '2px dashed var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 'var(--space-4)',
          textAlign: 'center'
        }}
      >
        <p style={{ margin: 0 }}>Click <strong>outside</strong> this box to test <code>useClickAway</code>.</p>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate)' }}>
          Click-aways detected: {clickCount}
        </span>
      </div>

      {/* 2. ImageWithFallback test */}
      <div style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>
        <p style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--text-xs)' }}>Image Fallback Test:</p>
        <ImageWithFallback 
          src="https://invalid-image-url-test.png" 
          fallbackSrc="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&auto=format&fit=crop&q=60" 
          alt="Abstract Gradient"
          style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>

      {/* 3. Buggy AutoSaveBadge test */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <button 
          onClick={() => setShowBadge(!showBadge)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-ink)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            marginBottom: 'var(--space-2)'
          }}
        >
          {showBadge ? 'Unmount Badge' : 'Mount Badge'}
        </button>
        {showBadge && <AutoSaveBadge />}
      </div>
    </div>
  );
}`,
      solutionCode: `import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// PART 1: ANNOTATED REAL-WORLD COMPONENTS
// ==========================================

/**
 * Hook 1: useClickAway
 * Sourced from: streamich/react-use (useClickAway.ts)
 * 
 * ANNOTATIONS:
 * 1. useRef (Lesson 7.2): Holds a reference to the latest callback function.
 *    This allows the click handler to call the fresh callback without having
 *    to re-register the event listener (avoiding churn in useEffect).
 * 2. useEffect (Lesson 5.3): Registers mousedown/touchstart listeners on the document.
 * 3. Cleanup function (Lesson 5.4): Removes event listeners on unmount.
 */
function useClickAway(ref, onClickAway) {
  const savedCallback = useRef(onClickAway);

  // Keep savedCallback.current up-to-date with the latest onClickAway
  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event) => {
      const { current: el } = ref;
      // If the clicked element is outside the referenced container, fire callback
      if (el && !el.contains(event.target)) {
        savedCallback.current(event);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [ref]);
}

/**
 * Component 2: ImageWithFallback
 * Sourced from patterns in: react-image-fallback (by dariuszkuc)
 * 
 * ANNOTATIONS:
 * 1. useState (Lesson 2.1): Tracks local image source and status ('loading' | 'loaded' | 'error').
 * 2. useEffect (Lesson 5.3): Resets state when the 'src' prop changes.
 * 3. Event handlers (Lesson 2.3): onLoad and onError trigger state transitions.
 */
function ImageWithFallback({ src, fallbackSrc, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setImgSrc(src);
    setStatus('loading');
  }, [src]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onLoad={() => setStatus('loaded')}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
          setStatus('error');
        }
      }}
      style={{
        ...props.style,
        opacity: status === 'loading' ? 0.5 : 1,
        transition: 'opacity var(--duration-standard) var(--ease-standard)'
      }}
    />
  );
}

// ==========================================
// PART 2: THE BUGGY COMPONENT (YOUR TASK)
// ==========================================

function AutoSaveBadge() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // FIXED: Use a functional updater to avoid stale closure (Lesson 2.4)
    // FIXED: Return a cleanup function clearing the interval to prevent leaks (Lesson 5.4)
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      padding: 'var(--space-4)',
      background: 'var(--color-paper)',
      border: '1px solid var(--color-border-strong)',
      borderRadius: 'var(--radius-md)',
      textAlign: 'center'
    }}>
      <h4 style={{ margin: 0, color: 'var(--color-ink)' }}>Auto-saving progress...</h4>
      <p style={{ 
        fontFamily: 'var(--font-mono)', 
        fontSize: 'var(--text-sm)',
        color: 'var(--color-signal)',
        margin: 'var(--space-2) 0 0 0'
      }}>
        Elapsed: {seconds}s
      </p>
    </div>
  );
}

// Parent container to preview both components
export default function App() {
  const [showBadge, setShowBadge] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  
  const clickAwayRef = useRef(null);
  useClickAway(clickAwayRef, () => {
    setClickCount((c) => c + 1);
  });

  return (
    <div style={{ padding: 'var(--space-4)', fontFamily: 'var(--font-body)' }}>
      <h3 style={{ margin: '0 0 var(--space-4) 0', color: 'var(--color-slate)' }}>Capstone Sandbox</h3>
      
      {/* 1. useClickAway test area */}
      <div 
        ref={clickAwayRef} 
        style={{
          padding: 'var(--space-4)',
          background: 'var(--color-canvas)',
          border: '2px dashed var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 'var(--space-4)',
          textAlign: 'center'
        }}
      >
        <p style={{ margin: 0 }}>Click <strong>outside</strong> this box to test <code>useClickAway</code>.</p>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate)' }}>
          Click-aways detected: {clickCount}
        </span>
      </div>

      {/* 2. ImageWithFallback test */}
      <div style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>
        <p style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--text-xs)' }}>Image Fallback Test:</p>
        <ImageWithFallback 
          src="https://invalid-image-url-test.png" 
          fallbackSrc="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&auto=format&fit=crop&q=60" 
          alt="Abstract Gradient"
          style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>

      {/* 3. Buggy AutoSaveBadge test */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <button 
          onClick={() => setShowBadge(!showBadge)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-ink)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            marginBottom: 'var(--space-2)'
          }}
        >
          {showBadge ? 'Unmount Badge' : 'Mount Badge'}
        </button>
        {showBadge && <AutoSaveBadge />}
      </div>
    </div>
  );
}`,
      validation: null,
    }
  ],

  sandboxHeight: "650px",

  misconception: {
    claim: `"Finishing a curriculum means you're done learning the topic."`,
    reality: `This lesson is designed to expose the remaining gap between "recognize the concept when it's named for me" and "recognize it unprompted in messy real code" — and to make that gap visible rather than assumed away.`,
  },

  glossaryTerms: [],
};
