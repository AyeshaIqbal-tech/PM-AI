"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, AlertCircle, CheckCircle2 } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    client: 'RetailCorp',
    progress: 78,
    status: 'on-track',
    team: 12,
    deadline: '2024-03-15',
    budget: { used: 145000, total: 200000 },
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    client: 'FinanceBank',
    progress: 92,
    status: 'ahead',
    team: 8,
    deadline: '2024-02-28',
    budget: { used: 280000, total: 300000 },
  },
  {
    id: 3,
    name: 'Healthcare Dashboard',
    client: 'MediCare Plus',
    progress: 45,
    status: 'at-risk',
    team: 15,
    deadline: '2024-04-30',
    budget: { used: 95000, total: 250000 },
  },
  {
    id: 4,
    name: 'AI Analytics Tool',
    client: 'DataInsights',
    progress: 63,
    status: 'on-track',
    team: 10,
    deadline: '2024-03-31',
    budget: { used: 120000, total: 180000 },
  },
  {
    id: 5,
    name: 'Supply Chain System',
    client: 'LogisticsPro',
    progress: 35,
    status: 'delayed',
    team: 18,
    deadline: '2024-05-15',
    budget: { used: 75000, total: 320000 },
  },
]

const statusConfig = {
  'on-track': { label: 'On Track', color: 'bg-success', icon: CheckCircle2 },
  'ahead': { label: 'Ahead', color: 'bg-info', icon: CheckCircle2 },
  'at-risk': { label: 'At Risk', color: 'bg-warning', icon: AlertCircle },
  'delayed': { label: 'Delayed', color: 'bg-destructive', icon: AlertCircle },
}

export function ProjectStatus() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
        <CardDescription>Real-time project tracking and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, index) => {
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
        </div>
      </CardContent>
    </Card>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}