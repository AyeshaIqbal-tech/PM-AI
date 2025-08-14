"use client"

import dynamic from 'next/dynamic'
import React, { ComponentType } from 'react'
import { SkeletonCard, SkeletonChart, SkeletonTable } from '@/components/ui/skeleton'
import { LoadingWrapper } from '@/components/ui/loading-wrapper'

interface DynamicComponentOptions {
  loading?: () => JSX.Element | null
  ssr?: boolean
  suspense?: boolean
}

// Helper function to create dynamic imports with proper loading states
export function createDynamicComponent<P = {}>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: DynamicComponentOptions = {}
) {
  const { loading = () => <SkeletonCard />, ssr = true, suspense = false } = options

  return dynamic(importFn, {
    loading,
    ssr,
    suspense,
  })
}

// Pre-configured dynamic imports for common dashboard components
export const DynamicChart = dynamic(
  async () => {
    const { RevenueChartOptimized } = await import('@/components/dashboard/revenue-chart-optimized')
    return RevenueChartOptimized
  },
  { loading: () => <SkeletonChart />, ssr: false }
)

export const DynamicProjectStatus = dynamic(
  async () => {
    const { ProjectStatus } = await import('@/components/dashboard/project-status')
    return ProjectStatus
  },
  { loading: () => <SkeletonTable rows={3} />, ssr: false }
)

export const DynamicTeamPerformance = dynamic(
  async () => {
    const { TeamPerformance } = await import('@/components/dashboard/team-performance')
    return TeamPerformance
  },
  { loading: () => <SkeletonChart />, ssr: false }
)

export const DynamicDepartmentMetrics = dynamic(
  async () => {
    const { DepartmentMetrics } = await import('@/components/dashboard/department-metrics')
    return DepartmentMetrics
  },
  { loading: () => <SkeletonTable rows={4} />, ssr: false }
)

export const DynamicClientSatisfaction = dynamic(
  async () => {
    const { ClientSatisfactionOptimized } = await import('@/components/dashboard/client-satisfaction-optimized')
    return ClientSatisfactionOptimized
  },
  { loading: () => <SkeletonChart />, ssr: false }
)

// Wrapper component for lazy loading with error boundary
interface LazyComponentProps {
  componentName: string
  fallback?: React.ReactNode
  errorFallback?: React.ReactNode
  [key: string]: any
}

export function LazyComponent({
  componentName,
  fallback = <SkeletonCard />,
  errorFallback,
  ...props
}: LazyComponentProps) {
  const [Component, setComponent] = React.useState<ComponentType | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadComponent = async () => {
      try {
        setIsLoading(true)
        const mod = await import(`@/components/dashboard/${componentName}`)
        const ComponentClass = mod.default || mod[componentName]
        
        if (!ComponentClass) {
          throw new Error(`Component ${componentName} not found in module`)
        }
        
        setComponent(() => ComponentClass)
      } catch (err) {
        console.error(`Failed to load component ${componentName}:`, err)
        setError(err instanceof Error ? err.message : 'Failed to load component')
      } finally {
        setIsLoading(false)
      }
    }

    loadComponent()
  }, [componentName])

  return (
    <LoadingWrapper
      isLoading={isLoading}
      error={error}
      loadingComponent={fallback}
      errorComponent={errorFallback}
    >
      {Component && <Component {...props} />}
    </LoadingWrapper>
  )
}