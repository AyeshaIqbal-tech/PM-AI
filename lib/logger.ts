"use client"

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  data?: any
  timestamp: Date
  component?: string
  action?: string
}

interface LoggerConfig {
  enabledInProduction: boolean
  enabledLevels: LogLevel[]
  enableConsole: boolean
  enableRemoteLogging: boolean
  remoteEndpoint?: string
  remoteApiKey?: string
  batchSize: number
  flushInterval: number
}

class Logger {
  private config: LoggerConfig
  private logQueue: LogEntry[] = []
  private flushTimer: NodeJS.Timeout | null = null
  private isProduction: boolean

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production'
    
    this.config = {
      enabledInProduction: false, // Disable in production by default
      enabledLevels: this.isProduction 
        ? ['warn', 'error'] 
        : ['debug', 'info', 'warn', 'error'],
      enableConsole: !this.isProduction,
      enableRemoteLogging: this.isProduction,
      remoteEndpoint: process.env.NEXT_PUBLIC_LOGGING_ENDPOINT,
      remoteApiKey: process.env.NEXT_PUBLIC_LOGGING_API_KEY,
      batchSize: 10,
      flushInterval: 30000, // 30 seconds
    }

    // Start batch flushing if remote logging is enabled
    if (this.config.enableRemoteLogging && this.config.remoteEndpoint) {
      this.startBatchFlushing()
    }
  }

  private shouldLog(level: LogLevel): boolean {
    // Don't log in production unless explicitly enabled
    if (this.isProduction && !this.config.enabledInProduction) {
      return false
    }

    return this.config.enabledLevels.includes(level)
  }

  private formatMessage(level: LogLevel, message: string, data?: any, component?: string, action?: string): string {
    const timestamp = new Date().toISOString()
    const componentStr = component ? `[${component}]` : ''
    const actionStr = action ? `[${action}]` : ''
    const dataStr = data ? ` ${JSON.stringify(data, null, 2)}` : ''
    
    return `${timestamp} ${level.toUpperCase()} ${componentStr}${actionStr} ${message}${dataStr}`
  }

  private log(level: LogLevel, message: string, data?: any, component?: string, action?: string): void {
    if (!this.shouldLog(level)) {
      return
    }

    const logEntry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
      component,
      action,
    }

    // Console logging
    if (this.config.enableConsole) {
      const formattedMessage = this.formatMessage(level, message, data, component, action)
      
      switch (level) {
        case 'debug':
          console.debug(formattedMessage)
          break
        case 'info':
          console.info(formattedMessage)
          break
        case 'warn':
          console.warn(formattedMessage)
          break
        case 'error':
          console.error(formattedMessage)
          break
      }
    }

    // Queue for remote logging
    if (this.config.enableRemoteLogging && this.config.remoteEndpoint) {
      this.logQueue.push(logEntry)
      
      // Immediate flush for errors
      if (level === 'error') {
        this.flush()
      } else if (this.logQueue.length >= this.config.batchSize) {
        this.flush()
      }
    }
  }

  private startBatchFlushing(): void {
    this.flushTimer = setInterval(() => {
      if (this.logQueue.length > 0) {
        this.flush()
      }
    }, this.config.flushInterval)
  }

  private async flush(): Promise<void> {
    if (this.logQueue.length === 0 || !this.config.remoteEndpoint || !this.config.remoteApiKey) {
      return
    }

    const batch = this.logQueue.splice(0, this.config.batchSize)

    try {
      await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.remoteApiKey}`,
        },
        body: JSON.stringify({
          logs: batch,
          source: 'dashboard-frontend',
          environment: process.env.NODE_ENV,
        }),
      })
    } catch (error) {
      // Fallback to console if remote logging fails
      if (this.config.enableConsole) {
        console.error('Failed to send logs to remote endpoint:', error)
        console.error('Unsent logs:', batch)
      }
      
      // Put the logs back in the queue for retry
      this.logQueue.unshift(...batch)
    }
  }

  debug(message: string, data?: any, component?: string, action?: string): void {
    this.log('debug', message, data, component, action)
  }

  info(message: string, data?: any, component?: string, action?: string): void {
    this.log('info', message, data, component, action)
  }

  warn(message: string, data?: any, component?: string, action?: string): void {
    this.log('warn', message, data, component, action)
  }

  error(message: string, data?: any, component?: string, action?: string): void {
    this.log('error', message, data, component, action)
  }

  // Utility methods for common logging patterns
  apiRequest(method: string, url: string, data?: any): void {
    this.debug(`API ${method} request to ${url}`, data, 'API', 'request')
  }

  apiResponse(method: string, url: string, status: number, data?: any): void {
    const level = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'debug'
    this.log(level, `API ${method} response from ${url} (${status})`, data, 'API', 'response')
  }

  componentMount(componentName: string, props?: any): void {
    this.debug(`Component mounted: ${componentName}`, props, componentName, 'mount')
  }

  componentUnmount(componentName: string): void {
    this.debug(`Component unmounted: ${componentName}`, undefined, componentName, 'unmount')
  }

  userAction(action: string, data?: any, component?: string): void {
    this.info(`User action: ${action}`, data, component, 'user-action')
  }

  performanceMetric(metric: string, value: number, unit: string, component?: string): void {
    this.debug(`Performance: ${metric} = ${value}${unit}`, { metric, value, unit }, component, 'performance')
  }

  // Clean up resources
  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }
    
    // Flush remaining logs
    if (this.logQueue.length > 0) {
      this.flush()
    }
  }

  // Configuration methods
  setConfig(partialConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...partialConfig }
  }

  getConfig(): LoggerConfig {
    return { ...this.config }
  }

  // Get current queue status
  getQueueStatus(): { count: number; levels: Record<LogLevel, number> } {
    const levels = { debug: 0, info: 0, warn: 0, error: 0 }
    
    this.logQueue.forEach(log => {
      levels[log.level]++
    })

    return {
      count: this.logQueue.length,
      levels,
    }
  }
}

// Global logger instance
export const logger = new Logger()

// Convenience methods for direct use
export const debug = (message: string, data?: any, component?: string, action?: string) =>
  logger.debug(message, data, component, action)

export const info = (message: string, data?: any, component?: string, action?: string) =>
  logger.info(message, data, component, action)

export const warn = (message: string, data?: any, component?: string, action?: string) =>
  logger.warn(message, data, component, action)

export const error = (message: string, data?: any, component?: string, action?: string) =>
  logger.error(message, data, component, action)

// Specialized logging functions
export const logApiRequest = (method: string, url: string, data?: any) =>
  logger.apiRequest(method, url, data)

export const logApiResponse = (method: string, url: string, status: number, data?: any) =>
  logger.apiResponse(method, url, status, data)

export const logComponentMount = (componentName: string, props?: any) =>
  logger.componentMount(componentName, props)

export const logComponentUnmount = (componentName: string) =>
  logger.componentUnmount(componentName)

export const logUserAction = (action: string, data?: any, component?: string) =>
  logger.userAction(action, data, component)

export const logPerformance = (metric: string, value: number, unit: string, component?: string) =>
  logger.performanceMetric(metric, value, unit, component)

export default logger