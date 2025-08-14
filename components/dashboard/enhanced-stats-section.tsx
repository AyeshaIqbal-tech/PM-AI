"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatsCard } from './stats-card'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { useRealTimeMetrics } from '@/hooks/use-realtime-data'
import { LoadingWrapper } from '@/components/ui/loading-wrapper'
import { 
  DollarSign, 
  Users, 
  FolderKanban, 
  TrendingUp,
  Target,
  Award,
  Activity,
  Briefcase,
  Zap,
  AlertTriangle
} from 'lucide-react'
import { logger } from '@/lib/logger'

interface EnhancedStatsSectionProps {
  enableRealTime?: boolean
  autoRefresh?: boolean
  refreshInterval?: number
}

export function EnhancedStatsSection({ 
  enableRealTime = false,
  autoRefresh = true,
  refreshInterval = 30000 
}: EnhancedStatsSectionProps) {
  // Get dashboard data with caching and parallel loading
  const { data, isLoading, error, lastUpdated, refresh } = useDashboardData({
    autoRefresh,
    refreshInterval,
    onSuccess: (data) => {
      logger.info('Enhanced stats data loaded', { data }, 'EnhancedStatsSection', 'data-success')
    },
    onError: (error) => {
      logger.error('Enhanced stats error', { error }, 'EnhancedStatsSection', 'data-error')
    }
  })

  // Get real-time metrics if enabled
  const { 
    metrics: realTimeMetrics, 
    activeStrategy, 
    connectionStatus 
  } = useRealTimeMetrics({
    strategy: 'polling',
    pollingInterval: 5000,
  })

  const handleRefresh = React.useCallback(() => {
    logger.info('Refreshing enhanced stats', undefined, 'EnhancedStatsSection', 'refresh-action')
    refresh()
  }, [refresh])

  // Combine static and real-time data
  const combinedStats = React.useMemo(() => {
    const baseStats = data.stats || {} as any
    
    if (enableRealTime && realTimeMetrics) {
      return {
        ...baseStats,
        // Override with real-time data where available
        activeUsers: realTimeMetrics.activeUsers,
        responseTime: realTimeMetrics.responseTime,
        uptime: realTimeMetrics.uptime,
      }
    }
    
    return baseStats
  }, [data.stats, realTimeMetrics, enableRealTime])

  if (error && !data.stats) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Failed to load statistics</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Key Metrics</h2>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {lastUpdated && (
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            )}
            {enableRealTime && (
              <div className="flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${
                  connectionStatus.polling ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`} />
                <span>Real-time: {activeStrategy}</span>
              </div>
            )}
            {error && (
              <span className="text-amber-600">⚠️ Some data may be stale</span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          {enableRealTime && (
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              Live
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Refresh'}
          </button>
        </div>
      </div>

      <LoadingWrapper
        isLoading={isLoading && !data.stats}
        error={null} // We handle errors above
        loadingComponent={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        }
      >
        {/* Primary Metrics Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value={combinedStats.totalRevenue || 0}
            change={12.5}
            changeLabel="from last month"
            icon={DollarSign}
            gradient="from-emerald-500 to-teal-600"
            prefix="$"
            animate
          />
          <StatsCard
            title="Active Projects"
            value={combinedStats.activeProjects || 0}
            change={8.3}
            changeLabel="from last quarter"
            icon={FolderKanban}
            gradient="from-blue-500 to-indigo-600"
            animate
          />
          <StatsCard
            title={enableRealTime ? "Active Users" : "Team Members"}
            value={enableRealTime ? combinedStats.activeUsers || 0 : combinedStats.teamMembers || 0}
            change={5.2}
            changeLabel={enableRealTime ? "current" : "growth this year"}
            icon={Users}
            gradient="from-purple-500 to-pink-600"
            animate
          />
          <StatsCard
            title="Client Satisfaction"
            value={combinedStats.clientSatisfaction ? `${combinedStats.clientSatisfaction.toFixed(1)}%` : '0%'}
            change={2.1}
            changeLabel="improvement"
            icon={Award}
            gradient="from-amber-500 to-orange-600"
          />
        </div>

        {/* Secondary Metrics Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Profit Margin"
            value={combinedStats.profitMargin ? `${combinedStats.profitMargin.toFixed(1)}%` : '0%'}
            change={3.2}
            changeLabel="increase"
            icon={TrendingUp}
            gradient="from-green-500 to-emerald-600"
          />
          <StatsCard
            title="Conversion Rate"
            value={combinedStats.conversionRate ? `${combinedStats.conversionRate.toFixed(1)}%` : '0%'}
            change={-1.2}
            changeLabel="from last month"
            icon={Target}
            gradient="from-red-500 to-rose-600"
          />
          <StatsCard
            title={enableRealTime ? "Response Time" : "Productivity Score"}
            value={enableRealTime ? 
              `${combinedStats.responseTime || 0}ms` : 
              (combinedStats.productivityScore || 0)
            }
            change={enableRealTime ? -8.5 : 4.5}
            changeLabel={enableRealTime ? "faster" : "improvement"}
            icon={enableRealTime ? Zap : Activity}
            gradient="from-cyan-500 to-blue-600"
            suffix={enableRealTime ? "" : "/100"}
            animate
          />
          <StatsCard
            title="Active Clients"
            value={combinedStats.activeClients || 0}
            change={12.8}
            changeLabel="new this quarter"
            icon={Briefcase}
            gradient="from-violet-500 to-purple-600"
            animate
          />
        </div>
      </LoadingWrapper>

      {/* Performance Indicators */}
      {enableRealTime && realTimeMetrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Real-Time Performance</span>
            </CardTitle>
            <CardDescription>Live system performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
                <div className="text-lg font-bold text-blue-700">
                  {realTimeMetrics.requestsPerSecond?.toLocaleString() || 0}
                </div>
                <div className="text-xs text-blue-600">Requests/sec</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
                <div className="text-lg font-bold text-green-700">
                  {realTimeMetrics.errorRate?.toFixed(2) || 0}%
                </div>
                <div className="text-xs text-green-600">Error Rate</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
                <div className="text-lg font-bold text-purple-700">
                  {realTimeMetrics.uptime?.toFixed(2) || 0}%
                </div>
                <div className="text-xs text-purple-600">Uptime</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border">
                <div className="text-lg font-bold text-yellow-700">
                  {realTimeMetrics.serverLoad || 0}%
                </div>
                <div className="text-xs text-yellow-600">Server Load</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 border">
                <div className="text-lg font-bold text-red-700">
                  {realTimeMetrics.responseTime || 0}ms
                </div>
                <div className="text-xs text-red-600">Response Time</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 border">
                <div className="text-lg font-bold text-indigo-700">
                  {realTimeMetrics.lastUpdate ? new Date(realTimeMetrics.lastUpdate).toLocaleTimeString() : 'N/A'}
                </div>
                <div className="text-xs text-indigo-600">Last Update</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}