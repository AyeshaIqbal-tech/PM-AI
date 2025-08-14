'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export interface LoadingOperation {
  id: string
  name: string
  progress: number
  status: 'pending' | 'loading' | 'completed' | 'error'
  startTime?: number
  endTime?: number
  error?: string
  estimatedDuration?: number
}

export interface LoadingProgressOptions {
  timeout?: number
  enableTimeEstimation?: boolean
  enableRetry?: boolean
  maxRetries?: number
}

export interface LoadingProgressState {
  operations: LoadingOperation[]
  overallProgress: number
  isLoading: boolean
  hasError: boolean
  currentStage: string | null
  estimatedTimeRemaining: number | null
  elapsedTime: number
}

export interface LoadingProgressActions {
  startOperation: (id: string, name: string, estimatedDuration?: number) => void
  updateOperation: (id: string, progress: number) => void
  completeOperation: (id: string) => void
  errorOperation: (id: string, error: string) => void
  retryOperation: (id: string) => void
  resetOperations: () => void
  removeOperation: (id: string) => void
}

/**
 * Hook for tracking loading progress across multiple async operations
 */
export const useLoadingProgress = (options: LoadingProgressOptions = {}): [
  LoadingProgressState,
  LoadingProgressActions
] => {
  const {
    timeout = 30000, // 30 seconds default timeout
    enableTimeEstimation = true,
    enableRetry = true,
    maxRetries = 3
  } = options

  const [operations, setOperations] = useState<LoadingOperation[]>([])
  const [elapsedTime, setElapsedTime] = useState(0)
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate derived state
  const isLoading = operations.some(op => op.status === 'loading')
  const hasError = operations.some(op => op.status === 'error')
  const completedOps = operations.filter(op => op.status === 'completed')
  const overallProgress = operations.length > 0 
    ? Math.round((completedOps.length / operations.length) * 100)
    : 0

  const currentStage = operations.find(op => op.status === 'loading')?.name || null

  // Calculate estimated time remaining
  const estimatedTimeRemaining = (() => {
    if (!enableTimeEstimation || !isLoading) return null
    
    const activeOp = operations.find(op => op.status === 'loading')
    if (!activeOp?.estimatedDuration || !activeOp.startTime) return null
    
    const elapsed = Date.now() - activeOp.startTime
    return Math.max(0, activeOp.estimatedDuration - elapsed)
  })()

  // Start elapsed time tracking
  useEffect(() => {
    if (isLoading && !startTimeRef.current) {
      startTimeRef.current = Date.now()
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - (startTimeRef.current || Date.now()))
      }, 1000)
    } else if (!isLoading && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      startTimeRef.current = null
      setElapsedTime(0)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isLoading])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const startOperation = useCallback((
    id: string, 
    name: string, 
    estimatedDuration?: number
  ) => {
    setOperations(prev => {
      const existing = prev.find(op => op.id === id)
      if (existing) {
        // Update existing operation
        return prev.map(op => 
          op.id === id 
            ? { 
                ...op, 
                name, 
                status: 'loading' as const,
                startTime: Date.now(),
                endTime: undefined,
                error: undefined,
                estimatedDuration 
              }
            : op
        )
      }
      
      // Add new operation
      return [...prev, {
        id,
        name,
        progress: 0,
        status: 'loading' as const,
        startTime: Date.now(),
        estimatedDuration
      }]
    })

    // Set timeout for operation
    if (timeout > 0) {
      const timeoutId = setTimeout(() => {
        errorOperation(id, `Operation timed out after ${timeout}ms`)
      }, timeout)
      timeoutsRef.current.set(id, timeoutId)
    }
  }, [timeout])

  const updateOperation = useCallback((id: string, progress: number) => {
    setOperations(prev => prev.map(op => 
      op.id === id 
        ? { ...op, progress: Math.max(0, Math.min(100, progress)) }
        : op
    ))
  }, [])

  const completeOperation = useCallback((id: string) => {
    setOperations(prev => prev.map(op => 
      op.id === id 
        ? { 
            ...op, 
            progress: 100, 
            status: 'completed' as const,
            endTime: Date.now()
          }
        : op
    ))

    // Clear timeout
    const timeoutId = timeoutsRef.current.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutsRef.current.delete(id)
    }
  }, [])

  const errorOperation = useCallback((id: string, error: string) => {
    setOperations(prev => prev.map(op => 
      op.id === id 
        ? { 
            ...op, 
            status: 'error' as const,
            error,
            endTime: Date.now()
          }
        : op
    ))

    // Clear timeout
    const timeoutId = timeoutsRef.current.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutsRef.current.delete(id)
    }
  }, [])

  const retryOperation = useCallback((id: string) => {
    if (!enableRetry) return

    setOperations(prev => prev.map(op => {
      if (op.id === id && op.status === 'error') {
        const retryCount = (op as any).retryCount || 0
        if (retryCount < maxRetries) {
          return {
            ...op,
            status: 'loading' as const,
            startTime: Date.now(),
            endTime: undefined,
            error: undefined,
            progress: 0,
            retryCount: retryCount + 1
          } as LoadingOperation
        }
      }
      return op
    }))

    // Restart timeout for retried operation
    if (timeout > 0) {
      const timeoutId = setTimeout(() => {
        errorOperation(id, `Operation timed out after ${timeout}ms`)
      }, timeout)
      timeoutsRef.current.set(id, timeoutId)
    }
  }, [enableRetry, maxRetries, timeout, errorOperation])

  const resetOperations = useCallback(() => {
    // Clear all timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current.clear()
    
    // Clear elapsed time interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    startTimeRef.current = null
    
    setOperations([])
    setElapsedTime(0)
  }, [])

  const removeOperation = useCallback((id: string) => {
    // Clear timeout
    const timeoutId = timeoutsRef.current.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutsRef.current.delete(id)
    }

    setOperations(prev => prev.filter(op => op.id !== id))
  }, [])

  const state: LoadingProgressState = {
    operations,
    overallProgress,
    isLoading,
    hasError,
    currentStage,
    estimatedTimeRemaining,
    elapsedTime
  }

  const actions: LoadingProgressActions = {
    startOperation,
    updateOperation,
    completeOperation,
    errorOperation,
    retryOperation,
    resetOperations,
    removeOperation
  }

  return [state, actions]
}

/**
 * Simplified hook for single operation tracking
 */
export const useSingleLoadingProgress = (
  operationName: string = 'Loading',
  options: LoadingProgressOptions = {}
) => {
  const [state, actions] = useLoadingProgress(options)
  const operationId = 'single-operation'

  const startLoading = useCallback((estimatedDuration?: number) => {
    actions.startOperation(operationId, operationName, estimatedDuration)
  }, [actions, operationId, operationName])

  const updateProgress = useCallback((progress: number) => {
    actions.updateOperation(operationId, progress)
  }, [actions, operationId])

  const completeLoading = useCallback(() => {
    actions.completeOperation(operationId)
  }, [actions, operationId])

  const errorLoading = useCallback((error: string) => {
    actions.errorOperation(operationId, error)
  }, [actions, operationId])

  const retryLoading = useCallback(() => {
    actions.retryOperation(operationId)
  }, [actions, operationId])

  const resetLoading = useCallback(() => {
    actions.resetOperations()
  }, [actions])

  return {
    ...state,
    startLoading,
    updateProgress,
    completeLoading,
    errorLoading,
    retryLoading,
    resetLoading
  }
}

/**
 * Hook for batch operation tracking
 */
export const useBatchLoadingProgress = (options: LoadingProgressOptions = {}) => {
  const [state, actions] = useLoadingProgress(options)

  const startBatch = useCallback((
    operationConfigs: Array<{
      id: string
      name: string
      estimatedDuration?: number
    }>
  ) => {
    operationConfigs.forEach(config => {
      actions.startOperation(config.id, config.name, config.estimatedDuration)
    })
  }, [actions])

  const getBatchProgress = useCallback(() => {
    if (state.operations.length === 0) return 0
    
    const totalProgress = state.operations.reduce((sum, op) => sum + op.progress, 0)
    return Math.round(totalProgress / state.operations.length)
  }, [state.operations])

  const isAllCompleted = useCallback(() => {
    return state.operations.length > 0 && 
           state.operations.every(op => op.status === 'completed')
  }, [state.operations])

  const hasAnyError = useCallback(() => {
    return state.operations.some(op => op.status === 'error')
  }, [state.operations])

  const getErrorOperations = useCallback(() => {
    return state.operations.filter(op => op.status === 'error')
  }, [state.operations])

  const retryAll = useCallback(() => {
    const errorOps = getErrorOperations()
    errorOps.forEach(op => actions.retryOperation(op.id))
  }, [getErrorOperations, actions])

  return {
    ...state,
    ...actions,
    startBatch,
    getBatchProgress,
    isAllCompleted,
    hasAnyError,
    getErrorOperations,
    retryAll
  }
}

/**
 * Hook for async function tracking
 */
export const useAsyncOperationProgress = <T>(
  asyncFunction: () => Promise<T>,
  operationName: string = 'Processing',
  options: LoadingProgressOptions = {}
) => {
  const {
    startLoading,
    completeLoading,
    errorLoading,
    ...state
  } = useSingleLoadingProgress(operationName, options)

  const execute = useCallback(async (): Promise<T | null> => {
    try {
      startLoading()
      const result = await asyncFunction()
      completeLoading()
      return result
    } catch (error) {
      errorLoading(error instanceof Error ? error.message : 'Unknown error')
      return null
    }
  }, [asyncFunction, startLoading, completeLoading, errorLoading])

  return {
    ...state,
    execute
  }
}