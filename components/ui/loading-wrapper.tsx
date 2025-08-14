"use client"

import React from 'react'
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface LoadingWrapperProps {
  isLoading: boolean
  error?: string | null
  onRetry?: () => void
  loadingComponent?: React.ReactNode
  errorComponent?: React.ReactNode
  children: React.ReactNode
  className?: string
  showError?: boolean
  minHeight?: string
}

export function LoadingWrapper({
  isLoading,
  error,
  onRetry,
  loadingComponent,
  errorComponent,
  children,
  className,
  showError = true,
  minHeight = '200px',
}: LoadingWrapperProps) {
  if (isLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>
    }

    return (
      <div
        className={cn(
          'flex items-center justify-center',
          className
        )}
        style={{ minHeight }}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (error && showError) {
    if (errorComponent) {
      return <>{errorComponent}</>
    }

    return (
      <div
        className={cn(
          'flex items-center justify-center',
          className
        )}
        style={{ minHeight }}
        role="alert"
        aria-live="assertive"
      >
        <Card className="p-6 max-w-md w-full">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-destructive/10">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Error Loading Data</h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            )}
          </div>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

// Inline loading indicator for smaller components
export function InlineLoading({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{text}</span>
    </div>
  )
}

// Full page loading
export function PageLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-lg font-medium">Loading dashboard...</p>
      </div>
    </div>
  )
}