"use client"

import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  UserPlus, 
  UserCheck,
  Award,
  TrendingUp,
  Calendar,
  Briefcase,
  Heart
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

const employeeData = [
  { month: 'Jan', hired: 8, left: 2 },
  { month: 'Feb', hired: 12, left: 3 },
  { month: 'Mar', hired: 15, left: 2 },
  { month: 'Apr', hired: 10, left: 1 },
  { month: 'May', hired: 18, left: 4 },
  { month: 'Jun', hired: 22, left: 3 },
]

const departmentDistribution = [
  { name: 'Development', value: 45, color: '#3b82f6' },
  { name: 'Design', value: 15, color: '#8b5cf6' },
  { name: 'Marketing', value: 20, color: '#10b981' },
  { name: 'Sales', value: 12, color: '#f59e0b' },
  { name: 'Support', value: 8, color: '#ef4444' },
]

const satisfactionData = [
  { category: 'Work-Life Balance', score: 82 },
  { category: 'Compensation', score: 78 },
  { category: 'Career Growth', score: 85 },
  { category: 'Management', score: 88 },
  { category: 'Culture', score: 92 },
]

export default function HRDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">HR & People Analytics</h1>
        <p className="text-muted-foreground">
          Workforce management and employee satisfaction metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Employees"
          value={142}
          change={12.3}
          changeLabel="YoY growth"
          icon={Users}
          gradient="from-blue-500 to-indigo-600"
          animate
        />
        <StatsCard
          title="New Hires (Q1)"
          value={35}
          change={25.0}
          changeLabel="vs last quarter"
          icon={UserPlus}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="Retention Rate"
          value="94.2%"
          change={2.1}
          changeLabel="improvement"
          icon={UserCheck}
          gradient="from-purple-500 to-pink-600"
        />
        <StatsCard
          title="eNPS Score"
          value={72}
          change={8.5}
          changeLabel="increase"
          icon={Heart}
          gradient="from-amber-500 to-orange-600"
          animate
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hiring & Attrition Trends</CardTitle>
            <CardDescription>Monthly employee movement</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hired" fill="#10b981" name="Hired" />
                <Bar dataKey="left" fill="#ef4444" name="Left" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee allocation across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Satisfaction Metrics</CardTitle>
          <CardDescription>Key satisfaction indicators from recent survey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {satisfactionData.map((item, index) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">{item.score}%</span>
                </div>
                <Progress value={item.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Diversity Metrics</CardTitle>
            <CardDescription>Workforce diversity indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Gender Diversity</span>
                <span className="text-sm font-medium">48% / 52%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Age Distribution</span>
                <span className="text-sm font-medium">28-45 avg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">International Staff</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Remote Workers</span>
                <span className="text-sm font-medium">45%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training & Development</CardTitle>
            <CardDescription>Learning program metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg Training Hours/Employee</span>
                <span className="text-sm font-medium">42 hrs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Certification Rate</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Internal Promotions</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Skill Development Score</span>
                <span className="text-sm font-medium">8.2/10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefits & Compensation</CardTitle>
            <CardDescription>Compensation analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg Salary Increase</span>
                <span className="text-sm font-medium">8.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Benefits Utilization</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bonus Distribution</span>
                <span className="text-sm font-medium">$2.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pay Equity Score</span>
                <span className="text-sm font-medium">96%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}