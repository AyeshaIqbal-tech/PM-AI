'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PulseLoader, WaveLoader, OrbitLoader } from './modern-loaders'

export interface LoadingOverlayProps {
  isLoading: boolean
  message?: string
  children?: React.ReactNode
  blur?: boolean
  darken?: boolean
  loader?: 'pulse' | 'wave' | 'orbit'
  className?: string
}

export interface FullPageOverlayProps extends Omit<LoadingOverlayProps, 'children'> {
  zIndex?: number
}

export interface SectionOverlayProps extends LoadingOverlayProps {}

export interface InlineButtonLoaderProps {
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  className?: string
  disabled?: boolean
}

export interface CardLoadingOverlayProps extends LoadingOverlayProps {
  rounded?: boolean
}

export interface ListItemLoaderProps {
  count: number
  delay?: number
  className?: string
}

// Full page overlay with blur backdrop
export const FullPageOverlay: React.FC<FullPageOverlayProps> = ({
  isLoading,
  message = 'Loading...',
  blur = true,
  darken = true,
  loader = 'orbit',
  zIndex = 50,
  className
}) => {
  const LoaderComponent = {
    pulse: PulseLoader,
    wave: WaveLoader,
    orbit: OrbitLoader
  }[loader]

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed inset-0 flex flex-col items-center justify-center',
            blur && 'backdrop-blur-sm',
            darken && 'bg-background/80',
            className
          )}
          style={{ zIndex }}
          role="status"
          aria-live="polite"
          aria-label={message}
        >
          <div className="flex flex-col items-center space-y-4">
            <LoaderComponent size="lg" />
            <motion.p 
              className="text-lg font-medium text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {message}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Section-specific overlay
export const SectionOverlay: React.FC<SectionOverlayProps> = ({
  isLoading,
  message = 'Loading...',
  children,
  blur = true,
  darken = true,
  loader = 'pulse',
  className
}) => {
  const LoaderComponent = {
    pulse: PulseLoader,
    wave: WaveLoader,
    orbit: OrbitLoader
  }[loader]

  return (
    <div className={cn('relative', className)}>
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center rounded-lg',
              blur && 'backdrop-blur-sm',
              darken && 'bg-background/80'
            )}
            role="status"
            aria-live="polite"
            aria-label={message}
          >
            <div className="flex flex-col items-center space-y-3">
              <LoaderComponent size="md" />
              <motion.p 
                className="text-sm font-medium text-muted-foreground"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {message}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Inline button loader
export const InlineButtonLoader: React.FC<InlineButtonLoaderProps> = ({
  isLoading,
  children,
  loadingText = 'Loading...',
  className,
  disabled = false
}) => {
  return (
    <button
      className={cn(
        'relative flex items-center justify-center gap-2 transition-all duration-200',
        isLoading && 'cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <PulseLoader size="sm" />
            <span>{loadingText}</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

// Card loading overlay
export const CardLoadingOverlay: React.FC<CardLoadingOverlayProps> = ({
  isLoading,
  message = 'Loading...',
  children,
  blur = true,
  darken = true,
  loader = 'pulse',
  rounded = true,
  className
}) => {
  const LoaderComponent = {
    pulse: PulseLoader,
    wave: WaveLoader,
    orbit: OrbitLoader
  }[loader]

  return (
    <div className={cn('relative', className)}>
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center',
              blur && 'backdrop-blur-sm',
              darken && 'bg-card/90',
              rounded && 'rounded-lg'
            )}
            role="status"
            aria-live="polite"
            aria-label={message}
          >
            <div className="flex flex-col items-center space-y-3">
              <LoaderComponent size="md" />
              <motion.p 
                className="text-sm font-medium text-card-foreground"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {message}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// List item staggered loader
export const ListItemLoader: React.FC<ListItemLoaderProps> = ({
  count,
  delay = 100,
  className
}) => {
  return (
    <div className={cn('space-y-3', className)} role="status" aria-label="Loading list items">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            delay: index * (delay / 1000),
            ease: 'easeOut'
          }}
          className="flex items-center space-x-3 p-4 bg-card rounded-lg border"
        >
          {/* Avatar skeleton */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-muted rounded-full animate-shimmer" />
          </div>
          
          {/* Content skeleton */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded animate-shimmer w-3/4" />
            <div className="h-3 bg-muted rounded animate-shimmer w-1/2" />
          </div>
          
          {/* Action skeleton */}
          <div className="flex-shrink-0">
            <div className="w-20 h-8 bg-muted rounded animate-shimmer" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Skeleton loader for text content
export const TextSkeleton: React.FC<{
  lines?: number
  className?: string
}> = ({ lines = 3, className }) => {
  return (
    <div className={cn('space-y-2', className)} role="status" aria-label="Loading content">
      {[...Array(lines)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            ease: 'easeOut'
          }}
          className={cn(
            'h-4 bg-muted rounded animate-shimmer',
            index === lines - 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

// Grid skeleton loader
export const GridSkeleton: React.FC<{
  columns?: number
  rows?: number
  className?: string
}> = ({ columns = 3, rows = 2, className }) => {
  return (
    <div 
      className={cn('grid gap-4', className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      role="status" 
      aria-label="Loading grid"
    >
      {[...Array(rows * columns)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: (index * 50) / 1000,
            ease: 'easeOut'
          }}
          className="aspect-square bg-muted rounded-lg animate-shimmer"
        />
      ))}
    </div>
  )
}

// Compound component for easy access
export const LoadingOverlays = {
  FullPage: FullPageOverlay,
  Section: SectionOverlay,
  InlineButton: InlineButtonLoader,
  Card: CardLoadingOverlay,
  ListItem: ListItemLoader,
  TextSkeleton,
  GridSkeleton,
}