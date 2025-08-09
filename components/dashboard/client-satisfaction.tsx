"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Star } from 'lucide-react'

const data = [
  { name: 'Excellent (5★)', value: 45, color: '#10b981' },
  { name: 'Good (4★)', value: 32, color: '#3b82f6' },
  { name: 'Average (3★)', value: 15, color: '#f59e0b' },
  { name: 'Poor (2★)', value: 6, color: '#fb923c' },
  { name: 'Bad (1★)', value: 2, color: '#ef4444' },
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function ClientSatisfaction() {
  const averageRating = 4.14
  const totalResponses = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Satisfaction</CardTitle>
        <CardDescription>Customer feedback and ratings distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold">{averageRating}</div>
              <div className="flex items-center justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-4 h-4",
                      star <= Math.floor(averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : star <= averageRating
                        ? "fill-amber-400/50 text-amber-400"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on {totalResponses} responses
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}