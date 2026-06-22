import { useState, useEffect } from 'react'
import * as Babel from '@babel/standalone'

export function useBabelTransform(rawCode, debounceMs = 300) {
  const [transformed, setTransformed] = useState({ code: null, error: null })

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Transform the raw code using Babel standalone
        // We use the 'react' preset and 'env' for basic modern JS support.
        // We compile it to an IIFE or commonjs to easily extract the exports.
        const result = Babel.transform(rawCode, {
          presets: ['react', 'env'],
          // We don't want strict mode injected automatically sometimes, but it's fine.
        })
        
        setTransformed({ code: result.code, error: null })
      } catch (err) {
        setTransformed({ code: null, error: err })
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [rawCode, debounceMs])

  return transformed
}
