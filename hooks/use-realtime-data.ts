"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { logger } from '@/lib/logger'

// Dynamic import for socket.io-client to avoid SSR issues
let io: any = null
let Socket: any = null

if (typeof window !== 'undefined') {
  import('socket.io-client').then((module) => {
    io = module.io
    Socket = module.Socket
  }).catch(() => {
    logger.warn('Socket.io client not available')
  })
}

// Real-time update strategies
export type UpdateStrategy = 'polling' | 'websocket' | 'sse' | 'hybrid'

interface RealTimeOptions {
  strategy: UpdateStrategy
  pollingInterval?: number
  reconnectAttempts?: number
  reconnectDelay?: number
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: string) => void
  onUpdate?: <T>(data: T) => void
}

interface RealTimeMetrics {
  activeUsers: number
  responseTime: number
  requestsPerSecond: number
  errorRate: number
  uptime: number
  serverLoad: number
  lastUpdate: Date
}

// WebSocket hook for real-time updates
export function useWebSocketUpdates<T>(
  url: string,
  options: Partial<RealTimeOptions> = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reconnectCount, setReconnectCount] = useState(0)

  const socketRef = useRef<any>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()
  const mountedRef = useRef(true)

  const {
    reconnectAttempts = 5,
    reconnectDelay = 3000,
    onConnect,
    onDisconnect,
    onError,
    onUpdate
  } = options

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return

    try {
      logger.debug('Connecting to WebSocket', { url }, 'WebSocket', 'connect')
      
      socketRef.current = io(url, {
        transports: ['websocket'],
        upgrade: false,
        rememberUpgrade: false,
        timeout: 10000,
        forceNew: true,
      })

      socketRef.current.on('connect', () => {
        logger.info('WebSocket connected', undefined, 'WebSocket', 'connected')
        setIsConnected(true)
        setError(null)
        setReconnectCount(0)
        onConnect?.()
      })

      socketRef.current.on('disconnect', (reason: any) => {
        logger.warn('WebSocket disconnected', { reason }, 'WebSocket', 'disconnected')
        setIsConnected(false)
        onDisconnect?.()
        
        // Auto-reconnect on unexpected disconnects
        if (reason === 'io server disconnect') {
          // Server initiated disconnect - don't reconnect
          return
        }
        
        if (mountedRef.current && reconnectCount < reconnectAttempts) {
          reconnectTimeoutRef.current = setTimeout(() => {
            setReconnectCount(prev => prev + 1)
            connect()
          }, reconnectDelay)
        }
      })

      socketRef.current.on('connect_error', (err: any) => {
        const errorMsg = `WebSocket connection error: ${err.message}`
        logger.error('WebSocket connection error', { error: err.message }, 'WebSocket', 'connection-error')
        setError(errorMsg)
        onError?.(errorMsg)
      })

      socketRef.current.on('data', (newData: T) => {
        if (mountedRef.current) {
          setData(newData)
          onUpdate?.(newData)
        }
      })

      socketRef.current.on('metrics', (metrics: T) => {
        if (mountedRef.current) {
          setData(metrics as T)
          onUpdate?.(metrics)
        }
      })

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'WebSocket setup failed'
      logger.error('WebSocket setup error', { error: errorMsg }, 'WebSocket', 'setup-error')
      setError(errorMsg)
      onError?.(errorMsg)
    }
  }, [url, reconnectAttempts, reconnectDelay, reconnectCount, onConnect, onDisconnect, onError, onUpdate])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }
    
    setIsConnected(false)
  }, [])

  const emit = useCallback((event: string, data: unknown) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data)
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      mountedRef.current = false
      disconnect()
    }
  }, [connect, disconnect])

  return {
    data,
    isConnected,
    error,
    reconnectCount,
    connect,
    disconnect,
    emit,
  }
}

// Server-Sent Events hook
export function useServerSentEvents<T>(
  url: string,
  options: Partial<RealTimeOptions> = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reconnectCount, setReconnectCount] = useState(0)

  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()
  const mountedRef = useRef(true)

  const {
    reconnectAttempts = 5,
    reconnectDelay = 3000,
    onConnect,
    onDisconnect,
    onError,
    onUpdate
  } = options

  const connect = useCallback(() => {
    if (eventSourceRef.current?.readyState === EventSource.OPEN) return

    try {
      logger.debug('Connecting to SSE', { url }, 'SSE', 'connect')
      
      eventSourceRef.current = new EventSource(url)

      eventSourceRef.current.onopen = () => {
        logger.info('SSE connected', undefined, 'SSE', 'connected')
        setIsConnected(true)
        setError(null)
        setReconnectCount(0)
        onConnect?.()
      }

      eventSourceRef.current.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data) as T
          if (mountedRef.current) {
            setData(newData)
            onUpdate?.(newData)
          }
        } catch (err) {
          logger.error('SSE data parse error', { error: err }, 'SSE', 'parse-error')
        }
      }

      eventSourceRef.current.onerror = (event) => {
        logger.error('SSE error', { event }, 'SSE', 'error')
        setIsConnected(false)
        
        if (mountedRef.current && reconnectCount < reconnectAttempts) {
          reconnectTimeoutRef.current = setTimeout(() => {
            setReconnectCount(prev => prev + 1)
            connect()
          }, reconnectDelay)
        }

        onDisconnect?.()
      }

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'SSE setup failed'
      logger.error('SSE setup error', { error: errorMsg }, 'SSE', 'setup-error')
      setError(errorMsg)
      onError?.(errorMsg)
    }
  }, [url, reconnectAttempts, reconnectDelay, reconnectCount, onConnect, onDisconnect, onError, onUpdate])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    
    setIsConnected(false)
  }, [])

  useEffect(() => {
    connect()
    return () => {
      mountedRef.current = false
      disconnect()
    }
  }, [connect, disconnect])

  return {
    data,
    isConnected,
    error,
    reconnectCount,
    connect,
    disconnect,
  }
}

// Intelligent polling hook with adaptive intervals
export function useIntelligentPolling<T>(
  fetcher: () => Promise<T>,
  options: {
    baseInterval?: number
    maxInterval?: number
    backoffMultiplier?: number
    errorThreshold?: number
    successThreshold?: number
    onUpdate?: (data: T) => void
    onError?: (error: string) => void
  } = {}
) {
  const {
    baseInterval = 5000,
    maxInterval = 60000,
    backoffMultiplier = 1.5,
    errorThreshold = 3,
    successThreshold = 5,
    onUpdate,
    onError
  } = options

  const [data, setData] = useState<T | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentInterval, setCurrentInterval] = useState(baseInterval)
  const [errorCount, setErrorCount] = useState(0)
  const [successCount, setSuccessCount] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout>()
  const mountedRef = useRef(true)

  const adjustInterval = useCallback(() => {
    if (errorCount >= errorThreshold) {
      // Increase interval on consecutive errors
      setCurrentInterval(prev => Math.min(prev * backoffMultiplier, maxInterval))
    } else if (successCount >= successThreshold) {
      // Decrease interval on consecutive successes
      setCurrentInterval(prev => Math.max(prev / backoffMultiplier, baseInterval))
    }
  }, [errorCount, successCount, errorThreshold, successThreshold, backoffMultiplier, maxInterval, baseInterval])

  const poll = useCallback(async () => {
    if (!mountedRef.current) return

    try {
      const result = await fetcher()
      
      if (mountedRef.current) {
        setData(result)
        setError(null)
        setErrorCount(0)
        setSuccessCount(prev => prev + 1)
        onUpdate?.(result)
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Polling failed'
      
      if (mountedRef.current) {
        setError(errorMsg)
        setSuccessCount(0)
        setErrorCount(prev => prev + 1)
        onError?.(errorMsg)
      }
    }
  }, [fetcher, onUpdate, onError])

  const startPolling = useCallback(() => {
    if (isPolling) return

    setIsPolling(true)
    poll() // Initial fetch

    const scheduleNext = () => {
      if (mountedRef.current) {
        intervalRef.current = setTimeout(() => {
          poll().then(() => {
            if (mountedRef.current) {
              scheduleNext()
            }
          })
        }, currentInterval)
      }
    }

    scheduleNext()
  }, [isPolling, poll, currentInterval])

  const stopPolling = useCallback(() => {
    setIsPolling(false)
    if (intervalRef.current) {
      clearTimeout(intervalRef.current)
    }
  }, [])

  // Adjust interval when error/success counts change
  useEffect(() => {
    adjustInterval()
  }, [adjustInterval])

  // Restart polling with new interval
  useEffect(() => {
    if (isPolling) {
      stopPolling()
      startPolling()
    }
  }, [currentInterval]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      stopPolling()
    }
  }, [stopPolling])

  return {
    data,
    isPolling,
    error,
    currentInterval,
    errorCount,
    successCount,
    startPolling,
    stopPolling,
    poll, // Manual poll
  }
}

// Hybrid real-time hook that uses multiple strategies
export function useHybridRealTime<T>(
  config: {
    websocketUrl?: string
    sseUrl?: string
    pollingFetcher?: () => Promise<T>
    primaryStrategy: UpdateStrategy
    fallbackStrategy?: UpdateStrategy
    pollingInterval?: number
  }
) {
  const [data, setData] = useState<T | null>(null)
  const [activeStrategy, setActiveStrategy] = useState<UpdateStrategy>(config.primaryStrategy)
  const [connectionStatus, setConnectionStatus] = useState<Record<UpdateStrategy, boolean>>({
    polling: false,
    websocket: false,
    sse: false,
    hybrid: false,
  })
  const [errors, setErrors] = useState<Record<UpdateStrategy, string | null>>({
    polling: null,
    websocket: null,
    sse: null,
    hybrid: null,
  })

  const fallbackTimeoutRef = useRef<NodeJS.Timeout>()

  const updateData = useCallback((newData: T, source: UpdateStrategy) => {
    logger.debug('Data updated from source', { source }, 'HybridRealTime', 'data-update')
    setData(newData)
  }, [])

  const handleError = useCallback((error: string, source: UpdateStrategy) => {
    logger.error('Real-time source error', { source, error }, 'HybridRealTime', 'source-error')
    setErrors(prev => ({ ...prev, [source]: error }))
    setConnectionStatus(prev => ({ ...prev, [source]: false }))

    // Fallback logic
    if (source === config.primaryStrategy && config.fallbackStrategy) {
      logger.info('Switching to fallback strategy', { fallbackStrategy: config.fallbackStrategy }, 'HybridRealTime', 'fallback-switch')
      fallbackTimeoutRef.current = setTimeout(() => {
        setActiveStrategy(config.fallbackStrategy!)
      }, 2000)
    }
  }, [config.primaryStrategy, config.fallbackStrategy])

  const handleConnect = useCallback((source: UpdateStrategy) => {
    logger.info('Real-time source connected', { source }, 'HybridRealTime', 'source-connected')
    setConnectionStatus(prev => ({ ...prev, [source]: true }))
    setErrors(prev => ({ ...prev, [source]: null }))

    // Clear fallback timeout if primary reconnects
    if (source === config.primaryStrategy && fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current)
      setActiveStrategy(config.primaryStrategy)
    }
  }, [config.primaryStrategy])

  // WebSocket strategy
  const websocket = useWebSocketUpdates<T>(config.websocketUrl || '', {
    onUpdate: (data) => updateData(data as unknown as T, 'websocket'),
    onError: (error) => handleError(error, 'websocket'),
    onConnect: () => handleConnect('websocket'),
    onDisconnect: () => setConnectionStatus(prev => ({ ...prev, websocket: false })),
  })

  // SSE strategy
  const sse = useServerSentEvents<T>(config.sseUrl || '', {
    onUpdate: (data) => updateData(data as unknown as T, 'sse'),
    onError: (error) => handleError(error, 'sse'),
    onConnect: () => handleConnect('sse'),
    onDisconnect: () => setConnectionStatus(prev => ({ ...prev, sse: false })),
  })

  // Polling strategy
  const polling = useIntelligentPolling<T>(
    config.pollingFetcher || (() => Promise.reject(new Error('No polling fetcher provided'))),
    {
      baseInterval: config.pollingInterval,
      onUpdate: (data) => updateData(data, 'polling'),
      onError: (error) => handleError(error, 'polling'),
    }
  )

  // Start polling when it's the active strategy
  useEffect(() => {
    if (activeStrategy === 'polling') {
      polling.startPolling()
      setConnectionStatus(prev => ({ ...prev, polling: true }))
    } else {
      polling.stopPolling()
      setConnectionStatus(prev => ({ ...prev, polling: false }))
    }
  }, [activeStrategy, polling])

  const switchStrategy = useCallback((newStrategy: UpdateStrategy) => {
    logger.info('Manually switching strategy', { newStrategy }, 'HybridRealTime', 'strategy-switch')
    setActiveStrategy(newStrategy)
  }, [])

  useEffect(() => {
    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current)
      }
    }
  }, [])

  return {
    data,
    activeStrategy,
    connectionStatus,
    errors,
    switchStrategy,
    websocket,
    sse,
    polling,
  }
}

// Real-time metrics hook for dashboard monitoring
export function useRealTimeMetrics(options: Partial<RealTimeOptions> = {}) {
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    activeUsers: 0,
    responseTime: 0,
    requestsPerSecond: 0,
    errorRate: 0,
    uptime: 0,
    serverLoad: 0,
    lastUpdate: new Date(),
  })

  const { strategy = 'hybrid', pollingInterval = 3000 } = options

  // Simulate real-time metrics for development
  const generateMockMetrics = useCallback((): Promise<RealTimeMetrics> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const baseMetrics = {
          activeUsers: 1800 + Math.floor(Math.random() * 100) - 50,
          responseTime: 200 + Math.floor(Math.random() * 100) - 50,
          requestsPerSecond: 1200 + Math.floor(Math.random() * 200) - 100,
          errorRate: Math.max(0, 0.1 + (Math.random() * 0.1) - 0.05),
          uptime: 99.5 + (Math.random() * 0.5),
          serverLoad: 60 + Math.floor(Math.random() * 20) - 10,
          lastUpdate: new Date(),
        }
        
        resolve(baseMetrics)
      }, 100) // Small delay to simulate network
    })
  }, [])

  const realtime = useHybridRealTime<RealTimeMetrics>({
    websocketUrl: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/metrics',
    sseUrl: process.env.NEXT_PUBLIC_SSE_URL || '/api/metrics/stream',
    pollingFetcher: generateMockMetrics,
    primaryStrategy: strategy === 'hybrid' ? 'websocket' : strategy,
    fallbackStrategy: strategy === 'hybrid' ? 'polling' : undefined,
    pollingInterval,
  })

  useEffect(() => {
    if (realtime.data) {
      setMetrics(realtime.data)
    }
  }, [realtime.data])

  return {
    metrics,
    ...realtime,
  }
}

// Page visibility optimization
export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(typeof document !== 'undefined' ? !document.hidden : true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}

// Network status hook
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true)
  const [connectionType, setConnectionType] = useState<string>('unknown')

  useEffect(() => {
    if (typeof navigator === 'undefined') return
    
    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    
    const updateConnectionType = () => {
      const nav = navigator as Navigator & {
        connection?: { effectiveType?: string }
        mozConnection?: { effectiveType?: string }
        webkitConnection?: { effectiveType?: string }
      }
      
      const connection = nav.connection || nav.mozConnection || nav.webkitConnection
      
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown')
      }
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    
    const nav = navigator as Navigator & { connection?: { addEventListener: Function; removeEventListener: Function } }
    const connection = nav.connection
    if (connection) {
      connection.addEventListener('change', updateConnectionType)
      updateConnectionType()
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
      
      if (connection) {
        connection.removeEventListener('change', updateConnectionType)
      }
    }
  }, [])

  return { isOnline, connectionType }
}