"use client"

import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Lock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Key,
  Zap,
  Globe,
  Server,
  UserCheck,
  FileCheck
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

const threatData = [
  { day: 'Mon', blocked: 1247, attempted: 1389, false_positive: 12 },
  { day: 'Tue', blocked: 1156, attempted: 1298, false_positive: 8 },
  { day: 'Wed', blocked: 1389, attempted: 1567, false_positive: 15 },
  { day: 'Thu', blocked: 987, attempted: 1123, false_positive: 6 },
  { day: 'Fri', blocked: 1678, attempted: 1834, false_positive: 18 },
  { day: 'Sat', blocked: 892, attempted: 945, false_positive: 4 },
  { day: 'Sun', blocked: 756, attempted: 823, false_positive: 3 },
]

const vulnerabilityData = [
  { month: 'Jan', critical: 2, high: 8, medium: 15, low: 23 },
  { month: 'Feb', critical: 1, high: 6, medium: 18, low: 19 },
  { month: 'Mar', critical: 3, high: 12, medium: 21, low: 25 },
  { month: 'Apr', critical: 0, high: 4, medium: 14, low: 18 },
  { month: 'May', critical: 1, high: 5, medium: 16, low: 21 },
  { month: 'Jun', critical: 0, high: 3, medium: 12, low: 15 },
]

const complianceMetrics = [
  { standard: 'SOC 2 Type II', status: 'compliant', score: 98.5, lastAudit: '2024-03-15' },
  { standard: 'ISO 27001', status: 'compliant', score: 96.8, lastAudit: '2024-02-20' },
  { standard: 'GDPR', status: 'compliant', score: 99.2, lastAudit: '2024-04-10' },
  { standard: 'HIPAA', status: 'in-progress', score: 87.3, lastAudit: '2024-01-25' },
  { standard: 'PCI DSS', status: 'compliant', score: 94.7, lastAudit: '2024-03-30' },
]

const securityIncidents = [
  {
    id: 'INC-2024-089',
    type: 'Malware Detection',
    severity: 'medium',
    status: 'resolved',
    detected: '2024-06-15 14:32',
    resolved: '2024-06-15 15:18',
    description: 'Suspicious file detected in email attachment'
  },
  {
    id: 'INC-2024-088',
    type: 'Brute Force Attack',
    severity: 'high',
    status: 'resolved',
    detected: '2024-06-14 09:15',
    resolved: '2024-06-14 09:45',
    description: 'Multiple failed login attempts from single IP'
  },
  {
    id: 'INC-2024-087',
    type: 'Data Breach Attempt',
    severity: 'critical',
    status: 'investigating',
    detected: '2024-06-13 22:45',
    resolved: 'Ongoing',
    description: 'Unauthorized access attempt to customer database'
  },
  {
    id: 'INC-2024-086',
    type: 'Phishing Email',
    severity: 'low',
    status: 'resolved',
    detected: '2024-06-12 11:22',
    resolved: '2024-06-12 11:35',
    description: 'Suspicious email reported by user'
  },
]

const accessControls = [
  { metric: 'Multi-Factor Auth Coverage', value: 98.7, target: 95, status: 'good' },
  { metric: 'Password Policy Compliance', value: 94.2, target: 90, status: 'good' },
  { metric: 'Privileged Access Reviews', value: 100, target: 100, status: 'good' },
  { metric: 'Session Timeout Compliance', value: 89.5, target: 85, status: 'good' },
  { metric: 'Failed Login Monitoring', value: 99.8, target: 95, status: 'good' },
]

const networkSecurity = [
  { component: 'Firewall Rules', active: 2847, blocked: 156789, allowed: 98234 },
  { component: 'IDS/IPS Systems', active: 12, alerts: 1234, blocked: 456 },
  { component: 'Web Application Firewall', active: 3, blocked: 8934, filtered: 45678 },
  { component: 'DDoS Protection', active: 2, mitigated: 23, capacity: '100Gbps' },
]

const dataProtection = [
  { category: 'Data at Rest', encrypted: 99.8, compliant: 98.5 },
  { category: 'Data in Transit', encrypted: 100, compliant: 99.2 },
  { category: 'Data in Processing', encrypted: 85.6, compliant: 89.3 },
  { category: 'Backup Encryption', encrypted: 100, compliant: 100 },
]

const securityTraining = [
  { department: 'Engineering', completed: 45, total: 48, phishing: 94.2 },
  { department: 'Sales', completed: 23, total: 25, phishing: 88.7 },
  { department: 'Marketing', completed: 18, total: 20, phishing: 92.1 },
  { department: 'HR', completed: 8, total: 8, phishing: 96.8 },
  { department: 'Finance', completed: 12, total: 12, phishing: 98.3 },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-500 text-red-50'
    case 'high': return 'bg-orange-500 text-orange-50'
    case 'medium': return 'bg-yellow-500 text-yellow-50'
    case 'low': return 'bg-blue-500 text-blue-50'
    default: return 'bg-gray-500 text-gray-50'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'resolved': 
    case 'compliant': return 'bg-green-500 text-green-50'
    case 'investigating': 
    case 'in-progress': return 'bg-yellow-500 text-yellow-50'
    case 'open': return 'bg-red-500 text-red-50'
    default: return 'bg-gray-500 text-gray-50'
  }
}

const getComplianceColor = (status: string) => {
  switch (status) {
    case 'good': return 'text-green-600'
    case 'warning': return 'text-yellow-600'
    case 'critical': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

export default function SecurityDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive security monitoring, threat detection, and compliance tracking
        </p>
      </div>

      {/* Security Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Threat Detection"
          value="99.2%"
          change={2.1}
          changeLabel="accuracy"
          icon={Shield}
          gradient="from-red-500 to-pink-600"
          animate
        />
        <StatsCard
          title="Security Score"
          value={96}
          change={4.8}
          changeLabel="improvement"
          icon={CheckCircle}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="Active Threats"
          value={3}
          change={-67.5}
          changeLabel="reduction"
          icon={AlertTriangle}
          gradient="from-orange-500 to-red-600"
          animate
        />
        <StatsCard
          title="Compliance Rate"
          value="97.8%"
          change={1.2}
          changeLabel="increase"
          icon={FileCheck}
          gradient="from-blue-500 to-cyan-600"
        />
      </div>

      {/* Threat Analysis and Vulnerabilities */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Threat Activity</CardTitle>
            <CardDescription>Blocked threats and attempted attacks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={threatData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar dataKey="blocked" fill="#10b981" name="Blocked" />
                <Bar dataKey="attempted" fill="#ef4444" name="Attempted" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Trends</CardTitle>
            <CardDescription>Monthly vulnerability discovery and remediation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={vulnerabilityData}>
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

      {/* Security Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Incidents</CardTitle>
          <CardDescription>Latest security events and their resolution status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityIncidents.map((incident) => (
              <div key={incident.id} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold">{incident.type}</h3>
                      <Badge className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>ID: {incident.id}</span>
                      <span>Detected: {incident.detected}</span>
                      <span>Resolved: {incident.resolved}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Access Controls and Network Security */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Access Control Metrics</CardTitle>
            <CardDescription>Identity and access management compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accessControls.map((item) => (
                <div key={item.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.metric}</span>
                    <span className={`text-sm font-medium ${getComplianceColor(item.status)}`}>
                      {item.value}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress 
                      value={item.value} 
                      className={`h-2 ${
                        item.status === 'critical' ? '[&>div]:bg-red-500' :
                        item.status === 'warning' ? '[&>div]:bg-yellow-500' :
                        '[&>div]:bg-green-500'
                      }`}
                    />
                    <span className="text-xs text-muted-foreground">
                      Target: {item.target}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Security Status</CardTitle>
            <CardDescription>Network protection and monitoring systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {networkSecurity.map((component) => (
                <div key={component.component} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{component.component}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active: {component.active}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {'blocked' in component && (
                      <>
                        <div>
                          <div className="text-muted-foreground">Blocked</div>
                          <div className="font-medium text-red-600">{component.blocked?.toLocaleString() || '0'}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">{'allowed' in component ? 'Allowed' : 'Alerts'}</div>
                          <div className="font-medium text-green-600">
                            {('allowed' in component ? component.allowed : component.alerts)?.toLocaleString() || '0'}
                          </div>
                        </div>
                      </>
                    )}
                    {'capacity' in component && (
                      <div>
                        <div className="text-muted-foreground">Capacity</div>
                        <div className="font-medium">{component.capacity}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance and Data Protection */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>Regulatory compliance and audit results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceMetrics.map((standard) => (
                <div key={standard.standard} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{standard.standard}</span>
                    <Badge className={getStatusColor(standard.status)}>
                      {standard.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Compliance Score</span>
                    <span className="text-sm font-medium">{standard.score}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Last Audit: {new Date(standard.lastAudit).toLocaleDateString()}</span>
                    <Progress value={standard.score} className="h-1 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Protection</CardTitle>
            <CardDescription>Data encryption and protection metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataProtection.map((data) => (
                <div key={data.category} className="p-3 rounded-lg border">
                  <div className="font-medium mb-2">{data.category}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Encrypted</div>
                      <div className="flex items-center space-x-2">
                        <Progress value={data.encrypted} className="h-2 flex-1" />
                        <span className="font-medium">{data.encrypted}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Compliant</div>
                      <div className="flex items-center space-x-2">
                        <Progress value={data.compliant} className="h-2 flex-1" />
                        <span className="font-medium">{data.compliant}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Training and Overall Health */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Security Training Progress</CardTitle>
            <CardDescription>Employee security awareness training completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityTraining.map((dept) => (
                <div key={dept.department} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{dept.department}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{((dept.completed / dept.total) * 100).toFixed(0)}%</div>
                      <div className="text-xs text-muted-foreground">
                        {dept.completed}/{dept.total} completed
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <Progress value={(dept.completed / dept.total) * 100} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Phishing Test Score: {dept.phishing}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Health Overview</CardTitle>
            <CardDescription>Overall security posture and key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-700">96.2%</div>
                <div className="text-sm text-green-600">Security Score</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
                <Lock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-700">99.8%</div>
                <div className="text-sm text-blue-600">Data Protected</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
                <Eye className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-700">24/7</div>
                <div className="text-sm text-purple-600">Threat Monitoring</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border">
                <UserCheck className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-700">94.5%</div>
                <div className="text-sm text-orange-600">Training Complete</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}