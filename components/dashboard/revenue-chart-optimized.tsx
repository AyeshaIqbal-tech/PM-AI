"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SimpleAreaChart } from '@/components/ui/lightweight-chart'
import { formatCurrency } from '@/lib/utils'
import { useRevenueData } from '@/hooks/use-dashboard-data'
import { LoadingWrapper } from '@/components/ui/loading-wrapper'
import { SkeletonChart } from '@/components/ui/skeleton'

export function RevenueChartOptimized() {
  const { data, isLoading, error, refetch } = useRevenueData({
    refreshInterval: 10 * 60 * 1000, // 10 minutes refresh
  })

  const handleRefresh = React.useCallback(() => {
    refetch()
  }, [refetch])

  // Transform data for lightweight chart
  const chartData = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return { revenue: [], profit: [], expenses: [] }
    
    return {
      revenue: data.map(item => ({ x: item.month, y: item.revenue })),
      profit: data.map(item => ({ x: item.month, y: item.profit })),
      expenses: data.map(item => ({ x: item.month, y: item.expenses }))
    }
  }, [data])

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue, profit, and expenses
              {error && <span className="text-red-500 ml-2">• Failed to load data</span>}
            </CardDescription>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <LoadingWrapper
          isLoading={isLoading && !data}
          error={error}
          loadingComponent={<SkeletonChart />}
          errorComponent={
            <div className="h-[350px] flex items-center justify-center text-muted-foreground">
              Failed to load revenue data
            </div>
          }
        >
          <div className="space-y-6">
            {/* Revenue Chart */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Revenue</span>
                <span className="text-sm text-muted-foreground">
                  {chartData.revenue.length > 0 && 
                    formatCurrency(chartData.revenue[chartData.revenue.length - 1]?.y || 0)
                  }
                </span>
              </div>
              <SimpleAreaChart 
                data={chartData.revenue}
                height={100}
                color="#3b82f6"
                fillOpacity={0.3}
              />
            </div>

            {/* Profit Chart */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Profit</span>
                <span className="text-sm text-muted-foreground">
                  {chartData.profit.length > 0 && 
                    formatCurrency(chartData.profit[chartData.profit.length - 1]?.y || 0)
                  }
                </span>
              </div>
              <SimpleAreaChart 
                data={chartData.profit}
                height={100}
                color="#10b981"
                fillOpacity={0.3}
              />
            </div>

            {/* Expenses Chart */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Expenses</span>
                <span className="text-sm text-muted-foreground">
                  {chartData.expenses.length > 0 && 
                    formatCurrency(chartData.expenses[chartData.expenses.length - 1]?.y || 0)
                  }
                </span>
              </div>
              <SimpleAreaChart 
                data={chartData.expenses}
                height={100}
                color="#ef4444"
                fillOpacity={0.3}
              />
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <div className="text-xs text-muted-foreground">Total Revenue</div>
                <div className="text-sm font-medium">
                  {formatCurrency(chartData.revenue.reduce((sum, item) => sum + item.y, 0))}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Profit</div>
                <div className="text-sm font-medium text-green-600">
                  {formatCurrency(chartData.profit.reduce((sum, item) => sum + item.y, 0))}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Expenses</div>
                <div className="text-sm font-medium text-red-600">
                  {formatCurrency(chartData.expenses.reduce((sum, item) => sum + item.y, 0))}
                </div>
              </div>
            </div>
          </div>
        </LoadingWrapper>
      </CardContent>
    </Card>
  )
}