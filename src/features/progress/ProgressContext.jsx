import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { progressReducer, initialState } from './progressReducer.js'
import { storageService } from '../../services/storageService.js'

// Phase 3: full implementation
// Phase 0: exports the context shape so other stubs can import it safely

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(progressReducer, initialState)

  // TODO Phase 3: hydrate from storageService on mount, sync on dispatch
  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
