"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useProjectsData } from '@/hooks/use-dashboard-data'
import { LoadingWrapper } from '@/components/ui/loading-wrapper'
import { SkeletonTable } from '@/components/ui/skeleton'

const statusConfig = {
  'on-track': { label: 'On Track', color: 'bg-success', icon: CheckCircle2 },
  'ahead': { label: 'Ahead', color: 'bg-info', icon: CheckCircle2 },
  'at-risk': { label: 'At Risk', color: 'bg-warning', icon: AlertCircle },
  'delayed': { label: 'Delayed', color: 'bg-destructive', icon: AlertCircle },
}

export function ProjectStatus() {
  const { data: projects, isLoading, error, refetch } = useProjectsData({
    refreshInterval: 5 * 60 * 1000, // 5 minutes refresh
  })

  const handleRefresh = React.useCallback(() => {
    refetch()
  }, [refetch])

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>
              Real-time project tracking and status
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
          isLoading={isLoading && !projects}
          error={error}
          loadingComponent={<SkeletonTable rows={5} />}
          errorComponent={
            <div className="py-8 text-center text-muted-foreground">
              Failed to load project data
            </div>
          }
        >
          <div className="space-y-4">
            {(projects || []).map((project, index) => {
            const status = statusConfig[project.status as keyof typeof statusConfig]
            const StatusIcon = status.icon
            const budgetPercentage = (project.budget.used / project.budget.total) * 100
            
            return (
              <div
                key={project.id}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-sm">{project.name}</h4>
                    <p className="text-xs text-muted-foreground">{project.client}</p>
                  </div>
                  <Badge className={cn(status.color, 'text-white')}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span>{project.team} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>{project.deadline}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground">Budget: </span>
                      <span className={cn(
                        "font-medium",
                        budgetPercentage > 90 ? "text-destructive" : "text-success"
                      )}>
                        ${(project.budget.used / 1000).toFixed(0)}k / ${(project.budget.total / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
            })}
            {(!projects || projects.length === 0) && (
              <div className="py-8 text-center text-muted-foreground">
                No active projects found
              </div>
            )}
          </div>
        </LoadingWrapper>
      </CardContent>
    </Card>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}