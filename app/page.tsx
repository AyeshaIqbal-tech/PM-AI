"use client"

import React, { Suspense } from 'react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { useSEO } from '@/hooks/use-seo'
import { 
  DynamicChart,
  DynamicProjectStatus,
  DynamicTeamPerformance,
  DynamicDepartmentMetrics,
  DynamicClientSatisfaction,
} from '@/components/dynamic-wrapper'
import { SkeletonDashboard } from '@/components/ui/skeleton'
import { LoadingWrapper } from '@/components/ui/loading-wrapper'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { logger } from '@/lib/logger'
import { 
  DollarSign, 
  Users, 
  FolderKanban, 
  TrendingUp,
  Target,
  Award,
  Activity,
  Briefcase
} from 'lucide-react'

export default function Home() {
  useSEO()

  const { data, isLoading, error, lastUpdated, refresh } = useDashboardData({
    autoRefresh: true,
    refreshInterval: 30000, // 30 seconds
    onSuccess: (data) => {
      logger.info('Dashboard data loaded successfully', { data }, 'HomePage', 'data-success')
    },
    onError: (error) => {
      logger.error('Dashboard data error', { error }, 'HomePage', 'data-error')
    }
  })
  const handleRefresh = React.useCallback(() => {
    logger.info('Refreshing dashboard data', undefined, 'HomePage', 'refresh-action')
    refresh()
  }, [refresh])

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-lg font-semibold">Failed to load dashboard data</div>
          <p className="text-muted-foreground">{error}</p>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <LoadingWrapper
      isLoading={isLoading && !data.stats}
      loadingComponent={<SkeletonDashboard />}
      minHeight="80vh"
    >
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time insights and comprehensive overview of your organization
              {lastUpdated && (
                <span className="ml-2 text-xs">
                  • Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Refresh'}
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value={data.stats?.totalRevenue || 0}
            change={12.5}
            changeLabel="from last month"
            icon={DollarSign}
            gradient="from-emerald-500 to-teal-600"
            prefix="$"
            animate
          />
          <StatsCard
            title="Active Projects"
            value={data.stats?.activeProjects || 0}
            change={8.3}
            changeLabel="from last quarter"
            icon={FolderKanban}
            gradient="from-blue-500 to-indigo-600"
            animate
          />
          <StatsCard
            title="Team Members"
            value={data.stats?.teamMembers || 0}
            change={5.2}
            changeLabel="growth this year"
            icon={Users}
            gradient="from-purple-500 to-pink-600"
            animate
          />
          <StatsCard
            title="Client Satisfaction"
            value={data.stats?.clientSatisfaction ? `${data.stats.clientSatisfaction.toFixed(1)}%` : '0%'}
            change={2.1}
            changeLabel="improvement"
            icon={Award}
            gradient="from-amber-500 to-orange-600"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Suspense fallback={<div className="skeleton h-96 rounded-lg" />}>
            <DynamicChart />
          </Suspense>
          <Suspense fallback={<div className="skeleton h-96 rounded-lg" />}>
            <DynamicClientSatisfaction />
          </Suspense>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Suspense fallback={<div className="skeleton h-96 rounded-lg" />}>
            <DynamicProjectStatus />
          </Suspense>
          <Suspense fallback={<div className="skeleton h-96 rounded-lg" />}>
            <DynamicTeamPerformance />
          </Suspense>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Suspense fallback={<div className="skeleton h-96 rounded-lg" />}>
            <DynamicDepartmentMetrics />
          </Suspense>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Profit Margin"
            value={data.stats?.profitMargin ? `${data.stats.profitMargin.toFixed(1)}%` : '0%'}
            change={3.2}
            changeLabel="increase"
            icon={TrendingUp}
            gradient="from-green-500 to-emerald-600"
          />
          <StatsCard
            title="Conversion Rate"
            value={data.stats?.conversionRate ? `${data.stats.conversionRate.toFixed(1)}%` : '0%'}
            change={-1.2}
            changeLabel="from last month"
            icon={Target}
            gradient="from-red-500 to-rose-600"
          />
          <StatsCard
            title="Productivity Score"
            value={data.stats?.productivityScore || 0}
            change={4.5}
            changeLabel="improvement"
            icon={Activity}
            gradient="from-cyan-500 to-blue-600"
            suffix="/100"
            animate
          />
          <StatsCard
            title="Active Clients"
            value={data.stats?.activeClients || 0}
            change={12.8}
            changeLabel="new this quarter"
            icon={Briefcase}
            gradient="from-violet-500 to-purple-600"
            animate
          />
        </div>
      </div>
    </LoadingWrapper>
  )
}