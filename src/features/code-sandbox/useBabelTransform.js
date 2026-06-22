// useBabelTransform.js — Phase 1
// Custom hook that wraps @babel/standalone transform with debouncing.
// Returns { code, error } from a raw JSX/ES string input.
export function useBabelTransform(_rawCode) {
  return { code: null, error: null }
}
