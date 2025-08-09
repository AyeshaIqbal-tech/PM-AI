"use client"

import { useEffect, useState } from 'react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  Zap, 
  Globe,
  Server,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'

export default function RealtimeDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 1847,
    responseTime: 245,
    requestsPerSecond: 1250,
    errorRate: 0.12,
    uptime: 99.97,
    serverLoad: 68
  })

  // Simulate real-time data updates
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const metricsInterval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
        responseTime: Math.max(50, prev.responseTime + Math.floor(Math.random() * 50) - 25),
        requestsPerSecond: Math.max(800, prev.requestsPerSecond + Math.floor(Math.random() * 200) - 100),
        errorRate: Math.max(0, Math.min(2, prev.errorRate + (Math.random() * 0.1 - 0.05))),
        uptime: Math.max(99.8, Math.min(100, prev.uptime + (Math.random() * 0.02 - 0.01))),
        serverLoad: Math.max(30, Math.min(90, prev.serverLoad + Math.floor(Math.random() * 10) - 5))
      }))
    }, 3000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(metricsInterval)
    }
  }, [])

  // Real-time traffic data (last 30 minutes)
  const trafficData = Array.from({ length: 30 }, (_, i) => ({
    time: new Date(Date.now() - (29 - i) * 60000).toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    requests: Math.floor(Math.random() * 500) + 800,
    errors: Math.floor(Math.random() * 20) + 5,
    responseTime: Math.floor(Math.random() * 200) + 150
  }))

  const systemHealthData = [
    { name: 'CPU Usage', value: 72, status: 'warning' },
    { name: 'Memory', value: 68, status: 'good' },
    { name: 'Disk Space', value: 45, status: 'good' },
    { name: 'Network I/O', value: 89, status: 'critical' },
    { name: 'Database', value: 58, status: 'good' },
  ]

  const activeServices = [
    { name: 'Web Server', status: 'online', uptime: '99.99%', instances: 4 },
    { name: 'Database', status: 'online', uptime: '99.97%', instances: 2 },
    { name: 'Cache Layer', status: 'online', uptime: '99.95%', instances: 3 },
    { name: 'Message Queue', status: 'warning', uptime: '99.82%', instances: 2 },
    { name: 'Load Balancer', status: 'online', uptime: '100%', instances: 2 },
    { name: 'CDN', status: 'online', uptime: '99.98%', instances: 8 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Real-time Monitoring</h1>
          <p className="text-muted-foreground">
            Live system metrics and performance monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live - {currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard
          title="Active Users"
          value={liveMetrics.activeUsers}
          change={5.2}
          changeLabel="vs hour ago"
          icon={Users}
          gradient="from-blue-500 to-cyan-600"
          animate
        />
        <StatsCard
          title="Response Time"
          value={`${liveMetrics.responseTime}ms`}
          change={-8.1}
          changeLabel="improvement"
          icon={Zap}
          gradient="from-yellow-500 to-orange-600"
          animate
        />
        <StatsCard
          title="Requests/sec"
          value={liveMetrics.requestsPerSecond}
          change={12.5}
          changeLabel="increase"
          icon={Activity}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="Error Rate"
          value={`${liveMetrics.errorRate.toFixed(2)}%`}
          change={-15.3}
          changeLabel="decrease"
          icon={AlertTriangle}
          gradient="from-red-500 to-pink-600"
        />
        <StatsCard
          title="Uptime"
          value={`${liveMetrics.uptime.toFixed(2)}%`}
          change={0.1}
          changeLabel="this month"
          icon={CheckCircle}
          gradient="from-purple-500 to-indigo-600"
        />
        <StatsCard
          title="Server Load"
          value={`${liveMetrics.serverLoad}%`}
          change={-5.8}
          changeLabel="optimization"
          icon={Server}
          gradient="from-teal-500 to-blue-600"
        />
      </div>

      {/* Traffic and Performance Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Live Traffic</span>
            </CardTitle>
            <CardDescription>Real-time request volume (last 30 minutes)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis />
                <Tooltip 
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="#3b82f6"
                  fill="url(#trafficGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Response Time Trends</span>
            </CardTitle>
            <CardDescription>Average response time over the last 30 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis />
                <Tooltip 
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <ReferenceLine y={250} stroke="#ef4444" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Health and Services */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current resource utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealthData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className={`text-sm font-medium ${getHealthColor(item.status)}`}>
                      {item.value}%
                    </span>
                  </div>
                  <Progress 
                    value={item.value} 
                    className={`h-2 ${
                      item.status === 'critical' ? '[&>div]:bg-red-500' :
                      item.status === 'warning' ? '[&>div]:bg-yellow-500' :
                      '[&>div]:bg-green-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>Current status of all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeServices.map((service) => (
                <div key={service.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(service.status)}`} />
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {service.instances} instance{service.instances > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={service.status === 'online' ? 'default' : 'destructive'}>
                      {service.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {service.uptime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network and Geographic Distribution */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Geographic Distribution</span>
            </CardTitle>
            <CardDescription>Active users by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { region: 'North America', users: 847, percentage: 46 },
                { region: 'Europe', users: 523, percentage: 28 },
                { region: 'Asia Pacific', users: 312, percentage: 17 },
                { region: 'South America', users: 98, percentage: 5 },
                { region: 'Others', users: 67, percentage: 4 },
              ].map((item) => (
                <div key={item.region} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.region}</div>
                    <div className="text-xs text-muted-foreground">{item.users} users</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.percentage}%</div>
                    <Progress value={item.percentage} className="h-1 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wifi className="h-5 w-5" />
              <span>Network Performance</span>
            </CardTitle>
            <CardDescription>Connection quality metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Bandwidth Usage</span>
                <span className="text-sm font-medium">2.4 Gbps</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Latency (avg)</span>
                <span className="text-sm font-medium">28ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Packet Loss</span>
                <span className="text-sm font-medium">0.01%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">CDN Hit Rate</span>
                <span className="text-sm font-medium">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Connections</span>
                <span className="text-sm font-medium">12,847</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>System alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'warning', message: 'High CPU usage on server-03', time: '2 min ago' },
                { type: 'info', message: 'Database backup completed', time: '15 min ago' },
                { type: 'success', message: 'Load balancer optimized', time: '32 min ago' },
                { type: 'warning', message: 'Memory usage spike detected', time: '1 hour ago' },
              ].map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 rounded-lg border">
                  <div className={`h-2 w-2 mt-2 rounded-full ${
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    alert.type === 'success' ? 'bg-green-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{alert.message}</div>
                    <div className="text-xs text-muted-foreground">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}