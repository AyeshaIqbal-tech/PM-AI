"use client"

import React, { memo, useEffect, useState, useCallback } from 'react'
import { Activity, Cpu, HardDrive, Wifi, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PerformanceMetrics {
  fps: number
  memory: number
  latency: number
  cpu: number
}

interface PerformanceMonitorProps {
  className?: string
  compact?: boolean
  showLabels?: boolean
}

// Memoized metric display component
const MetricDisplay = memo(({ 
  icon: Icon, 
  label, 
  value, 
  unit, 
  color 
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  unit: string
  color: string
}) => {
  const getStatusColor = useCallback((val: number, metric: string) => {
    if (metric === 'fps') {
      if (val >= 50) return 'text-success'
      if (val >= 30) return 'text-warning'
      return 'text-destructive'
    }
    if (metric === 'memory' || metric === 'cpu') {
      if (val <= 50) return 'text-success'
      if (val <= 75) return 'text-warning'
      return 'text-destructive'
    }
    if (metric === 'latency') {
      if (val <= 100) return 'text-success'
      if (val <= 300) return 'text-warning'
      return 'text-destructive'
    }
    return 'text-muted-foreground'
  }, [])

  return (
    <div className="flex items-center gap-2">
      <Icon className={cn('w-4 h-4', color)} />
      <span className="text-xs text-muted-foreground">{label}:</span>
      <span className={cn('text-sm font-medium', getStatusColor(value, label.toLowerCase()))}>
        {value}{unit}
      </span>
    </div>
  )
})

MetricDisplay.displayName = 'MetricDisplay'

// Main Performance Monitor Component
export const PerformanceMonitor = memo(({ 
  className, 
  compact = false, 
  showLabels = true 
}: PerformanceMonitorProps) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    latency: 0,
    cpu: 0,
  })
  const [isVisible, setIsVisible] = useState(true)

  // Calculate FPS
  const calculateFPS = useCallback(() => {
    let lastTime = performance.now()
    let frames = 0
    let fps = 60

    const frame = () => {
      frames++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime))
        frames = 0
        lastTime = currentTime
        
        setMetrics(prev => ({ ...prev, fps }))
      }
      
      if (isVisible) {
        requestAnimationFrame(frame)
      }
    }
    
    requestAnimationFrame(frame)
  }, [isVisible])

  // Calculate memory usage (if available)
  const calculateMemory = useCallback(() => {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory
      const usedMemory = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit * 100
      setMetrics(prev => ({ ...prev, memory: Math.round(usedMemory) }))
    }
  }, [])

  // Simulate network latency
  const calculateLatency = useCallback(async () => {
    const start = performance.now()
    try {
      await fetch('/api/health', { method: 'HEAD' }).catch(() => {})
      const latency = Math.round(performance.now() - start)
      setMetrics(prev => ({ ...prev, latency }))
    } catch {
      // Fallback for demo
      setMetrics(prev => ({ ...prev, latency: Math.round(50 + Math.random() * 100) }))
    }
  }, [])

  // Simulate CPU usage
  const calculateCPU = useCallback(() => {
    // This is a simulated value for demo purposes
    // In a real app, you'd get this from a backend monitoring service
    const cpu = Math.round(20 + Math.random() * 40)
    setMetrics(prev => ({ ...prev, cpu }))
  }, [])

  useEffect(() => {
    if (!isVisible) return

    calculateFPS()
    
    const interval = setInterval(() => {
      calculateMemory()
      calculateLatency()
      calculateCPU()
    }, 2000)

    return () => clearInterval(interval)
  }, [isVisible, calculateFPS, calculateMemory, calculateLatency, calculateCPU])

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 p-2 rounded-lg bg-card border border-border shadow-lg hover:bg-muted transition-colors"
        aria-label="Show performance monitor"
      >
        <Activity className="w-4 h-4" />
      </button>
    )
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 p-4 rounded-lg',
        'bg-card border border-border shadow-lg',
        'transition-all duration-300',
        compact ? 'min-w-[200px]' : 'min-w-[300px]',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Performance metrics"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Performance</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded hover:bg-muted transition-colors"
          aria-label="Hide performance monitor"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      
      <div className={cn('space-y-2', compact && 'space-y-1')}>
        <MetricDisplay
          icon={Activity}
          label={showLabels ? 'FPS' : ''}
          value={metrics.fps}
          unit="fps"
          color="text-primary"
        />
        {!compact && (
          <>
            <MetricDisplay
              icon={HardDrive}
              label={showLabels ? 'Memory' : ''}
              value={metrics.memory}
              unit="%"
              color="text-blue-500"
            />
            <MetricDisplay
              icon={Wifi}
              label={showLabels ? 'Latency' : ''}
              value={metrics.latency}
              unit="ms"
              color="text-purple-500"
            />
            <MetricDisplay
              icon={Cpu}
              label={showLabels ? 'CPU' : ''}
              value={metrics.cpu}
              unit="%"
              color="text-orange-500"
            />
          </>
        )}
      </div>
    </div>
  )
})

PerformanceMonitor.displayName = 'PerformanceMonitor'

// Hook for performance optimization
export function usePerformanceOptimization() {
  const [shouldOptimize, setShouldOptimize] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const checkPerformance = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        const fps = (frameCount * 1000) / (currentTime - lastTime)
        setShouldOptimize(fps < 30)
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(checkPerformance)
    }

    const rafId = requestAnimationFrame(checkPerformance)
    
    return () => cancelAnimationFrame(rafId)
  }, [])

  return shouldOptimize
}