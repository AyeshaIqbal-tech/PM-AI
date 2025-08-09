"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'
import { formatCurrency } from '@/lib/utils'

const data = [
  { month: 'Jan', revenue: 186000, profit: 42000, expenses: 144000 },
  { month: 'Feb', revenue: 205000, profit: 52000, expenses: 153000 },
  { month: 'Mar', revenue: 237000, profit: 68000, expenses: 169000 },
  { month: 'Apr', revenue: 273000, profit: 85000, expenses: 188000 },
  { month: 'May', revenue: 309000, profit: 102000, expenses: 207000 },
  { month: 'Jun', revenue: 342000, profit: 118000, expenses: 224000 },
  { month: 'Jul', revenue: 378000, profit: 135000, expenses: 243000 },
  { month: 'Aug', revenue: 412000, profit: 152000, expenses: 260000 },
  { month: 'Sep', revenue: 445000, profit: 168000, expenses: 277000 },
  { month: 'Oct', revenue: 478000, profit: 185000, expenses: 293000 },
  { month: 'Nov', revenue: 512000, profit: 202000, expenses: 310000 },
  { month: 'Dec', revenue: 548000, profit: 220000, expenses: 328000 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-3 rounded-lg shadow-lg border border-border">
        <p className="text-sm font-medium mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center justify-between space-x-4">
            <span className="text-xs text-muted-foreground capitalize">{entry.name}:</span>
            <span className="text-xs font-medium" style={{ color: entry.color }}>
              {formatCurrency(entry.value as number)}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function RevenueChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue, profit, and expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: 'currentColor' }}
              tickLine={{ stroke: 'currentColor' }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProfit)"
              animationDuration={1500}
              animationBegin={300}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpenses)"
              animationDuration={1500}
              animationBegin={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}