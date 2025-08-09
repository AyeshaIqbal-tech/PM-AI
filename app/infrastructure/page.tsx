"use client"

import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Server, 
  Cloud, 
  Database,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Shield,
  Zap,
  Globe,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
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

const resourceUtilization = [
  { time: '00:00', cpu: 45, memory: 62, storage: 38, network: 25 },
  { time: '06:00', cpu: 52, memory: 68, storage: 42, network: 35 },
  { time: '12:00', cpu: 78, memory: 84, storage: 52, network: 68 },
  { time: '18:00', cpu: 85, memory: 91, storage: 58, network: 72 },
  { time: '24:00', cpu: 48, memory: 65, storage: 41, network: 28 },
]

const serverInventory = [
  { 
    name: 'Web-Server-01', 
    type: 'Application', 
    status: 'running', 
    cpu: 'Intel Xeon E5-2670', 
    memory: '32GB DDR4', 
    storage: '1TB SSD', 
    uptime: '99.98%',
    location: 'US-East-1a'
  },
  { 
    name: 'DB-Primary-01', 
    type: 'Database', 
    status: 'running', 
    cpu: 'AMD EPYC 7742', 
    memory: '128GB DDR4', 
    storage: '2TB NVMe', 
    uptime: '99.95%',
    location: 'US-East-1b'
  },
  { 
    name: 'Cache-Redis-01', 
    type: 'Cache', 
    status: 'running', 
    cpu: 'Intel Xeon Gold 6248', 
    memory: '64GB DDR4', 
    storage: '500GB SSD', 
    uptime: '99.92%',
    location: 'US-East-1c'
  },
  { 
    name: 'LB-HAProxy-01', 
    type: 'Load Balancer', 
    status: 'maintenance', 
    cpu: 'Intel i7-9700K', 
    memory: '16GB DDR4', 
    storage: '256GB SSD', 
    uptime: '99.89%',
    location: 'US-East-1a'
  },
  { 
    name: 'Mon-Grafana-01', 
    type: 'Monitoring', 
    status: 'running', 
    cpu: 'AMD Ryzen 7 5800X', 
    memory: '32GB DDR4', 
    storage: '1TB SSD', 
    uptime: '99.97%',
    location: 'US-East-1b'
  },
]

const cloudServices = [
  { service: 'AWS EC2', instances: 45, cost: 2890, utilization: 78 },
  { service: 'AWS RDS', instances: 8, cost: 1560, utilization: 85 },
  { service: 'AWS Lambda', executions: 1250000, cost: 340, utilization: 92 },
  { service: 'AWS S3', storage: '2.4TB', cost: 180, utilization: 68 },
  { service: 'CloudFlare CDN', bandwidth: '4.8TB', cost: 420, utilization: 89 },
]

const networkTraffic = [
  { hour: '00', inbound: 125, outbound: 89, latency: 23 },
  { hour: '06', inbound: 289, outbound: 156, latency: 28 },
  { hour: '12', inbound: 456, outbound: 324, latency: 35 },
  { hour: '18', inbound: 389, outbound: 267, latency: 31 },
  { hour: '24', inbound: 168, outbound: 112, latency: 25 },
]

const infrastructureAlerts = [
  {
    id: 'INF-001',
    type: 'High CPU Usage',
    severity: 'warning',
    resource: 'Web-Server-02',
    message: 'CPU usage exceeded 85% for 15 minutes',
    timestamp: '2024-06-15 14:32',
    status: 'active'
  },
  {
    id: 'INF-002',
    type: 'Disk Space Low',
    severity: 'critical',
    resource: 'DB-Primary-01',
    message: 'Available disk space below 10%',
    timestamp: '2024-06-15 13:45',
    status: 'resolved'
  },
  {
    id: 'INF-003',
    type: 'Network Latency',
    severity: 'warning',
    resource: 'LB-HAProxy-01',
    message: 'Network latency above threshold',
    timestamp: '2024-06-15 12:18',
    status: 'investigating'
  },
]

const storageMetrics = [
  { type: 'SSD Storage', used: 2.4, total: 4.0, percentage: 60 },
  { type: 'HDD Storage', used: 8.9, total: 12.0, percentage: 74 },
  { type: 'Object Storage', used: 15.6, total: 50.0, percentage: 31 },
  { type: 'Backup Storage', used: 3.2, total: 8.0, percentage: 40 },
]

const costAnalysis = [
  { month: 'Jan', compute: 4500, storage: 1200, network: 800, total: 6500 },
  { month: 'Feb', compute: 4800, storage: 1350, network: 920, total: 7070 },
  { month: 'Mar', compute: 5200, storage: 1480, network: 1100, total: 7780 },
  { month: 'Apr', compute: 5600, storage: 1650, network: 1280, total: 8530 },
  { month: 'May', compute: 6100, storage: 1820, network: 1450, total: 9370 },
  { month: 'Jun', compute: 6500, storage: 1980, network: 1600, total: 10080 },
]

const securityGroups = [
  { name: 'Web-Tier-SG', rules: 12, ports: '80, 443', source: '0.0.0.0/0', status: 'active' },
  { name: 'App-Tier-SG', rules: 8, ports: '8080, 8443', source: 'Web-Tier-SG', status: 'active' },
  { name: 'DB-Tier-SG', rules: 6, ports: '3306, 5432', source: 'App-Tier-SG', status: 'active' },
  { name: 'Admin-Access-SG', rules: 4, ports: '22, 3389', source: 'Admin IPs', status: 'active' },
]

const dataCenter = [
  { region: 'US East (Virginia)', servers: 25, load: 78, latency: 23 },
  { region: 'US West (Oregon)', servers: 18, load: 65, latency: 28 },
  { region: 'EU West (Ireland)', servers: 12, load: 72, latency: 45 },
  { region: 'Asia Pacific (Singapore)', servers: 8, load: 58, latency: 89 },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running':
    case 'active':
    case 'resolved': return 'bg-green-500 text-green-50'
    case 'maintenance':
    case 'investigating': return 'bg-yellow-500 text-yellow-50'
    case 'stopped':
    case 'critical': return 'bg-red-500 text-red-50'
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

const getUtilizationColor = (utilization: number) => {
  if (utilization > 85) return 'text-red-600'
  if (utilization > 70) return 'text-yellow-600'
  return 'text-green-600'
}

export default function InfrastructureDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Infrastructure Dashboard</h1>
        <p className="text-muted-foreground">
          Cloud infrastructure monitoring, resource management, and cost optimization
        </p>
      </div>

      {/* Infrastructure Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Servers"
          value={63}
          change={8.2}
          changeLabel="new instances"
          icon={Server}
          gradient="from-blue-500 to-cyan-600"
          animate
        />
        <StatsCard
          title="System Uptime"
          value="99.97%"
          change={0.05}
          changeLabel="this month"
          icon={CheckCircle}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="Monthly Cost"
          value={10080}
          prefix="$"
          change={7.6}
          changeLabel="increase"
          icon={Cloud}
          gradient="from-purple-500 to-pink-600"
          animate
        />
        <StatsCard
          title="Resource Efficiency"
          value="78.3%"
          change={5.2}
          changeLabel="optimization"
          icon={Activity}
          gradient="from-orange-500 to-red-600"
        />
      </div>

      {/* Resource Utilization and Network Traffic */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization (24h)</CardTitle>
            <CardDescription>System resource usage across all infrastructure</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={resourceUtilization}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="cpu" stackId="1" stroke="#3b82f6" fill="#dbeafe" name="CPU %" />
                <Area type="monotone" dataKey="memory" stackId="1" stroke="#10b981" fill="#d1fae5" name="Memory %" />
                <Area type="monotone" dataKey="storage" stackId="1" stroke="#f59e0b" fill="#fef3c7" name="Storage %" />
                <Area type="monotone" dataKey="network" stackId="1" stroke="#8b5cf6" fill="#ede9fe" name="Network %" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Traffic</CardTitle>
            <CardDescription>Inbound and outbound network traffic patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={networkTraffic}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inbound" fill="#10b981" name="Inbound (Mbps)" />
                <Bar dataKey="outbound" fill="#3b82f6" name="Outbound (Mbps)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Server Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Server Inventory</CardTitle>
          <CardDescription>Current server infrastructure and specifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serverInventory.map((server) => (
              <div key={server.name} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Server className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">{server.name}</div>
                      <div className="text-sm text-muted-foreground">{server.type} • {server.location}</div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(server.status)}>
                    {server.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">CPU</div>
                    <div className="font-medium">{server.cpu}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Memory</div>
                    <div className="font-medium">{server.memory}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Storage</div>
                    <div className="font-medium">{server.storage}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Uptime</div>
                    <div className="font-medium text-green-600">{server.uptime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cloud Services and Storage */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cloud Services</CardTitle>
            <CardDescription>Cloud service utilization and costs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cloudServices.map((service) => (
                <div key={service.service} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{service.service}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">${service.cost}/month</div>
                      <div className={`text-xs ${getUtilizationColor(service.utilization)}`}>
                        {service.utilization}% utilized
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {'instances' in service && `${service.instances} instances`}
                    {'executions' in service && `${((service.executions ?? 0) / 1000000).toFixed(1)}M executions`}
                    {'storage' in service && `${service.storage} storage`}
                    {'bandwidth' in service && `${service.bandwidth} bandwidth`}
                  </div>
                  <Progress value={service.utilization} className="h-2 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Overview</CardTitle>
            <CardDescription>Storage utilization across different tiers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storageMetrics.map((storage) => (
                <div key={storage.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{storage.type}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        {storage.used}TB / {storage.total}TB
                      </span>
                      <div className="text-xs text-muted-foreground">
                        {storage.percentage}% used
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={storage.percentage} 
                    className={`h-2 ${
                      storage.percentage > 80 ? '[&>div]:bg-red-500' :
                      storage.percentage > 70 ? '[&>div]:bg-yellow-500' :
                      '[&>div]:bg-green-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Infrastructure Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Infrastructure Alerts</CardTitle>
          <CardDescription>Active alerts and system notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {infrastructureAlerts.map((alert) => (
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
                    <div className="text-sm text-muted-foreground mb-1">{alert.message}</div>
                    <div className="text-xs text-muted-foreground">
                      {alert.resource} • {alert.id} • {alert.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Analysis and Security Groups */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Infrastructure Cost Trends</CardTitle>
            <CardDescription>Monthly infrastructure spending breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={costAnalysis}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, '']}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar dataKey="compute" stackId="a" fill="#3b82f6" name="Compute" />
                <Bar dataKey="storage" stackId="a" fill="#10b981" name="Storage" />
                <Bar dataKey="network" stackId="a" fill="#f59e0b" name="Network" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Groups</CardTitle>
            <CardDescription>Network security configuration and rules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityGroups.map((sg) => (
                <div key={sg.name} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{sg.name}</span>
                    <Badge className={getStatusColor(sg.status)}>
                      {sg.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Rules</div>
                      <div className="font-medium">{sg.rules}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Ports</div>
                      <div className="font-medium">{sg.ports}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Source: {sg.source}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Center Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Global Infrastructure</CardTitle>
          <CardDescription>Data center distribution and regional performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataCenter.map((dc) => (
              <div key={dc.region} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-sm">{dc.region}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Servers:</span>
                    <span className="font-medium">{dc.servers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Load:</span>
                    <span className={`font-medium ${getUtilizationColor(dc.load)}`}>
                      {dc.load}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latency:</span>
                    <span className="font-medium">{dc.latency}ms</span>
                  </div>
                </div>
                <Progress value={dc.load} className="h-2 mt-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Infrastructure Health Summary</CardTitle>
          <CardDescription>Key infrastructure metrics and system status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
              <Cpu className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-700">78.3%</div>
              <div className="text-sm text-blue-600">Avg CPU Usage</div>
              <div className="text-xs text-blue-500 mt-1">Across all servers</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
              <MemoryStick className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-700">84.2%</div>
              <div className="text-sm text-green-600">Memory Utilization</div>
              <div className="text-xs text-green-500 mt-1">Efficient usage</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
              <HardDrive className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-700">52.1%</div>
              <div className="text-sm text-purple-600">Storage Used</div>
              <div className="text-xs text-purple-500 mt-1">30.2TB available</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border">
              <Network className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-700">456</div>
              <div className="text-sm text-orange-600">Network Throughput</div>
              <div className="text-xs text-orange-500 mt-1">Mbps peak</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}