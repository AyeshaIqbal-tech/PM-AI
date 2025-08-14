"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { dashboardApi } from '@/lib/api-service'
import { useMultipleLoading } from './use-loading'
import { logger } from '@/lib/logger'

// Dashboard data types
interface DashboardStats {
  totalRevenue: number
  activeProjects: number
  teamMembers: number
  clientSatisfaction: number
  profitMargin: number
  conversionRate: number
  productivityScore: number
  activeClients: number
}

interface DashboardData {
  stats: DashboardStats | null
  revenue: Array<{ month: string; revenue: number; profit: number; expenses: number }> | null
  projects: Array<{
    id: number
    name: string
    client: string
    progress: number
    status: 'on-track' | 'ahead' | 'at-risk' | 'delayed'
    team: number
    deadline: string
    budget: { used: number; total: number }
  }> | null
  teams: Array<{
    name: string
    lead: string
    members: number
    performance: number
    velocity: 'High' | 'Medium' | 'Low'
    avatar: string
    color: string
  }> | null
  departments: {
    development: Array<{ metric: string; value: number }>
    hr: Array<{ metric: string; value: number }>
    qa: Array<{ metric: string; value: number }>
    devops: Array<{ metric: string; value: number }>
  } | null
  clientSatisfaction: {
    averageRating: number
    totalResponses: number
    distribution: Array<{
      name: string
      value: number
      color: string
    }>
  } | null
}

interface UseDashboardDataOptions {
  autoRefresh?: boolean
  refreshInterval?: number
  onSuccess?: (data: DashboardData) => void
  onError?: (error: string) => void
}

// Main dashboard data hook with parallel loading
export function useDashboardData(options: UseDashboardDataOptions = {}) {
  const {
    autoRefresh = false,
    refreshInterval = 30000, // 30 seconds
    onSuccess,
    onError
  } = options

  const [data, setData] = useState<DashboardData>({
    stats: null,
    revenue: null,
    projects: null,
    teams: null,
    departments: null,
    clientSatisfaction: null,
  })
  
  const { setLoading, isLoading } = useMultipleLoading()
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const mountedRef = useRef(true)

  const fetchAllData = useCallback(async () => {
    if (!mountedRef.current) return

    setLoading('dashboard', true)
    setError(null)

    try {
      logger.info('Starting parallel dashboard data fetch', undefined, 'DashboardData', 'fetch-start')
      const startTime = performance.now()
      
      // Use Promise.allSettled for better error handling
      const results = await Promise.allSettled([
        dashboardApi.getStats(),
        dashboardApi.getRevenueData(),
        dashboardApi.getProjectsData(),
        dashboardApi.getTeamsData(),
        dashboardApi.getDepartmentMetrics(),
        dashboardApi.getClientSatisfaction(),
      ])

      const endTime = performance.now()
      logger.debug('Parallel fetch completed', { 
        duration: `${(endTime - startTime).toFixed(2)}ms`,
        startTime,
        endTime 
      }, 'DashboardData', 'fetch-complete')

      // Process results
      const newData: DashboardData = {
        stats: results[0].status === 'fulfilled' ? results[0].value : null,
        revenue: results[1].status === 'fulfilled' ? results[1].value : null,
        projects: results[2].status === 'fulfilled' ? results[2].value : null,
        teams: results[3].status === 'fulfilled' ? results[3].value : null,
        departments: results[4].status === 'fulfilled' ? results[4].value : null,
        clientSatisfaction: results[5].status === 'fulfilled' ? results[5].value : null,
      }

      // Check for any failures
      const failures = results
        .map((result, index) => ({ result, index }))
        .filter(({ result }) => result.status === 'rejected')

      if (failures.length > 0) {
        const failedEndpoints = failures.map(({ index }) => 
          ['stats', 'revenue', 'projects', 'teams', 'departments', 'clientSatisfaction'][index]
        )
        logger.warn('Some endpoints failed', { failedEndpoints }, 'DashboardData', 'partial-failure')
      }

      if (mountedRef.current) {
        setData(newData)
        setLastUpdated(new Date())
        onSuccess?.(newData)
      }

    } catch (error) {
      logger.error('Dashboard data fetch error', { error: error instanceof Error ? error.message : error }, 'DashboardData', 'fetch-error')
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch dashboard data'
      
      if (mountedRef.current) {
        setError(errorMessage)
        onError?.(errorMessage)
      }
    } finally {
      if (mountedRef.current) {
        setLoading('dashboard', false)
      }
    }
  }, [setLoading, onSuccess, onError])

  // Initial data fetch
  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      intervalRef.current = setInterval(fetchAllData, refreshInterval)
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [autoRefresh, refreshInterval, fetchAllData])

  // Cleanup
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const refetch = useCallback(() => {
    return fetchAllData()
  }, [fetchAllData])

  const refresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    fetchAllData()
    
    if (autoRefresh && refreshInterval > 0) {
      intervalRef.current = setInterval(fetchAllData, refreshInterval)
    }
  }, [fetchAllData, autoRefresh, refreshInterval])

  return {
    data,
    isLoading: isLoading('dashboard'),
    error,
    lastUpdated,
    refetch,
    refresh,
  }
}

// Hook for individual data sections with caching
export function useIndividualData<T>(
  fetcher: () => Promise<T>,
  key: string,
  options: {
    cacheTime?: number
    staleTime?: number
    refetchOnWindowFocus?: boolean
  } = {}
) {
  const {
    cacheTime = 5 * 60 * 1000, // 5 minutes
    staleTime = 1 * 60 * 1000, // 1 minute
    refetchOnWindowFocus = true
  } = options

  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)
  const [isStale, setIsStale] = useState(false)

  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(new Map())
  const mountedRef = useRef(true)

  const fetchData = useCallback(async (force = false) => {
    if (!mountedRef.current) return

    // Check cache first
    const cached = cacheRef.current.get(key)
    const now = Date.now()
    
    if (!force && cached && (now - cached.timestamp) < cacheTime) {
      setData(cached.data)
      setLastFetch(new Date(cached.timestamp))
      setIsStale((now - cached.timestamp) > staleTime)
      return cached.data
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await fetcher()
      
      if (mountedRef.current) {
        setData(result)
        setLastFetch(new Date())
        setIsStale(false)
        
        // Update cache
        cacheRef.current.set(key, { data: result, timestamp: now })
      }
      
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data'
      
      if (mountedRef.current) {
        setError(errorMessage)
      }
      
      throw error
    } finally {
      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [fetcher, key, cacheTime, staleTime])

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Window focus refetch
  useEffect(() => {
    if (!refetchOnWindowFocus) return

    const handleFocus = () => {
      if (isStale) {
        fetchData()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refetchOnWindowFocus, isStale, fetchData])

  // Stale check
  useEffect(() => {
    if (!lastFetch) return

    const checkStale = () => {
      const now = Date.now()
      const lastFetchTime = lastFetch.getTime()
      setIsStale((now - lastFetchTime) > staleTime)
    }

    const interval = setInterval(checkStale, 10000) // Check every 10 seconds
    return () => clearInterval(interval)
  }, [lastFetch, staleTime])

  // Cleanup
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return {
    data,
    isLoading,
    error,
    lastFetch,
    isStale,
    refetch: () => fetchData(true),
  }
}

// Specialized hooks for different dashboard sections
export const useDashboardStats = (options?: { refreshInterval?: number }) =>
  useIndividualData(() => dashboardApi.getStats(), 'dashboard-stats', { staleTime: options?.refreshInterval })

export const useRevenueData = (options?: { refreshInterval?: number }) =>
  useIndividualData(() => dashboardApi.getRevenueData(), 'revenue-data', { staleTime: options?.refreshInterval })

export const useProjectsData = (options?: { refreshInterval?: number }) =>
  useIndividualData(() => dashboardApi.getProjectsData(), 'projects-data', { staleTime: options?.refreshInterval })

export const useTeamsData = (options?: { refreshInterval?: number }) =>
  useIndividualData(() => dashboardApi.getTeamsData(), 'teams-data', { staleTime: options?.refreshInterval })

export const useDepartmentData = (options?: { refreshInterval?: number }) =>
  useIndividualData(() => dashboardApi.getDepartmentMetrics(), 'department-data', { staleTime: options?.refreshInterval })

export const useClientSatisfactionData = (options?: { refreshInterval?: number }) =>
  useIndividualData(() => dashboardApi.getClientSatisfaction(), 'client-satisfaction', { staleTime: options?.refreshInterval })

// Optimistic updates hook
export function useOptimisticUpdate<T>(
  initialData: T | null,
  updateFn: (data: T) => Promise<T>
) {
  const [data, setData] = useState<T | null>(initialData)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = useCallback(async (optimisticData: T) => {
    const previousData = data
    
    // Apply optimistic update
    setData(optimisticData)
    setIsUpdating(true)
    setError(null)

    try {
      const result = await updateFn(optimisticData)
      setData(result)
    } catch (error) {
      // Revert on error
      setData(previousData)
      const errorMessage = error instanceof Error ? error.message : 'Update failed'
      setError(errorMessage)
      throw error
    } finally {
      setIsUpdating(false)
    }
  }, [data, updateFn])

  return {
    data,
    isUpdating,
    error,
    update,
  }
}

// Batch updates hook for multiple simultaneous updates
export function useBatchUpdates<T>(
  updaters: Record<string, () => Promise<T>>
) {
  const [results, setResults] = useState<Record<string, T | null>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const batchUpdate = useCallback(async (keys?: string[]) => {
    const keysToUpdate = keys || Object.keys(updaters)
    
    setIsLoading(true)
    setErrors({})

    try {
      const promises = keysToUpdate.map(async key => {
        try {
          const result = await updaters[key]()
          return { key, result, error: null }
        } catch (error) {
          return { 
            key, 
            result: null, 
            error: error instanceof Error ? error.message : 'Update failed' 
          }
        }
      })

      const outcomes = await Promise.all(promises)
      
      const newResults = { ...results }
      const newErrors = { ...errors }

      outcomes.forEach(({ key, result, error }) => {
        if (error) {
          newErrors[key] = error
        } else {
          newResults[key] = result
          delete newErrors[key] // Clear previous error
        }
      })

      setResults(newResults)
      setErrors(newErrors)
    } finally {
      setIsLoading(false)
    }
  }, [updaters, results, errors])

  return {
    results,
    errors,
    isLoading,
    batchUpdate,
  }
}