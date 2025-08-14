"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useTeamsData } from '@/hooks/use-dashboard-data'
import { LoadingWrapper } from '@/components/ui/loading-wrapper'
import { SkeletonTable } from '@/components/ui/skeleton'

export function TeamPerformance() {
  const { data: teams, isLoading, error, refetch } = useTeamsData({
    refreshInterval: 8 * 60 * 1000, // 8 minutes refresh
  })

  const handleRefresh = React.useCallback(() => {
    refetch()
  }, [refetch])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>
              Department productivity and velocity metrics
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
          isLoading={isLoading && !teams}
          error={error}
          loadingComponent={<SkeletonTable rows={5} />}
          errorComponent={
            <div className="py-8 text-center text-muted-foreground">
              Failed to load team data
            </div>
          }
        >
          <div className="space-y-4">
            {(teams || []).map((team, index) => (
            <div
              key={team.name}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Avatar className={`bg-gradient-to-br ${team.color}`}>
                <span className="text-white text-sm font-semibold">{team.avatar}</span>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{team.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {team.lead} • {team.members} members
                    </p>
                  </div>
                  <Badge 
                    variant={team.velocity === 'High' ? 'success' : 'warning'}
                    className="text-xs"
                  >
                    {team.velocity}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Progress value={team.performance} className="flex-1 h-2" />
                  <span className="text-xs font-medium w-10 text-right">
                    {team.performance}%
                  </span>
                </div>
              </div>
            </div>
            ))}
            {(!teams || teams.length === 0) && (
              <div className="py-8 text-center text-muted-foreground">
                No team data available
              </div>
            )}
          </div>
        </LoadingWrapper>
      </CardContent>
    </Card>
  )
}