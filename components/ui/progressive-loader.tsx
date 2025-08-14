'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { OrbitLoader, GradientBarLoader } from './modern-loaders'
import { CheckCircle, XCircle, RefreshCcw, Clock } from 'lucide-react'

export interface ProgressiveLoaderProps {
  stages: LoadingStage[]
  currentStage?: number
  progress?: number
  onRetry?: () => void
  onCancel?: () => void
  showProgress?: boolean
  showTime?: boolean
  compact?: boolean
  className?: string
}

export interface LoadingStage {
  id: string
  title: string
  description?: string
  status: 'pending' | 'loading' | 'completed' | 'error'
  duration?: number
}

export interface SmartProgressiveLoaderProps {
  isLoading: boolean
  error?: string | null
  autoStages?: boolean
  estimatedDuration?: number
  onRetry?: () => void
  onCancel?: () => void
  className?: string
}

// Progressive loader with stages
export const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({
  stages,
  currentStage = 0,
  progress = 0,
  onRetry,
  onCancel,
  showProgress = true,
  showTime = true,
  compact = false,
  className
}) => {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const hasActiveStage = stages.some(stage => stage.status === 'loading')
    setIsRunning(hasActiveStage)
  }, [stages])

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isRunning && showTime) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    } else if (!isRunning) {
      setElapsedTime(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, showTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getStageIcon = (stage: LoadingStage) => {
    switch (stage.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'error':
        return <XCircle className="w-5 h-5 text-destructive" />
      case 'loading':
        return <OrbitLoader size="sm" className="w-5 h-5" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-muted" />
    }
  }

  const hasError = stages.some(stage => stage.status === 'error')
  const allCompleted = stages.every(stage => stage.status === 'completed')

  if (compact) {
    return (
      <div className={cn('flex items-center space-x-3', className)}>
        <OrbitLoader size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {stages[currentStage]?.title || 'Loading...'}
          </p>
          {showProgress && (
            <div className="mt-1">
              <div className="w-full bg-muted rounded-full h-1">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
        {showTime && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {formatTime(elapsedTime)}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {hasError ? 'Error Occurred' : allCompleted ? 'Completed' : 'Loading...'}
        </h3>
        {showTime && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {formatTime(elapsedTime)}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div 
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {/* Stages */}
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'flex items-start space-x-3 p-3 rounded-lg transition-colors',
              stage.status === 'loading' && 'bg-primary/5 border border-primary/20',
              stage.status === 'completed' && 'bg-success/5',
              stage.status === 'error' && 'bg-destructive/5'
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getStageIcon(stage)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                'text-sm font-medium',
                stage.status === 'loading' && 'text-foreground',
                stage.status === 'completed' && 'text-success-foreground',
                stage.status === 'error' && 'text-destructive-foreground',
                stage.status === 'pending' && 'text-muted-foreground'
              )}>
                {stage.title}
              </h4>
              {stage.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stage.description}
                </p>
              )}
              {stage.status === 'loading' && stage.duration && (
                <div className="mt-2">
                  <GradientBarLoader size="sm" speed="normal" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      {(hasError || allCompleted) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center space-x-3 mt-6"
        >
          {hasError && onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Retry
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}

// Smart progressive loader with auto-stages
export const SmartProgressiveLoader: React.FC<SmartProgressiveLoaderProps> = ({
  isLoading,
  error,
  autoStages = true,
  estimatedDuration = 5000,
  onRetry,
  onCancel,
  className
}) => {
  const [stages, setStages] = useState<LoadingStage[]>([])
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)

  // Auto-generate stages
  useEffect(() => {
    if (autoStages && isLoading) {
      const defaultStages: LoadingStage[] = [
        {
          id: 'connecting',
          title: 'Establishing Connection',
          description: 'Connecting to server...',
          status: 'loading',
          duration: estimatedDuration * 0.2
        },
        {
          id: 'loading',
          title: 'Loading Data',
          description: 'Fetching and processing information...',
          status: 'pending',
          duration: estimatedDuration * 0.6
        },
        {
          id: 'finalizing',
          title: 'Finalizing',
          description: 'Preparing content for display...',
          status: 'pending',
          duration: estimatedDuration * 0.2
        }
      ]
      
      setStages(defaultStages)
      setCurrentStage(0)
      setProgress(0)
      setStartTime(Date.now())
    }
  }, [isLoading, autoStages, estimatedDuration])

  // Handle error state
  useEffect(() => {
    if (error) {
      setStages(prev => prev.map((stage, index) => ({
        ...stage,
        status: index === currentStage ? 'error' : stage.status
      })))
    }
  }, [error, currentStage])

  // Handle completion
  useEffect(() => {
    if (!isLoading && !error && stages.length > 0) {
      setStages(prev => prev.map(stage => ({
        ...stage,
        status: 'completed'
      })))
      setProgress(100)
    }
  }, [isLoading, error, stages.length])

  // Progress simulation
  useEffect(() => {
    if (!isLoading || !startTime) return

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progressPercent = Math.min((elapsed / estimatedDuration) * 100, 95)
      setProgress(progressPercent)

      // Update stages based on progress
      const stageProgress = progressPercent / 100 * stages.length
      const newCurrentStage = Math.floor(stageProgress)
      
      if (newCurrentStage !== currentStage && newCurrentStage < stages.length) {
        setStages(prev => prev.map((stage, index) => ({
          ...stage,
          status: index < newCurrentStage ? 'completed' : 
                 index === newCurrentStage ? 'loading' : 'pending'
        })))
        setCurrentStage(newCurrentStage)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isLoading, startTime, estimatedDuration, currentStage, stages.length])

  if (!isLoading && !error) return null

  return (
    <ProgressiveLoader
      stages={stages}
      currentStage={currentStage}
      progress={progress}
      onRetry={onRetry}
      onCancel={onCancel}
      className={className}
    />
  )
}

// Loading stage builder utility
export const createLoadingStages = (stagesConfig: Array<{
  id: string
  title: string
  description?: string
  duration?: number
}>): LoadingStage[] => {
  return stagesConfig.map((config, index) => ({
    ...config,
    status: index === 0 ? 'loading' : 'pending' as LoadingStage['status']
  }))
}

// Hook for managing progressive loading
export const useProgressiveLoader = (stages: LoadingStage[]) => {
  const [currentStages, setCurrentStages] = useState(stages)
  const [currentStage, setCurrentStage] = useState(0)

  const advanceStage = () => {
    setCurrentStages(prev => prev.map((stage, index) => ({
      ...stage,
      status: index < currentStage ? 'completed' :
              index === currentStage ? 'completed' :
              index === currentStage + 1 ? 'loading' : 'pending'
    })))
    setCurrentStage(prev => Math.min(prev + 1, stages.length - 1))
  }

  const setStageError = (stageIndex: number, error?: string) => {
    setCurrentStages(prev => prev.map((stage, index) => ({
      ...stage,
      status: index === stageIndex ? 'error' : stage.status,
      description: index === stageIndex && error ? error : stage.description
    })))
  }

  const resetStages = () => {
    setCurrentStages(stages.map((stage, index) => ({
      ...stage,
      status: index === 0 ? 'loading' : 'pending'
    })))
    setCurrentStage(0)
  }

  return {
    stages: currentStages,
    currentStage,
    advanceStage,
    setStageError,
    resetStages
  }
}

// Compound component for easy access
export const ProgressiveLoaders = {
  Progressive: ProgressiveLoader,
  Smart: SmartProgressiveLoader,
  createStages: createLoadingStages,
  useProgressiveLoader,
}