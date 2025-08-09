"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Code2, Users, TestTube, GitBranch, TrendingUp, Shield } from 'lucide-react'

const departmentData = {
  development: [
    { metric: 'Code Quality', value: 92 },
    { metric: 'Sprint Velocity', value: 87 },
    { metric: 'Bug Resolution', value: 95 },
    { metric: 'Tech Debt', value: 78 },
    { metric: 'Innovation', value: 88 },
  ],
  hr: [
    { metric: 'Retention Rate', value: 94 },
    { metric: 'Hiring Speed', value: 82 },
    { metric: 'Training Score', value: 90 },
    { metric: 'Satisfaction', value: 88 },
    { metric: 'Diversity', value: 85 },
  ],
  qa: [
    { metric: 'Test Coverage', value: 96 },
    { metric: 'Automation', value: 84 },
    { metric: 'Bug Detection', value: 91 },
    { metric: 'Release Quality', value: 93 },
    { metric: 'Performance', value: 89 },
  ],
  devops: [
    { metric: 'Uptime', value: 99.9 },
    { metric: 'Deploy Speed', value: 92 },
    { metric: 'Recovery Time', value: 88 },
    { metric: 'Security Score', value: 94 },
    { metric: 'Cost Efficiency', value: 86 },
  ],
}

const radarData = [
  { department: 'Development', A: 88, B: 92, C: 85, D: 90, E: 87, fullMark: 100 },
  { department: 'HR', A: 94, B: 85, C: 88, D: 82, E: 90, fullMark: 100 },
  { department: 'QA', A: 91, B: 96, C: 89, D: 93, E: 84, fullMark: 100 },
  { department: 'DevOps', A: 99, B: 88, C: 86, D: 94, E: 92, fullMark: 100 },
  { department: 'Marketing', A: 85, B: 89, C: 92, D: 87, E: 90, fullMark: 100 },
]

export function DepartmentMetrics() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators by department</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="development" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="development" className="text-xs">
                <Code2 className="w-3 h-3 mr-1" />
                Development
              </TabsTrigger>
              <TabsTrigger value="hr" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                HR
              </TabsTrigger>
              <TabsTrigger value="qa" className="text-xs">
                <TestTube className="w-3 h-3 mr-1" />
                QA
              </TabsTrigger>
              <TabsTrigger value="devops" className="text-xs">
                <GitBranch className="w-3 h-3 mr-1" />
                DevOps
              </TabsTrigger>
            </TabsList>

            {Object.entries(departmentData).map(([key, data]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="metric"
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: 'currentColor' }}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="url(#colorGradient)"
                      radius={[8, 8, 0, 0]}
                      animationDuration={1000}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cross-Department Comparison</CardTitle>
          <CardDescription>Comparative analysis across all departments</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid className="stroke-muted" />
              <PolarAngleAxis dataKey="department" className="text-xs" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
              />
              <Radar
                name="Quality"
                dataKey="B"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.2}
              />
              <Radar
                name="Efficiency"
                dataKey="C"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}