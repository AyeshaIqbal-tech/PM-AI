"use client"

import { logger } from './logger'

// Enhanced error handling system for the dashboard
export interface ErrorContext {
  component?: string
  action?: string
  userId?: string
  sessionId?: string
  userAgent?: string
  url?: string
  timestamp: Date
  retryCount?: number
  stackTrace?: string
}

export interface RetryConfig {
  maxAttempts: number
  baseDelay: number
  maxDelay: number
  backoffMultiplier: number
  jitter: boolean
  retryCondition?: (error: Error, attempt: number) => boolean
}

export interface ErrorHandlerOptions {
  logErrors?: boolean
  reportToService?: boolean
  showUserNotification?: boolean
  fallbackData?: unknown
  retry?: Partial<RetryConfig>
}

// Error types for better categorization
export class NetworkError extends Error {
  constructor(message: string, public statusCode?: number, public response?: unknown) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Authentication failed') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = 'Access denied') {
    super(message)
    this.name = 'AuthorizationError'
  }
}

export class RateLimitError extends Error {
  constructor(message: string = 'Rate limit exceeded', public retryAfter?: number) {
    super(message)
    this.name = 'RateLimitError'
  }
}

export class CacheError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CacheError'
  }
}

// Circuit breaker implementation
export class CircuitBreaker {
  private failures = 0
  private lastFailureTime = 0
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED'

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000, // 1 minute
    private monitoringPeriod: number = 10000 // 10 seconds
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime < this.timeout) {
        throw new Error('Circuit breaker is OPEN - operation rejected')
      } else {
        this.state = 'HALF_OPEN'
      }
    }

    try {
      const result = await operation()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess(): void {
    this.failures = 0
    this.state = 'CLOSED'
  }

  private onFailure(): void {
    this.failures++
    this.lastFailureTime = Date.now()

    if (this.failures >= this.threshold) {
      this.state = 'OPEN'
    }
  }

  getState(): string {
    return this.state
  }

  getFailureCount(): number {
    return this.failures
  }

  reset(): void {
    this.failures = 0
    this.state = 'CLOSED'
    this.lastFailureTime = 0
  }
}

// Retry mechanism with exponential backoff
export class RetryManager {
  private defaultConfig: RetryConfig = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2,
    jitter: true,
    retryCondition: (error: Error, attempt: number) => {
      // Don't retry validation errors or auth errors
      if (error instanceof ValidationError || 
          error instanceof AuthenticationError ||
          error instanceof AuthorizationError) {
        return false
      }
      
      // Don't retry rate limit errors unless we have retryAfter info
      if (error instanceof RateLimitError && !error.retryAfter) {
        return false
      }
      
      return attempt <= this.defaultConfig.maxAttempts
    }
  }

  async execute<T>(
    operation: () => Promise<T>,
    config: Partial<RetryConfig> = {}
  ): Promise<T> {
    const finalConfig = { ...this.defaultConfig, ...config }
    let lastError: Error
    let attempt = 1

    while (attempt <= finalConfig.maxAttempts) {
      try {
        return await operation()
      } catch (error) {
        lastError = error as Error
        
        if (!finalConfig.retryCondition?.(lastError, attempt)) {
          throw lastError
        }

        if (attempt === finalConfig.maxAttempts) {
          throw lastError
        }

        // Wait before retry
        const delay = this.calculateDelay(attempt, finalConfig)
        await this.wait(delay)
        
        console.log(`Retrying operation (attempt ${attempt + 1}/${finalConfig.maxAttempts})...`)
        attempt++
      }
    }

    throw lastError!
  }

  private calculateDelay(attempt: number, config: RetryConfig): number {
    let delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt - 1)
    delay = Math.min(delay, config.maxDelay)
    
    if (config.jitter) {
      // Add random jitter to prevent thundering herd
      delay = delay * (0.5 + Math.random() * 0.5)
    }
    
    return delay
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Error reporter for external services
export class ErrorReporter {
  private queue: Array<{error: Error; context: ErrorContext}> = []
  private isProcessing = false

  constructor(
    private endpoint?: string,
    private apiKey?: string,
    private batchSize: number = 10,
    private flushInterval: number = 30000 // 30 seconds
  ) {
    this.startBatchProcessor()
  }

  async report(error: Error, context: ErrorContext): Promise<void> {
    this.queue.push({ error, context })
    
    if (this.queue.length >= this.batchSize) {
      await this.flush()
    }
  }

  private startBatchProcessor(): void {
    setInterval(() => {
      if (this.queue.length > 0) {
        this.flush()
      }
    }, this.flushInterval)
  }

  private async flush(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return
    }

    this.isProcessing = true
    const batch = this.queue.splice(0, this.batchSize)

    try {
      if (this.endpoint && this.apiKey) {
        await this.sendToService(batch)
      }
      
      // Also log to console in development
      if (process.env.NODE_ENV === 'development') {
        batch.forEach(({ error, context }) => {
          logger.error('Error Report', {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack,
            context
          }, 'ErrorReporter', 'batch-report')
        })
      }
    } catch (reportingError) {
      logger.error('Failed to report errors', { error: reportingError }, 'ErrorReporter', 'report-failure')
      // Put the batch back in queue for retry
      this.queue.unshift(...batch)
    } finally {
      this.isProcessing = false
    }
  }

  private async sendToService(
    batch: Array<{error: Error; context: ErrorContext}>
  ): Promise<void> {
    if (!this.endpoint || !this.apiKey) return

    const payload = {
      errors: batch.map(({ error, context }) => ({
        name: error.name,
        message: error.message,
        stack: error.stack,
        context,
      })),
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new NetworkError(`Error reporting failed: ${response.status}`, response.status)
    }
  }
}

// Main error handler class
export class ErrorHandler {
  private retryManager = new RetryManager()
  private circuitBreaker = new CircuitBreaker()
  private errorReporter = new ErrorReporter(
    process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT,
    process.env.NEXT_PUBLIC_ERROR_REPORTING_KEY
  )

  async handleError(
    error: Error,
    context: ErrorContext,
    options: ErrorHandlerOptions = {}
  ): Promise<any> {
    const {
      logErrors = true,
      reportToService = true,
      showUserNotification = true,
      fallbackData = null,
    } = options

    // Enrich context
    const enrichedContext: ErrorContext = {
      ...context,
      timestamp: new Date(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      stackTrace: error.stack,
    }

    // Log error if enabled
    if (logErrors) {
      this.logError(error, enrichedContext)
    }

    // Report to external service if enabled
    if (reportToService) {
      try {
        await this.errorReporter.report(error, enrichedContext)
      } catch (reportingError) {
        console.error('Failed to report error:', reportingError)
      }
    }

    // Show user notification if enabled
    if (showUserNotification && typeof window !== 'undefined') {
      this.showUserNotification(error)
    }

    // Return fallback data if provided
    return fallbackData
  }

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    context: Partial<ErrorContext> = {},
    retryConfig: Partial<RetryConfig> = {},
    options: ErrorHandlerOptions = {}
  ): Promise<T> {
    try {
      return await this.circuitBreaker.execute(async () => {
        return await this.retryManager.execute(operation, retryConfig)
      })
    } catch (error) {
      return await this.handleError(
        error as Error,
        { 
          component: 'RetryManager',
          action: 'executeWithRetry',
          ...context,
          retryCount: retryConfig.maxAttempts || 3,
        } as ErrorContext,
        options
      )
    }
  }

  async executeWithCircuitBreaker<T>(
    operation: () => Promise<T>,
    context: Partial<ErrorContext> = {},
    options: ErrorHandlerOptions = {}
  ): Promise<T> {
    try {
      return await this.circuitBreaker.execute(operation)
    } catch (error) {
      return await this.handleError(
        error as Error,
        {
          component: 'CircuitBreaker',
          action: 'executeWithCircuitBreaker',
          ...context,
        } as ErrorContext,
        options
      )
    }
  }

  private logError(error: Error, context: ErrorContext): void {
    const logLevel = this.getLogLevel(error)
    const logMessage = {
      level: logLevel,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      context,
    }

    // Use the logger system instead of direct console calls
    logger[logLevel]('ErrorHandler log', logMessage, 'ErrorHandler', 'log')
  }

  private getLogLevel(error: Error): 'error' | 'warn' | 'info' | 'debug' {
    if (error instanceof NetworkError) {
      return error.statusCode && error.statusCode >= 500 ? 'error' : 'warn'
    }
    
    if (error instanceof ValidationError) {
      return 'warn'
    }
    
    if (error instanceof AuthenticationError || error instanceof AuthorizationError) {
      return 'warn'
    }
    
    if (error instanceof RateLimitError) {
      return 'info'
    }
    
    return 'error'
  }

  private showUserNotification(error: Error): void {
    // This would integrate with your toast/notification system
    const message = this.getUserFriendlyMessage(error)
    
    // Dispatch custom event that can be caught by notification system
    const event = new CustomEvent('dashboard:error', {
      detail: {
        type: 'error',
        message,
        error,
      }
    })
    
    window.dispatchEvent(event)
  }

  private getUserFriendlyMessage(error: Error): string {
    if (error instanceof NetworkError) {
      if (error.statusCode === 404) {
        return 'The requested data could not be found.'
      }
      if (error.statusCode === 429) {
        return 'Too many requests. Please try again later.'
      }
      if (error.statusCode && error.statusCode >= 500) {
        return 'Server error. Please try again later.'
      }
      return 'Network error. Please check your connection.'
    }
    
    if (error instanceof AuthenticationError) {
      return 'Please log in to continue.'
    }
    
    if (error instanceof AuthorizationError) {
      return 'You do not have permission to access this resource.'
    }
    
    if (error instanceof ValidationError) {
      return error.message || 'Invalid data provided.'
    }
    
    if (error instanceof RateLimitError) {
      return 'Rate limit exceeded. Please try again later.'
    }
    
    return 'An unexpected error occurred. Please try again.'
  }

  getStats(): {
    circuitBreakerState: string
    circuitBreakerFailures: number
  } {
    return {
      circuitBreakerState: this.circuitBreaker.getState(),
      circuitBreakerFailures: this.circuitBreaker.getFailureCount(),
    }
  }

  reset(): void {
    this.circuitBreaker.reset()
  }
}

// Global error handler instance
export const errorHandler = new ErrorHandler()

// Utility functions for common error scenarios
export const ErrorUtils = {
  isNetworkError: (error: Error): error is NetworkError => 
    error instanceof NetworkError,

  isTemporaryError: (error: Error): boolean => 
    error instanceof NetworkError && 
    error.statusCode !== undefined && 
    (error.statusCode >= 500 || error.statusCode === 429),

  isRetryableError: (error: Error): boolean => 
    !(error instanceof ValidationError || 
      error instanceof AuthenticationError || 
      error instanceof AuthorizationError),

  createErrorFromResponse: async (response: Response): Promise<NetworkError> => {
    const text = await response.text().catch(() => 'Unknown error')
    let parsedError: unknown = text
    
    try {
      parsedError = JSON.parse(text)
    } catch {
      // Keep as text if not JSON
    }
    
    return new NetworkError(
      (parsedError as { message?: string })?.message || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      parsedError
    )
  },

  wrapAsyncFunction: <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    context: Partial<ErrorContext> = {},
    options: ErrorHandlerOptions = {}
  ): T => {
    return (async (...args: Parameters<T>) => {
      try {
        return await fn(...args)
      } catch (error) {
        return await errorHandler.handleError(
          error as Error,
          {
            component: fn.name || 'Anonymous',
            action: 'function execution',
            ...context,
          } as ErrorContext,
          options
        )
      }
    }) as T
  },
}

// Error boundary for React components
export const createErrorBoundary = (options: ErrorHandlerOptions = {}) => {
  return class ErrorBoundary extends Error {
    constructor(error: Error, errorInfo: any) {
      super(error.message)
      
      errorHandler.handleError(error, {
        component: 'ErrorBoundary',
        action: 'componentDidCatch',
        stackTrace: errorInfo.componentStack,
      } as ErrorContext, options)
    }
  }
}

// Hook for handling errors in React components
export const useErrorHandler = (
  context: Partial<ErrorContext> = {},
  options: ErrorHandlerOptions = {}
) => {
  return {
    handleError: (error: Error) => 
      errorHandler.handleError(error, context as ErrorContext, options),
    
    executeWithRetry: <T>(operation: () => Promise<T>, retryConfig?: Partial<RetryConfig>) =>
      errorHandler.executeWithRetry(operation, context, retryConfig, options),
    
    executeWithCircuitBreaker: <T>(operation: () => Promise<T>) =>
      errorHandler.executeWithCircuitBreaker(operation, context, options),
  }
}