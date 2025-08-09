"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const teams = [
  {
    name: 'Development',
    lead: 'Sarah Chen',
    members: 32,
    performance: 92,
    velocity: 'High',
    avatar: 'SC',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Design',
    lead: 'Alex Rivera',
    members: 12,
    performance: 88,
    velocity: 'Medium',
    avatar: 'AR',
    color: 'from-purple-500 to-pink-600',
  },
  {
    name: 'Marketing',
    lead: 'Jordan Smith',
    members: 18,
    performance: 95,
    velocity: 'High',
    avatar: 'JS',
    color: 'from-green-500 to-emerald-600',
  },
  {
    name: 'QA Testing',
    lead: 'Morgan Lee',
    members: 15,
    performance: 87,
    velocity: 'Medium',
    avatar: 'ML',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'DevOps',
    lead: 'Chris Park',
    members: 8,
    performance: 90,
    velocity: 'High',
    avatar: 'CP',
    color: 'from-red-500 to-rose-600',
  },
]

export function TeamPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
        <CardDescription>Department productivity and velocity metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((team, index) => (
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
        </div>
      </CardContent>
    </Card>
  )
}