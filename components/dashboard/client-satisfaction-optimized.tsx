"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SimplePieChart } from '@/components/ui/lightweight-chart'
import { Star } from 'lucide-react'
import { useClientSatisfactionData } from '@/hooks/use-dashboard-data'
import { LoadingWrapper } from '@/components/ui/loading-wrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function ClientSatisfactionOptimized() {
  const { data, isLoading, error } = useClientSatisfactionData({
    refreshInterval: 5 * 60 * 1000, // 5 minutes refresh
  })

  const averageRating = data?.averageRating || 0
  const totalResponses = data?.totalResponses || 0
  const distribution = data?.distribution || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Satisfaction</CardTitle>
        <CardDescription>
          Based on {totalResponses} responses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoadingWrapper
          isLoading={isLoading && !data}
          error={error}
          loadingComponent={
            <div className="space-y-4">
              <Skeleton className="h-[200px] w-[200px] mx-auto rounded-full" />
              <Skeleton className="h-4 w-32 mx-auto" />
              <Skeleton className="h-2 w-48 mx-auto" />
            </div>
          }
        >
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="flex justify-center">
              <SimplePieChart 
                data={distribution}
                size={200}
                showLabels={true}
              />
            </div>

            {/* Average Rating */}
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-5 h-5",
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Average rating
              </p>
            </div>

            {/* Distribution Legend */}
            <div className="space-y-2">
              {distribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {item.value} ({((item.value / totalResponses) * 100).toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <div className="text-xs text-muted-foreground">Total Responses</div>
                <div className="text-lg font-semibold">{totalResponses}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
                <div className="text-lg font-semibold">
                  {((averageRating / 5) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </LoadingWrapper>
      </CardContent>
    </Card>
  )
}