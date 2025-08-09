"use client"

import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Bug, 
  TestTube, 
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  AlertTriangle,
  Shield,
  Zap,
  FileCheck,
  Users
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
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

const testResultsData = [
  { week: 'W1', passed: 1247, failed: 23, skipped: 45 },
  { week: 'W2', passed: 1289, failed: 18, skipped: 38 },
  { week: 'W3', passed: 1356, failed: 31, skipped: 42 },
  { week: 'W4', passed: 1423, failed: 15, skipped: 29 },
  { week: 'W5', passed: 1378, failed: 28, skipped: 34 },
  { week: 'W6', passed: 1445, failed: 12, skipped: 31 },
]

const bugTrendData = [
  { month: 'Jan', critical: 2, high: 8, medium: 15, low: 12 },
  { month: 'Feb', critical: 1, high: 6, medium: 18, low: 14 },
  { month: 'Mar', critical: 3, high: 9, medium: 21, low: 16 },
  { month: 'Apr', critical: 1, high: 5, medium: 17, low: 11 },
  { month: 'May', critical: 0, high: 4, medium: 14, low: 9 },
  { month: 'Jun', critical: 1, high: 3, medium: 12, low: 7 },
]

const testCoverageData = [
  { component: 'Frontend', coverage: 87.5, target: 85 },
  { component: 'Backend API', coverage: 92.3, target: 90 },
  { component: 'Database', coverage: 78.9, target: 80 },
  { component: 'Integration', coverage: 84.2, target: 85 },
  { component: 'Mobile', coverage: 89.7, target: 85 },
]

const testTypeDistribution = [
  { name: 'Unit Tests', value: 65.2, color: '#10b981' },
  { name: 'Integration Tests', value: 22.8, color: '#3b82f6' },
  { name: 'E2E Tests', value: 8.5, color: '#f59e0b' },
  { name: 'Performance Tests', value: 3.5, color: '#8b5cf6' },
]

const defectsByPhase = [
  { phase: 'Requirements', count: 8, percentage: 12.3 },
  { phase: 'Design', count: 5, percentage: 7.7 },
  { phase: 'Development', count: 28, percentage: 43.1 },
  { phase: 'Testing', count: 15, percentage: 23.1 },
  { phase: 'Production', count: 9, percentage: 13.8 },
]

const qaTeamPerformance = [
  {
    name: 'Alice Johnson',
    role: 'Senior QA Engineer',
    testsExecuted: 234,
    bugsFound: 18,
    automationScripts: 45,
    efficiency: 92.5
  },
  {
    name: 'Bob Martinez',
    role: 'Automation Engineer',
    testsExecuted: 189,
    bugsFound: 12,
    automationScripts: 67,
    efficiency: 89.2
  },
  {
    name: 'Carol Chen',
    role: 'QA Analyst',
    testsExecuted: 298,
    bugsFound: 24,
    automationScripts: 23,
    efficiency: 87.8
  },
  {
    name: 'David Wilson',
    role: 'Performance Tester',
    testsExecuted: 156,
    bugsFound: 8,
    automationScripts: 34,
    efficiency: 94.1
  },
]

const automationMetrics = [
  { category: 'Regression Tests', automated: 89, total: 95, percentage: 93.7 },
  { category: 'Smoke Tests', automated: 45, total: 48, percentage: 93.8 },
  { category: 'API Tests', automated: 156, total: 167, percentage: 93.4 },
  { category: 'UI Tests', automated: 78, total: 95, percentage: 82.1 },
  { category: 'Integration Tests', automated: 67, total: 89, percentage: 75.3 },
]

const recentTestRuns = [
  {
    suite: 'Regression Suite',
    status: 'passed',
    duration: '45m 32s',
    tests: 1247,
    failed: 0,
    timestamp: '2 hours ago'
  },
  {
    suite: 'API Integration Tests',
    status: 'passed',
    duration: '12m 18s',
    tests: 234,
    failed: 0,
    timestamp: '4 hours ago'
  },
  {
    suite: 'E2E User Journey',
    status: 'failed',
    duration: '28m 45s',
    tests: 67,
    failed: 3,
    timestamp: '6 hours ago'
  },
  {
    suite: 'Performance Tests',
    status: 'passed',
    duration: '1h 23m',
    tests: 45,
    failed: 0,
    timestamp: '8 hours ago'
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'passed': return 'bg-green-500 text-green-50'
    case 'failed': return 'bg-red-500 text-red-50'
    case 'running': return 'bg-blue-500 text-blue-50'
    case 'skipped': return 'bg-yellow-500 text-yellow-50'
    default: return 'bg-gray-500 text-gray-50'
  }
}

export default function QADashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quality Assurance Dashboard</h1>
        <p className="text-muted-foreground">
          Test execution metrics, bug tracking, and quality insights
        </p>
      </div>

      {/* QA Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Test Pass Rate"
          value="96.8%"
          change={2.4}
          changeLabel="improvement"
          icon={CheckCircle}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="Active Bugs"
          value={23}
          change={-34.5}
          changeLabel="reduction"
          icon={Bug}
          gradient="from-red-500 to-pink-600"
          animate
        />
        <StatsCard
          title="Test Automation"
          value="87.3%"
          change={12.8}
          changeLabel="coverage"
          icon={Zap}
          gradient="from-blue-500 to-cyan-600"
          animate
        />
        <StatsCard
          title="Tests Executed"
          value={1488}
          change={15.6}
          changeLabel="this week"
          icon={TestTube}
          gradient="from-purple-500 to-indigo-600"
          animate
        />
      </div>

      {/* Test Results and Bug Trends */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test Execution Results</CardTitle>
            <CardDescription>Weekly test results breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={testResultsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar dataKey="passed" stackId="a" fill="#10b981" name="Passed" />
                <Bar dataKey="failed" stackId="a" fill="#ef4444" name="Failed" />
                <Bar dataKey="skipped" stackId="a" fill="#f59e0b" name="Skipped" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bug Trend Analysis</CardTitle>
            <CardDescription>Monthly bug reports by severity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={bugTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fill="#fef2f2" />
                <Area type="monotone" dataKey="high" stackId="1" stroke="#f97316" fill="#fff7ed" />
                <Area type="monotone" dataKey="medium" stackId="1" stroke="#eab308" fill="#fefce8" />
                <Area type="monotone" dataKey="low" stackId="1" stroke="#22c55e" fill="#f0fdf4" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Test Coverage and Test Types */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test Coverage by Component</CardTitle>
            <CardDescription>Code coverage metrics across different components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testCoverageData.map((item) => (
                <div key={item.component} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.component}</span>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        item.coverage >= item.target ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {item.coverage}%
                      </span>
                      <div className="text-xs text-muted-foreground">
                        Target: {item.target}%
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={item.coverage} 
                    className={`h-2 ${
                      item.coverage >= item.target ? '[&>div]:bg-green-500' : '[&>div]:bg-yellow-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Type Distribution</CardTitle>
            <CardDescription>Breakdown of test types in the test suite</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {testTypeDistribution.map((type) => (
                <div key={type.name} className="text-center p-3 rounded-lg border">
                  <div className="text-lg font-bold" style={{ color: type.color }}>
                    {type.value}%
                  </div>
                  <div className="text-xs text-muted-foreground">{type.name}</div>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={testTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {testTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* QA Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>QA Team Performance</CardTitle>
          <CardDescription>Individual team member metrics and productivity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {qaTeamPerformance.map((member) => (
              <div key={member.name} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{member.efficiency}%</div>
                    <div className="text-xs text-muted-foreground">Efficiency</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded bg-blue-50 border border-blue-200">
                    <div className="text-lg font-bold text-blue-700">{member.testsExecuted}</div>
                    <div className="text-xs text-blue-600">Tests Executed</div>
                  </div>
                  <div className="text-center p-3 rounded bg-red-50 border border-red-200">
                    <div className="text-lg font-bold text-red-700">{member.bugsFound}</div>
                    <div className="text-xs text-red-600">Bugs Found</div>
                  </div>
                  <div className="text-center p-3 rounded bg-purple-50 border border-purple-200">
                    <div className="text-lg font-bold text-purple-700">{member.automationScripts}</div>
                    <div className="text-xs text-purple-600">Automation Scripts</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Automation Progress and Recent Runs */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test Automation Progress</CardTitle>
            <CardDescription>Automation coverage by test category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automationMetrics.map((metric) => (
                <div key={metric.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.category}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium">{metric.percentage.toFixed(1)}%</span>
                      <div className="text-xs text-muted-foreground">
                        {metric.automated}/{metric.total} tests
                      </div>
                    </div>
                  </div>
                  <Progress value={metric.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Test Runs</CardTitle>
            <CardDescription>Latest automated test execution results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTestRuns.map((run, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">{run.suite}</div>
                    <Badge className={getStatusColor(run.status)}>
                      {run.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div>
                      <div>Duration: {run.duration}</div>
                      <div>Tests: {run.tests}</div>
                    </div>
                    <div className="text-right">
                      {run.failed > 0 && (
                        <div className="text-red-600">Failed: {run.failed}</div>
                      )}
                      <div>{run.timestamp}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Defects Analysis and Quality Metrics */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Defects by Phase</CardTitle>
            <CardDescription>Where defects are discovered in the SDLC</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {defectsByPhase.map((phase) => (
                <div key={phase.phase} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">{phase.phase}</div>
                    <div className="text-sm text-muted-foreground">{phase.count} defects</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{phase.percentage}%</div>
                    <Progress value={phase.percentage} className="h-2 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics Summary</CardTitle>
            <CardDescription>Key quality indicators and benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-700">99.2%</div>
                <div className="text-sm text-green-600">System Reliability</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-700">4.8/5</div>
                <div className="text-sm text-blue-600">Quality Score</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
                <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-700">2.3 hrs</div>
                <div className="text-sm text-purple-600">Avg Bug Fix Time</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border">
                <FileCheck className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-700">156</div>
                <div className="text-sm text-orange-600">Test Cases Updated</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}