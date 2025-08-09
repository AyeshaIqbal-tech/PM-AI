"use client"

import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  GitBranch, 
  Server, 
  Rocket,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Shield,
  Database,
  Cloud,
  Settings
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

const deploymentData = [
  { week: 'W1', deployments: 12, successful: 11, failed: 1, rollbacks: 1 },
  { week: 'W2', deployments: 15, successful: 14, failed: 1, rollbacks: 0 },
  { week: 'W3', deployments: 18, successful: 17, failed: 1, rollbacks: 1 },
  { week: 'W4', deployments: 14, successful: 13, failed: 1, rollbacks: 0 },
  { week: 'W5', deployments: 20, successful: 19, failed: 1, rollbacks: 1 },
  { week: 'W6', deployments: 22, successful: 21, failed: 1, rollbacks: 0 },
]

const pipelineMetrics = [
  { stage: 'Build', avgTime: 8.5, successRate: 96.2 },
  { stage: 'Test', avgTime: 15.2, successRate: 94.8 },
  { stage: 'Security Scan', avgTime: 6.8, successRate: 98.1 },
  { stage: 'Deploy to Staging', avgTime: 4.2, successRate: 99.1 },
  { stage: 'Integration Tests', avgTime: 12.4, successRate: 92.5 },
  { stage: 'Deploy to Prod', avgTime: 3.8, successRate: 97.8 },
]

const infrastructureHealth = [
  { service: 'Web Servers', status: 'healthy', uptime: 99.98, instances: 8 },
  { service: 'Database Cluster', status: 'healthy', uptime: 99.95, instances: 3 },
  { service: 'Load Balancers', status: 'healthy', uptime: 100.0, instances: 2 },
  { service: 'Cache Layer', status: 'warning', uptime: 99.85, instances: 4 },
  { service: 'Message Queue', status: 'healthy', uptime: 99.92, instances: 2 },
  { service: 'Monitoring Stack', status: 'healthy', uptime: 99.88, instances: 3 },
]

const environmentStatus = [
  { name: 'Production', status: 'healthy', version: 'v2.4.1', lastDeploy: '2h ago' },
  { name: 'Staging', status: 'healthy', version: 'v2.5.0-rc1', lastDeploy: '4h ago' },
  { name: 'Development', status: 'healthy', version: 'v2.5.0-dev', lastDeploy: '1h ago' },
  { name: 'Testing', status: 'deploying', version: 'v2.5.0-beta', lastDeploy: 'now' },
]

const securityScans = [
  { type: 'SAST', passed: 45, failed: 3, critical: 0, high: 1, medium: 2 },
  { type: 'DAST', passed: 23, failed: 2, critical: 0, high: 0, medium: 2 },
  { type: 'Container Scan', passed: 67, failed: 5, critical: 1, high: 2, medium: 2 },
  { type: 'Dependency Check', passed: 156, failed: 8, critical: 2, high: 3, medium: 3 },
]

const recentDeployments = [
  {
    id: 'DEP-2024-156',
    service: 'User Service',
    version: 'v2.4.1',
    status: 'success',
    environment: 'Production',
    duration: '3m 45s',
    deployer: 'Alice Johnson',
    timestamp: '2 hours ago'
  },
  {
    id: 'DEP-2024-155',
    service: 'Payment API',
    version: 'v1.8.2',
    status: 'success',
    environment: 'Production',
    duration: '2m 18s',
    deployer: 'Bob Martinez',
    timestamp: '4 hours ago'
  },
  {
    id: 'DEP-2024-154',
    service: 'Frontend',
    version: 'v2.5.0-rc1',
    status: 'failed',
    environment: 'Staging',
    duration: '1m 23s',
    deployer: 'Carol Chen',
    timestamp: '6 hours ago'
  },
  {
    id: 'DEP-2024-153',
    service: 'Analytics Service',
    version: 'v3.1.0',
    status: 'success',
    environment: 'Staging',
    duration: '4m 52s',
    deployer: 'David Wilson',
    timestamp: '8 hours ago'
  },
]

const resourceUtilization = [
  { hour: '00', cpu: 45, memory: 62, disk: 38, network: 25 },
  { hour: '06', cpu: 52, memory: 68, disk: 42, network: 35 },
  { hour: '12', cpu: 78, memory: 84, disk: 52, network: 68 },
  { hour: '18', cpu: 85, memory: 91, disk: 58, network: 72 },
  { hour: '24', cpu: 48, memory: 65, disk: 41, network: 28 },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success': 
    case 'healthy': return 'bg-green-500 text-green-50'
    case 'failed': 
    case 'error': return 'bg-red-500 text-red-50'
    case 'warning': return 'bg-yellow-500 text-yellow-50'
    case 'deploying': 
    case 'running': return 'bg-blue-500 text-blue-50'
    default: return 'bg-gray-500 text-gray-50'
  }
}

const getHealthIcon = (status: string) => {
  switch (status) {
    case 'healthy': return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case 'error': return <XCircle className="h-4 w-4 text-red-500" />
    case 'deploying': return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
    default: return <Clock className="h-4 w-4 text-gray-500" />
  }
}

export default function DevOpsDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DevOps Dashboard</h1>
        <p className="text-muted-foreground">
          CI/CD pipeline metrics, infrastructure monitoring, and deployment tracking
        </p>
      </div>

      {/* DevOps Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Deployment Success"
          value="97.8%"
          change={2.1}
          changeLabel="improvement"
          icon={Rocket}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="Pipeline Duration"
          value="24.5m"
          change={-15.3}
          changeLabel="reduction"
          icon={Clock}
          gradient="from-blue-500 to-cyan-600"
        />
        <StatsCard
          title="System Uptime"
          value="99.97%"
          change={0.02}
          changeLabel="this month"
          icon={Server}
          gradient="from-purple-500 to-pink-600"
          animate
        />
        <StatsCard
          title="Security Score"
          value={94}
          change={8.5}
          changeLabel="improvement"
          icon={Shield}
          gradient="from-orange-500 to-red-600"
          animate
        />
      </div>

      {/* Deployment Trends and Pipeline Performance */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Deployment Trends</CardTitle>
            <CardDescription>Weekly deployment frequency and success rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deploymentData}>
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
                <Bar dataKey="successful" fill="#10b981" name="Successful" />
                <Bar dataKey="failed" fill="#ef4444" name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pipeline Performance</CardTitle>
            <CardDescription>Average duration and success rate by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineMetrics.map((stage) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium">{stage.avgTime}m</span>
                      <div className="text-xs text-muted-foreground">
                        {stage.successRate}% success
                      </div>
                    </div>
                  </div>
                  <Progress value={stage.successRate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Infrastructure Health */}
      <Card>
        <CardHeader>
          <CardTitle>Infrastructure Health</CardTitle>
          <CardDescription>Real-time status of all infrastructure components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {infrastructureHealth.map((service) => (
              <div key={service.service} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getHealthIcon(service.status)}
                    <span className="font-medium">{service.service}</span>
                  </div>
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Uptime</div>
                    <div className="font-medium">{service.uptime}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Instances</div>
                    <div className="font-medium">{service.instances}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environment Status and Recent Deployments */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Environment Status</CardTitle>
            <CardDescription>Current status of all deployment environments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {environmentStatus.map((env) => (
                <div key={env.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    {getHealthIcon(env.status)}
                    <div>
                      <div className="font-medium">{env.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {env.version}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(env.status)}>
                      {env.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {env.lastDeploy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Deployments</CardTitle>
            <CardDescription>Latest deployment activities across environments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDeployments.map((deployment) => (
                <div key={deployment.id} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-sm">{deployment.service}</div>
                      <div className="text-xs text-muted-foreground">
                        {deployment.version} • {deployment.environment}
                      </div>
                    </div>
                    <Badge className={getStatusColor(deployment.status)}>
                      {deployment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{deployment.duration} • {deployment.deployer}</span>
                    <span>{deployment.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Scans and Resource Utilization */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Security Scan Results</CardTitle>
            <CardDescription>Latest security scanning metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityScans.map((scan) => (
                <div key={scan.type} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{scan.type}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">
                        {scan.passed} passed
                      </span>
                      {scan.failed > 0 && (
                        <span className="text-sm font-medium text-red-600 ml-2">
                          {scan.failed} failed
                        </span>
                      )}
                    </div>
                  </div>
                  {(scan.critical + scan.high + scan.medium) > 0 && (
                    <div className="flex items-center space-x-4 text-xs">
                      {scan.critical > 0 && (
                        <span className="text-red-600">Critical: {scan.critical}</span>
                      )}
                      {scan.high > 0 && (
                        <span className="text-orange-600">High: {scan.high}</span>
                      )}
                      {scan.medium > 0 && (
                        <span className="text-yellow-600">Medium: {scan.medium}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
            <CardDescription>System resource usage over 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={resourceUtilization}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#ef4444" name="Memory %" />
                <Line type="monotone" dataKey="disk" stroke="#10b981" name="Disk %" />
                <Line type="monotone" dataKey="network" stroke="#8b5cf6" name="Network %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* DevOps Insights */}
      <Card>
        <CardHeader>
          <CardTitle>DevOps Performance Insights</CardTitle>
          <CardDescription>Key performance indicators and operational metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
              <GitBranch className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-700">4.2 days</div>
              <div className="text-sm text-blue-600">Lead Time</div>
              <div className="text-xs text-blue-500 mt-1">Idea to Production</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
              <Zap className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-700">18.5/wk</div>
              <div className="text-sm text-green-600">Deployment Frequency</div>
              <div className="text-xs text-green-500 mt-1">Average per week</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
              <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-700">1.2 hrs</div>
              <div className="text-sm text-purple-600">MTTR</div>
              <div className="text-xs text-purple-500 mt-1">Mean Time to Recovery</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border">
              <Database className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-700">0.08%</div>
              <div className="text-sm text-orange-600">Change Failure Rate</div>
              <div className="text-xs text-orange-500 mt-1">Industry leading</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}