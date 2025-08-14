"use client"

import { useState, useCallback, useEffect, useRef } from 'react'
import { LoadingState } from '@/types'

interface UseLoadingOptions {
  delay?: number // Delay before showing loading state (prevents flashing)
  timeout?: number // Maximum loading time before error
  onTimeout?: () => void
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { delay = 200, timeout = 30000, onTimeout } = options
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    error: null,
  })
  
  const delayTimerRef = useRef<NodeJS.Timeout>()
  const timeoutTimerRef = useRef<NodeJS.Timeout>()
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
      if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current)
    }
  }, [])

  const startLoading = useCallback(() => {
    if (!mountedRef.current) return

    // Clear any existing timers
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current)

    // Set loading after delay to prevent flashing
    delayTimerRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setState({ isLoading: true, error: null })
      }
    }, delay)

    // Set timeout error
    if (timeout > 0) {
      timeoutTimerRef.current = setTimeout(() => {
        if (mountedRef.current && state.isLoading) {
          setState({ isLoading: false, error: 'Operation timed out' })
          onTimeout?.()
        }
      }, timeout)
    }
  }, [delay, timeout, onTimeout, state.isLoading])

  const stopLoading = useCallback(() => {
    if (!mountedRef.current) return

    // Clear timers
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current)

    setState({ isLoading: false, error: null })
  }, [])

  const setError = useCallback((error: string | null) => {
    if (!mountedRef.current) return

    // Clear timers
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current)

    setState({ isLoading: false, error })
  }, [])

  const reset = useCallback(() => {
    if (!mountedRef.current) return

    // Clear timers
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current)

    setState({ isLoading: false, error: null })
  }, [])

  const execute = useCallback(async <T,>(
    promise: Promise<T>
  ): Promise<T | undefined> => {
    startLoading()
    
    try {
      const result = await promise
      stopLoading()
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setError(errorMessage)
      throw error
    }
  }, [startLoading, stopLoading, setError])

  return {
    ...state,
    startLoading,
    stopLoading,
    setError,
    reset,
    execute,
  }
}

// Hook for managing multiple loading states
export function useMultipleLoading() {
  const [loadingStates, setLoadingStates] = useState<Map<string, boolean>>(new Map())

  const setLoading = useCallback((key: string, isLoading: boolean) => {
    setLoadingStates((prev) => {
      const next = new Map(prev)
      if (isLoading) {
        next.set(key, true)
      } else {
        next.delete(key)
      }
      return next
    })
  }, [])

  const isLoading = useCallback((key?: string) => {
    if (key) {
      return loadingStates.has(key)
    }
    return loadingStates.size > 0
  }, [loadingStates])

  const reset = useCallback(() => {
    setLoadingStates(new Map())
  }, [])

  return {
    setLoading,
    isLoading,
    reset,
    loadingKeys: Array.from(loadingStates.keys()),
  }
}