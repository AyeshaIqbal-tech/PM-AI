"use client"

import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  Clock, 
  TrendingUp,
  TrendingDown,
  Monitor,
  Smartphone,
  Globe,
  Database,
  Server,
  BarChart3,
  Activity,
  Target
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
  Legend,
  ComposedChart
} from 'recharts'

const performanceMetrics = [
  { time: '00:00', responseTime: 245, throughput: 1250, errorRate: 0.12, cpuUsage: 68 },
  { time: '04:00', responseTime: 198, throughput: 980, errorRate: 0.08, cpuUsage: 45 },
  { time: '08:00', responseTime: 289, throughput: 1850, errorRate: 0.15, cpuUsage: 78 },
  { time: '12:00', responseTime: 312, throughput: 2100, errorRate: 0.18, cpuUsage: 85 },
  { time: '16:00', responseTime: 298, throughput: 2050, errorRate: 0.14, cpuUsage: 82 },
  { time: '20:00', responseTime: 267, throughput: 1680, errorRate: 0.11, cpuUsage: 72 },
]

const pageSpeedData = [
  { page: 'Homepage', desktop: 92, mobile: 78, fcp: 1.2, lcp: 2.3, cls: 0.08 },
  { page: 'Dashboard', desktop: 88, mobile: 74, fcp: 1.5, lcp: 2.8, cls: 0.12 },
  { page: 'Analytics', desktop: 85, mobile: 71, fcp: 1.8, lcp: 3.1, cls: 0.15 },
  { page: 'Reports', desktop: 90, mobile: 76, fcp: 1.4, lcp: 2.6, cls: 0.09 },
  { page: 'Settings', desktop: 94, mobile: 82, fcp: 1.1, lcp: 2.0, cls: 0.06 },
]

const databasePerformance = [
  { metric: 'Query Response Time', value: 45, unit: 'ms', target: 50, status: 'good' },
  { metric: 'Connection Pool Usage', value: 68, unit: '%', target: 80, status: 'good' },
  { metric: 'Cache Hit Ratio', value: 94.5, unit: '%', target: 90, status: 'excellent' },
  { metric: 'Index Efficiency', value: 87.2, unit: '%', target: 85, status: 'good' },
  { metric: 'Deadlock Rate', value: 0.02, unit: '%', target: 0.1, status: 'excellent' },
]

const serverMetrics = [
  { server: 'Web-01', cpu: 72, memory: 68, disk: 45, network: 23, status: 'healthy' },
  { server: 'Web-02', cpu: 78, memory: 71, disk: 52, network: 28, status: 'healthy' },
  { server: 'API-01', cpu: 85, memory: 82, disk: 38, network: 45, status: 'warning' },
  { server: 'DB-01', cpu: 65, memory: 78, disk: 68, network: 12, status: 'healthy' },
  { server: 'Cache-01', cpu: 45, memory: 52, disk: 28, network: 67, status: 'healthy' },
]

const applicationMetrics = [
  { component: 'Frontend', responseTime: 1.2, throughput: 2500, errorRate: 0.08 },
  { component: 'API Gateway', responseTime: 0.8, throughput: 3200, errorRate: 0.05 },
  { component: 'User Service', responseTime: 1.5, throughput: 1800, errorRate: 0.12 },
  { component: 'Payment Service', responseTime: 2.1, throughput: 450, errorRate: 0.03 },
  { component: 'Notification Service', responseTime: 0.9, throughput: 1200, errorRate: 0.07 },
]

const performanceAlerts = [
  {
    id: 'PERF-001',
    type: 'High Response Time',
    severity: 'warning',
    component: 'User Service',
    metric: 'Response Time > 2s',
    timestamp: '2024-06-15 14:32',
    status: 'active'
  },
  {
    id: 'PERF-002',
    type: 'Memory Usage',
    severity: 'critical',
    component: 'API-01',
    metric: 'Memory Usage > 80%',
    timestamp: '2024-06-15 13:45',
    status: 'resolved'
  },
  {
    id: 'PERF-003',
    type: 'Database Slow Query',
    severity: 'warning',
    component: 'DB-01',
    metric: 'Query Time > 1s',
    timestamp: '2024-06-15 12:18',
    status: 'investigating'
  },
]

const trafficPatterns = [
  { hour: '00', requests: 1250, users: 890, bandwidth: 45 },
  { hour: '06', requests: 2890, users: 1560, bandwidth: 78 },
  { hour: '12', requests: 4560, users: 2890, bandwidth: 156 },
  { hour: '18', requests: 3890, users: 2340, bandwidth: 134 },
  { hour: '24', requests: 1680, users: 1120, bandwidth: 58 },
]

const coreWebVitals = [
  { metric: 'First Contentful Paint (FCP)', value: 1.4, threshold: 1.8, unit: 's', status: 'good' },
  { metric: 'Largest Contentful Paint (LCP)', value: 2.1, threshold: 2.5, unit: 's', status: 'good' },
  { metric: 'First Input Delay (FID)', value: 85, threshold: 100, unit: 'ms', status: 'good' },
  { metric: 'Cumulative Layout Shift (CLS)', value: 0.08, threshold: 0.1, unit: '', status: 'good' },
  { metric: 'Time to Interactive (TTI)', value: 3.2, threshold: 3.8, unit: 's', status: 'good' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': 
    case 'healthy':
    case 'resolved': return 'bg-green-500 text-green-50'
    case 'good': return 'bg-blue-500 text-blue-50'
    case 'warning': 
    case 'investigating': return 'bg-yellow-500 text-yellow-50'
    case 'critical': 
    case 'active': return 'bg-red-500 text-red-50'
    default: return 'bg-gray-500 text-gray-50'
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-500 text-red-50'
    case 'warning': return 'bg-yellow-500 text-yellow-50'
    case 'info': return 'bg-blue-500 text-blue-50'
    default: return 'bg-gray-500 text-gray-50'
  }
}

const getPerformanceColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'text-green-600'
    case 'good': return 'text-blue-600'
    case 'warning': return 'text-yellow-600'
    case 'critical': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

export default function PerformanceDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance Dashboard</h1>
        <p className="text-muted-foreground">
          Application performance metrics, system health, and optimization insights
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Avg Response Time"
          value={267}
          suffix="ms"
          change={-12.5}
          changeLabel="improvement"
          icon={Zap}
          gradient="from-blue-500 to-cyan-600"
          animate
        />
        <StatsCard
          title="Throughput"
          value={1680}
          change={8.2}
          changeLabel="req/sec"
          icon={Activity}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="Error Rate"
          value="0.11%"
          change={-23.5}
          changeLabel="reduction"
          icon={Target}
          gradient="from-red-500 to-pink-600"
        />
        <StatsCard
          title="Uptime"
          value="99.97%"
          change={0.02}
          changeLabel="this month"
          icon={TrendingUp}
          gradient="from-purple-500 to-indigo-600"
          animate
        />
      </div>

      {/* Performance Trends and Page Speed */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends (24h)</CardTitle>
            <CardDescription>Response time and throughput over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="throughput" fill="#10b981" name="Throughput (req/s)" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Response Time (ms)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Speed Scores</CardTitle>
            <CardDescription>Lighthouse performance scores by page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pageSpeedData.map((page) => (
                <div key={page.page} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{page.page}</span>
                    <div className="flex items-center space-x-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span className={`text-sm font-medium ${
                        page.desktop >= 90 ? 'text-green-600' :
                        page.desktop >= 70 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>{page.desktop}</span>
                      <Smartphone className="h-4 w-4 text-muted-foreground ml-2" />
                      <span className={`text-sm font-medium ${
                        page.mobile >= 90 ? 'text-green-600' :
                        page.mobile >= 70 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>{page.mobile}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div>FCP: {page.fcp}s</div>
                    <div>LCP: {page.lcp}s</div>
                    <div>CLS: {page.cls}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Core Web Vitals */}
      <Card>
        <CardHeader>
          <CardTitle>Core Web Vitals</CardTitle>
          <CardDescription>Key user experience metrics and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {coreWebVitals.map((vital) => (
              <div key={vital.metric} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getPerformanceColor(vital.status)}`}>
                    {vital.value}{vital.unit}
                  </div>
                  <div className="text-sm font-medium mb-2">{vital.metric}</div>
                  <div className="text-xs text-muted-foreground">
                    Target: &lt;{vital.threshold}{vital.unit}
                  </div>
                  <Badge className={getStatusColor(vital.status)} variant="secondary">
                    {vital.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Server Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Server Performance</CardTitle>
          <CardDescription>Resource utilization across all servers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serverMetrics.map((server) => (
              <div key={server.server} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Server className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold">{server.server}</span>
                  </div>
                  <Badge className={getStatusColor(server.status)}>
                    {server.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">CPU</div>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={server.cpu} 
                        className={`h-2 flex-1 ${
                          server.cpu > 80 ? '[&>div]:bg-red-500' :
                          server.cpu > 70 ? '[&>div]:bg-yellow-500' :
                          '[&>div]:bg-green-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{server.cpu}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Memory</div>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={server.memory} 
                        className={`h-2 flex-1 ${
                          server.memory > 80 ? '[&>div]:bg-red-500' :
                          server.memory > 70 ? '[&>div]:bg-yellow-500' :
                          '[&>div]:bg-green-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{server.memory}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Disk</div>
                    <div className="flex items-center space-x-2">
                      <Progress value={server.disk} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{server.disk}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Network</div>
                    <div className="flex items-center space-x-2">
                      <Progress value={server.network} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{server.network}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Performance and Application Metrics */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Database Performance</CardTitle>
            <CardDescription>Database health and query performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {databasePerformance.map((metric) => (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${getPerformanceColor(metric.status)}`}>
                        {metric.value}{metric.unit}
                      </span>
                      <div className="text-xs text-muted-foreground">
                        Target: {metric.target}{metric.unit}
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={metric.metric.includes('Rate') ? metric.value : (metric.value / metric.target) * 100} 
                    className={`h-2 ${
                      metric.status === 'excellent' ? '[&>div]:bg-green-500' :
                      metric.status === 'good' ? '[&>div]:bg-blue-500' :
                      metric.status === 'warning' ? '[&>div]:bg-yellow-500' :
                      '[&>div]:bg-red-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Components</CardTitle>
            <CardDescription>Performance metrics by service component</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationMetrics.map((component) => (
                <div key={component.component} className="p-3 rounded-lg border">
                  <div className="font-medium mb-2">{component.component}</div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Response Time</div>
                      <div className={`font-medium ${
                        component.responseTime > 2 ? 'text-red-600' :
                        component.responseTime > 1 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>{component.responseTime}s</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Throughput</div>
                      <div className="font-medium">{component.throughput}/s</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Error Rate</div>
                      <div className={`font-medium ${
                        component.errorRate > 0.1 ? 'text-red-600' :
                        component.errorRate > 0.05 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>{component.errorRate}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Alerts and Traffic Patterns */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Alerts</CardTitle>
            <CardDescription>Active performance issues and anomalies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {performanceAlerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{alert.type}</span>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {alert.component} • {alert.metric}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {alert.id} • {alert.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Patterns</CardTitle>
            <CardDescription>Request volume and bandwidth usage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trafficPatterns}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="#3b82f6"
                  fill="url(#requestsGradient)"
                  strokeWidth={2}
                  name="Requests"
                />
                <Area
                  type="monotone"
                  dataKey="bandwidth"
                  stroke="#10b981"
                  fill="url(#bandwidthGradient)"
                  strokeWidth={2}
                  name="Bandwidth (MB)"
                />
                <defs>
                  <linearGradient id="requestsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="bandwidthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key performance indicators and optimization opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
              <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-700">267ms</div>
              <div className="text-sm text-blue-600">Avg Response Time</div>
              <div className="text-xs text-blue-500 mt-1">-12.5% vs last week</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-700">1,680</div>
              <div className="text-sm text-green-600">Requests/sec</div>
              <div className="text-xs text-green-500 mt-1">+8.2% throughput</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
              <Database className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-700">94.5%</div>
              <div className="text-sm text-purple-600">Cache Hit Rate</div>
              <div className="text-xs text-purple-500 mt-1">Excellent performance</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-700">89</div>
              <div className="text-sm text-orange-600">Performance Score</div>
              <div className="text-xs text-orange-500 mt-1">Above industry avg</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}