"use client"

import { useSEO } from '@/hooks/use-seo'
import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Code, 
  GitBranch, 
  Bug,
  Clock,
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  AlertCircle,
  FileText,
  Coffee,
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
  Legend
} from 'recharts'

const commitData = [
  { day: 'Mon', commits: 45, linesAdded: 1250, linesRemoved: 890 },
  { day: 'Tue', commits: 52, linesAdded: 1580, linesRemoved: 1120 },
  { day: 'Wed', commits: 38, linesAdded: 980, linesRemoved: 650 },
  { day: 'Thu', commits: 67, linesAdded: 2100, linesRemoved: 1450 },
  { day: 'Fri', commits: 58, linesAdded: 1750, linesRemoved: 1200 },
  { day: 'Sat', commits: 23, linesAdded: 450, linesRemoved: 320 },
  { day: 'Sun', commits: 18, linesAdded: 380, linesRemoved: 280 },
]

const sprintData = [
  { sprint: 'Sprint 1', planned: 45, completed: 42, carryover: 3 },
  { sprint: 'Sprint 2', planned: 48, completed: 46, carryover: 2 },
  { sprint: 'Sprint 3', planned: 52, completed: 49, carryover: 3 },
  { sprint: 'Sprint 4', planned: 46, completed: 44, carryover: 2 },
  { sprint: 'Sprint 5', planned: 50, completed: 48, carryover: 2 },
  { sprint: 'Sprint 6', planned: 55, completed: 53, carryover: 2 },
]

const languageDistribution = [
  { name: 'TypeScript', value: 38.2, color: '#3178c6' },
  { name: 'JavaScript', value: 24.5, color: '#f7df1e' },
  { name: 'Python', value: 18.7, color: '#3776ab' },
  { name: 'Go', value: 12.3, color: '#00add8' },
  { name: 'Others', value: 6.3, color: '#6b7280' },
]

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Senior Frontend Developer',
    commits: 127,
    linesOfCode: 8450,
    bugs: 3,
    reviews: 23,
    status: 'active',
    avatar: 'SC'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Backend Developer',
    commits: 98,
    linesOfCode: 12200,
    bugs: 5,
    reviews: 18,
    status: 'active',
    avatar: 'MR'
  },
  {
    name: 'Alex Thompson',
    role: 'Full Stack Developer',
    commits: 156,
    linesOfCode: 15600,
    bugs: 7,
    reviews: 31,
    status: 'active',
    avatar: 'AT'
  },
  {
    name: 'Emily Davis',
    role: 'DevOps Engineer',
    commits: 89,
    linesOfCode: 6800,
    bugs: 2,
    reviews: 15,
    status: 'active',
    avatar: 'ED'
  },
  {
    name: 'David Park',
    role: 'Mobile Developer',
    commits: 112,
    linesOfCode: 9300,
    bugs: 4,
    reviews: 22,
    status: 'active',
    avatar: 'DP'
  },
]

const codeQualityMetrics = [
  { metric: 'Code Coverage', value: 87, target: 85, status: 'good' },
  { metric: 'Technical Debt', value: 23, target: 25, status: 'good' },
  { metric: 'Complexity Score', value: 4.2, target: 5.0, status: 'good' },
  { metric: 'Duplication', value: 3.8, target: 5.0, status: 'good' },
  { metric: 'Security Issues', value: 2, target: 0, status: 'warning' },
]

const recentPullRequests = [
  {
    title: 'Add user authentication middleware',
    author: 'Sarah Chen',
    status: 'merged',
    files: 8,
    additions: 245,
    deletions: 67,
    timeAgo: '2 hours ago'
  },
  {
    title: 'Update API documentation',
    author: 'Mike Rodriguez', 
    status: 'open',
    files: 12,
    additions: 156,
    deletions: 34,
    timeAgo: '4 hours ago'
  },
  {
    title: 'Fix memory leak in data processing',
    author: 'Alex Thompson',
    status: 'merged',
    files: 3,
    additions: 89,
    deletions: 124,
    timeAgo: '6 hours ago'
  },
  {
    title: 'Implement caching layer',
    author: 'Emily Davis',
    status: 'review',
    files: 15,
    additions: 456,
    deletions: 78,
    timeAgo: '8 hours ago'
  },
]

const velocityData = [
  { week: 'W1', storyPoints: 42, velocity: 38 },
  { week: 'W2', storyPoints: 45, velocity: 43 },
  { week: 'W3', storyPoints: 48, velocity: 45 },
  { week: 'W4', storyPoints: 52, velocity: 49 },
  { week: 'W5', storyPoints: 46, velocity: 44 },
  { week: 'W6', storyPoints: 50, velocity: 48 },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'merged': return 'bg-green-500 text-green-50'
    case 'open': return 'bg-blue-500 text-blue-50'
    case 'review': return 'bg-yellow-500 text-yellow-50'
    case 'draft': return 'bg-gray-500 text-gray-50'
    default: return 'bg-gray-500 text-gray-50'
  }
}

const getQualityColor = (status: string) => {
  switch (status) {
    case 'good': return 'text-green-600'
    case 'warning': return 'text-yellow-600'
    case 'critical': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

export default function DevelopmentDashboard() {
  useSEO()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Development Dashboard</h1>
        <p className="text-muted-foreground">
          Team productivity metrics and code quality insights
        </p>
      </div>

      {/* Development Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Weekly Commits"
          value={301}
          change={18.5}
          changeLabel="vs last week"
          icon={GitBranch}
          gradient="from-green-500 to-emerald-600"
          animate
        />
        <StatsCard
          title="Lines of Code"
          value={7950}
          change={24.2}
          changeLabel="net addition"
          icon={Code}
          gradient="from-blue-500 to-cyan-600"
          animate
        />
        <StatsCard
          title="Pull Requests"
          value={47}
          change={12.8}
          changeLabel="this week"
          icon={FileText}
          gradient="from-purple-500 to-pink-600"
          animate
        />
        <StatsCard
          title="Bug Reports"
          value={12}
          change={-28.5}
          changeLabel="reduction"
          icon={Bug}
          gradient="from-red-500 to-orange-600"
        />
      </div>

      {/* Commit Activity and Sprint Progress */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Commit Activity</CardTitle>
            <CardDescription>Code commits and line changes this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={commitData}>
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
                <Bar dataKey="commits" fill="#3b82f6" name="Commits" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sprint Performance</CardTitle>
            <CardDescription>Story points planned vs completed</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sprintData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="planned" fill="#f59e0b" name="Planned" />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Development Team Performance</CardTitle>
          <CardDescription>Individual contributor metrics and activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded bg-blue-50 border border-blue-200">
                    <div className="text-xl font-bold text-blue-700">{member.commits}</div>
                    <div className="text-xs text-blue-600">Commits</div>
                  </div>
                  <div className="text-center p-3 rounded bg-purple-50 border border-purple-200">
                    <div className="text-xl font-bold text-purple-700">{member.linesOfCode.toLocaleString()}</div>
                    <div className="text-xs text-purple-600">Lines of Code</div>
                  </div>
                  <div className="text-center p-3 rounded bg-green-50 border border-green-200">
                    <div className="text-xl font-bold text-green-700">{member.reviews}</div>
                    <div className="text-xs text-green-600">Code Reviews</div>
                  </div>
                  <div className="text-center p-3 rounded bg-red-50 border border-red-200">
                    <div className="text-xl font-bold text-red-700">{member.bugs}</div>
                    <div className="text-xs text-red-600">Bug Reports</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Quality and Recent PRs */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Code Quality Metrics</CardTitle>
            <CardDescription>Static analysis and quality indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {codeQualityMetrics.map((item) => (
                <div key={item.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.metric}</span>
                    <span className={`text-sm font-medium ${getQualityColor(item.status)}`}>
                      {typeof item.value === 'number' && item.value > 10 ? 
                        `${item.value}${item.metric.includes('%') ? '%' : ''}` : 
                        item.value
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress 
                      value={typeof item.value === 'number' ? 
                        (item.metric === 'Technical Debt' || item.metric === 'Security Issues' ? 
                          100 - (item.value / item.target * 100) : 
                          item.value) : 
                        80
                      } 
                      className={`h-2 ${
                        item.status === 'critical' ? '[&>div]:bg-red-500' :
                        item.status === 'warning' ? '[&>div]:bg-yellow-500' :
                        '[&>div]:bg-green-500'
                      }`}
                    />
                    <span className="text-xs text-muted-foreground">
                      Target: {item.target}{typeof item.target === 'number' && item.target > 10 ? '' : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Pull Requests</CardTitle>
            <CardDescription>Latest code changes and reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPullRequests.map((pr, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{pr.title}</div>
                      <div className="text-xs text-muted-foreground">by {pr.author}</div>
                    </div>
                    <Badge className={getStatusColor(pr.status)}>
                      {pr.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <span>{pr.files} files</span>
                      <span className="text-green-600">+{pr.additions}</span>
                      <span className="text-red-600">-{pr.deletions}</span>
                    </div>
                    <span>{pr.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Language Distribution and Velocity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Programming Languages</CardTitle>
            <CardDescription>Codebase composition by language</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {languageDistribution.slice(0, 4).map((lang) => (
                <div key={lang.name} className="text-center p-3 rounded-lg border">
                  <div className="text-lg font-bold" style={{ color: lang.color }}>
                    {lang.value}%
                  </div>
                  <div className="text-xs text-muted-foreground">{lang.name}</div>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={languageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {languageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Velocity</CardTitle>
            <CardDescription>Story points vs actual velocity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="storyPoints" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Planned Points"
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="velocity" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Actual Velocity"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Development Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Development Insights</CardTitle>
          <CardDescription>Key metrics and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
              <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-700">2.3 days</div>
              <div className="text-sm text-blue-600">Avg PR Review Time</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-700">94.2%</div>
              <div className="text-sm text-green-600">Sprint Goal Achievement</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border">
              <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-700">847ms</div>
              <div className="text-sm text-purple-600">Avg Build Time</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border">
              <Coffee className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-700">98.7%</div>
              <div className="text-sm text-orange-600">Test Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}